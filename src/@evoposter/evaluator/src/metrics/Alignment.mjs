/**
 * Alignment metric
 *
 * Estimate if the horizontal alignment of text boxes follows a regular pattern
 * Based on Harrington et al. (2004).
 *
 * Include the check if the text Alignment is the same (part B).
 * User can modify the value of WEIGHTS when necessary.
 *
 * return a value between 1 (good) and 0 (bad)
 *
 *
 *
 * Author: Sérgio M. Rebelo
 * CMS, CISUC, Portugal
 * Contact: srebelo[at]dei.uc.pt
 *
 * Author and Supervisor: JJ Merelo
 * UGR + Raku
 * Contact: jjmerelo[at]gmail.com
 *
 * License: MIT (see LICENSE.md)
 *
 * Version 1.0.0 (March 2020)
 * Version: 1.5.0 (November 2023)
 */

import {arrMean, arrUnique, sumProduct} from "../utils.js";
import {ALIGNMENT} from "../metrics.config.js";

const A = ALIGNMENT["A"]
const WEIGHTS = ALIGNMENT["WEIGHTS"];

export const compute = (sentenceWidth, textAlignment, weights = WEIGHTS) => {
    if (sentenceWidth.length < 2) {
        return 1;
    }

    let histogram = sentenceWidth;
    let results = [];

    for (let i = 0; i<histogram.length-1; i++) {
        let z = Math.abs(histogram[i] - histogram [i+1]);
        let v = A / (A + z);
        results.push(v);
    }

    let resHistogramDif = arrMean(results);
    let availableTextAligns = arrUnique(textAlignment).length;
    let resTextAlign = 1/availableTextAligns;

    let res = sumProduct([resHistogramDif, resTextAlign], weights);
    return res;
}

export {compute as default};