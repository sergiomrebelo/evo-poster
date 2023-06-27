import {config, lexicon} from "../../src/@evoposter/nlp/src/lexicon-emotion-analysis/lexicon-emotion-analysis.mjs";
import {lexiconGlobalResults} from "../../src/@evoposter/nlp/src/utils/utils.mjs";

import dotenv from "dotenv";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const number = 5;
import sentences from "../testing-text.js";

dotenv.config({
    debug: true,
    path: `${__dirname}/../../.env`
});


describe(`Test for Lexicon classifier unit`, () => {
    describe(`Lexicon classifier test`, () => {
        config(process.env.MW_API_KEY, process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL).then(async () => {
            for (let sentence of sentences) {
                test(`Given ${sentence["text"]}, return the following lexicon`, async () => {
                    let attempts = [];
                    for (let i=0; i<number; i++) {
                        // mocking translate function, directly using the translated text
                        let t = sentence["lines"];
                        let global = [];
                        for (let j in t) {
                            let line = t[j];
                            await lexicon(line, "en").then((res) => {
                                global.push(res);
                            });
                        }
                        const globalResult = await lexiconGlobalResults(global);
                        attempts.push(globalResult);
                    }
                    const predominant = {};
                    for (let a of attempts) {
                        if (predominant[a[0][0]] === undefined) predominant[a[0][0]] = ( a[0][1] / number);
                        else predominant[a[0][0]] = predominant[a[0][0]] + ( a[0][1] / number);
                    }
                    expect(Object.keys(predominant)[0]).toBe(sentence["lexicon"]["global"][0]);
                }, 60000);
            }
        });
    });
});
