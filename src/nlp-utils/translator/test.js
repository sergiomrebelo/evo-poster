import dotenv from 'dotenv';
import {setup, translate} from "./translator.mjs";
import {fileURLToPath} from "url";
import {dirname} from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
    debug: true,
    path: `${__dirname}/../.env`
});

const txt = "as saudades que eu já tenho da minha alegre casinha";
setup(process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL).then(() => {
    translate(txt, "pt").then((res) => {
        console.log(res);
    }).catch((err) => {
        console.error (err);
    });
}).catch((err) => {
    console.log(err);
})
