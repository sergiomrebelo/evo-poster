/**
 * Evaluation metrics for evo-poster
 *
 * Author: Sérgio M. Rebelo
 * CMS, CISUC, Portugal
 * Contact: srebelo[at]dei.uc.pt
 *
 * Author and Supervisor: JJ Merelo
 * UGR + Raku
 * Contact: jjmerelo[at]gmail.com
 *
 * Supervisor: Penousal Machado (supervision)
 * CMS, CISUC, Portugal
 * Contact: machado[at]dei.uc.pt
 *
 * Supervisor: João Bicker (supervision)
 * CMS, CISUC, Portugal
 * Contact: bicker[at]dei.uc.pt
 *
 * License: MIT (see LICENSE.md)
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
import * as WhiteSpaceFraction from "./metrics/WhiteSpaceFraction.mjs";
import * as TypefaceParing from "./metrics/TypefaceParing.mjs";
import * as VisualBalance from "./metrics/VisualBalance.mjs";

export const legibility = Legibility.compute;
export const gridAppropriateSize = GridAppropriateSize.compute;

export const semanticsLayout = SemanticsLayout.compute;
export const semanticsEmphasis = SemanticsEmphasis.compute;
export const semanticsVisuals = SemanticsVisuals.compute;

export const alignment = Alignment.compute;
export const regularity = Regularity.compute;
export const whiteSpaceFraction = WhiteSpaceFraction.compute;
export const typefaceParing = TypefaceParing.compute;
export const visualBalance = VisualBalance.compute;

export default () => {
    console.log (`👋 @evo-poster · evaluator v2.00`)
}
