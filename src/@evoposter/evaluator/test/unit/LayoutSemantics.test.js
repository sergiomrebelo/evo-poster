import {layoutSemantics} from '../../src/index.mjs'

const TESTING_PARAMS = [
    {
        textboxesHeights: [38,38,35.9,36.95,36.95,35.9,36.95,35.9,38,38],
        dist: [[1, ['joy'], 0.65, 0.13], [0, [], 0.1, 0.02], [1, ['anticipation'], 0.62, 0.12], [2, ['joy', 'trust'], 1.69, 0.33], [0, [], 0.1, 0.02], [1, ['joy'], 0.83, 0.16], [0, [], 0.1, 0.02], [0, [], 0.1, 0.02], [1, ['joy'], 0.82, 0.16], [0, [], 0.1, 0.02]],
        type: `FIXED`,
        genotype: {width :300, height:423, margin:[0.05,0.05,0.05,0.05]},
        res: 0.9197241922773838,
        valid: true
    },
    {
        textboxesHeights: [38,38,35.9,36.95,36.95,35.9,36.95,35.9,38,38],
        dist: [[1, ['joy'], 0.65, 0.13], [0, [], 0.1, 0.02], [1, ['anticipation'], 0.62, 0.12], [2, ['joy', 'trust'], 1.69, 0.33], [0, [], 0.1, 0.02], [1, ['joy'], 0.83, 0.16], [0, [], 0.1, 0.02], [0, [], 0.1, 0.02], [1, ['joy'], 0.82, 0.16], [0, [], 0.1, 0.02]],
        type: `FIXED`,
        genotype: {width :300, height:423, margin:[0.05,0.05,0.05,0.05]},
        res: 1,
        valid: false
    },
    {
        textboxesHeights: [61.95,59.9,59.9,59.9,59.9,60.949999999999996],
        dist: [[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07],[1,["trust"],0.85,0.63]],
        type: `FIXED`,
        genotype: {"width":300,"height":423,"margin":[0.05,0.05,0.05,0.05]},
        res: 0.8480010506960861,
        valid: true
    },
    {
        textboxesHeights: [61.95,58.85,60.949999999999996,59.9,58.85,60.949999999999996],
        dist: [[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07],[1,["trust"],0.85,0.63]],
        type: `FIXED`,
        genotype: {"width":300,"height":423,"margin":[0.05,0.05,0.05,0.05]},
        res: 0.8484607302337799,
        valid: true
    },
    {
        textboxesHeights: [61.95,58.85,60.949999999999996,59.9,58.85,60.949999999999996],
        dist: [[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07],[1,["trust"],0.85,0.63]],
        type: `FIXED`,
        genotype: {"width":300,"height":423,"margin":[0.05,0.05,0.05,0.05]},
        res: 0.5,
        valid: false
    },
    {
        textboxesHeights: [123.85000000000001,122.95,119.8],
        dist: [[1,["trust"],0.94,0.82],[0,[],0.1,0.09],[0,[],0.1,0.09]],
        type: `FIXED`,
        genotype: {"width":300,"height":423,"margin":[0.05,0.05,0.05,0.05]},
        res: 0.6825601961299361,
        valid: true
    },
    {
        textboxesHeights: [85.8,81.8,83.89999999999999],
        dist: [[1,["trust"],0.94,0.82],[0,[],0.1,0.09],[0,[],0.1,0.09]],
        type: `FIXED`,
        genotype: {"width":300,"height":300,"margin":[0.05,0.05,0.05,0.05]},
        res: 0.6880246913580248,
        valid: true
    },
    {
        textboxesHeights:  [34.95,35,33.949999999999996],
        dist: [[1,["trust"],0.94,0.82],[0,[],0.1,0.09],[0,[],0.1,0.09]],
        type: `FIXED`,
        genotype: {"width":300,"height":120,"margin":[0.05,0.05,0.05,0.05]},
        res: 0.6817283950617284,
        valid: true
    },
    {
        textboxesHeights:   [76,72.85000000000001,74.95,73.9,76],
        dist: [[1,["trust"],0.85,0.3],[0,[],0.1,0.04],[0,[],0.1,0.04],[0,[],0.1,0.04]],
        type: `RELATIVE`,
        genotype:  {"width":300,"height":423,"margin":[0.05,0.05,0.05,0.05]},
        res:  0.8575287663901525,
        valid: true
    },
    {
        textboxesHeights: [145.70000000000002,144.95,146,144.95,146],
        dist: [[1,["trust"],0.85,0.3],[0,[],0.1,0.04],[0,[],0.1,0.04],[0,[],0.1,0.04]],
        type: `RELATIVE`,
        genotype:  {"width":300,"height":846,"margin":[0.05,0.05,0.05,0.05]},
        res: 0.8061224060940373,
        valid: false
    },
    {
        textboxesHeights:   [145.70000000000002,144.95,146,144.95,146],
        dist: [[1,["trust"],0.85,0.3],[0,[],0.1,0.04],[0,[],0.1,0.04],[0,[],0.1,0.04]],
        type: `RELATIVE`,
        genotype:  {"width":300,"height":846,"margin":[0.05,0.05,0.05,0.05]},
        res: 0.9,
        valid: false
    }
]

describe(`Testing Layout Semantics metric`, () => {
    for (let i in TESTING_PARAMS) {
        let params = TESTING_PARAMS[i];
        test(`Test ${i}`, async () => {
            const res = layoutSemantics(
                params.textboxesHeights, params.dist,
                params.type, params.genotype
            );

            if (params.valid) {
                expect(res).toBe(params.res);
            } else {
                expect(res).not.toBe(params.res);
            }
        });
    }
});
