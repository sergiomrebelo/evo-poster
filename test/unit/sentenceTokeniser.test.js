import sentenceTokenizer from "../../src/nlp-utils/sentence-tokeniser/sentence-tokeniser.mjs";

describe("Test for initial Jest setup.", async () => {
    describe("practiceTest", () => {
        test("Given 'Hello World!', return 'Hello World!'", () => {
            const received = sentenceTokenizer(`hi`);
            const expected = sentenceTokenizer(`hi`);
            expect(received).toBe(expected);
        });
    });
});node