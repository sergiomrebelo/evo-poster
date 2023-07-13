/**
 * Evaluation metrics for evo-poster
 * Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * srebelo[at]dei.uc.pt
 *
 * v0.0.1 July 2023
 */

import * as Legibility from "./Legibility.mjs";

export const info = () => {
    console.log ("Evaluator working");
}

export const legibility = Legibility.compute;

export { info as default };