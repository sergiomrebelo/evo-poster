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

import Emoji from "node-emoji";
import {setup, isLangAvailable, translate} from "../translator/translator.mjs";
import {NeuralNetwork} from "@nlpjs/neural";
// classifier
import * as classifier from './data/LST_AIT_2018_SemEval_2018_task_1_model_1624288181749.json' assert { type: "json" };

// FIXME params -> NLP Utils
const MIN_EMOTION_ML = .5;

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

   txt = await _rm(txt);
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

   // remove retweet data
   const rtExp = /RT\s*@[^:]*:/gm;
   const rtMatch = txt.match(rtExp);
   let rtInfo = rtMatch !== null ? rtExp : []; // retweet data
   rtInfo = rtInfo.length > 0 ? rtInfo : [];

   // remove URLs (hardwired method)
   const urlExp = /(https?:\/\/)(\s)*(www\.)?(\s)*((\w|\s)+\.)*([\w\-\s]+\/)*([\w\-]+)((\?)?[\w\s]*=\s*[\w&]*)*/gm;
   const urlsMatch = txt.match(urlExp);
   let urls = urlsMatch !== null ? urlsMatch : [];

   // remove of mentions
   const mentionExp = /\B@[a-z0-9_-]+/gi;
   const mentionMatch = txt.match(mentionExp);
   const mentions = mentionMatch !== null ? mentionMatch : [];
   let mentionsNative = mentions;
   if (lang !== 'en') {
      const mentionsNativeMatch = _rawTxt.match(mentionExp, '');
      mentionsNative = mentionsNativeMatch !== null ? mentionsNativeMatch : [];
   }

   // remove hashtags
   const htgExp = /#[^\s!@#$%^&*()=+.\/,\[{\]};:'"?><]+/gi;
   const htgMatch = txt.match(htgExp);
   const hashtags = htgMatch !== null ? htgMatch : [];

   // get emojis
   let emojis = [];
   Emoji.replace(txt, (e) => emojis.push(e), true);

   let result = null, emotionalData = null, success = true;

   try {
      result = await _run(txt);
      emotionalData = _mostPresentEmotion(result, MIN_EMOTION_ML);
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
         RTInfo: rtInfo,
         urls: urls,
         hashtags: hashtags,
         mentions: {
            mentions: mentionsNative,
            working: mentions
         },
         emojis: emojis,
      },
      _rawTxt: _rawTxt,
      _MIN_REG_EMOTION_THRESHOLD: MIN_EMOTION_ML,
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
      net.fromJSON(classifier);
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

const _rm = async (rawTxt) => {
   let txt = rawTxt;
   // remove /n
   txt = await txt.replace(/(\r\n|\r|\n)+/gi, ' ');
   // remove []
   txt = await txt.replace (/[\[|\]]+/gi, ' ');
   // remove :
   txt = await txt.replace (/:\s/gm, ' ');
   // remove `` and  \``
   txt = await txt.replace (/(["“”])+/gi, ' ');
   // remove &amp; by &
   txt = await txt.replace (/&amp;/gi, '&');
   // add a space between emojis
   txt = Emoji.replace(txt, (emoji) => {
      return ` ${emoji.emoji} `;
   }, true);
   // replace consecutive white spaces
   txt = txt.replace(/[^\S\r\n]{2,}/, ' ');
   // txt = await txt.trim();
   return txt;
}

const _run = async (data = {'': 1}) => {
   let input = {};
   for (let token of data.split(" ")) {
      input[token] = 1;
   }
   return net.run(input);
}

// FIXME : create main utils
const _mostPresentEmotion = (result, min = .5) => {
   let predominant = "neutral"; //no-emotion available
   let recognised = {};
   let predominantWeight = 0.0;

   for (let key of Object.keys(result)) {
      let current = parseFloat(result[key]);
      current = Math.round(current * 100) / 100;
      if (current >= min) {
         recognised[key] = current;
         if (current > predominantWeight) {
            predominantWeight = current;
            predominant = key;
         }
      }
   }

   // sort resulting object
   let sortable = [];
   for (let emotion in recognised) {
      sortable.push([emotion,recognised[emotion]]);
   }
   sortable.sort(function(a, b) {
      return a[1] - b[1];
   });
   sortable = sortable.reverse();

   let sumWeight = sortable.map((e) => e[1]).reduce((a, b) => a + b, 0);
   for (let s of sortable) {
      let percent = parseFloat((s[1]/sumWeight).toFixed(2));
      s.push(percent)
   }

   return {
      recognisedEmotions: sortable,
      predominant: {
         emotion: predominant,
         weight: predominantWeight
      }
   };
}