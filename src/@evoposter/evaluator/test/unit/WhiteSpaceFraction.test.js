import {whiteSpaceFraction} from '../../src/index.mjs'

const OPTIMAL = .5;
const TESTING_PARAMS = [
    {
        amount: 0.046897163120567374,
        res: 0.17879127684724105,
        valid: true,
    },
    {
        amount: 0.5,
        res: 1,
        valid: true,
    },
    {
        amount: 0,
        res: 0,
        valid: true,
    },
    {
        amount: 0.19705673758865247,
        res: 0.6329015190382778,
        valid: true,
    },
    {
        amount: 0.1,
        res: 1,
        valid: false,
    },
    {
        amount: 0,
        res: 1,
        valid: false,
    },
    {
        amount: 0,
        res: 1,
        valid: false,
    },
    {
        amount: 0.21930851063829787,
        res: 0.6848491511996379,
        valid: true,
    },
];

describe(`Testing White Space Fraction metric`, () => {
    for (let i in TESTING_PARAMS) {
        let params = TESTING_PARAMS[i];
        test(`Test ${i}`, async () => {
            const res = whiteSpaceFraction(null, null, params.amount, OPTIMAL);
            if (params.valid) {
                expect(res).toBe(params.res);
            } else {
                expect(res).not.toBe(params.res);
            }
        });
    }
});