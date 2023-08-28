/**
 * Semantics Emphasis on Visuals
 *
 * Measure the appropriate of the visual features
 * based on the importance of the content
 * it considers that most important parts of content
 * are those have more emotions related
 *
 * return the mean of difference between all textboxes,
 * a value between 1 (good) and 0 (bad)
 *
 * two modes: MIN and DIF
 * MIN takes into account that the most important parts
 * are typeset in the min value possible in the container
 * DIF: take into account only the difference between the parts
 * selects a style and compare based on the distribution of emotions.
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
 * v1.0.0 November 2023
 */
import {arrMax, arrMean, arrMin, arrSum, constraint, map} from "../utils.js";
import {SEMANTICS_EMPHASIS} from "../metrics.config.js";

let MIN_RANGE = SEMANTICS_EMPHASIS["MIN_RANGE"];
let THRESHOLD_VALID = SEMANTICS_EMPHASIS["THRESHOLD_VALID"];
let AVAILABLE_MODES = SEMANTICS_EMPHASIS["MODES"];

// by tradition, use more that a method to emphasize
// the text is considered "typecrime".
// this method enables turn on/off this feature
// by using the param allowMultiple
export const compute = (textboxes, dist, noCurrentTypefaces = 1, allowMultiple = true, weights = [0.4, 0.3, 0.3]) => {
    // if textboxes size is 1 ---> 1
    const perDist = dist.map((e) => e[3]);

    const fontWeight = checkDifferenceVariableFeature(textboxes.map((b) => b["weight"]), perDist);
    const fontStretch = checkDifferenceVariableFeature(textboxes.map((b) => b["font-stretch"]), perDist);
    let typefaceDesign = noCurrentTypefaces > 1 ? (checkDifferenceUniqueFeatures(textboxes.map((b) => b["font-stretch"]), perDist)) : 0;

    // way of combine and only checks one
    let res = [fontWeight, fontStretch, typefaceDesign];
    let weightedRes = res.map((x,i) => x*weights[i]);

    let value;

    if (!allowMultiple) {
        // if not allowed multiple emphasis
        // we check what fields are active
        // and penalty when there is active fields
        let active = res.map((r) => r > THRESHOLD_VALID);
        let c = 0;
        for (let a of active) {
            if (a) {
                c++;
            }
        }
        value = arrMax(res)/c;
    } else {
        value = arrSum(weightedRes);
    }

    return value;
}

// check the levels
const checkDifferenceUniqueFeatures = (currentFeatures, dist) => {
    // available semantic level
    const uniqueValues = dist.filter((value, index, array) => array.indexOf(value) === index);
    const target = [];

    // define the target typeface for each semantic level
    for (let uq of uniqueValues) {
        for (let i=0; i<dist.length; i++) {
            if (dist[i] === uq) {
                target.push(currentFeatures[i]);
                break;
            }
        }
    }

    // check if the target has duplicates
    const duplicates = target.filter((item, index) => target.indexOf(item) !== index);

    let value = 1;
    // if there is duplicate in levels
    // (if yes, difference is max)
    if (!duplicates.length >= 1) {
        // count the amount of tb not in the same typeface
        let c = 0;
        // for each typeface
        for (let i in dist) {
            let level = dist[i];
            let currentValue = currentFeatures[i];
            // get unique index of current semantic level
            let index = uniqueValues.indexOf(level);
            // get target value
            let targetValue = target[index];
            if (currentValue !== targetValue) {
                // if not the same as target
                c++;
            }
        }
        // map value to a value between 0 (no difference) and 1 (max difference)
        value = map(c, 0, currentFeatures.length, 0, 1);
    }

    return value;
}

const checkDifferenceVariableFeature = (currentFeatures, dist, mode = `DIF`) => {
    if (!AVAILABLE_MODES.includes(mode)) {
        mode = `DIF`;
    }
    // max feature range
    const maxFeature = arrMax(currentFeatures);
    const minFeature = arrMin(currentFeatures);
    let range = Math.abs(maxFeature - minFeature);
    if (range < MIN_RANGE) {
        return 1;
    }

    // semantic data range
    const maxSemantic = arrMax(dist);
    const minSemantic = arrMin(dist);

    // consider the current variable minimum
    let def = minFeature;
    if (mode === `DIF`) {
        // selects a style used in the first min semantic textbox
        for (let i in dist) {
            if (dist[i] === minSemantic) {
                // consider the difference
                def = currentFeatures[i];
                break;
            }
        }
    }

    // create target feature values
    const target = dist.map((e) => {
        // The most neutral sentence are the most regular
        let v = map(e, minSemantic, maxSemantic, 0, range);
        v = constraint(v, 0, range);
        return v;
    });

    // distance to target
    const current = [];
    for (let i in currentFeatures) {
        let w = currentFeatures[i];
        let currentDistance = Math.abs(w - def);
        let dif = Math.abs(currentDistance - target[i]);
        current.push(dif);
    }

    let mean = map(arrMean(current), 0, range, 1, 0);
    return constraint(mean, 0, 1);
}




export { compute as default };