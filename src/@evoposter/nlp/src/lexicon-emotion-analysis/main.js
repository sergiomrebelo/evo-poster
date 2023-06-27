import dotenv from 'dotenv';
import {fileURLToPath} from "url";
import {dirname} from "path";
import {config, lexicon} from "./lexicon-emotion-analysis.mjs";
import * as tokenizer from "../sentence-tokeniser/sentence-tokeniser.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {lexiconGlobalResults} from "../utils/utils.mjs";

dotenv.config({
    debug: true,
    path: `${__dirname}/../../.env`
});


const lang = `en`;
const txt = `RT @sergiomrebelo: ❌ @cdv.lab Usually, one has to grab ¶ an https://sergiorebelo.work image from a server (either localhost or a remote one) ¶ in order @cdv.lab @sergimrebelo to get 🧑‍💻past $ the https://www2.sergiorebelo.work SameOrigin policy. Error checking is minimal - ¶ i.e, you can select a text/video/whatever file and ¶ the code will still attempt $ to load it and set its ¶ contents to be the data used to $ construct a dataURI ¶ for an image element. #testing #testing2`;
const number = 5;
import sentences from "../../../../../test/testing-text.js";

config(process.env.MW_API_KEY, process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL).then(async () => {
    for (let sentence of sentences) {
        let attempts = [];
        for (let i=0; i<number; i++) {
            let t = await tokenizer.default(sentence.text);
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

        console.log(`attempts`, predominant, Object.keys(predominant)[0], sentence.lexicon.global);
    }
});