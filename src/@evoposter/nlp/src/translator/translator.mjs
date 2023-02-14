/**
 * text translator simplifier
 * using IBM Watson LanguageTranslatorV3
 *
 * Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * srebelo[at]dei.uc.pt
 *
 * v1.0.0 August 2021 (as part of NLP_utils toolkit)
 * v1.1.0 December 2021 (as part of NLP_utils toolkit)
 * v1.2.1 January 2023 (as part of NLP_utils toolkit)
 * v1.3.0 January 2023
 */

import LanguageTranslatorV3 from "ibm-watson/language-translator/v3.js";
import { IamAuthenticator } from 'ibm-watson/auth/index.js';

let languageTranslator = null; // translator API keys
let _isConfig = false;

// TODO: create a function to warning and error
// TODO: create a issue on github



// https://cloud.ibm.com/docs/language-translator?topic=language-translator-translation-models
const availableLanguages = [
    'ar', 'bn', 'bs', 'bg', 'zh', 'hr', 'cs', 'da', 'nl', 'en',
    'et', 'fi', 'fr', 'de', 'el', 'gu', 'he', 'hi', 'hu', 'ga',
    'id', 'it', 'ja', 'ko', 'lv', 'lt', 'ms', 'ml', 'mt', 'ne',
    'nb', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'es', 'sv',
    'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy'
];

// check if language is supported
export const isLangAvailable = (lang) => {
    lang = lang.split('-')[0];
    return !availableLanguages.includes(lang) ? `en` : lang;
}

export const translate = async (text, source, target="en") => {
    try {
        isConfig();
    } catch (err) {
        console.error(err);
    }

    return new Promise((resolve) => {
        languageTranslator.translate(
            {
                text: text,
                source: source,
                target: target
            })
            .then(response => {
                resolve(JSON.stringify(response.result, null, 2));
            })
            .catch(err => {
                console.error('error on translation: ', err);
                resolve(text);
            });
    });
}

export const isConfig = () => {
    if (!_isConfig) {
        throw new Error(`⚠️ Nlp-utils translator not set up ⚠️`);
    }
    return _isConfig;
}

export const setup = async (key = null, serviceURL = null) => {
    if (key === null || serviceURL === null) {
        console.error(`⚠️ nlp-utils translator not init. ⚠️ [${[key, serviceURL]}]`);
        return false;
    }
    return new Promise((resolve) => {
        try {
            languageTranslator = new LanguageTranslatorV3({
                authenticator: new IamAuthenticator({apikey: key}),
                serviceUrl: serviceURL,
                version: '2020-11-12',
            });
            _isConfig = true;
            resolve();
        } catch (err) {
            console.error(`⚠️ nlp-utils translator not init. ⚠️ [${err}]`);
        }
    });
}