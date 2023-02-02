import sentences from "../../../../../test/testing-text.js";
import sentenceTokenizer from "./sentence-tokeniser.mjs";
import * as params from "../../data/default-line-split-params.cjs";

// const txt = "Usually, one has to grab ¶ an image from a server (either localhost or a remote one) ¶ in order to get past $ the SameOrigin policy. Error checking is minimal - ¶ i.e, you can select a text/video/whatever file and ¶ the code will still attempt $ to load it and set its ¶ contents to be the data used to $ construct a dataURI ¶ for an image element.";
// const txt = `RT @sergiomrebelo: ❌ @cdv.lab Usually, one has to grab ¶ an https://sergiorebelo.work image from a server (either localhost or a remote one) ¶ in order @cdv.lab @sergimrebelo to get 🧑‍💻past $ the https://www2.sergiorebelo.work SameOrigin policy. Error checking is minimal - ¶ i.e, you can select a text/video/whatever file and ¶ the code will still attempt $ to load it and set its ¶ contents to be the data used to $ construct a dataURI ¶ for an image element. #testing #testing2`;
const number = 10;

for (let sentence of sentences) {
    let nLinesMean = 0;
    let min = Number.MAX_VALUE, max = 0, wordMean = 0; // line
    for (let i=0; i<number; i++) {
        let res = await sentenceTokenizer(sentence.text);
        res = res.flat();
        nLinesMean += res.length;
        let cLineMean = 0;
        for (let sentence of res) {
            if (min > sentence.length) min = sentence.length;
            if (max < sentence.length) max = sentence.length;
            cLineMean += sentence.length;
        }
        cLineMean /= res.length;
        wordMean += cLineMean;
    }
    nLinesMean /= number;
    wordMean /= number;

    // analysis resulting lines


    console.table({
        "sentences": `${sentence.text.substring(0, 100)}`,
        "mean": `${nLinesMean}`,
        "minChar": `${min}`,
        "maxChar": `${max} (max: ${params.default.MAX})`,
        "average words by line": `${wordMean} (optimal: ${params.default.OPTIMAL})`,
        "default": `${sentence.sentenceNumber}`
    });
}



