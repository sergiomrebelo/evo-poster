import sentenceTokenizer from "../../src/@evoposter/nlp/src/sentence-tokeniser/sentence-tokeniser.mjs";

import sentences from "../testing-text.js";
import * as params from "../../src/@evoposter/nlp/data/default-line-split-params.cjs";

const number = 100;
const tokenizerDifference = 1;
const maxDistanceFromOptimal = 5;

describe(`Test for Sentence Tokeniser unit`, () => {
    describe(`Sentence Tokeniser test (times: ${number})`, () => {
        for (let sentence of sentences) {
            test(`Given ${sentence.text}, return number of lines`, async () => {
                let mean = 0, min = Number.MAX_VALUE, max = 0, wordMean = 0;

                for (let i = 0; i < number; i++) {
                    let res = await sentenceTokenizer(sentence.text);
                    res = res.flat();
                    mean += res.length;
                    let cLineMean = 0;
                    for (let sentence of res) {
                        if (min > sentence.length) min = sentence.length;
                        if (max < sentence.length) max = sentence.length;
                        cLineMean += sentence.length;
                    }
                    cLineMean /= res.length;
                    wordMean += cLineMean;

                }
                mean /= number;
                wordMean /= number;
                const dif = Math.abs(mean-sentence.sentenceNumber);
                const wordMeanAverageDif = Math.abs(wordMean - params.default.OPTIMAL);

                // console.log (`[${sentence.text.substring(0, 50)}] mean=${mean}, expected=${sentence.sentenceNumber} dif={${dif})`);

                // average number of lines
                expect(dif).toBeLessThan(tokenizerDifference);
                // difference to optimal line length
                expect(wordMeanAverageDif).toBeLessThan(maxDistanceFromOptimal);
            });
        }
    });
});
