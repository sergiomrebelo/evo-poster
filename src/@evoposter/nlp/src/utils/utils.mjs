/**
 * NLP Utils
 * Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * srebelo[at]dei.uc.pt
 *
 * v1.0.0 August 2021
 * v1.1.0 December 2021
 * v1.2.1 January 2023
 */


// TODO see tools for handle different respositry in athe same folder
// pnpm _> paralel npm
// yarn
// impoort in package.json @rebeposter/lutils.js --> rebelo poster is
// if you use two package i need to package


import Emoji from 'node-emoji';

export const params = {
   "MIN_EMOTION_LEXICON": 0.5,
    "MIN_EMOTION_ML": 0.5
}

export const rm = async (rawTxt) => {
    let txt = rawTxt;
    // remove /n
    txt = await txt.replace(/(\r\n|\r|\n)+/gi, ' ');
    // remove []
    txt = await txt.replace (/[\[|\]]+/gi, ' ');
    // remove :
    // txt = await txt.replace (/:\s/gm, ' ');
    // remove `` and  \``
    txt = await txt.replace (/(["“”])+/gi, ' ');
    // remove &amp; by &
    txt = await txt.replace (/&amp;/gi, '&');
    // add a space between emojis
    txt = Emoji.replace(txt, (emoji) => {
        return ` ${emoji.emoji} `;
    }, true);
    // replace consecutive white spaces
    txt = txt.replace(/[^\S\r\n]{2,}/, ' ');
    // txt = await txt.trim();
    return txt;
}

export const mostPresentEmotion = (result, min = .5) => {
    let predominant = "neutral"; //no-emotion available
    let recognised = {};
    let predominantWeight = 0.0;

    for (let key of Object.keys(result)) {
        let current = parseFloat(result[key]);
        current = Math.round(current * 100) / 100;
        if (current >= min) {
            recognised[key] = current;
            if (current > predominantWeight) {
                predominantWeight = current;
                predominant = key;
            }
        }
    }

    // sort resulting object
    let sortable = [];
    for (let emotion in recognised) {
        sortable.push([emotion,recognised[emotion]]);
    }
    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
    sortable = sortable.reverse();

    let sumWeight = sortable.map((e) => e[1]).reduce((a, b) => a + b, 0);
    for (let s of sortable) {
        let percent = parseFloat((s[1]/sumWeight).toFixed(2));
        s.push(percent)
    }

    return {
        recognisedEmotions: sortable,
        predominant: {
            emotion: predominant,
            weight: predominantWeight
        }
    };
}


