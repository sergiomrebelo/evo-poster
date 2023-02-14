/**
 * Lexicon-based emotion analysis
 * Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * srebelo[at]dei.uc.pt
 *
 * v1.0.0 August 2021 (as part of NLP_utils toolkit)
 * v1.1.0 December 2021 (as part of NLP_utils toolkit)
 * v1.2.1 January 2023 (as part of NLP_utils toolkit)
 * v1.3.0
 */

import * as normaliser from "en-norm";
import * as Fin from "finnlp";
import "fin-negation";
import "fin-urls";

import History from './History.js';
import * as TweetInfo from "../utils/TweetToolkit.mjs";
import {setup, isLangAvailable, translate} from "../translator/translator.mjs";
import {params, rm, mostPresentEmotion} from '../utils/utils.mjs'

// stop words lexicon
import * as _sw from '../../data/en.cjs';
// slang lexicon (only in EN)
import * as _slang from '../../data/slang.cjs';
// emoticons lexicon
import * as _emoticons from '../../data/emoticons.cjs';
// lexicon
import * as _lexicon from '../../data/NRC-Emotion-Intensity-Lexicon-v1_1618414260694.cjs';

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// params
let _dictApiKey = null; // dictionary API key
let _isConfig = false;


export const config = async (dict = null, key = null, serviceURL) => {
    console.info (`👋`);
    console.info(`Configuring Lexicon-Emotion-Analysis (nlp-utils)`)
    _dictApiKey = dict;

    return new Promise((resolve) => {
        setup(key, serviceURL).then(() => {
            console.info(`✅ translator `)
            _isConfig = true;
            resolve(true);
        }).catch((err) => {
            console.error(`❌ translator not set up at nlp-utils (ML-Emotion-analysis)  ${err} ❌`)
        });
    });
}

export const lexicon = async (txt, lang = 'en') => {
    // check if the library is config
    try {
        isConfig();
    } catch (e) {
        console.error(e);
    }

    lang = isLangAvailable(lang);

    const tokens = await _preprocessing(txt, lang);

    if (!tokens.success) {
        console.error (`❌ not possible to preprocess the text`);
        return {success: false, msg: tokens.message};
    }

    const neutralTokens = [], results = {}, influencingWords = {};

    for (let token of tokens.tokens) {
        let res = _lexicon.default[token];
        if (res) {
            influencingWords[token] = res;
            for (let key of Object.keys(res)){
                if(!results[key]) {
                    results[key] = 0.0;
                }
                results[key] += parseFloat(res[key]);
            }
        } else {
            neutralTokens.push(token);
        }
    }

    const emotionalData = mostPresentEmotion(results, params.MIN_EMOTION_LEXICON);
    const wordEmotionRelation = _relationWordsEmotions(results, influencingWords);

    let mostInfluentialToken = wordEmotionRelation[emotionalData.predominant.emotion] !== undefined ? wordEmotionRelation[emotionalData.predominant.emotion][0][0] : {};
    const objectIsEmpty = (mostInfluentialToken && Object.keys(mostInfluentialToken).length === 0 && mostInfluentialToken.constructor === Object);

    let mostInfluentialTokenDisplay = {
        rawToken: mostInfluentialToken,
        originalWord: mostInfluentialToken,
        display: mostInfluentialToken
    };

    // get original version of most influential token
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
            let translation = await translate(mostInfluentialTokenDisplay.originalWord, 'en', lang);
            translation = JSON.parse(translation);
            mostInfluentialTokenDisplay.display = translation.translations[0].translation;
        } catch (e) {
            console.warn (e);
        }
    }

    return {
        success: true,
        type: "lexicon",
        emotions: {
            data: emotionalData,
            tokens: {
                mostInfluential: mostInfluentialTokenDisplay,
                neutral: neutralTokens,
            },
            wordEmotionsRelation: wordEmotionRelation
        },
        text: txt,
        meta: {
            lang: tokens.lang,
            mentions: tokens.mentions,
            hashtags: tokens.hashtags,
            emojis: tokens.emojis,
            urls: tokens.urls,
        },
        _MIN_REG_EMOTION_THRESHOLD: params.MIN_EMOTION_LEXICON,
        _tokens: tokens.tokens,
        _raw: {
            _history: tokens.history,
            _analysis: tokens,
        }
    }

}

const isConfig = () => {
    if (!_isConfig) {
        throw new Error(`⚠️ Nlp-utils is not init! ⚠️`);
    }
}

