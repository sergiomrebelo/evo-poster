/**
 * Visual Semantics
 *
 * Measure the appropriate of the visual features
 * based on the importance of the content
 * it considers that most important parts of content
 * are those have more emotions related
 *
 * return the mean of difference between all textboxes,
 * a value between 1 (good) and 0 (bad)
 *
 *
 * Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * srebelo[at]dei.uc.pt
 *
 * v1.0.0 November 2023
 */
import {arrMax, arrMean, arrMin, map} from "../utils.js";

// by tradition, use more that a method to emphasize the text is considered typecrime
// this method enables turn on/off this, using the param allowMultiple
export const compute = (textboxes, dist, allowMultiple = false) => {
    const fontWeight = 1-checkDifferenceVariableFeature(textboxes.map((b) => b["weight"]), dist.map((e) => e[3]));
    const fontStretch = 1-checkDifferenceVariableFeature(textboxes.map((b) => b["font-stretch"]), dist.map((e) => e[3]));

    console.log (`fontWeight=`, fontWeight);
    console.log (`fontStretch=`, fontStretch);

    // type design


    // way of combine and only checks one
    return [fontWeight, fontStretch];
}

const checkDifferenceVariableFeature = (currentFeatures, dist) => {

    // max feature range
    const maxFeature = arrMax(currentFeatures);
    const minFeature = arrMin(currentFeatures);
    const range = Math.abs(maxFeature - minFeature);

    // semantic data range
    const maxSemantic = arrMax(dist);
    const minSemantic = arrMin(dist);

    // create target feature values
    const target = dist.map((e) => {
        // The most neutral sentence are the most regular
        let v = map(e, minSemantic, maxSemantic, 0, range);
        v = v > range ? range : v;
        v = v < 0 ? 0 : v;
        return v;
    });

    // distance to target
    const current = [];
    for (let i in currentFeatures) {
        let w = currentFeatures[i];
        let currentDistance = Math.abs(w - minFeature);
        let dif = Math.abs(currentDistance - target[i]);
        current.push(dif);
    }

    return arrMean(current)/range;
}


// check if the important part of text are typeset in a bolder typeface
const checkWeightFeature = (current, dist) => {

    // semantic data range
    const maxSemantic = arrMax(dist);
    const minSemantic = arrMin(dist);

    // max feature range
    const maxFeature = arrMax(current);
    const minFeature = arrMin(current);

    // create target feature values
    const probs = dist.map((e) => {
        let v = e[3]/maxSemantic * maxFeature;
        if (e[3] === minSemantic) {
            v = minFeature;
        }
        return v;
    });

    // calculate distance
    let distance = [];
    for (let i in current) {
        let w = current[i]
        let value = Math.abs(w-probs[i]);
        distance.push(value);
    }

    return arrMean(distance)/Math.abs(maxFeature-minFeature);
}


export { compute as default };