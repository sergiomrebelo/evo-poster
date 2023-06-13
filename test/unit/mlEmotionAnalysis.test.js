import {config, classification} from "../../src/@evoposter/nlp/src/ml-emotion-analysis/ml-emotion-analysis.mjs";
import dotenv from "dotenv";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const number = 5;
import sentences from "../testing-text.js";
import sentenceTokenizer from "../../src/@evoposter/nlp/src/sentence-tokeniser/sentence-tokeniser.mjs";
import * as params from "../../src/@evoposter/nlp/data/default-line-split-params.cjs";


dotenv.config({
    debug: true,
    path: `${__dirname}/../../.env`
});


describe(`Test for Machine Learning classifier unit`, () => {
    describe(`Sentence ML classifier test (times: ${number})`, () => {
        config(process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL).then(async (res) => {
            for (let sentence of sentences) {
                test(`Given ${sentence.text}, return the following classification`, async () => {
                    const emotions = [];
                    let score = 0;
                    for (let i = 0; i < number; i++) {
                        await classification(sentence.text, sentence.lang).then((res) => {
                            const val = res.emotions.data.predominant;
                            emotions.push(val.emotion);
                            score += parseFloat(val.weight);
                        });
                    }

                    score = score / number;

                    const unique = emotions.filter((value, index, array) => array.indexOf(value) === index);

                    emotions.filter((value, index, array) => array.indexOf(value) === index);
                    expect(unique[0]).toBe(sentence.classification[0]);
                    expect(unique.length).toBe(1);
                    expect(score).toBe(sentence.classification[1]);
                }, 60000);
            }
        });
    });
});




