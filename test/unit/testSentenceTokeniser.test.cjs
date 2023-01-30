const tokeniser = require('./../../src/nlp-utils/sentence-tokeniser/sentence-tokeniser.mjs')

describe("Test for initial Jest setup.", () => {
    describe("practiceTest", () => {
        test("Given 'Hello World!', return 'Hello World!'", () => {
            console.log(tokeniser);
            const received = "Hello World!";
            const expected = "Hello World!";
            expect(received).toBe(expected);
        });
    });
});