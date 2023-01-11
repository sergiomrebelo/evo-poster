const EXPRESS = require("express");
const PATH = require("path");
const FS = require("fs");
const CORS = require('cors');
const NLP = require('./nlp_utils');


const APP = EXPRESS();
const PORT = process.env.PORT || "8000";

APP.use(CORS());

APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));

APP.use(EXPRESS.static('public'));

APP.listen(PORT, () => {
    console.log(`👂application running at port ${PORT}`);
    NLP.setup(process.env.MW_API_KEY);
});

APP.get("/lines/:lang/:delimiter/:input/", async (req, res) => {
    const delimiter = req.params.delimiter;
    const text = req.params.input;
    const lang = req.params.lang;
    const results = await lineAnalysis (text, lang, delimiter);

    res.status(200).send(JSON.stringify(results));
});

APP.get("/text/:input", async (req, res) => {
    const text = req.params.input;
    const results = await globalAnalysis(text, `en`);

    res.status(200).send(JSON.stringify(results));
});

APP.get("/text/:lang/:input", async (req, res) => {
   const text = req.params.input;
   const lang = req.params.lang;
   const results = await globalAnalysis(text, lang);

   res.status(200).send(JSON.stringify(results));
});

/*APP.get("*", (req, res) => {
    res.status(404).send(`page not found!`);
});*/

const globalAnalysis = async (text, lang) => {
    const classification = await NLP.classification(text, lang);
    const lexicon = await NLP.lexicon(text, lang, true);

    // create line analysis
    let emotionsByLine = [];
    if (lexicon.success) {
        let c = 0;
        for (let sentence of lexicon.mostInfluentialTokenPerLine) {
            for (let line of sentence) {
                let emotions = {
                    "number": 0,
                    "emotions": [],
                    "mostInfluentialToken": "",
                    "relatedTokens": []
                };
                // HERE
                let lineEmo = [];
                let relatedTokens = {};
                for (let w of line) {
                    for (let emo of Object.keys(lexicon.wordEmotionsRelation)) {
                        for (let word of lexicon.wordEmotionsRelation[emo]) {
                            if (w === word[0]) {
                                // emotions by line
                                const availableKeys = [...lineEmo].map((x) => x[0]);
                                const index = availableKeys.indexOf(emo);
                                if (index === -1) {
                                    lineEmo.push([emo, word[1], 1]);
                                } else {
                                    lineEmo[index][1] += word[1];
                                }
                                // emotionally related tokens by line
                                if (relatedTokens[emo] === undefined) {
                                    relatedTokens[emo] = [];
                                }
                                relatedTokens[emo].push([word[0], word[1]]);
                            }
                        }
                    }
                }
                emotions.emotions.push(lineEmo);
                emotions.relatedTokens.push(relatedTokens);
                emotions.mostInfluentialToken = lexicon.mostInfluentialTokenPerLine.flat()[c].length > 0 ? lexicon.mostInfluentialTokenPerLine.flat()[c][0] : "";
                emotions.number = lexicon.mostInfluentialTokenPerLine.flat()[c].length;
                emotionsByLine.push(emotions);
                c++;
            }
        }
        // normalise values;
        for (let s of emotionsByLine) {
            for (let line of s.emotions) {
                if (line.length > 0) {
                    let sum = line.map((x) => x[1]).reduce((a, b) => {
                        return a + b
                    });
                    sum = Math.round(sum * 100) / 100;
                    line.forEach((e) => {
                        e[2] = Math.round((e[1] / sum) * 100) / 100;
                    });
                }
            }
        }
    }

    return {
        'success': false,
        'automatic': true,
        'text': text,
        'lang': lang,
        'sentences': lexicon._raw._analysis.sentences.flat(),
        'classification':classification,
        'emotionsByLine': emotionsByLine,
        'lexicon': lexicon
    }
}

/**
 * emotionally analyse a text previously divided by lines
 *
 * @param text : raw text
 * @param lang : text language
 * @param delimiter : line delimiter
 * @returns {Promise<{success: boolean, sentences: *, automatic: boolean, text: *, emotionsByLine: *[], lang: string, classification: ({success: boolean}|{emojis: [], urls: [], emotions: null, hashtags: [], _raw: {_translateResults: *, _workingTxt: string, _enText: *, _text: *, _analysis: null}, success: boolean, sentences: *, mentions: {mentions: [], working: []}, text: *, lang: string, rawTxt: *, RTInfo: RegExp|[]}), lexicon: {success: boolean}}>}
 */
const lineAnalysis = async (text, lang = "en", delimiter= "&") => {
    const splitText = text.split(delimiter);
    const longText = text.replace(/&/g, ` `);

    const classification = await NLP.classification(longText, lang);

    let emotionsByLine = [];
    for (let line of splitText) {
        const lexicon = await NLP.lexicon(line);
        if (lexicon.success) {
            emotionsByLine.push({
                'number': lexicon.emotions.recognisedEmotions.length,
                'emotions': lexicon.emotions.recognisedEmotions,
                'mostInfluentialToken': lexicon.mostInfluentialToken.originalWord,
                'relatedTokens': lexicon.wordEmotionsRelation
            });
        }
    }

    return {
        'success': true,
        'automatic': false,
        'text': longText,
        'lang': lang,
        'sentences': splitText,
        'classification': classification,
        'emotionsByLine': emotionsByLine,
        'lexicon': {
            'success': false
        }
    }
}
