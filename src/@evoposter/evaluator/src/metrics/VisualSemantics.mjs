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
import {arrMax, arrMean, arrMin, constraint, map} from "../utils.js";

// by tradition, use more that a method to emphasize the text is considered typecrime
// this method enables turn on/off this, using the param allowMultiple
export const compute = (textboxes, dist, allowMultiple = false) => {
    const fontWeight = 1-checkDifferenceVariableFeature(textboxes.map((b) => b["weight"]), dist.map((e) => e[3]));
    const fontStretch = 1-checkDifferenceVariableFeature(textboxes.map((b) => b["font-stretch"]), dist.map((e) => e[3]));

    // console.log (`fontWeight=`, fontWeight);
    // console.log (`fontStretch=`, fontStretch);

    // type design


    // way of combine and only checks one
    return fontWeight;
}

const checkDifferenceVariableFeature = (currentFeatures, dist) => {

    // max feature range
    const maxFeature = arrMax(currentFeatures);
    const minFeature = arrMin(currentFeatures);
    let range = Math.abs(maxFeature - minFeature);

    // semantic data range
    const maxSemantic = arrMax(dist);
    const minSemantic = arrMin(dist);

    // selects a style used in the first min semantic textbox
    let def = 0;
    for (let i in dist) {
        if (dist[i] === minSemantic) {
            def = currentFeatures[i];
            break;
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
        // consider only the difference
        let currentDistance = Math.abs(w - def);
        // consider the variable scale
        // let currentDistance = Math.abs(w - minFeature);
        let dif = Math.abs(currentDistance - target[i]);
        current.push(dif);
    }

    let mean = map(arrMean(current), 0, range, 1, 0);
    return constraint(mean, 0, 1);
}




export { compute as default };