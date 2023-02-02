import sentenceTokenizer from "../../src/nlp-utils/sentence-tokeniser/sentence-tokeniser.mjs";
import sentences from "../testing-text.js";

const number = 100;
const tokeniserDiference = 1;

// TODO: number of characters and comparing with data


describe(`Test for Sentence Tokeniser unit`, () => {
    describe(`Sentence Tokeniser test (times: ${number})`, () => {
        for (let sentence of sentences) {
            test(`Given ${sentence.text}, return number of lines`, async () => {
                let mean = 0;

                for (let i = 0; i < number; i++) {
                    let res = await sentenceTokenizer(sentence.text);
                    res = res.flat();
                    mean += res.length;
                }
                mean /= number;
                const dif = Math.abs(mean-sentence.sentenceNumber);

                // console.log (`[${sentence.text.substring(0, 50)}] mean=${mean}, expected=${sentence.sentenceNumber} dif={${dif})`);
                expect(dif).toBeLessThan(tokeniserDiference);
            });
        }
    });
});
