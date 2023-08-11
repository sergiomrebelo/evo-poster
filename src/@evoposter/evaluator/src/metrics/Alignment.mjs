/**
 * Alignment metric
 *
 * Estimate if the vertical alignment of text boxes follows a regular pattern.
 * See Harrington et al. (2004).
 *
 * Include the check if the text Alignment is the same (part B).
 * User can modify the value of WEIGHTS when necessary.
 *
 * return a value between 1 (good) and 0 (bad)
 *
 * Author: Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * Contact: srebelo[at]dei.uc.pt
 *
 * Version 1.0.0 (March 2020)
 * Version: 1.5.0 (November 2023)
 */

import {arrMean} from "../utils.js";

// limit to the non-linear function
const A = 10;
const WEIGHTS = [.8, .2];

export const compute = (sentenceWidth, textAlignment, weights = WEIGHTS) => {

    let histogram = sentenceWidth;
    let results = [];

    for (let i = 0; i<histogram.length-1; i++) {
        let z = Math.abs(histogram[i] - histogram [i+1]);
        let v = A / (A + z);
        results.push(v);
    }

    let resHistogramDif = arrMean(results);
    let availableTextAligns = textAlignment.filter((value, index, array) => array.indexOf(value) === index).length;
    let resTextAlign = 1/availableTextAligns;

    // sum product
    let res = [resHistogramDif, resTextAlign].reduce((s, v, i) => s + v * weights[i], 0);

    console.log (sentenceWidth, textAlignment, res);

    return res;
}

export {compute as default};