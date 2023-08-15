/**
 * Alignment metric
 *
 * Estimate if the text boxes follows a regular vertical pattern
 * Based on Harrington et al. (2004).
 *
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
import {REGULARITY} from "../metrics.config.js";

const A = REGULARITY["A"];

export const compute = (heights) => {
    if (heights.length < 2) {
        return 1;
    }

    const histogram = heights;

    let results = [];

    for (let i = 0; i<histogram.length-1; i++) {
        let z = Math.abs(histogram[i] - histogram [i+1]);
        let v = A / (A + z);
        results.push(v);
    }

    const res = arrMean(results);

    return res;
}

export {compute as default};