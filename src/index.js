const EXPRESS = require("express");
const PATH = require("path");
const FS = require("fs");
const CORS = require('cors');
const NLP = require('./nlp_utils');


const APP = EXPRESS();
const PORT = process.env.PORT || "8000";

APP.use(CORS());

APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));

APP.use(EXPRESS.static('public'));

APP.listen(PORT, () => {
    console.log(`👂application running at port ${PORT}`);
    NLP.setup(process.env.MW_API_KEY);
});

APP.get("/text/:input", async (req, res) => {
    const text = req.params.input;
    const results = await analyse(text, `en`);

    res.status(200).send(JSON.stringify(results));
});

APP.get("/text/:lang/:input", async (req, res) => {
   const text = req.params.input;
   const lang = req.params.lang;
   const results = await analyse(text, lang);

   res.status(200).send(JSON.stringify(results));
});

/*APP.get("*", (req, res) => {
    res.status(404).send(`page not found!`);
});*/




const analyse = async (text, lang) => {
    const classification = await NLP.classification(text, lang);
    const lexicon = await NLP.lexicon(text, lang);

    return {
        'classification':classification,
        'lexicon': lexicon
    }
}