import dotenv from 'dotenv';
import {fileURLToPath} from "url";
import {dirname} from "path";
import {config, lexicon} from "./lexicon-emotion-analysis.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lang = `en`;
const txt = `RT @sergiomrebelo: ❌ @cdv.lab Usually, one has to grab ¶ an https://sergiorebelo.work image from a server (either localhost or a remote one) ¶ in order @cdv.lab @sergimrebelo to get 🧑‍💻past $ the https://www2.sergiorebelo.work SameOrigin policy. Error checking is minimal - ¶ i.e, you can select a text/video/whatever file and ¶ the code will still attempt $ to load it and set its ¶ contents to be the data used to $ construct a dataURI ¶ for an image element. #testing #testing2`;
// const txt = ":) <4 As saudades que eu já tenho da minha alegre casinha ❤️";


dotenv.config({
    debug: true,
    path: `${__dirname}/../.env`
});

config(process.env.LANGUAGE_TRANSLATOR_URL, process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL).then(() => {
   lexicon(txt, lang).then((res) => {
       console.log (JSON.stringify(res._raw._history));
   })
});

