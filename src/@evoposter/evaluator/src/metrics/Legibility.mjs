/**
 * Legibility
 *
 * Measure the legibility of the text in the poster
 * it is related to the legibility of the sentence
 * and not the typeface shapes
 *
 * Expected return a value between 0 (good) and (1) bad
 *
 * Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * srebelo[at]dei.uc.pt
 *
 * v1.0.0 August 2018 (as part of evoPoster)
 * v2.0.0 November 2020 (as part of evoPoster)
 * v2.5.0 November 2021 (as part of evoPoster)
 * v3.0.0 November 2023
 */

import {arrMean, map} from "../utils.js";

const MAX_CONSTRAINT = 1;
const WHITE_SPACE_FACTOR = 3;

const MODES = [`OVERSET`, `JUSTIFY`,`ATTEMPT_JUSTIFY`];

export const compute = (sentencesLength = [], minSize, mode= 'OVERSET', maxLimitScale= 1) => {
    let results = [];
    let max = minSize * maxLimitScale;
    for (let sentence of sentencesLength) {
        let dif = minSize-sentence;
        let value = MAX_CONSTRAINT;
        switch (mode) {
            case `JUSTIFY`:
                value = justify(dif, max);
                break;
            case `ATTEMPT_JUSTIFY`:
                value = attemptJustify(dif, max);
                break;
            default:
                value = overset(dif, max);
                break;
        }
        results.push(value);
    }

    // calculate mean
    const mean = arrMean([...results]);

    return mean;
}

const overset = (value, max) => {
    // only prejudice when text overfits the poster
    // if dif bigger than 0
    value = value >= 0 ? 0 : value;
    // if dif lower than limit
    value = value <= -max ? -max : value;
    // transform in scale of 1 (bad) to 0 (good)
    return map (value, -max, 0, MAX_CONSTRAINT, 0);
}

const justify = (value, max) => {
    // prejudice both overset and small lettering
    value = Math.abs(value)
    // if the dif is bigger than max
    value = value > max ? max : value;
    // transform in scale of 1 (bad) to 0 (good)
    return map (value, max, 0, MAX_CONSTRAINT, 0);
}

// attempt to justify the text
// prejudice more when the text overset box than when it is smaller
const attemptJustify = (value, max) => {
    // if dif bigger than 0 (it is not overset), soften the value
    value = value >= 0 ? value/WHITE_SPACE_FACTOR : value;
    return justify(value, max);
}

export { compute as default };