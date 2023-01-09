/**
 * NLP Utils
 * Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * srebelo[at]dei.uc.pt
 *
 * v1.0.0 August 2021
 * v1.1.0 December 2021
 */

const FS = require('fs');
const dotenv = require('dotenv').config();
const Emoji = require('node-emoji');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const PatienceDiff = require('patience-diff');

const Fin = require("finnlp");
require ("fin-negation");
require ("fin-urls");
// require ("fin-slang");
// require ("fin-emphasis");

const normaliser = require('en-norm');
// the sentence tokenizer of fin.js not works with links
const SentenceTokenizer = require('sbd');
const SentenceTokenizerOptions = {
    "newline_boundaries" : true,
    "html_boundaries"    : true,
    "sanitize"           : false,
    "allowed_tags"       : false,
    "preserve_whitespace" : false,
    "abbreviations"      : null
};


const spelt = require('spelt');
const dict = require('spelt-gb-dict');
const check = spelt.default({
        dictionary:dict.dictionary,
        distanceThreshold:0.2
});

const { NeuralNetwork } = require('@nlpjs/neural');
const fetch = require("node-fetch");

const dictApiKey = process.env.MW_API_KEY; // dictionaryapi API key
const _MODEL = 'data/models/LST_AIT_2018_SemEval_2018_task_1_model_1624288181749.json';
const _LEXICON = 'data/lexicon/NRC-Emotion-Intensity-Lexicon-v1_1618414260694.json';
const MIN_EMOTION = .2;

const languageTranslator = new LanguageTranslatorV3({
    authenticator: new IamAuthenticator({ apikey: process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY }),
    serviceUrl: process.env.LANGUAGE_TRANSLATOR_URL,
    version: '2020-11-12',
});

// console.log (`api key=${process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY}`);
// console.log (`service key=${process.env.LANGUAGE_TRANSLATOR_URL}`);

// https://cloud.ibm.com/docs/language-translator?topic=language-translator-translation-models
const availableLanguages = [
    'ar', 'bn', 'bs', 'bg', 'zh', 'hr', 'cs', 'da', 'nl', 'en',
    'et', 'fi', 'fr', 'de', 'el', 'gu', 'he', 'hi', 'hu', 'ga',
    'id', 'it', 'ja', 'ko', 'lv', 'lt', 'ms', 'ml', 'mt', 'ne',
    'nb', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'es', 'sv',
    'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy'
];

const net = new NeuralNetwork();
let sw; // stop words lexicons
let slang; // slang lexicon (only works on EN)
let emoticons; // emoticons lexicon
let wordemo; // word-emotions lexicon

const LINE_SPLIT_OPTIONS = {
    OPTIMAL: 25,
    MAX: 30,
    STOP_WORD_MIN_SIZE_IN_OPTIMAL: 10,
    WIDOWS_SIZE: 3,
    ORPHANS_SIZE: 1,
    PROB_SPLIT_AGAINST_RULES: .95,
    SPLIT_PUNT: ['.',',','!']
};

const setup = () => {
    try {
        //  setup classifier
        const model = FS.readFileSync(_MODEL);
        let classifier = JSON.parse(model); // load model on classifier
        net.fromJSON(classifier);
    } catch (err) {
        console.error(`classifier not loaded: ${err}`);
        return false;
    }

    try {
        // load stop words lexicon (en)
        let swenLexicon = FS.readFileSync('node_modules/stopwords-json/dist/en.json');
        sw = JSON.parse(swenLexicon);
    } catch (err) {
        console.error(`stop words lexicon not loaded: ${err}`);
        return false;
    }

    try {
        // load slang dictionary
        let slangLexicon = FS.readFileSync('data/lexicon/slang.json');
        slang = JSON.parse(slangLexicon);
    } catch (err) {
        console.error(`slang lexicon not loaded: ${err}`);
        return false;
    }

    try {
        // load emoticons dictionary
        let emoticonsLexicon = FS.readFileSync('data/lexicon/emoticons.json');
        emoticons = JSON.parse(emoticonsLexicon);
    } catch (err) {
        console.error(`emoticons lexicon not loaded: ${err}`);
        return false;
    }

    try {
        // load emotion lexicon
        const lx = FS.readFileSync(_LEXICON);
        wordemo = JSON.parse(lx);
    } catch (err) {
        console.error(`word-emotion lexicon not loaded: ${err} (path ${_LEXICON})`);
        return false;
    }

    return true;
}

