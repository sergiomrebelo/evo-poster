import dotenv from 'dotenv';
import {fileURLToPath} from "url";
import {dirname} from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
    debug: true,
    path: `${__dirname}/../../.env`
});


import {config, classification} from "./ml-emotion-analysis.mjs";
const lang = `pt`;
// const txt = `❤️ :) Usually, one has to grab ¶ an image from a server (either localhost or a remote one) ¶ in order to get past $ the SameOrigin policy. Error checking is minimal - ¶ i.e, you can select a text/video/whatever file and ¶ the code will still attempt $ to load it and set its ¶ contents to be the data used to $ construct a dataURI ¶ for an image element.`;
const txt = "RT @TwitterAPI: ) As saudades que eu já tenho da minha alegre casinha ❤️";


const number = 100;
import sentences from "../../../../../test/testing-text.js";

config(process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL).then((res) => {
    for (let sentence of sentences) {
        classification(sentence.text, sentence.lang).then((res) => {
            const val = res.emotions.data.predominant;
            console.log (`res=${val.emotion}. saved=${sentence.classification[0]}`);
            console.log (`res=${val.weight}. saved=${sentence.classification[1]}`);
        }).catch((err) => {
            console.error(err);
        })
    }
});

