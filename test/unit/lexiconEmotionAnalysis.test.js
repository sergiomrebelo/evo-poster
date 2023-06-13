import {config, lexicon} from "../../src/@evoposter/nlp/src/lexicon-emotion-analysis/lexicon-emotion-analysis.mjs";
import {lexiconGlobalResults} from "../../src/@evoposter/nlp/src/utils/utils.mjs";
import tokenizer from "../../src/@evoposter/nlp/src/sentence-tokeniser/sentence-tokeniser.mjs";

import dotenv from "dotenv";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const number = 5;
import sentences from "../testing-text.js";
import {classification} from "../../src/@evoposter/nlp/src/ml-emotion-analysis/ml-emotion-analysis.mjs";

dotenv.config({
    debug: true,
    path: `${__dirname}/../../.env`
});


describe(`Test for Lexicon classifier unit`, () => {
    describe(`Lexicon classifier test`, () => {
        config(process.env.MW_API_KEY, process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL).then(async () => {
            for (let sentence of sentences) {
                test(`Given ${sentence.text}, return the following lexicon`, async () => {
                    let attempts = [];
                    for (let i=0; i<number; i++) {
                        let t = await tokenizer(sentence.text);
                        t = t.flat();
                        let global = [];
                        for (let j in t) {
                            let line = t[j];
                            await lexicon(line, sentence.lang).then((res) => {
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
                    // console.log (Object.keys(predominant));
                    expect(Object.keys(predominant)[0]).toBe(sentence.lexicon.global[0]);
                }, 60000);
            }
        });
    });
});
