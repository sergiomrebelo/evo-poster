/**
 * Visual Balance metric
 *
 * Estimate the visual balance (centred) of the composition.
 * Based on Harrington et al. (2004)
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

import {arrSum, constraint} from "../utils.js";
import {VISUAL_BALANCE} from "../metrics.config.js";

// visual center factor
// By default, the visual center is taken to be offset a twentieth of the page height towards the top
const VISUAL_CENTER_FT = VISUAL_BALANCE["VISUAL_CENTER_FT"];
const AVAILABLE_MODES = VISUAL_BALANCE["MODES"];

export const compute = async (img = null, size, rows, widths, heights, mode= `CENTER`, visualWeights = null) => {
    const dx = size["width"];
    const dy = size["height"];
    if (!AVAILABLE_MODES.includes(mode)) mode = `CENTER`;

    const vw = visualWeights === null ? await visualWeight(img, rows, widths, heights) : visualWeights;
    const bo = balanceCenter(mode, vw, widths, heights);
    let vo = visualCenter(mode, dx, dy, size["margin"]);

    // calculate central Balance
    let cb = Math.pow(((bo.x-vo.x)/dx), 2) + Math.pow(((bo.y-vo.y)/dy), 2);
    cb = 1-Math.pow(Math.abs(cb/2), 1/2);

    return constraint(cb, 0, 1);
}


const balanceCenter = (mode, vws, widths, heights) => {

    // get text box center
    const vc = [];
    for (let i in heights) {
        vc.push(visualCenter(mode, widths[i], heights[i]));
    }

    // get page balance center
    let posX = 0, posY = 0;
    const m = arrSum(vws);

    for (let i in vws) {
        posX += vc[i].x*vws[i];
        posY += vc[i].y*vws[i];
    }

    posX /= m;
    posY /= m;

    return {
        x: posX,
        y: posY
    }
}


/**
* Calculate the visual centre of a element
* The visual center lies halfway between the left and right edges
* the visual center is taken to be offset a twentieth of the page height towards the top
*/
const visualCenter = (mode, width, height, margins = [0,0,0,0]) => {
    mode = String(mode)
    const posX = mode.includes(`LEFT`) ? 1 : mode.includes(`RIGHT`) ? 2 : 0;
    const posY = mode.includes(`TOP`) ? 1 : mode.includes(`BOTTOM`) ? 2 : 0;

    let x = posX === 0 ? width/2 :
        posX === 1 ? (width * margins[0]) : width * (1 - margins[2]) ;
    let y = posY === 0 ? height/2 - (height/VISUAL_CENTER_FT) :
        posY === 1 ? (height * margins[1]) : height - (height * margins[3])



    return {
        x: x,
        y: y
    }
}

/**
 * calculate the visual weight of a object
 * visual weight = area x optical density
 */
const visualWeight = async (img, rows, widths, heights) => {
    let areas = [];
    let opticalDensity = [];

    for (let i in widths) {

        // compute areas
        areas.push(widths[i] * heights[i]);

        // compute visual weight
        const rendering = await img.get(
            0,
            img.height/2 + rows["center"][i],
            img.width,
            rows["l"][i]
        );

        await rendering.loadPixels();

        let r = 0, g = 0, b = 0;
        const realPixelsSize = rendering.pixels.length/4;

        for (let i=0; i < rendering.pixels.length; i+=4) {
            r += rendering.pixels[i];
            g += rendering.pixels[i+1];
            b += rendering.pixels[i+2];
        }

        r = Math.round(r/realPixelsSize);
        g = Math.round(g/realPixelsSize);
        b = Math.round(b/realPixelsSize);

        const avgLuma = (0.2126*r + 0.7152*g + 0.0722*b);
        const t = avgLuma / 255;
        opticalDensity.push(-Math.log10(t));
    }

    return areas.map((a, i) => a * opticalDensity[i]);
}


export {compute as default};
