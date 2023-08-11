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
import * as SemanticsLayout from "./metrics/SemanticsLayout.mjs";
import * as SemanticsEmphasis from "./metrics/SemanticsEmphasis.mjs";
import * as SemanticsVisuals from "./metrics/SemanticVisuals.mjs";
import * as Alignment from "./metrics/Alignment.mjs";
import * as Regularity from "./metrics/Regularity.mjs";

export const info = () => {
    console.log ("Evaluator working");
}

// constraints
export const legibility = Legibility.compute;
export const gridAppropriateSize = GridAppropriateSize.compute;

// semantics
export const semanticsLayout = SemanticsLayout.compute;
export const semanticsEmphasis = SemanticsEmphasis.compute;
export const semanticsVisuals = SemanticsVisuals.compute;

// aesthetics
export const alignment = Alignment.compute;
export const regularity = Regularity.compute;

export { info as default };