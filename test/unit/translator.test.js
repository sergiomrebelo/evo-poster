import sentences from "../testing-text.js";
import {setup, translate} from "../../src/@evoposter/nlp/src/translator/translator.mjs";
import dotenv from "dotenv";
import {fileURLToPath} from "url";
import {dirname} from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const number = 5;


dotenv.config({
    debug: true,
    path: `${__dirname}/../../.env`
});

describe(`Test for Translator unit`, () => {
    describe(`Translator unit tested ${number} times`, () => {
        for (let sentence of sentences) {
            test(`Given sentence ${sentence.text} (lang ${sentence.lang}`, async () => {
                const gatheredOutputs = [];
                let wordCount = 0, firstWordCount = null;
                let charCount =0, firstCharCount = null;
                if (sentence.lang !== `en`) {
                    await setup(process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL);
                    for (let i=0; i<number; i++) {
                        let res = await translate(sentence.text, sentence.lang);
                        res = JSON.parse(res);
                        const translatedText = res.translations[0].translation;
                        if (!gatheredOutputs.includes(translatedText)) {
                            gatheredOutputs.push(translatedText);
                        }
                        if (firstCharCount === null) firstCharCount = parseInt(res["character_count"]);
                        if (firstWordCount === null) firstWordCount = parseInt(res["word_count"]);

                        charCount += parseInt(res["character_count"]);
                        wordCount += parseInt(res["word_count"]);
                    }
                    charCount /= number;
                    wordCount /= number;
                } else {
                    gatheredOutputs.push (null);
                    firstWordCount = 0;
                    firstCharCount = 0;
                }

                expect(gatheredOutputs.length).toBe(1);
                expect(wordCount).toBe(firstWordCount);
                expect(charCount).toBe(firstCharCount);
            });
        }
    });
});