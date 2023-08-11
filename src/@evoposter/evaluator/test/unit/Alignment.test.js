import {alignment} from '../../src/index.mjs'

const WEIGHTS = [.8, .2];
const TESTING_PARAMS = [
    {
        textboxes: [100,100,100,100],
        textAlignment: [1,1,1,1],
        res: 1,
        valid: true,
    },
    {
        textboxes: [100,100,500,100],
        textAlignment: [1,1,1,1],
        res: 1,
        valid: false,
    },
    {
        textboxes: [100,100,100,100],
        textAlignment: [1,0,2,4],
        res: 0.8500000000000001,
        valid: true,
    },
    {
        textboxes: [1136.85595703125, 1312.4881591796875],
        textAlignment: [2,2],
        res: 0.24309597099754784,
        valid: true,
    },
    {
        textboxes: [1400.49609375, 1359.153564453125],
        textAlignment: [2,3],
        res: 0.25581624258793434,
        valid: true,
    },
    {
        textboxes: [1400.49609375, 1359.153564453125],
        textAlignment: [1,3],
        res: 0.4,
        valid: false,
    },
    {
        textboxes: [335.27606201171875, 1103.1597900390625, 306.7102966308594, 349.2381591796875, 404.03021240234375, 696.7076416015625, 186.3524627685547, 440.174560546875, 719.94482421875],
        textAlignment: [2, 2, 1, 2, 2, 2, 1, 2, 2],
        res: 0.14946410384612163,
        valid: true,
    }
];


describe(`Testing Alignment metric`, () => {
    for (let i in TESTING_PARAMS) {
        let params = TESTING_PARAMS[i];
        test(`Test ${i}`, async () => {
            const res = alignment(
                params.textboxes, params.textAlignment,
                WEIGHTS
            );
            if (params.valid) {
                expect(res).toBe(params.res);
            } else {
                expect(res).not.toBe(params.res);
            }
        });
    }
});