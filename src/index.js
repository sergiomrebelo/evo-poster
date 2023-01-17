import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import {setup, classification, lexicon} from "./nlp-utils/nlp_utils.mjs";

const APP = express();
const PORT = process.env.PORT || "8000";

dotenv.config();
APP.use(cors());
APP.use(express.json());
APP.use(express.urlencoded({extended: true}));
APP.use(express.static('public'));


APP.listen(PORT, () => {
    console.log(`👂  at port ${PORT}`);
    setup(process.env.MW_API_KEY, process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL);
});

APP.get("/lines/:lang/:delimiter/:input/", async (req, res) => {
    // TEXTING URL
    // http://localhost:8000/lines/en/$/This behavior is not$tolerable at all I wish I$could do something about it.$I%E2%80%99m really very angry%22
    const delimiter = req.params.delimiter;
    const text = req.params.input;
    const lang = req.params.lang;
    const results = await lineAnalysis(text, lang, delimiter);
    res.status(200).send(JSON.stringify(results));
});

APP.get("/text/:input", async (req, res) => {
    // TEXTING URL
    // http://localhost:8000/text/This behavior is not tolerable at all I wish I could do something about it.I'm really very angry
    const text = req.params.input;
    const results = await globalAnalysis(text, `en`);
    res.status(200).send(JSON.stringify(results));
});

APP.get("/text/:lang/:input", async (req, res) => {
    // TEXTING URL
    // http://localhost:8000/en/text/This behavior is not tolerable at all I wish I could do something about it.I'm really very angry
    const text = req.params.input;
    const lang = req.params.lang;
    const results = await globalAnalysis(text, lang);
    res.status(200).send(JSON.stringify(results));
});

APP.get("*", (req, res) => {
    res.status(404).send(`page not found!`);
});


/**
 * divide and  analyse a text
 *
 * @param text : raw text
 * @param lang : text language
 */
const globalAnalysis = async (text, lang) => {
    const classificationResults = await classification(text, lang);
    const lexiconResults = await lexicon(text, lang, true);

    return {
        'success': false,
        'automatic': true,
        'text': text,
        'lang': lang,
        'sentences': lexiconResults.sentences,
        'classification': classificationResults,
        'emotionsByLine': lexiconResults.lineAnalysis,
        'lexicon': lexiconResults
    }
}

/**
 * emotionally analyse a text previously divided by lines
 *
 * @param text : raw text
 * @param lang : text language
 * @param delimiter : line delimiter
 */
const lineAnalysis = async (text, lang = "en", delimiter = "&") => {
    const splitText = text.split(delimiter);
    const longText = text.replaceAll(delimiter, ` `);

    const classificationResults = await classification(longText, lang);
    let emotionsByLine = [];
    for (let line of splitText) {
        const lexiconResults = await lexicon(line);
        if (lexiconResults.success) {
            emotionsByLine.push({
                'number': lexiconResults.emotions.recognisedEmotions.length,
                'emotions': lexiconResults.emotions.recognisedEmotions,
                'mostInfluentialToken': Object.keys(lexiconResults.mostInfluentialToken.originalWord).length === 0 ? "" : lexiconResults.mostInfluentialToken.originalWord,
                'relatedTokens': lexiconResults.wordEmotionsRelation
            });
        }
    }

    return {
        'success': true,
        'automatic': false,
        'text': longText,
        'lang': lang,
        'sentences': splitText,
        'classification': classificationResults,
        'emotionsByLine': emotionsByLine,
        'lexicon': {
            'success': false
        }
    }
}
