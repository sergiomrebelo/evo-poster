import {regularity} from '../../src/index.mjs'

const TESTING_PARAMS = [
    {
        heights: [100, 100, 100, 100, 100, 100],
        res: 1,
        valid: true,
    },
    {
        heights: [100, 100, 100, 80, 100, 100],
        res: 1,
        valid: false,
    },
    {
        heights: [93.94999999999999, 90.85, 91.89999999999999, 90.85],
        res: 0.8577711765857257,
        valid: true,
    },
    {
        heights: [93.94999999999999, 92.95, 90.85, 90.85],
        res: 0.1,
        valid: false,
    },
    {
        heights: [19],
        res: 1,
        valid: true,
    },
    {
        heights: [30.95, 31, 31, 29.95, 29.95, 31, 31, 29.95, 31, 31, 31, 29.95],
        res: 0.956355613949995,
        valid: true,
    }
];


describe(`Testing Regularity metric`, () => {
    for (let i in TESTING_PARAMS) {
        let params = TESTING_PARAMS[i];
        test(`Test ${i}`, async () => {
            const res = regularity(params.heights);
            if (params.valid) {
                expect(res).toBe(params.res);
            } else {
                expect(res).not.toBe(params.res);
            }
        });
    }
});