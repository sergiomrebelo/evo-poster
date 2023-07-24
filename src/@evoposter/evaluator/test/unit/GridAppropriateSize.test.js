import {gridAppropriateSize} from '../../src/index.mjs'

const TESTING_PARAMS = [
    {
        width: 300,
        height: 423,
        rows: [379.95],
        columns: [135, 135],
        margins: {left: 15, top: 21.900000000000002, right: 15, bottom: 21.150000000000002},
        invalid: false,
    },
    {
        width: 300,
        height: 423,
        rows: [377.84999999999997],
        columns: [135, 135],
        margins: {left: 15, top: 21.150000000000002, right: 15, bottom: 24.000000000000025},
        invalid: false
    },
    {
        width: 300,
        height: 423,
        rows: [72.85000000000001, 69.85, 71.95, 70.89999999999999, 70.89999999999999],
        columns: [135, 135],
        margins: {left: 15, top: 33.27500000000001, right: 15, bottom: 33.27500000000001},
        invalid: false
    },
    {
        width: 300,
        height: 423,
        rows: [76, 74.95, 74.95, 73.9, 72.85000000000001],
        columns: [135, 135],
        margins: {left: 15, top: 21.150000000000002, right: 15, bottom: 29.199999999999985},
        invalid: false
    },
    {
        width: 300,
        height: 423,
        rows: [22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05, 22.05],
        columns: [135, 135],
        margins: {left: 15, top: -171.45000000000002, right: 15, bottom: 21.150000000000002},
        invalid: true
    },
    {
        width: 300,
        height: 423,
        rows: [76, 74.95, 74.95, 73.9, 72.85000000000001],
        columns: [135, 160],
        margins: {left: 15, top: 21.150000000000002, right: 20, bottom: 29.199999999999985},
        invalid: true
    },
    {
        width: 300,
        height: 423,
        rows: [76, 150, 74.95, 200, 72.85000000000001],
        columns: [135, 160],
        margins: {left: 1000, top: 21.150000000000002, right: 20, bottom: 29.199999999999985},
        invalid: true
    }
];

describe(`Testing GridSizeAppropriateness metric`, () => {
    for (let i in TESTING_PARAMS) {
        let params = TESTING_PARAMS[i];
        test(`Test ${i}`, async () => {
            const invalid = gridAppropriateSize(
                params.width, params.height,
                params.rows, params.columns, params.margins
            );
            const expectResult = params.invalid ? 1 : 0;
            expect(invalid).toBe(expectResult);
        });
    }
});