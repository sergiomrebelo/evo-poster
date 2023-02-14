/**
 * NLP Utils for evo-poster
 * Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * srebelo[at]dei.uc.pt
 *
 * v1.0.0 August 2021
 * v1.1.0 December 2021
 * v1.2.1 January 2023
 * v1.3.0 January 2023
 */

import * as lx from "./lexicon-emotion-analysis/lexicon-emotion-analysis.mjs";
import * as ml from "./ml-emotion-analysis/ml-emotion-analysis.mjs";
import tokenizer from "./sentence-tokeniser/sentence-tokeniser.mjs";

export const setup = async (key = null, serviceURL = null, dict = null) => {
    await lx.config(dict, key, serviceURL);
    await ml.config(key, serviceURL);
}

export const lexicon = lx.lexicon;
export const classification = ml.classification;
export const sentenceTokenizer = tokenizer;
