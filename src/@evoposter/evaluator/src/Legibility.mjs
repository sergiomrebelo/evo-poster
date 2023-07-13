/**
 * Measure the legibility of the text in the poster
 * it is related to the legibility of the sentence
 * and not the typeface shapes
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

import {arrMean, map} from "./utils.js";

const modes = [
    [`OVERSET`, 0]
]

export const compute = (sentencesLength = [], minSize, mode= 'OVERSET', maxLimitScale= 2) => {
    console.log ("minSize", minSize);
    let results = [];
    let max = minSize * maxLimitScale;
    for (let sentence of sentencesLength) {
        let dif = minSize-sentence;
        // OVERSET MODE
        dif = calculateOverset(dif, max);
        results.push(dif);
    }

    // calculate mean
    const value = arrMean([...results]);
    console.log ("minSize", minSize, "value", value, sentencesLength);
    return value;
}


const calculateOverset = (value, max, maxConstraint = 0.5) => {
    // only prejudice when text overfits the poster
    // if dif bigger than 0
    value = value >= 0 ? 0 : value;
    // if dif lower than limit
    value = value <= -max ? -max : value;
    // transform in scale of 1 (bad) to 0 (good)
    value = map (value, -max, 0, maxConstraint, 0);
    return value;
}


/**
 * async _assessLegibility (scale=2, assesMethod='softComingOut&WS', visualLimit=200, max=10000, min=500, weighted=true) {
 *         let tws = this.state.phenotype.ref.current.tws;
 *         let resByLine = [];
 *
 *         for (let tw of tws) {
 *             let value = tw[0]-tw[1];
 *             if (tw[1] === 0) {
 *                 //blank elements are good to layout
 *                 value = 1;
 *             } else {
 *                 // compensate in the same way when the text is to big or to small.
 *                 if (assesMethod === 'minWhiteSpace') {
 *                     value = Math.abs(value) > visualLimit ? visualLimit : value;
 *                 }
 *                 // only compensate texts that overfits the textbox
 *                 else if (assesMethod === 'minComingOut') {
 *                     value = value > 0 ? 0 : value; //if text inside poster
 *                     value = value < -(visualLimit) ? -(visualLimit) : value; //if not
 *                 }
 *                 //compensate more when the text overfits that when it
 *                 else if (assesMethod === 'hardComingOut&WS') {
 *
 *                     if (value < 0) { //if content outfits the poster, i.e. the value is negative
 *                         value = visualLimit;
 *                     } else { //if inside of poster
 *                         if (Math.abs(value) < visualLimit) {
 *                             const dif = Math.abs(value - visualLimit);
 *                             const d = map(dif, 0, visualLimit, 1, 2);
 *                             value = Math.abs(value) / d;
 *                         } else {
 *                             value = visualLimit;
 *                         }
 *                     }
 *                 } else if (assesMethod === 'softComingOut&WS') {
 *                     if (value < 0) {
 *                         value = visualLimit;
 *                     } else {
 *                         if (Math.abs(value) > visualLimit) {
 *                             const dif = Math.abs(value - visualLimit * 2);
 *                             const d = map(dif, 0, visualLimit * 2, 1, 3);
 *                             value = Math.abs(value) / d;
 *                         } else {
 *                             value = 0;
 *                         }
 *                     }
 *                 }
 *
 *                 value = map(Math.abs(value), 0, visualLimit, 1, 0);
 *             }
 *
 *             resByLine.push(value);
 *         }
 *
 *         let w = Array(resByLine.length).fill(1/resByLine.length);
 *
 *         if  (weighted) {
 *             w = this.state.genotype[1].map(x => x[2]);
 *             let sumw = arrSum(w);
 *
 *             w = w.map(x => x / sumw);
 *         }
 *
 *         for (let l=0; l<resByLine.length; l++) {
 *             resByLine[l] = resByLine[l]*w[l];
 *         }
 *
 *
 *         return Math.pow(arrSum(resByLine),1.5);
 *     }
 */