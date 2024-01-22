import {colorDistance, hexToRGB} from "../utils.js";
import {WHITE_SPACE_FRACTION} from "../metrics.config.js";

/**
 * White Space Fraction metric
 *
 * Assess the white space factor, i.e. the amount of the result that is background.
 * Based on Harrington et al. (2004).
 *
 * Traditionally, white space (including margins) should total about half of the total page area.
 *
 * We decided made this in other way, using the pixels of image that are equals to background color
 *
 * return a value between 1 (good) and 0 (bad)
 * in first version, we used a no-linear method and onlyy works with solid backgrounds
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
 * Version 1.0.0 (March 2020)
 * Version: 1.5.0 (November 2023)
 */

const OPTIMAL = WHITE_SPACE_FRACTION["OPTIMAL"];
const MIN_DISTANCE = WHITE_SPACE_FRACTION["MIN_DISTANCE"];

export const compute = (img, color, amount = null, optimal = OPTIMAL) => {
    if (amount === null) {
        color = hexToRGB(color);
        amount = percentTypographyColor(img, color, img.pixelDensity());
    }

    const res = 1-4*Math.pow((amount - optimal), 2);

    return res;
}

const percentTypographyColor = (img, c, d=1) => {
    let amount = 0;
    let distances = [];
    let size = img.width * d * img.height * d ;
    img.loadPixels();
    for (let i = 0; i < 4 * size; i += 4) {
        let current = {
            r: img.pixels[i],
            g: img.pixels[i+1],
            b: img.pixels[i+2]
        }
        const distance = colorDistance(current, c);
        distances.push(distance);
        if (distance < MIN_DISTANCE) {
            amount++;
        }
    }
    return amount/size;
}

export {compute as default};