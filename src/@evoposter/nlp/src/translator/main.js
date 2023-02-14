import dotenv from 'dotenv';
import {setup, translate} from "./translator.mjs";
import {fileURLToPath} from "url";
import {dirname} from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import sentences from "../../../../../test/testing-text.js";

dotenv.config({
    debug: true,
    path: `${__dirname}/../../.env`
});

const number = 3;


const test = async () => {
    for (let sentence of sentences) {
        if (sentence.lang !== `en`) {
            setup(process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL).then( async () => {
                const outputs = [];
                let wordCount = 0, firstWordCount = null;
                let firstCharCount = null, charCount =0;
                for (let i=0; i<number; i++) {
                    await translate(sentence.text, "pt").then((res) => {
                        res = JSON.parse(res);
                        const translatedText = res.translations[0].translation;
                        if (!outputs.includes(translatedText)) {
                            outputs.push(translatedText);
                        }

                        if (firstCharCount === null) firstCharCount = parseInt(res["character_count"]);
                        if (firstWordCount === null) firstWordCount = parseInt(res["word_count"]);

                        charCount += parseInt(res["character_count"]);
                        wordCount += parseInt(res["word_count"]);

                    }).catch((err) => {
                        console.error(err);
                    });
                }
                charCount /= number;
                wordCount /= number;

                console.log (`words. first=${firstWordCount}. mean=${wordCount}`);
                console.log (`char. first=${firstCharCount}. mean=${charCount}`);
                console.log(outputs.length);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}

test();



