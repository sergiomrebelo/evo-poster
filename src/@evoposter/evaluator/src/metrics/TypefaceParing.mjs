import {arrUnique} from "../utils.js";

/**
 * Typeface Pairing Metric
 *
 * Checks if the employed typefaces pair well together.
 * Since each typeface is related to a line of text,
 * this metric considers the typeface name and the classification.
 * Typefaces should be included in the configuration file with corresponding classification values.
 *
 * It had three modes:
 * TYPEFACE: values the use of the same typeface
 * CATEGORY: values the use of typefaces in the same category
 * BOTH: values both
 *
 *
 * Returns a value between 1 (good) and 0 (bad) to indicate compatibility.
 *
 * Author: Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * Contact: srebelo[at]dei.uc.pt
 *
 * Version 1.0.0 (March 2020)
 * Updated Version: 1.5.0 (November 2023)
 */

export const compute = (typefaces, availableTypefaces, mode = `BOTH`) => {
    if (![`BOTH`, `TYPE_FAMILY`, `CATEGORY`].includes(mode))  {
        mode = `BOTH`;
    }

    let weights = [.5, .5]; // heights to BOTH mode
    if (mode === `TYPE_FAMILY`) {
        weights = [1, 0];
    } else if (mode === `CATEGORY`) {
        weights = [0, 1];
    }

    let categories = [];
    let usedTypefaces = arrUnique(typefaces);
    let categoriesFactor = 0, typefaceFactor = 0;

    if (mode !== `TYPE_FAMILY`) {
        const typefacesNames = availableTypefaces.map(a => a["family"]);
        const typefacesClassification = availableTypefaces.map(a => a["category"]);

        for (let typeface of usedTypefaces) {
            const index = typefacesNames.indexOf(typeface);
            if (index === -1) {
                categories.push(`undefined`);
            } else {
                categories.push(typefacesClassification[index]);
            }
        }

        categories = arrUnique(categories);
        categoriesFactor = 1/categories.length;
    }

    if (mode !== `CATEGORY`) {
        typefaceFactor = 1 / usedTypefaces.length;
    }

    const res = [typefaceFactor, categoriesFactor].reduce((s, v, i) => s + v * weights[i], 0);

    console.log (typefaces, mode, res);

    return res;
}

export {compute as default};