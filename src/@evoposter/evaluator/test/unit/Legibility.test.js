import {legibility} from '../../src/index.mjs'

const TESTING_PARAMS = [
    {
        sentencesLength: [530.3536987304688, 922.1293334960938, 691.0186767578125, 807.2389526367188, 893.3308715820312],
        minSize: 270,
        mode: 'JUSTIFY',
        maxLimitScale: 1,
        res: 0.992854591652199
    },
    {
        sentencesLength: [1526.35986328125, 1016.57861328125, 727.1783447265625, 2124.119873046875, 1005.9698486328125],
        minSize: 270,
        mode: 'JUSTIFY',
        maxLimitScale: 1,
        res: 1
    },
    {
        sentencesLength: [229.09808349609375, 253.67845153808594, 192.0841522216797, 278.9277038574219, 326.8467712402344],
        minSize: 270,
        mode: 'JUSTIFY',
        maxLimitScale: 1,
        res: 0.14882502803096062
    },
    {
        sentencesLength: [247.20370483398438, 281.10443115234375, 263.37786865234375, 234.2998046875, 251.99172973632812],
        minSize: 270,
        mode: 'JUSTIFY',
        maxLimitScale: 1,
        res: 0.06980098017939818
    },
    {
        sentencesLength: [247.20370483398438, 281.10443115234375, 192.0841522216797, 209.25, 251.99172973632812],
        minSize: 270,
        mode: 'JUSTIFY',
        maxLimitScale: 1,
        res: 0.14116655137803819
    },
    {
        sentencesLength: [416.76788330078125, 354.551513671875, 352.0318298339844, 420, 208.20559692382812, 473.9767761230469, 379.99420166015625, 232.78721618652344, 415.73980712890625],
        minSize: 270,
        mode: 'OVERSET',
        maxLimitScale: 1,
        res: 0.37986091017232515
    },
    {
        sentencesLength: [402.06683349609375, 325.3968811035156, 302.76544189453125, 264.0372314453125, 202.97901916503906, 350.7325744628906, 720.6565551757812, 379.8694152832031, 386.180908203125],
        minSize: 270,
        mode: 'OVERSET',
        maxLimitScale: 1,
        res: 0.3279884997709298
    },
    {
        sentencesLength: [184.5714874267578, 149.3149871826172, 184.17405700683594, 111.77513122558594, 62.199432373046875, 161.34579467773438, 229.738525390625, 253.7999267578125, 139.826416015625],
        minSize: 270,
        mode: 'OVERSET',
        maxLimitScale: 1,
        res: 0
    },
    {
        sentencesLength: [132.34515380859375, 248.58990478515625],
        minSize: 270,
        mode: 'OVERSET',
        maxLimitScale: 1,
        res: 0
    },
    {
        sentencesLength: [127.9755859375, 99.89686584472656, 204.3794403076172, 426.13409423828125],
        minSize: 270,
        mode: 'ATTEMPT_JUSTIFY',
        maxLimitScale: 1,
        res: 0.26115752797067904
    },
    {
        sentencesLength: [1577.18310546875, 549.7236328125, 1616.694580078125, 774.42333984375],
        minSize: 270,
        mode: 'ATTEMPT_JUSTIFY',
        maxLimitScale: 2,
        res: 0.863031005859375
    },
    {
        sentencesLength: [273.72930908203125, 319.76153564453125, 315.30059814453125, 281.7148742675781],
        minSize: 270,
        mode: 'ATTEMPT_JUSTIFY',
        maxLimitScale: 2,
        res: 0.051160332008644394
    },
    {
        sentencesLength: [194.0697784423828, 233.37400817871094, 206.10067749023438, 170.89727783203125],
        minSize: 270,
        mode: 'ATTEMPT_JUSTIFY',
        maxLimitScale: 2,
        res: 0.042524422539605033
    },
    {
        sentencesLength: [2162.04052734375, 998.613525390625, 1094.65087890625, 408.51971435546875],
        minSize: 270,
        mode: 'ATTEMPT_JUSTIFY',
        maxLimitScale: 3,
        res: 0.7676337159710166
    }
];

describe(`Testing Legibility metric`, () => {
    for (let i in TESTING_PARAMS) {
        let params = TESTING_PARAMS[i];
        test(`Test ${i}`, async () => {
            const res = legibility(
                params.sentencesLength, params.minSize,
                params.mode, params.maxLimitScale
            );
            expect(res).toBe(params.res);
        });
    }
});
