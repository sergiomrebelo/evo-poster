import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import {setup, classification, lexicon} from "./nlp-utils/nlp_utils.mjs";
import * as NLP from "./nlp-utils/nlp_utils.mjs";

const APP = express();
const PORT = process.env.PORT || "8000";

dotenv.config();
APP.use(cors());
APP.use(express.json());
APP.use(express.urlencoded({extended: true}));
APP.use(express.static('public'));


APP.listen(PORT, () => {
    console.info(`👂at port ${PORT}`);
    setup(process.env.MW_API_KEY, process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL);
});

APP.get("/lines/:delimiter/:lang/:input/", async (req, res) => {
    const delimiter = req.params.delimiter;
    const text = req.params.input;
    const sentences = text.split(delimiter);
    const lang = req.params.lang;
    const results = await analysis(text, lang, sentences);
    res.status(results[0]).send(JSON.stringify(results[1]));
});

APP.get("/text/:lang/:input", async (req, res) => {
    const text = req.params.input;
    const lang = req.params.lang;
    const results = await analysis(text, lang);
    res.status(results[0]).send(JSON.stringify(results[1]));
});

APP.get("*", (req, res) => {
    res.status(404).send(errHandler(404, `Error in invocation of API: /${req.url}`));
});


const errHandler = (code, msg) => {
    return {
        'success': false,
        'message': `${msg} (code ${code})`
    }
}

const _lexiconGlobalResults = async (sentences) => {

    // compute global lexicon value
    let emotions = {};
    for (let i in sentences) {
        const current = sentences[i].emotions.data.recognisedEmotions;
        for (let e of current) {
            const name = e[0];
            if (Object.keys(emotions).includes(name)) {
                emotions[name] = emotions[name] + e[1];
            } else {
                emotions[name] = e[1];
            }
        }
    }

    let res = Object.entries(emotions).sort(([,a],[,b]) => b-a);

    return res.length === 0 ? [['neutral', 1]] : res;
}

const analysis = async (text, lang, sentences = []) => {
    // classification analysis
    const classificationResults = await classification(text, lang);
    if (!classificationResults.success) return [500, errHandler(500, `Error in the classification method`)];

    // sentence tokenizer (if necessary)
    if (sentences.length === 0) sentences = (await NLP.sentenceTokenizer(text)).flat();

    // lexicon-based analysis
    let lexiconResults = { "global": null, "sentences": [] };
    for (const sentence of sentences) {
        const res = await NLP.lexicon(sentence, lang, false);
        lexiconResults.sentences.push(res);
        console.log(res);
        if (!res.success) return [500, errHandler(500, `Error in the lexicon-based method (msg: ${res.msg})`)];;
    }
    // global lexicon-based result
    lexiconResults.global = await _lexiconGlobalResults(lexiconResults.sentences);

    return [200, {
        success: true,
        sentences: sentences,
        automatic: true,
        text: text,
        lang: lang,
        classification: classificationResults,
        lexicon: lexiconResults
    }];
}