const classification = async (txt, lang='en') => {
    const _rawTxt = txt;
    let _rawEnTxt = txt, _translateResults = txt;

    txt = await rm(txt);
    let displayTxt = txt;

    // DEBUG
    // console.log(`txt= ${txt}`);

    // check if language is supported
    // get mother language
    lang = lang.split('-')[0];
    // if lang is not supported
    if (!availableLanguages.includes(lang)) {
        lang = 'en';
    }

    // translate text
    // DEBUG
    // console.log (`txt=${txt}. lang=${lang}`);

    if (lang !== 'en') {
        try {
            _translateResults = await _translate(txt, lang);
            _translateResults = JSON.parse(_translateResults);
            txt = _translateResults.translations[0].translation;
            _rawEnTxt = txt;
        } catch (err) {
            console.warn (`language not supported ${err}`);
            return {
                success: false
            }
        }
    }

    // console.log("TXT", txt);

    // remove retweet data
    const rtexp = /RT\s*@[^:]*:/gm;
    const rtmatch = txt.match(rtexp);
    let rtinfo = rtmatch !== null ? rtexp : []; // retweet data
    rtinfo = rtinfo.length > 0 ? rtinfo : [];

    // remove URLs (hardwired method)
    const urlexp = /(https?:\/\/)(\s)*(www\.)?(\s)*((\w|\s)+\.)*([\w\-\s]+\/)*([\w\-]+)((\?)?[\w\s]*=\s*[\w\%&]*)*/gm;
    const urlsMatch = txt.match(urlexp);
    let urls = urlsMatch !== null ? urlsMatch : [];


    // remove of mentions
    const mentionexp = /\B@[a-z0-9_-]+/gi;
    const mentionMatch = txt.match(mentionexp);
    const mentions = mentionMatch !== null ? mentionMatch : [];
    let mentionsNative = mentions;
    if (lang !== 'en') {
        const mentionsNativeMatch = _rawTxt.match(mentionexp, '');
        mentionsNative = mentionsNativeMatch !== null ? mentionsNativeMatch : [];
    }

    // remove hashtags
    const htgexp = /#[^\s!@#$%^&*()=+.\/,\[{\]};:'"?><]+/gi;
    const htgMatch = txt.match(htgexp, '');
    const hashtags = htgMatch !== null ? htgMatch : [];

    // get emojis
    let emojis = [];
    Emoji.replace(txt, (e) => emojis.push(e));

    let result = null, emotionalData = null, sentences;
    let success = true;
    try {
        result = await _run(txt);
        emotionalData = _mostPresentEmotion(result, MIN_EMOTION);
        // let normalisedTxt = await rm(txt);
        displayTxt = await displayTxt.replace(urlexp, '');
        displayTxt.trim();
        sentences = await sentenceTokenizer(displayTxt);
        // console.log (`txt after= ${displayTxt}`);
    } catch (err) {
        success = false;
    }

    return {
        success: success,
        text: displayTxt,
        rawTxt: _rawTxt,
        sentences: sentences,
        lang: lang,
        RTInfo: rtinfo,
        urls: urls,
        emotions: emotionalData,
        hashtags: hashtags,
        mentions: {
            mentions: mentionsNative,
            working: mentions
        },
        emojis: emojis,
        _raw: {
            _workingTxt: txt,
            _text: _rawTxt,
            _enText: _rawEnTxt,
            _analysis: result,
            _translateResults: _translateResults
        }
    }
}

