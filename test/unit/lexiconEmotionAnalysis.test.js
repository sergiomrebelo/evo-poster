import {config, lexicon} from "../../src/@evoposter/nlp/src/lexicon-emotion-analysis/lexicon-emotion-analysis.mjs";
import {lexiconGlobalResults} from "../../src/@evoposter/nlp/src/utils/utils.mjs";
import tokenizer from "../../src/@evoposter/nlp/src/sentence-tokeniser/sentence-tokeniser.mjs";

import dotenv from "dotenv";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const number = 5;
const wordDif = 5;
import sentences from "../testing-text.js";
import {classification} from "../../src/@evoposter/nlp/src/ml-emotion-analysis/ml-emotion-analysis.mjs";

dotenv.config({
    debug: true,
    path: `${__dirname}/../../.env`
});


describe(`Test for Lexicon classifier unit`, () => {
    describe(`Lexicon classifier test`, () => {
        config(process.env.MW_API_KEY, process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL).then(() => {
            for (let sentence of sentences) {
                test(`Given ${sentence.text}, return the following classification`, async () => {
                    for (let i = 0; i < number; i++) {
                        let t = await tokenizer(sentence.text);
                        t = t.flat();
                        const global = [];
                        let maxW = Number.MIN_VALUE, content = "";
                        const similar = sentence.sentenceNumber === t.length;
                        for (let i in t) {
                            let line = t[i];
                            await lexicon(line, sentence.lang).then((res) => {
                                global.push(res);
                                if (res.emotions.data.recognisedEmotions.length > 0) {
                                    if (res.emotions.data.recognisedEmotions[0][1] > maxW) {
                                        maxW = res.emotions.data.recognisedEmotions[0][1];
                                        content = line;
                                    }
                                }
                            });
                            const gRes = await lexiconGlobalResults(global);

                            // depends on the division
                            // if (similar) expect(gRes[0]).toBe(sentence.lexicon.global);
                            if (content !== "" && sentence.mostImportantPart !== "") {
                                const dif = checkWords(content, sentence.mostImportantPart);
                                expect(dif).toBeLessThan(wordDif);

                            }
                        }
                    }
                });
            }
        });
    });
});


const checkWords = (o, n) => {
    o = o.split(" ");
    n = n[0].split(" ");
    const result = n.filter((s) => !o.some((str) => str.includes(s)));
    return o.length - result.length;
}
