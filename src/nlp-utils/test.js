import * as NLP from './nlp_utils.mjs';
import dotenv from 'dotenv';
dotenv.config();


const _evalClassification = async (text, lang) => {
   await NLP.setup(process.env.MW_API_KEY, process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL);
   await NLP.classification(text, lang).then((result) => {
      console.group(`${result.type}`)
      console.info(`text: ${text}`);
      const emo = result.emotions.data.recognisedEmotions;
      console.info(`predominant emotion: ${emo[0][0]} (${(emo[0][2]*100)}%)`);
      console.groupEnd();
   });
}


const _evalLexicon = async (text, lang) => {
   let analysis = { "global": null, "sentences": [] };
   const display = [];
   await NLP.setup(process.env.MW_API_KEY, process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL);
   const sentences = (await NLP.sentenceTokenizer(text)).flat();

   for (const sentence of sentences) {
      await NLP.lexicon(sentence, lang, false).then((result) => {
         display.push ({
            text: result.text,
            emotion: result.emotions.data.predominant.emotion,
            weight: result.emotions.data.predominant.weight,
            _tokens: result._tokens,
         });
         analysis.sentences.push(result);
      });
   }

   // compute global lexicon value
   analysis.global = globalAnalysisLexicon(analysis.sentences)[0];

   console.group(`lexicon`);
   console.info (`text: ${text}`);
   console.info (`predominant emotion: ${analysis.global[0]} (value: ${analysis.global[1]})`);
   console.info (`number of sentences: ${analysis.sentences.length}`);
   console.table (display);
   console.groupEnd();
}

const globalAnalysisLexicon = (sentences) => {
   // compute global lexicon value
   let emotions = {};
   for (let i in sentences) {
      const current = sentences[i].emotions.data.recognisedEmotions;
      for (let e of current) {
         const name = e[0];
         if (Object.keys(emotions).includes(name)) {
            emotions[name] = emotions[name] + e[1];
         } else {
            emotions[name] = e[1];
         }
      }
   }
   return Object.entries(emotions).sort(([,a],[,b]) => b-a);
}


// example input data
const text = "This behavior is not tolerable at all I wish I could do something about it. I’m really very angry";
// const text = "This behavior is not$tolerable at all I wish I$could do something about it.$I’m really very angry";
const lang = "en";

_evalClassification (text, lang);
_evalLexicon(text, lang);