const lexicon = async (txt, lang = 'en') => {
    // check if language is supported
    // get mother language
    lang = lang.split('-')[0];
    // if lang is not supported
    if (!availableLanguages.includes(lang)) {
        lang = 'en';
    }

    const tokens = await _preprocessing(txt, lang);
    if (!tokens.success) {
        console.log (`not possible to preprocess the text`);
        return {
            success: false
        }
    }

    const neutralTokens = [];

    const results = {};
    const influencingWords = {};
    const wordEmotionRelation = {};
    const wordEmotionRelationSorted = {};


    for (let token of tokens.tokens) {
        let r = wordemo[token];
        if (r) {
            influencingWords[token] = r;
            for (let key of Object.keys(r)){
                if(!results[key]) {
                    results[key] = 0.0;
                }
                results[key] += parseFloat(r[key]);
                // console.log(token, key, r[key], results[key]);
            }
        } else {
            // console.log(`not founded emotions to the word ${token}`);
            neutralTokens.push(token);
        }
    }

    const emotionalData = _mostPresentEmotion(results, MIN_EMOTION);

    // get the most influencing words (in the whole and by emotion)
    // organise the results by emotion
    for (let emotion of Object.keys(results)) {
        wordEmotionRelation[emotion] = {};
    }
    for (let word of Object.keys(influencingWords)){
        for (let emo of Object.keys(influencingWords[word])) {
            wordEmotionRelation[emo][word] = influencingWords[word][emo];
        }
    }

    // sort the words inside of each emotion
    for (let e of Object.keys(wordEmotionRelation)) {
        let sortable = [];
        for (let word in wordEmotionRelation[e]) {
            sortable.push([word,wordEmotionRelation[e][word]]);
        }

        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });

        sortable = sortable.reverse();

        wordEmotionRelationSorted[e] = sortable;
    }

    let mostInfluentialToken = wordEmotionRelationSorted[emotionalData.predominant.emotion] !== undefined ? wordEmotionRelationSorted[emotionalData.predominant.emotion][0][0] : {};
    const objectIsEmpty = (mostInfluentialToken && Object.keys(mostInfluentialToken).length === 0 && mostInfluentialToken.constructor === Object);

    // translate all working tokens
    // const objectIsEmpty = (mostInfluentialToken && Object.keys(mostInfluentialToken).length === 0 && mostInfluentialToken.constructor === Object);
    // const translatedTokens = [];
    // if (tokens.lang !== 'en' && !objectIsEmpty) {
    //     for (let token of tokens.tokens) {
    //         try {
    //             let translation = await _translate(token, 'en', lang);
    //             translation = JSON.parse(translation);
    //             translatedTokens.push(translation.translations[0].translation);
    //         } catch (e) {
    //             translatedTokens.push(token);
    //             console.error(e);
    //         }
    //     }
    // }


    let mostInfluentialTokenDisplay = {
        rawToken: mostInfluentialToken,
        originalWord: mostInfluentialToken,
        display: mostInfluentialToken
    };
    for (let entry of tokens.history) {
        let current = entry[3][entry[3].length-1];
        for (let word of current) {
            if (mostInfluentialToken === word) {
                mostInfluentialTokenDisplay.originalWord = entry[0];
                mostInfluentialTokenDisplay.display = entry[0];
                break;
            }
        }
    }

    if (lang !== 'en' && !objectIsEmpty) {
        try {
            let translation = await _translate(mostInfluentialTokenDisplay.originalWord, 'en', lang);
            translation = JSON.parse(translation);
            mostInfluentialTokenDisplay.display = translation.translations[0].translation;
        } catch (e) {
            console.warn (e);
        }
    }



    return {
        success: true,
        emotions: emotionalData,
        mostInfluentialToken: mostInfluentialTokenDisplay,
        wordEmotionsRelation: wordEmotionRelationSorted,
        neutralTokens: neutralTokens,
        text: tokens.text,
        tokens: tokens.tokens,
        lang: tokens.lang,
        mentions: tokens.mentions,
        hashtags: tokens.hashtags,
        emojis: tokens.emojis,
        urls: tokens.urls,
        MIN_REG_EMOTION_THRESHOLD: MIN_EMOTION,
        _raw: {
            _history: tokens.history,
            _analysis: tokens,
            _emotions: {
                _notSortedWordRelation: wordEmotionRelation
            }
        }
    }

}

const _mostPresentEmotion = (result, min = .5) => {
    let predominant = "neutral"; //no-emotion available
    let recognised = {};
    let predominantWeight = 0.0;

    for (let key of Object.keys(result)) {
        let current = parseFloat(result[key]);
        current = Math.round(current * 100) / 100;
        if (current >= min) {
            recognised[key] = current;
            if (current > predominantWeight) {
                predominantWeight = current;
                predominant = key;
            }
        }
    }

    // console.log (recognised);
    // console.log (`predominant emotion= ${predominant} (weight= ${predominantWeight})`);

    // sort object
    let sortable = [];
    for (let emotion in recognised) {
        // console.log (`emotion ${[emotion,recognised[emotion]]}`);
        sortable.push([emotion,recognised[emotion]]);
    }
    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
    sortable = sortable.reverse();

    let sumWeight = sortable.map((e) => e[1]).reduce((a, b) => a + b, 0);
    for (let s of sortable) {
        let percent = parseFloat((s[1]/sumWeight).toFixed(2));
        s.push(percent)
    }

    return {
      recognisedEmotions: sortable,
      predominant: {
          emotion: predominant,
          weight: predominantWeight
      }
    };
}

const _run = async (data = {'': 1}) => {
    // console.log(`analysed data: ${data}`);
    let input = {};
    // SPLIT
    for (let token of data.split(" ")) {
        input[token] = 1;
    }
    // NOT SPLIT
    // input[data] = 1;
    // console.log ("input", input);
    // console.log (`input= ${JSON.stringify(input)}`);
    return net.run(input);
}

