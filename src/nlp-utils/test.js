import * as NLP from './nlp_utils.mjs';
import dotenv from 'dotenv';
dotenv.config();

const run = async (text, lang) => {
   const global = [], lines = [];

   // setup library
   await NLP.setup(process.env.MW_API_KEY, process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL);

   // classification analysis
   await NLP.classification(text, lang).then((result) => {
      global.push({
         analyses: 'classification',
         predominant: result.success ? result.emotions.predominant.emotion : `❌ error`
      });
   });

   // lexicon-based analysis
   await NLP.lexicon(text, lang, true).then((result) => {
      global.push({
         analyses: 'lexicon-based',
         predominant: result.success ? result.emotions.predominant.emotion : `❌ error`
      });

      if (result.lineAnalysis.available) {
         for (let i in result.sentences) {
            let sentence = result.sentences[i];
            let sortedEmotions = result.lineAnalysis.data[i].emotions.sort(function (a,b) {return a[2]+b[2]});
            lines.push({
               "text": sentence,
               "number": result.lineAnalysis.data[i].number,
               "emotions": sortedEmotions.length > 0 ? sortedEmotions[0][0] : 'neutral',
               "most influential token": result.lineAnalysis.data[i].mostInfluentialToken
            });
         }
      }
   });

   // log results
   console.info (`\n🤖 Emotion-recognition global results`)
   console.table(global);
   if (lines.length > 0) {
      console.info(`\n🤖 Emotion-recognition by line results`);
      console.table(lines);
   } else {
      console.info(`\nEmotion-recognition by line not conducted (user request)`);
   }
}


// example input data
const text = "This behavior is not tolerable at all I wish I could do something about it. I’m really very angry.";
const lang = "en";
run (text, lang);