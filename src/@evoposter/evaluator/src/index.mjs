/**
 * Evaluation metrics for evo-poster
 * Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * srebelo[at]dei.uc.pt
 *
 * v0.0.1 July 2023
 */

import * as Legibility from "./metrics/Legibility.mjs";
import * as GridAppropriateSize from "./metrics/GridAppropriateSize.mjs";
import * as LayoutSemantics from "./metrics/LayoutSemantics.mjs";

export const info = () => {
    console.log ("Evaluator working");
}

export const legibility = Legibility.compute;
export const gridAppropriateSize = GridAppropriateSize.compute;
export const layoutSemantics = LayoutSemantics.compute;

export { info as default };