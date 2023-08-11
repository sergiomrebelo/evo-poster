import {arrMean} from "../utils.js";

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

const A = 10;

export const compute = (heights) => {
  heights = [100,100,100,100,100];

    const histogram = heights;

    let results = [];

    for (let i = 0; i<histogram.length-1; i++) {
        let z = Math.abs(histogram[i] - histogram [i+1]);
        let v = A / (A + z);
        results.push(v);
    }

    const res = arrMean(results);

    console.log (`res regularity=${res}`, results);

    return res;
}

export {compute as default};