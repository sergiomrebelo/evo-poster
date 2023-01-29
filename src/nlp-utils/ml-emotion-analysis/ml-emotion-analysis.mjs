/**
 * ML emotion analysis
 * Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * srebelo[at]dei.uc.pt
 *
 * v1.0.0 August 2021 (as part of NLP_utils toolkit)
 * v1.1.0 December 2021 (as part of NLP_utils toolkit)
 * v1.2.1 January 2023 (as part of NLP_utils toolkit)
 * v1.3.0 January 2023
 */

import {NeuralNetwork} from "@nlpjs/neural";
import {setup, isLangAvailable, translate} from "../translator/translator.mjs";
import {params, rm, mostPresentEmotion} from '../utils/utils.mjs';
import * as TweetInfo from "../utils/TweetToolkit.mjs";
// classifier
import * as classifier from './data/LST_AIT_2018_SemEval_2018_task_1_model_1624288181749.json' assert { type: "json" };

let _isConfig = false;
const net = new NeuralNetwork();

export const classification = async (txt, lang='en') => {
   // check if the library is config
   try {
      isConfig();
   } catch (e) {
      console.error(e);
   }

   const _rawTxt = txt;
   let _rawEnTxt = txt, _translateResults = txt;

   txt = await rm(txt);
   let displayTxt = txt;

   lang = isLangAvailable(lang);

   // translate text
   if (lang !== 'en') {
      try {
         _translateResults = await translate(txt, lang);
         _translateResults = JSON.parse(_translateResults);
         txt = _translateResults.translations[0].translation;
         _rawEnTxt = txt;
      } catch (err) {
         console.warn (`language not supported ${err}`);
         return {
            success: false
         }
      }
   }


   const tweetInfo = new TweetInfo.TweetToolkit (txt, _rawTxt, lang).run(false);
   const tweetData = tweetInfo.info;

   txt =  tweetInfo.txt;


   let result = null, emotionalData = null, success = true;

   try {
      result = await _run(txt);
      emotionalData = mostPresentEmotion(result, params.MIN_EMOTION_ML);
      displayTxt.trim();
   } catch (err) {
      success = false;
   }

   return {
      success: success,
      type: "classification",
      emotions: {
         data: emotionalData
      },
      text: displayTxt,
      meta: {
         lang: lang,
         RTInfo: tweetData.rtInfo,
         urls: tweetData.urls,
         hashtags: tweetData.hashtags,
         mentions: tweetData.mentions,
         emojis: tweetData.emojis,
      },
      _rawTxt: _rawTxt,
      _MIN_REG_EMOTION_THRESHOLD: params.MIN_EMOTION_ML,
      _raw: {
         _workingTxt: txt,
         _text: _rawTxt,
         _enText: _rawEnTxt,
         _analysis: result,
         _translateResults: _translateResults
      }
   }
}

const isConfig = () => {
   if (!_isConfig) {
      throw new Error(`⚠️ Nlp-utils is not init! ⚠️`);
   }
}

export const config = async (key = null, serviceURL) => {
   console.info (`👋`);
   console.info(`Configuring ML-Emotion-Analysis (nlp-utils)`)
   try {
      //  setup classifier
      net.fromJSON(classifier.default);
      console.info(`✅ classifier`)
   } catch (err) {
      console.error(`❌ classifier not loaded: ${err} ❌`);
      return false;
   }

   return new Promise((resolve) => {
      setup(key, serviceURL).then(() => {
         console.info(`✅ translator `)
         _isConfig = true;
         resolve(true);
      }).catch((err) => {
         console.error(`❌ translator not set up at nlp-utils (ML-Emotion-analysis)  ${err} ❌`)
      });
   });
}

const _run = async (data = {'': 1}) => {
   let input = {};
   for (let token of data.split(" ")) {
      input[token] = 1;
   }
   return net.run(input);
}