const _preprocessing = async (txt, lang = 'en') => {
    let _rawTxt = txt; // raw text before pre-processing
    let _translateRawTxt = txt; // raw result after the translation
    let _translateResults = []; // translation results from the API
    txt = await rm (txt);

    // translate the sentence to en
    if (lang !== 'en') {
        try {
            _translateResults = await translate(txt, lang);
            _translateResults = JSON.parse(_translateResults);
            txt = _translateResults.translations[0].translation;
            _translateRawTxt = txt;
        } catch (err) {
            console.warn(`error on translation. err=${err}`);
            return {
                success: false,
                message: `error on translation. ${err}`
            }
        }
    }

    // normalise words
    // replace acute by apostrophe
    txt = txt.replace(/’/g, `'`);


    // create a history object to save the transformation in text
    const history = new History(txt);


    const tweetAnalyser = new TweetInfo.TweetToolkit (txt, _rawTxt, lang);
    // remove retweet data
    const rtInfo = tweetAnalyser.getReTweetData(true, history);
    // remove URLs (hardwired method)
    const urls = tweetAnalyser.getURLs(true, history);
    // remove of mentions
    const mentions = tweetAnalyser.getMentions(false, true, history)
    // remove hashtags
    const hashtags  = tweetAnalyser.getHashtags(false, true, history);
    // change the emojis to their meaning and save emojis information
    let emojis = await tweetAnalyser.getEmojis(true, false, history);

    txt = tweetAnalyser.getText();

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
        if (Object.keys(_emoticons.default).includes(tokens[i].toLowerCase())) {
            // update history
            history.update(tokens[i], _emoticons.default[tokens[i].toLowerCase()]);
            // change the emoticons for their meaning.
            tokens[i] = _emoticons.default[tokens[i].toLowerCase()];
        } else if (Object.keys(_slang.default).includes(tokens[i])) {
            // update history
            history.update(tokens[i], _slang.default[tokens[i]]);
            // change the short form words to their full form (slang)
            tokens[i] = _slang.default[tokens[i].toUpperCase()];
        }
    }

    txt = tokens.join(' ');


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

    // remove URLs (2nd method to handle with automatic method from finn NLP)
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
    history.updateActivePos(detected, processed, detected.map (() => []), true);

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
    const mapPuntEls = []

    // remove punctuations
    const puntExp = /[.,\/#!$%&;:{}=\-_`~()]/g;
    tokens = tokens.map((e) => {
        let hasPuntElements = e.match(puntExp);
        if (hasPuntElements !== null) {
            if (hasPuntElements.length === e.length) {
                mapPuntEls.push(false);
                return null;
            } else {
                mapPuntEls.push(true);
                return e;
            }
        } else {
            mapPuntEls.push(true);
            return e;
        }
    });

    history.removeBasedOnMap(mapPuntEls);

    tokens = tokens.filter(function(el) { return el; });

    return {
        success: true,
        tokens: tokens,
        text: _translateRawTxt,
        lang: lang,
        RTInfo: rtInfo,
        urls: urls,
        mentions: mentions,
        hashtags: hashtags,
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
    if (_dictApiKey === null) {
        console.error(`dictionaryApi.com key not valid`);
        return word;
    }

    const simpleTag = tag.charAt(0).toLowerCase();
    try {
        let response = await fetch(`https://dictionaryapi.com/api/v3/references/ithesaurus/json/${word}?key=${_dictApiKey}`);
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
        //
        // console.info(`address= https://dictionaryapi.com/api/v3/references/ithesaurus/json/${word}?key=${_dictApiKey}`);
        console.error(err);
        return word;
    }
}

const isStopWord = (token) => {
    return _sw.default.includes(token);
}

const _relationWordsEmotions = (results, influencingWords) => {
    const relation = {}, relationSortable = {};

    // get the most influencing words (in the whole and by emotion)
    // organise the results by emotion
    for (let emotion of Object.keys(results)) {
        relation[emotion] = {};
    }
    for (let word of Object.keys(influencingWords)){
        for (let emo of Object.keys(influencingWords[word])) {
            relation[emo][word] = influencingWords[word][emo];
        }
    }


    // sort the words inside each emotion
    for (let e of Object.keys(relation)) {
        let sortable = [];
        for (let word in relation[e]) {
            sortable.push([word,relation[e][word]]);
        }

        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });

        sortable = sortable.reverse();

        relationSortable[e] = sortable;
    }

    return relationSortable;
}