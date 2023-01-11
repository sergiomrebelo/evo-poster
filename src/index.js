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


/**
 * divide and  analyse a text
 *
 * @param text : raw text
 * @param lang : text language
 */
const globalAnalysis = async (text, lang) => {
    const classification = await NLP.classification(text, lang);
    const lexicon = await NLP.lexicon(text, lang, true);

    return {
        'success': false,
        'automatic': true,
        'text': text,
        'lang': lang,
        'sentences': lexicon._raw._analysis.sentences.flat(),
        'classification': classification,
        'emotionsByLine': lexicon.lineAnalysis,
        'lexicon': lexicon
    }
}

/**
 * emotionally analyse a text previously divided by lines
 *
 * @param text : raw text
 * @param lang : text language
 * @param delimiter : line delimiter
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
                'mostInfluentialToken': Object.keys(lexicon.mostInfluentialToken.originalWord).length === 0 ? "" : lexicon.mostInfluentialToken.originalWord,
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
