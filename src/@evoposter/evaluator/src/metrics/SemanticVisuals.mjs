/**
 * Semantic Visuals Measure
 *
 * This function assesses the appropriateness of visual features (type design and colour)
 * based on the emotions collected. It takes into account the configuration file "visual-semantics.config.js".
 *
 * The function returns the mean difference between all textboxes,
 * yielding a value between 1 (good) and 0 (bad).
 * If there is no information pertaining to a particular emotion, the value defaults to 1.
 *
 * As of now, the function exclusively considers the predominant emotions from ML analysis.
 *
 * Author: Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * Contact: srebelo[at]dei.uc.pt
 *
 * Version: 1.0.0 (November 2023)
 */

import {SEMANTICS_VISUALS} from "../metrics.config.js";

const MAX_COLOR_DISTANCE = SEMANTICS_VISUALS["MAX_COLOR_DISTANCE"];

import * as configurationFile from "../../semantics-visual.config.js";
import {arrMean, colorDistance, hexToRGB, constraint} from "../utils.js";


export const compute = async (data, textboxes, background, typefaceData, config = configurationFile) => {

    let emotion = data.predominant.emotion;

    if (config["default"][emotion] === undefined) return 1;

    const targetTypefaceColors = config["default"][emotion]["color"]["typography"];
    const targetBackgroundColors = config["default"][emotion]["color"]["background"];
    const targetTypographyFeatures = config["default"][emotion]["typefaces"];

    // typography colour
    let meanTypefaceColorDistance = 1;
    if (targetTypefaceColors !== undefined && targetTypefaceColors.length > 0) {
        let typefaceColorsDistances = [];
        for (let t of textboxes) {
            let c = hexToRGB(t.color);
            let typefaceColorsDist = Number.MAX_VALUE;
            for (let targetColor of targetTypefaceColors) {
                targetColor = hexToRGB(targetColor);
                let distance = colorDistance(c, targetColor)
                if (distance < typefaceColorsDist) {
                    typefaceColorsDist = distance;
                }
            }
            typefaceColorsDistances.push(typefaceColorsDist);
        }

        meanTypefaceColorDistance = typefaceColorsDistances.length < 1 ? 1 : arrMean(typefaceColorsDistances);
        meanTypefaceColorDistance /= MAX_COLOR_DISTANCE;
        meanTypefaceColorDistance = constraint(1-meanTypefaceColorDistance, 0, 1);
    }

    // background colour
    let meanTypefaceBackgroundDistance = 1;
    if (targetBackgroundColors !== undefined && targetBackgroundColors.length !== 0) {
        let backgroundColorsDistances = [];
        meanTypefaceBackgroundDistance = 0;
        for (let c of background) {
            c = hexToRGB(c);
            let backgroundColorsDist = Number.MAX_VALUE;
            for (let targetColor of targetBackgroundColors) {
                targetColor = hexToRGB(targetColor);
                let distance = colorDistance(c, targetColor);
                if (distance < backgroundColorsDist) {
                    backgroundColorsDist = distance;
                }
            }
            backgroundColorsDistances.push(backgroundColorsDist);
        }

        meanTypefaceBackgroundDistance = meanTypefaceBackgroundDistance.length < 1 ? 1 : arrMean(backgroundColorsDistances);
        meanTypefaceBackgroundDistance /= MAX_COLOR_DISTANCE;
        meanTypefaceBackgroundDistance = constraint(1-meanTypefaceBackgroundDistance, 0, 1);
    }

    // typeface
    let meanTypefaceError = 1;
    if (targetTypographyFeatures !== undefined && targetTypographyFeatures.length > 0) {
        let fontsTags = [];
        for (let t of textboxes) {
            let tbTagsValue = 0;
            const typefaceIndex = typefaceData.map(t => t.family).indexOf(t["typeface"]);
            const tags = typefaceData[typefaceIndex]["tags"];
            for (let t of targetTypographyFeatures) {
                if (tags.includes(t)) {
                    tbTagsValue += (1/targetTypographyFeatures.length)
                }
            }
            fontsTags.push(tbTagsValue);
        }

        meanTypefaceError = fontsTags.length < 1 ? 1 : arrMean(fontsTags);
        meanTypefaceError = constraint(meanTypefaceError, 0, 1);
    }

    return (meanTypefaceColorDistance + meanTypefaceBackgroundDistance + meanTypefaceError)/3;


}


export {compute as default};