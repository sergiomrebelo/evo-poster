import {semanticsVisuals} from "../../src/index.mjs";

const TYPEFACE_DATA = [
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
        "leading": 1.05
    }
]

const CONFIG = {
    default: {
        anger: {
            color: {
                typography: [`#ff0000`, `#00ff00`],
                background: [`#ff0000`]
            },
            typefaces: [`sans-serif`, `neo-grotesque`]
        },
        joy: {
            color: {
                typography: [],
                background: [`#ffff00`, `#00ff00`]
            },
            typefaces: [`sans-serif`, `serif`]
        },
        trust: {
            color: {
                typography: [],
                background: [`#0000ff`, `#00ff00`]
            },
            typefaces: [`neo-grotesque`]
        },
        sadness: {
            color: {
                typography: [],
                background: [`#0071b6`]
            },
            typefaces: []
        },
        disgust: {
            color: {
                typography: [`#800080`],
                background: []
            },
            typefaces: []
        }
    }
}

const TESTING_PARAMS = [
    {
        data: {
            "predominant": {"emotion": "anger", "weight": 0.58},
            "recognisedEmotions": [["anger", 0.58, 1]]
        },
        textboxes: [
            {
                "content": "Speak when you are angry and",
                "weight": 128,
                "font-stretch": 100,
                "alignment": 2,
                "size": 114.95238095238095,
                "typeface": "Cabin",
                "color": "#c8e7d4",
                "uppercase": false
            },
            {
                "content": "you will make the best speech",
                "weight": 128,
                "font-stretch": 100,
                "alignment": 2,
                "size": 113.23809523809523,
                "typeface": "Cabin",
                "color": "#c8e7d4",
                "uppercase": false
            },
            {
                "content": "you will ever regret.",
                "weight": 130,
                "font-stretch": 96,
                "alignment": 1,
                "size": 113.23809523809523,
                "typeface": "Emberly",
                "color": "#c8e7d4",
                "uppercase": false
            }
        ],
        background: ["#E7C8DB", "#E7C8CC"],
        res: 0.3,
        valid: false,
    },
    {
        data: {
            "predominant": {"emotion": "anger", "weight": 0.97},
            "recognisedEmotions": [["anger", 0.97, 0.63], ["disgust", 0.57, 0.37]]
        },
        textboxes: [
            {
                "content": "anger",
                "weight": 100,
                "font-stretch": 100,
                "alignment": 3,
                "size": 357.85714285714283,
                "typeface": "Barlow",
                "color": "#ee055e",
                "uppercase": false
            }
        ],
        background: ["#05EE95", "#05EE95"],
        res: 0.5225993816531517,
        valid: false,
    },
    {
        data: {
            "predominant": {"emotion": "anger", "weight": 0.97},
            "recognisedEmotions": [["anger", 0.97, 0.63], ["disgust", 0.57, 0.37]]
        },
        textboxes: [
            {
                "content": "anger",
                "weight": 188,
                "font-stretch": 300,
                "alignment": 2,
                "size": 351.85714285714283,
                "typeface": "Barlow",
                "color": "#00ff00",
                "uppercase": false
            }
        ],
        background: ["#ff0000"],
        res: 1,
        valid: true,
    },
    {
        data: {
            "recognisedEmotions": [
                [
                    "sadness",
                    0.9,
                    0.56
                ],
                [
                    "pessimism",
                    0.72,
                    0.44
                ]
            ],
            "predominant": {
                "emotion": "sadness",
                "weight": 0.9
            }
        },
        textboxes:[
            {
                "content": "sad",
                "weight": 188,
                "font-stretch": 300,
                "alignment": 2,
                "size": 351.85714285714283,
                "typeface": "Barlow",
                "color": "#00ff00",
                "uppercase": false
            }
        ],
        background: ["#ff0000"],
        res: 0.7486482813737191,
        valid: true,
    },
    {
        data: {
            "recognisedEmotions": [
                [
                    "sadness",
                    0.9,
                    0.56
                ],
                [
                    "pessimism",
                    0.72,
                    0.44
                ]
            ],
            "predominant": {
                "emotion": "sadness",
                "weight": 0.9
            }
        },
        textboxes:[
            {
                "content": "sad",
                "weight": 188,
                "font-stretch": 300,
                "alignment": 2,
                "size": 351.85714285714283,
                "typeface": "Barlow",
                "color": "#00ff00",
                "uppercase": false
            }
        ],
        background: ["#ff0000"],
        res: 0.7486482813737191,
        valid: true,
    },
    {
        data: {
            "recognisedEmotions": [
                [
                    "sadness",
                    0.9,
                    0.56
                ],
                [
                    "pessimism",
                    0.72,
                    0.44
                ]
            ],
            "predominant": {
                "emotion": "sadness",
                "weight": 0.9
            }
        },
        textboxes:[
            {
                "content": "sad",
                "weight": 188,
                "font-stretch": 300,
                "alignment": 2,
                "size": 351.85714285714283,
                "typeface": "Barlow",
                "color": "#00ff00",
                "uppercase": false
            }
        ],
        background: ["#0071b6"],
        res: 1,
        valid: true,
    },
    {
        data: {
            "recognisedEmotions": [
                [
                    "anger",
                    0.75,
                    1
                ]
            ],
            "predominant": {
                "emotion": "anger",
                "weight": 0.75
            }
        },
        textboxes:[
                {
                    "content": "When angry, count four.",
                    "weight": 333,
                    "font-stretch": 125,
                    "alignment": 2,
                    "size": 171.95238095238093,
                    "typeface": "Amstelvar",
                    "color": "#59f3fe",
                    "uppercase": false
                },
                {
                    "content": "When very angry, swear",
                    "weight": 491,
                    "font-stretch": 100,
                    "alignment": 1,
                    "size": 171.38095238095238,
                    "typeface": "Epilogue",
                    "color": "#59f3fe",
                    "uppercase": false
                }
        ],
        background: [
            "#FE6459",
            "#FE59A1"
        ],
        res: 0.42673641409446894,
        valid: true,
    }

]

describe(`Testing Visual Semantics metric`, () => {
    for (let i in TESTING_PARAMS) {
        let params = TESTING_PARAMS[i];
        test(`Test ${i}`, async () => {
            const res = await semanticsVisuals(params["data"], params["textboxes"], params["background"], TYPEFACE_DATA, CONFIG);
            if (params.valid) {
                expect(res).toBe(params.res);
            } else {
                expect(res).not.toBe(params.res);
            }
        });
    }
});