const rm = async (rtxt) => {
    let txt =  rtxt;
    // remove /n
    txt = await txt.replace(/(\r\n|\r|\n)+/gi, ' ');
    // remove []
    txt = await txt.replace (/[\[|\]]+/gi, ' ');
    // remove :
    txt = await txt.replace (/:\s/gm, ' ');
    // remove `` and  \``
    txt = await txt.replace (/(\"|“|”)+/gi, ' ');
    // remove &amp; by &
    txt = await txt.replace (/&amp;/gi, '&');
    // add a space between emojis
    txt = Emoji.replace(txt, (emoji) =>  ` ${emoji.emoji} `);
    // replace consecutive white spaces
    txt = await txt.replace (/[^\S\r\n]{2,}/, ' ');

    // txt = await txt.trim();

    return txt;
}

const _preprocessing = async (txt, lang = 'en') => {
    let _rawTxt = txt; // raw text before pre-processing
    let _translateRawTxt = txt; // raw result after the translation
    let _translateResults = []; // translation results from the API
    txt = await rm (txt);
    let _nTxt = txt;


    // DEBUG
    // console.log (`1 TXT=${txt}`);
    // console.log (`tw language ${lang}`);

    // console.log (`text=${txt}`);

    // translate the sentence to en
    if (lang !== 'en') {
        try {
            _translateResults = await _translate(txt, lang);
            _translateResults = JSON.parse(_translateResults);
            txt = _translateResults.translations[0].translation;
            _translateRawTxt = txt;
        } catch (err) {
            console.warn (`error on translation. err=${err}`);
            return {
                success: false
            }
        }
    }

    // console.log (`lang=${lang}`);
    // console.log (`text=${txt}`);

    // normalise words
    // replace acute by apostrophe
    txt = txt.replace(/’/g, `'`);

    const history = new History(txt); // create an history object to save the transformation in text

    // remove retweet data
    const rtexp = /RT\s*@[^:]*:/gm;
    let rtmatch = txt.match (rtexp);
    let rtinfo = rtmatch !== null ? rtmatch : []; // retweet data
    txt = await txt.replace(rtexp, '');
    rtinfo = rtinfo.length > 0 ? rtinfo : [];
    // update history
    history.remove(rtinfo)

    // sentence tokenizer
    // const sentenceTokens = await sentenceTokenizer(txt);

    // remove URLs (hardwired method)
    const  urlexp = /(https?:\/\/)(\s)*(www\.)?(\s)*((\w|\s)+\.)*([\w\-\s]+\/)*([\w\-]+)((\?)?[\w\s]*=\s*[\w\%&]*)*/gm;
    const urlsMatch = txt.match(urlexp);
    let urls = urlsMatch !== null ? urlsMatch : [];
    txt = await txt.replace(urlexp, '');
    // update history
    history.remove(urls);

    // remove of mentions
    const mentionexp = /\B@[a-z0-9_-]+/gi;
    const mentionMatch = txt.match(mentionexp);
    const mentions = mentionMatch !== null ? mentionMatch : [];
    let mentionsNative = mentions;
    if (lang !== 'en') {
        const mentionsNativeMatch = txt.match(mentionexp, '');
        mentionsNative = mentionsNativeMatch !== null ? mentionsNativeMatch : [];
    }

    for (let mention of mentions) {
        // remove the symbol from the string but maintain the word
        txt = txt.replace(mention, `${mention.substring(1, mention.length-1)}`);
    }

    // update history
    // history.remove(mentions);
    for (let mention of mentions) {
        history.update(mention, mention.substring(1, mention.length - 1));
    }


    // remove hashtags
    const htgexp = /#[^\s!@#$%^&*()=+.\/,\[{\]};:'"?><]+/gi;
    const htgMatch = txt.match(htgexp, '');
    const hashtags = htgMatch !== null ? htgMatch : [];

    // save hashtags in native language (if not english)
    let hashtagsNative = hashtags;
    if (lang !== 'en') {
        const htgNativeMatch = txt.match(htgexp, '');
        hashtagsNative = htgNativeMatch !== null ? htgNativeMatch : [];
    }

    for (let hashtag of hashtags) {
        // remove the symbol from the string but maintain the word
        txt = txt.replace(hashtag, `${hashtag.substring(1, hashtag.length-1)}`);
    }


    // update history
    for (let hash of hashtags) {
        history.update(hash, hash.substring(1, hash.length - 1));
    }

    // contractions resolver
    let _normalisedText = [];
    for (let t of txt.split(" ")) {
        _normalisedText.push(normaliser.resolveContractions(t));
    }

    // update history
    txt.split(" ").forEach((t, i) => {
        if (t !== _normalisedText[i]){
            history.update(t, _normalisedText[i].trim());
        }
    });

    // remove white spaces in the string
    _normalisedText = _normalisedText.filter ((str) => (str.replace(/\s/g, '').length));
    // remove space in the beginning and end of tokens
    _normalisedText = _normalisedText.map ((str) => str.trim());
    // join text
    txt = _normalisedText.join(' ');

    // confusable characters replacements (e.g. ” => "" )
    txt = normaliser.replaceConfusables(txt);


    let tokens = txt.split(' ');
    for (let i=0; i<tokens.length; i++){
        if (Object.keys(emoticons).includes(tokens[i].toLowerCase())) {
            // update history
            history.update(tokens[i], emoticons[tokens[i].toLowerCase()]);
            // change the emoticons for their meaning.
            tokens[i] = emoticons[tokens[i].toLowerCase()];
        } else if (Object.keys(slang).includes(tokens[i])) {
            // update history
            history.update(tokens[i], slang[tokens[i]]);
            // change the short form words to their full form (slang)
            tokens[i] = slang[tokens[i].toUpperCase()];
        }
    }

    txt = tokens.join(' ');

    // change the emojis for their meaning
    // save emojis
    let emojis = [];
    Emoji.replace(txt, (e) => emojis.push(e));

    // get emojis
    txt = Emoji.replace(txt, (emoji) => {
        const value = `${emoji.key.replace(/(_)|(-)/g, " ")}`;
        // update history
        history.update(emoji.emoji, value);
        return value;
    });

    // tokenize and process the text
    let processed = new Fin.Run(txt.toLowerCase());

    // update history with processed tokens
    history.updateActive(processed.intercepted.split(" "));

    // search negations
    const negatedIns = new Fin.Run(processed.intercepted).negation();

    // to store lemmas and tokens without the remove of stop words
    let processedLemmasRaw = [];
    const processedTokensRaw = [];
    for (let i=0; i<processed.sentences.length; i++) {
        processedLemmasRaw.push(processed.sentences[i].lemmas);
        processedTokensRaw.push(processed.sentences[i].tokens);
    }

    // console.log("\ntxt", txt, "\n");

    // update history with lemmas
    history.updateLemmas(processedLemmasRaw, processedTokensRaw, txt.split(" "));


    // history transformation map
    const savedIndex = [];

    for (let i=0; i<negatedIns.length; i++) {
        for (let j=0; j<negatedIns[i].length; j++) {
            if (negatedIns[i][j]) {
                let token = processed.sentences[i].lemmas[j];
                let tag = processed.sentences[i].tags[j];
                try {
                    let antonym = await _antonyms(token, tag);
                    // save on history transformation map
                    savedIndex.push([i, j, processedLemmasRaw[i][j], antonym])
                    processedLemmasRaw[i][j] = antonym;
                } catch (e) {
                    console.warn (`antonyms not obtained: ${e}`);
                }
            }
        }
    }

    // update history with antonyms
    history.updateActivePos(savedIndex, processed, savedIndex.map((x) => x[3]));


    // history transformation map
    const detected = [];

    // remove URLs (method 2 to handle with automatic method from finn NLP)
    for (let i=0; i < processedLemmasRaw.length; i++) {
        let arr = processedLemmasRaw[i];
        processedLemmasRaw[i] = arr.map ((e, j) => {
            if ( e.startsWith('Detected')) {
                urls.push(processed.sentences[i].tokens[j]);
                detected.push([i, j, processed.sentences[i].tokens[j]]);
                return undefined;
            }
            else return e;
        });
    }

    // update history
    history.updateActivePos(detected, processed, detected.map ((e) => []), true);

    // remove stop words
    const processedLemmas = [];
    // position of final lemmas
    let mapFinal = [];
    for (let i=0; i<processed.sentences.length; i++) {
        let lemmas = [], map = [];
        for (let j=0; j<processed.sentences[i].tokens.length; j++) {
            const token = processed.sentences[i].tokens[j];
            if (!isStopWord(token) && processedLemmasRaw[i][j] !== undefined) {
                lemmas.push(processedLemmasRaw[i][j]);
                map.push (true);
            } else {
                map.push(false);
            }
        }
        processedLemmas.push(lemmas);
        mapFinal.push(map);
    }


    tokens = processedLemmas.flat();
    mapFinal = mapFinal.flat();
    // remove the urls retired from history
    for (let el of history.pos(detected.map((v) => [v[0], v[1]]), processed)) {
        mapFinal.splice(el,1);
    }

    history.removeBasedOnMap(mapFinal);

    // map to remove in history
    const toDelete = [];
    const mapPunctEls = []

    // remove punctuations
    const punctexp = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
    tokens = tokens.map((e, i) => {
        let hasPunctElements = e.match(punctexp);
        if (hasPunctElements !== null) {
            if (hasPunctElements.length === e.length) {
                toDelete.push(i);
                mapPunctEls.push(false);
                return null;
            } else {
                mapPunctEls.push(true);
                return e;
            }
        } else {
            mapPunctEls.push(true);
            return e;
        }
    });

    history.removeBasedOnMap(mapPunctEls);

    tokens = tokens.filter(function(el) { return el; });
    let sentences = sentenceTokenizer(_nTxt);

    // remove typos from the remaining words (spell check)
    // not used because the results are not good enough
    // let revised = false;
    // for (let i=0; i<tokens.length; i++) {
    //    let token = tokens[i];
    //    const tokenRevised = await check(token.toLowerCase());
    //    if (!tokenRevised.correct) {
    //        console.log(token.toLowerCase(), tokenRevised);
    //    }
    // }

    return {
        success: true,
        tokens: tokens,
        sentences: sentences,
        text: _translateRawTxt,
        lang: lang,
        RTInfo: rtinfo,
        urls: urls,
        mentions: {
            mentions: mentionsNative,
            working: mentions
        },
        hashtags: {
            hashtags: hashtagsNative,
            working: hashtags
        },
        emojis: emojis,
        history: history.get(),
        _raw: {
            _translateRawTxt: _translateRawTxt,
            _txt: _rawTxt,
            _finalText: txt,
            _mapFinal: mapFinal,
            _rawLemmas: processedLemmasRaw,
            _translateResults: _translateResults,
        }
    };
}


const _antonyms = async (word, tag= 'N') => {
    if (dictApiKey === null) {
        console.error(`dictionaryapi.com key not valid`);
        return word;
    }

    const simpleTag = tag.charAt(0).toLowerCase();
    try {
        let response = await fetch(`https://dictionaryapi.com/api/v3/references/ithesaurus/json/${word}?key=${dictApiKey}`);
        let commits = await response.json();
        let output = word;
        for (let data of commits) {
            if (data.fl !== undefined) {
                if (data.fl.startsWith(simpleTag) &&
                    (data.meta.id.toLowerCase() === word.toLowerCase())) {
                    if (data.meta.ants.length > 0) {
                        output = data.meta.ants[0][0];
                        break;
                    }
                }
            }
        }
        return output;
    } catch (err) {
        console.log(`address= https://dictionaryapi.com/api/v3/references/ithesaurus/json/${word}?key=${dictApiKey}`);
        console.error(err);
        return word;
    }
}

const isStopWord = (token) => {
    return sw.includes(token);
}

const _removeStopWords = async (tokens) => {
    for (let i=0; i<tokens.length; i++) {
        for (let j=0; j<tokens[i].length; j++) {
            const token = tokens[i][j];
            if (sw.includes(token)) {
                delete tokens[i][j];
            }
        }
    }

    tokens = [].concat(...tokens);
    tokens = tokens.filter(function(el) { return el; });
    return tokens;
}

const _translate = async (text, source, target="en") => {
    return new Promise((resolve) => {
        languageTranslator.translate(
            {
                text: text,
                source: source,
                target: target
            })
            .then(response => {
                resolve(JSON.stringify(response.result, null, 2));
            })
            .catch(err => {
                console.error('error on translation: ', err);
                resolve(text);
            });
    });
}

const sentenceTokenizer = async (txt, widows= 3, orphans = 2, probw = .95) => {
    const options = {
        "newline_boundaries" : false,
        "html_boundaries"    : false,
        "sanitize"           : false,
        "allowed_tags"       : false,
        "preserve_whitespace" : false,
        "abbreviations"      : null
    };

    let sentences = await SentenceTokenizer.sentences(txt, options);
    let res = [];
    /* TODO:
    if next word lenght is bigger
     */
    await sentences.forEach((s) => {
        if ((s.length > LINE_SPLIT_OPTIONS.MAX)) {
            let lineLength = 0;
            let lines = [];
            let i = 0;
            const tokens = s.split(" ");
            tokens.forEach ((word, j) => {
                if (tokens[j-1] === undefined) {
                    // ensure that the no error appears in first words
                    if (lineLength + word.length + 1 >= LINE_SPLIT_OPTIONS.MAX) {
                        // if the word is bigger split
                        i++;
                        lineLength = 0;
                    } else {
                        lineLength++;
                    }
                }
                else if (tokens[j + LINE_SPLIT_OPTIONS.ORPHANS_SIZE] === undefined) {
                    // avoid orphans
                    // always ensure that exists three (ORPHANS_SIZE+1) words in the last line.
                    lineLength ++;
                }
                else if (
                    lineLength + word.length + 1 >= LINE_SPLIT_OPTIONS.MAX &&
                    (tokens[j-1].length > LINE_SPLIT_OPTIONS.WIDOWS_SIZE || Math.random() > LINE_SPLIT_OPTIONS.PROB_SPLIT_AGAINST_RULES)
                ) {
                    // avoid windows
                    // break the line if characters limit is achieved
                    // as well as the last word is not small than a threshold
                    // DEBUG
                    // console.log (`[1] line=[${lines[i]}] stopword=[${word}]`);
                    i++;
                    lineLength = 0;
                } else if (
                    ((lineLength + word.length + 1 >= LINE_SPLIT_OPTIONS.OPTIMAL) && (Math.random() > (LINE_SPLIT_OPTIONS.PROB_SPLIT_AGAINST_RULES - LINE_SPLIT_OPTIONS.PROB_SPLIT_AGAINST_RULES / 3))) &&
                    (word.length >= LINE_SPLIT_OPTIONS.STOP_WORD_MIN_SIZE_IN_OPTIMAL || LINE_SPLIT_OPTIONS.SPLIT_PUNT.includes(word[word.length - 1])) &&
                    (tokens[j-1].length > LINE_SPLIT_OPTIONS.WIDOWS_SIZE || Math.random() > LINE_SPLIT_OPTIONS.PROB_SPLIT_AGAINST_RULES)
                ) {
                    // split based on a optimal size and a random factor
                    // avoid windows
                    // DEBUG
                    // console.log (`[2] line=[${lines[i]}] stopword=[${word}] STOP_WORD_MIN=[${(word.length >= LINE_SPLIT_OPTIONS.STOP_WORD_MIN_SIZE_IN_OPTIMAL)}]. SPLIT_PUNT=[${(LINE_SPLIT_OPTIONS.SPLIT_PUNT.includes(word[word.length - 1]))}]`);
                    i++;
                    lineLength = 0;
                } else {
                    lineLength ++;
                }

                lines[i] = lines[i] || [];
                lines[i].push(word);
                lineLength += (word.length + 1);
            });

            res.push(lines.map((line) => {
                return line.join(" ");
            }));
        } else {
            res.push(s);
        }
    });

    return res;
}


class History {
    constructor(txt) {
        this.data = txt.split(' ').map((w,i ) => [w, i, false, [[w]]]);
        this.active = this.data;
    }

    updateMultiple = (previous, current = []) => {
        for (let tokens of previous) {
            for (let token of tokens.split(' ')) {
                for (const entry of this.data) {
                    if (entry[0] === token) {
                        entry[3].push(current);
                        if (current.length === 0) {
                            entry[2] = true;
                        }
                    }
                }
            }
        }
    }

    update = (previous, current = "") => {
        // remove space in the end if exist
        let word = previous.trim();
        current = current.trim();
        for (const entry of this.data) {
            if (entry[3][entry[3].length-1][0] === word) {
                entry[3].push(current.split(" "));
                if (current === "") {
                    entry[2] = true;
                }
                return true;
            }
        }
        return false;
    }

    remove = (previous) => {
        this.updateMultiple(previous, []);
    }

    getActive = () => {
        return this.data.filter(entry => entry[2] === false);
    }

    clean = () => {
        for (let entry of this.data) {
            let i = entry[3].length-1;
            let current = entry[3][i];
            if (current.length === 0 || current === '' || current === ' ' ) {
                entry[2] = true;
            }
        }
    }

    updateActivePos = (detected = [], processed, info, remove=false) => {
        this.active = this.getActive();
        const pos = this.pos(detected.map((v) => [v[0], v[1]]), processed);
        let counter = 0, indexCounter = 0;
        for (let entry of this.active) {
            let current = entry[3][entry[3].length-1];
            for (let j = 0; j<current.length; j++) {
                if (counter === pos[indexCounter]) {
                    if (remove === false) {
                        // replace the word by another
                        let n = [...entry[3][this.data[entry[1]][3].length - 1]];
                        n[j] = info[indexCounter];
                        entry[3].push(n);
                    } else {
                        // remove the word
                        entry[3].push(['']);
                        entry[2] = true;
                    }
                    indexCounter++;
                }
                counter++;
            }

        }
    }

    updateActive = (processed) => {
        this.clean();
        this.active = this.getActive();
        let counter = 0;
        for (let j = 0; j<this.active.length; j++) {
            const words = this.active[j][3][this.active[j][3].length-1];
            let update = [];
            for (let word of words) {
                if (word !== '') {
                    update.push (processed[counter]);
                    counter++;
                }
            }
            this.active[j][3].push(update);
        }
    }

    updateLemmas = (pLemmas = [], pTokens = [], txt) => {
        this.active = this.getActive();
        let counter = 0, currentWord= 0;
        let _raw = [];

        for (let i=0; i<pLemmas.length; i++) {
            for (let j=0; j<pTokens[i].length; j++) {
                // for saving in history purposes
                // lemma, raw, position on sentences array
                _raw.push([pLemmas[i][j], pTokens[i][j], [i,j]]);
            }
        }

        let saved = [];

        for (let w = 0; w<_raw.length; w++) {
            let word = _raw[w];
            // DEBUG
            // console.log ("history", this.data[counter], "active", this.active[counter], "counter", counter);

            const entry = this.active[counter][3][this.active[counter][3].length - 1];
            if (entry.length === 1) {
                if (word[1] === entry[0]) {
                    // const id = this.active[counter][1];
                    this.active[counter][3].push([word[0]]);
                    counter++;
                } else if ((this.active.length-1) > (counter+1)) {
                    const next = counter + 1;
                    const nextEntry = this.active[next][3][this.active[next][3].length - 1];
                    if (nextEntry !== undefined && _raw[w+1] !== undefined) {
                        if (_raw[w+1][1] === nextEntry[0]) {
                            // const id = this.active[counter][1];
                            this.active[counter][3].push(saved);
                            saved = [];
                            counter++;
                        }
                    }
                }
            } else {
                saved.push(word[0]);
                if (saved.length === entry.length) {
                    this.active[counter][3].push(saved);
                    saved = [];
                    counter++;
                }
            }
        }

    }

    pos = (arr = [0,0], processed) => {
        const out = [];
        for (let a of arr) {
            let current = 0;
            if (a[0] === 0) {
                current = a[1];
            } else if (a[0] > 0) {
                for (let i=0; i<a[0]; i++) {
                    current += processed.sentences[i].tokens.length;
                }
                current += a[1];
            }
            out.push(current);
        }
        return out;
    }

    removeBasedOnMap = (map) => {
        this.active = this.getActive();
        let counter = 0;
        for (let entry of this.active) {
            let current = entry[3][entry[3].length-1];
            let toRemove = [];
            for (let word of current) {
                toRemove.push(map[counter]);
                counter++;
            }
            let arr = [];
            for (let index in toRemove) {
                const pos = toRemove[index];
                if (pos === true) {
                    arr.push(current[index]);
                }
            }
            entry[3].push(arr);
            if (arr.length === 0) {
                entry[2] = true;
            }
        }
    }

    log = () => {
        for (let entry of this.data) {
            console.log (`raw="${entry[0]}`, `deleted=${entry[2]}`, entry[3], `(length:${entry[3].length})}`);
            // console.log(`entry no. ${entry[1]}: {raw="${entry[0]}" deleted=${entry[2]} history=[${entry[3]}] (length:${entry[3].length})}`);
        }
    }

    get = () => {
        return this.data;
    }
}



// MAIN
setup('ac48b690-793a-4426-8ae7-6624f3f0890e');
let text = "(o meu nome é Tiago) Eu sou uma pessoa como cada um de nós, portanto sou diferente de cada um de nós. O que me torna diferente, para além do meu aspecto, por não ter nenhum irmão gémeo, é o gosto de abraçar o inesperado, de saber-me não preparado para este mas ao mesmo tempo disfrutar do que este me traz. Nisto entram aventuras, entram viagens, entram amizades, entram oportunidades para ajudar e colaborar plo bem comum. Uma vontade de se tornar todos iguais na ajuda, também me faz diferente. Sou também uma pessoa individual, uma pessoa independente, ignorando às vezes os toques e as sensibilidades normais, assim, ser uma pessoa diferente é ser único, onde essa unidade faz a diferença pois nos completa a todos.";
let lang = 'pt';
let no = 11;

classification(text, lang).then((result) => {
    FS.writeFileSync(`/Users/srebelo/Desktop/text-${no}-${lang}.json`, JSON.stringify(text));
    FS.writeFileSync(`/Users/srebelo/Desktop/classification-${no}.json`,  JSON.stringify(result));
    console.log (result);
});

lexicon(text, lang).then((result) => {
    console.log (`lexicon=${result.emotions.predominant.emotion}`);
    FS.writeFileSync(`/Users/srebelo/Desktop/lexicon-${no}.json`,  JSON.stringify(result));
});


module.exports = {
    setup, classification, lexicon
};