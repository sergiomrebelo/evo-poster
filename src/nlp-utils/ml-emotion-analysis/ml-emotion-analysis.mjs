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

import {fileURLToPath} from "url";
import {dirname} from "path";
import Emoji from "node-emoji";
import {availableLanguages} from "../nlp_utils.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// params file
const MIN_EMOTION_LEXICON = .5;
const _MODEL = 'data/models/LST_AIT_2018_SemEval_2018_task_1_model_1624288181749.json';

let config = false; // is library already configurated

export const classification = async (txt, lang='en') => {
   // check if the library is config
   try {
      _isConfig();
   } catch (e) {
      console.error(e);
   }

   const _rawTxt = txt;
   let _rawEnTxt = txt, _translateResults = txt;

   txt = await rm(txt);

   // check if language is supported
   // get mother language
   lang = lang.split('-')[0];
   lang = !availableLanguages.includes(lang) ? `en` : lang;

   // translate text
   if (lang !== 'en') {
      try {
         _translateResults = await _translate(txt, lang);
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

   console.log ("txt", txt, lang);
}

const _isConfig = () => {
   /*if (!config) {
      throw new Error(`⚠️ Nlp-utils is not configurated! ⚠️`);
   }*/
}

const rm = async (rawTxt) => {
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
      return ` ${emoji.key} `;
   }, true);
   // replace consecutive white spaces
   txt = txt.replace(/[^\S\r\n]{2,}/, ' ');
   // txt = await txt.trim();
   return txt;
}