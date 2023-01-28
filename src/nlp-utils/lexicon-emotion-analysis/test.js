import dotenv from 'dotenv';
import {fileURLToPath} from "url";
import {dirname} from "path";
import {config, lexicon} from "./lexicon-emotion-analysis.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lang = `pt`;
// const txt = `❤️ :) Usually, one has to grab ¶ an image from a server (either localhost or a remote one) ¶ in order to get past $ the SameOrigin policy. Error checking is minimal - ¶ i.e, you can select a text/video/whatever file and ¶ the code will still attempt $ to load it and set its ¶ contents to be the data used to $ construct a dataURI ¶ for an image element.`;
const txt = ":) <4 As saudades que eu já tenho da minha alegre casinha ❤️";


dotenv.config({
    debug: true,
    path: `${__dirname}/../.env`
});

config(process.env.LANGUAGE_TRANSLATOR_URL, process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL).then(() => {
   lexicon(txt, lang).then((res) => {
       console.log (res);
   })
});

