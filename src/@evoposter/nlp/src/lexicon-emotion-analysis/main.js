import dotenv from 'dotenv';
import {fileURLToPath} from "url";
import {dirname} from "path";
import {config, lexicon} from "./lexicon-emotion-analysis.mjs";
import * as tokenizer from "../sentence-tokeniser/sentence-tokeniser.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {lexiconGlobalResults} from "../utils/utils.mjs";

const lang = `en`;
const txt = `RT @sergiomrebelo: ❌ @cdv.lab Usually, one has to grab ¶ an https://sergiorebelo.work image from a server (either localhost or a remote one) ¶ in order @cdv.lab @sergimrebelo to get 🧑‍💻past $ the https://www2.sergiorebelo.work SameOrigin policy. Error checking is minimal - ¶ i.e, you can select a text/video/whatever file and ¶ the code will still attempt $ to load it and set its ¶ contents to be the data used to $ construct a dataURI ¶ for an image element. #testing #testing2`;
// const txt = ":) <4 As saudades que eu já tenho da minha alegre casinha ❤️";

import sentences from "../../../../../test/testing-text.js";


dotenv.config({
    debug: true,
    path: `${__dirname}/../../.env`
});

config(process.env.MW_API_KEY, process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY,  process.env.LANGUAGE_TRANSLATOR_URL).then( async () => {
   for (let sentence of sentences) {
       let t = await tokenizer.default(sentence.text);
        t = t.flat();
        const global = [];
       let maxW = Number.MIN_VALUE, content = "";
        for (let i in t) {
            let line = t[i];
            await lexicon(line, sentence.lang).then((res) => {
                // if line division is the same (or very similar)
                if (t.length === sentence.sentenceNumber) {
                    // expected console.log(res.emotions.data.predominant, sentence.lexicon.sentences[i]);
                }
                global.push(res);
                if (res.emotions.data.recognisedEmotions.length > 0) {
                    if (res.emotions.data.recognisedEmotions[0][1] > maxW) {
                        maxW = res.emotions.data.recognisedEmotions[0][1];
                        content = line;
                    }
                }
            });
        }
        const gRes = await lexiconGlobalResults(global);
        // expected
       console.log(`res=${gRes[0]}. saved=${sentence.lexicon.global}`);
       // mostImportantPart
       console.log (`max=${maxW}. content=${content}`);
        if (content !== "" && sentence.mostImportantPart !== "") {
            console.log (`content=${content}. mostImportantPart=${sentence.mostImportantPart}. dif=${checkWords(content, sentence.mostImportantPart)}`);
        }
   }
});


const checkWords = (o, n) => {
    o = o.split(" ");
    n = n[0].split(" ");
    const result = n.filter((s) => !o.some((str) => str.includes(s)));
    const dif = o.length - result.length;
    return dif;
}
