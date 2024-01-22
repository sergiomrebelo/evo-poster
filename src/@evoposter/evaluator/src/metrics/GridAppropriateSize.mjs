/**
 * Grid Size Appropriateness
 *
     * Measure the appropriate of the used grid to the size of container
     * it is related to if the width and height of the grid is
     * in accordance with poster size
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

import * as CONFIG from "../metrics.config.js";

const DEBUG = CONFIG["default"]["DEBUG"];

export const compute = (containerWidth, containerHeight, rows = [], columns = [], margins = {left:0, top:0, right:0, bottom:0}) => {
    let invalid = false;
    // debug
    let msg = "";

    // height calculation
    let height = Math.abs(margins.top)+Math.abs(margins.bottom);
    for (let r of rows) {
        height = height + parseFloat(r);
    }
    // width calculation
    let width = Math.abs(margins.left)+Math.abs(margins.right);
    for (let r of columns) {
        width = width + parseFloat(r);
    }

    width = Math.round(width);
    height = Math.round(height);

    if (height > containerHeight) {
        invalid = true;
        msg += `Grid height is bigger than container (grid:${height}, container:${containerHeight}). `;
    } else if (height < containerHeight) {
        msg += `Grid and container height are not the same (grid:${height}, container:${containerHeight}). `;
    }

    if (width > containerWidth) {
        invalid = true;
        msg += `Grid width is bigger than container (grid:${width}, container:${containerWidth}). `;
    } else if (width < containerWidth) {
        msg += `Grid and container width are not the same (grid:${width}, container:${containerWidth}). `;
    }

    if (msg !== "" && DEBUG) {
        console.warn(msg);
    }

    return invalid ? 1 : 0;
}

export { compute as default };