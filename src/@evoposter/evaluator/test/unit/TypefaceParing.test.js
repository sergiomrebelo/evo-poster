import {typefaceParing, whiteSpaceFraction} from "../../src/index.mjs";

const AVAILABLE_TYPEFACE_DATA = [
    {
        "family": "Amstelvar",
        "weight": [
            100,
            900
        ],
        "stretch": [
            50,
            125
        ],
        "tags": [
            "serif"
        ],
        "category": "serif",
        "leading": 1.05
    },
    {
        "family": "Anybody",
        "weight": [
            100,
            900
        ],
        "stretch": [
            10,
            400
        ],
        "tags": [
            "sans-serif",
            "90s",
            "europe"
        ],
        "category": "sans-serif",
        "leading": 1.05
    },
    {
        "family": "Barlow",
        "weight": [
            22,
            188
        ],
        "stretch": [
            300,
            500
        ],
        "tags": [
            "sans-serif",
            "gothic",
            "monoline",
            "neo-grotesque"
        ],
        "category": "sans-serif",
        "leading": 1.05
    },
    {
        "family": "Cabin",
        "weight": [
            95,
            128
        ],
        "stretch": [
            0,
            100
        ],
        "tags": [
            "sans-serif",
            "gothic",
            "soft-corners"
        ],
        "category": "sans-serif",
        "leading": 1.05
    },
    {
        "family": "Emberly",
        "weight": [
            100,
            900
        ],
        "stretch": [
            75,
            100
        ],
        "tags": [
            "serif",
            "didone"
        ],
        "category": "serif",
        "leading": 1.05
    },
    {
        "family": "Epilogue",
        "weight": [
            100,
            900
        ],
        "stretch": [
            100,
            100
        ],
        "tags": [
            "sans-serif"
        ],
        "category": "sans-serif",
        "leading": 1.05
    },
    {
        "family": "IBMPlexSans",
        "weight": [
            100,
            700
        ],
        "stretch": [
            85,
            100
        ],
        "tags": [
            "sans-serif"
        ],
        "category": "sans-serif",
        "leading": 1.05
    },
    {
        "family": "Inconsolata",
        "weight": [
            275,
            900
        ],
        "stretch": [
            50,
            200
        ],
        "tags": [
            "sans-serif",
            "mono"
        ],
        "category": "nonospace",
        "leading": 1.05
    }
];

const TESTING_PARAMS = [
    {
        typefaces: [`Inconsolata`, `Inconsolata`, `Inconsolata`],
        mode: `BOTH`,
        res: 1,
        valid: true
    },
    {
        typefaces: [`Emberly`, `Emberly`, `Emberly`,`Emberly`, `Emberly`, `Emberly`],
        mode: `TYPE_FAMILY`,
        res: 1,
        valid: true
    },
    {
        typefaces: [`IBMPlexSans`, `IBMPlexSans`],
        mode: `CATEGORY`,
        res: 1,
        valid: true
    },
    {
        typefaces: ["Anybody", "IBMPlexSans", "Epilogue", "Amstelvar", "Emberly", "Emberly", "Inconsolata", "Barlow"],
        mode: `BOTH`,
        res: 0.23809523809523808,
        valid: true,
    },
    {
        typefaces: ["Anybody", "Barlow"],
        mode: `BOTH`,
        res: 0.75,
        valid: true,
    },
    {
        typefaces: ["Anybody", "Barlow"],
        mode: `TYPE_FAMILY`,
        res: 0.5,
        valid: true,
    },
    {
        typefaces: ["Anybody", "Barlow"],
        mode: `CATEGORY`,
        res: 1,
        valid: true,
    },
    {
        typefaces: ["Anybody", "Barlow"],
        mode: `CATEGORY`,
        res: 0.5,
        valid: false,
    }
];

describe(`Testing Paring metric`, () => {
    for (let i in TESTING_PARAMS) {
        let params = TESTING_PARAMS[i];
        test(`Test ${i}`, async () => {
            const res = typefaceParing(params.typefaces, AVAILABLE_TYPEFACE_DATA, params.mode);
            if (params.valid) {
                expect(res).toBe(params.res);
            } else {
                expect(res).not.toBe(params.res);
            }
        });
    }
});