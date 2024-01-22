/**
 * Layout Semantics
 *
 * Measure the appropriate of the layout
 * based on the importance of the content
 * it considers that most important parts of content
 * are those have more emotions related
 *
 * return the mean of difference between all textboxes,
 * a value between 1 (good) and 0 (bad)
 *
 * two modes: RELATIVE and FIXED
 * RELATIVE mode is related to the composition height
 * FIXED height is related to the container's height
 *
 * Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * srebelo[at]dei.uc.pt
 *
 * v1.0.0 April 2020
 * v2.0.0 November 2023
 */

import {arrMean, arrSum} from "../utils.js";


let dist = null;

export const compute = (textboxesHeights = [], dist, mode=`RELATIVE`, size = {height: 100, margin:[0,0,0,0]}) => {

    // mode validation
    if (mode !== `RELATIVE` && mode !== `FIXED`) mode = `RELATIVE`;

    // define max height
    let height = 0;
    if (mode === `RELATIVE`) {
        // using the textbox height
        height = arrSum(textboxesHeights);
    } else if (mode === `FIXED`) {
        // using container height
        height = size.height - ((size.height*size.margin[1]) + (size.height*size.margin[3]));
    }
    const percents = textboxesHeights.map((p) => p/height);

    // calculate distances
    let distances = [];
    for (let i in dist) {
        const dif = Math.abs(dist[i][3] - percents[i]);
        distances.push(dif);
    }

    // return average
    return (1-arrMean(distances));
}

export { compute as default };