import {config, classification} from "../../src/@evoposter/nlp/src/ml-emotion-analysis/ml-emotion-analysis.mjs";
import dotenv from "dotenv";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const number = 100;
import sentences from "../testing-text.js";
import sentenceTokenizer from "../../src/@evoposter/nlp/src/sentence-tokeniser/sentence-tokeniser.mjs";
import * as params from "../../src/@evoposter/nlp/data/default-line-split-params.cjs";


dotenv.config({
    debug: true,
    path: `${__dirname}/../../.env`
});


describe(`Test for Machine Learning classifier unit`, () => {
    describe(`Sentence ML classifier test (times: ${number})`, () => {
        config(process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL).then( async (res) => {
            for (let sentence of sentences) {
                for (let i=0; i<number; i++) {
                    test(`Given ${sentence.text}, return the following classification`, () => {
                        classification(sentence.text, sentence.lang).then((res) => {
                            const val = res.emotions.data.predominant;
                            expect(val.emotion).toBe(sentence.classification[0]);
                            expect(val.weight).toBe(sentence.classification[1]);
                        });
                    });
                }
            }
        });
    });
});




