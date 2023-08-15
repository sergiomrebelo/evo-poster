import {visualBalance} from "../../src/index.mjs";

const SIZE = {
    "width": 100,
    "height": 141,
    "margin": [0.05, 0.05, 0.05, 0.05]
}

const TESTING_PARAMS = [
    {
        rows: {
            "x": {
                "left": -45,
                "right": 45
            },
            "center": {
                "0": -63.94999999999999,
                "1": -50.94999999999999,
                "2": -39.94999999999999,
                "3": -26.94999999999999,
                "4": -15.949999999999989,
                "5": -2.9499999999999886,
                "6": 10.050000000000011,
                "7": 23.05000000000001,
                "8": 36.05000000000001,
                "9": 49.05000000000001,
                "10": 62.05000000000001
            },
            "gap": {
                "0": {
                    "bottom": -63.94999999999999,
                    "top": -63.94999999999999
                },
                "1": {
                    "bottom": -48.83499999999999,
                    "top": -53.06499999999999
                },
                "2": {
                    "bottom": -37.83499999999999,
                    "top": -42.06499999999999
                },
                "3": {
                    "bottom": -24.83499999999999,
                    "top": -29.064999999999987
                },
                "4": {
                    "bottom": -13.834999999999988,
                    "top": -18.064999999999987
                },
                "5": {
                    "bottom": -0.8349999999999889,
                    "top": -5.064999999999989
                },
                "6": {
                    "bottom": 12.165000000000012,
                    "top": 7.935000000000011
                },
                "7": {
                    "bottom": 25.16500000000001,
                    "top": 20.935000000000013
                },
                "8": {
                    "bottom": 38.16500000000001,
                    "top": 33.93500000000001
                },
                "9": {
                    "bottom": 51.16500000000001,
                    "top": 46.93500000000001
                },
                "10": {
                    "bottom": 62.05000000000001,
                    "top": 62.05000000000001
                }
            },
            "l": [
                13,
                11.95,
                13,
                11.95,
                13,
                13,
                13,
                13,
                13,
                13
            ]
        },
        heights: [12.38095238095238, 11.38095238095238, 12.38095238095238, 11.38095238095238, 12.38095238095238, 12.38095238095238, 12.38095238095238, 12.38095238095238, 12.38095238095238, 12.38095238095238],
        widths: [264.93060302734375, 103.13275146484375, 98.85130310058594, 91.71133422851562, 80.71405029296875, 14.855758666992188, 73.46426391601562, 70.31559753417969, 109.78497314453125, 109.39274597167969],
        visualWeights: [911.5736477154408, 319.2937844631935, 346.174007090054, 434.42082642696874, 345.92923073281816, 77.71624681230338, 312.8142084364499, 268.67683328540517, 426.86878515497756, 441.40525053069166],
        mode: `CENTER`,
        res: 0.6874696913950737,
        valid: true
    },
    {
        rows: {
            "x": {
                "left": -45,
                "right": 45
            },
            "center": {
                "0": -63.94999999999999,
                "1": -50.94999999999999,
                "2": -39.94999999999999,
                "3": -26.94999999999999,
                "4": -15.949999999999989,
                "5": -2.9499999999999886,
                "6": 10.050000000000011,
                "7": 23.05000000000001,
                "8": 36.05000000000001,
                "9": 49.05000000000001,
                "10": 62.05000000000001
            },
            "gap": {
                "0": {
                    "bottom": -63.94999999999999,
                    "top": -63.94999999999999
                },
                "1": {
                    "bottom": -48.83499999999999,
                    "top": -53.06499999999999
                },
                "2": {
                    "bottom": -37.83499999999999,
                    "top": -42.06499999999999
                },
                "3": {
                    "bottom": -24.83499999999999,
                    "top": -29.064999999999987
                },
                "4": {
                    "bottom": -13.834999999999988,
                    "top": -18.064999999999987
                },
                "5": {
                    "bottom": -0.8349999999999889,
                    "top": -5.064999999999989
                },
                "6": {
                    "bottom": 12.165000000000012,
                    "top": 7.935000000000011
                },
                "7": {
                    "bottom": 25.16500000000001,
                    "top": 20.935000000000013
                },
                "8": {
                    "bottom": 38.16500000000001,
                    "top": 33.93500000000001
                },
                "9": {
                    "bottom": 51.16500000000001,
                    "top": 46.93500000000001
                },
                "10": {
                    "bottom": 62.05000000000001,
                    "top": 62.05000000000001
                }
            },
            "l": [
                13,
                11.95,
                13,
                11.95,
                13,
                13,
                13,
                13,
                13,
                13
            ]
        },
        heights: [12.38095238095238, 11.38095238095238, 12.38095238095238, 11.38095238095238, 12.38095238095238, 12.38095238095238, 12.38095238095238, 12.38095238095238, 12.38095238095238, 12.38095238095238],
        widths: [264.93060302734375, 103.13275146484375, 98.85130310058594, 91.71133422851562, 80.71405029296875, 14.855758666992188, 73.46426391601562, 70.31559753417969, 109.78497314453125, 109.39274597167969],
        visualWeights: [911.5736477154408, 319.2937844631935, 346.174007090054, 434.42082642696874, 345.92923073281816, 77.71624681230338, 312.8142084364499, 268.67683328540517, 426.86878515497756, 441.40525053069166],
        res: 0.5,
        mode: `CENTER`,
        valid: false
    },
    {
        rows: {
            "x": {
                "left": -45,
                "right": 45
            },
            "center": {
                "0": -63.45,
                "1": -50.45,
                "2": -37.45,
                "3": -24.450000000000003,
                "4": -11.450000000000003,
                "5": 1.5499999999999972,
                "6": 14.549999999999997,
                "7": 27.549999999999997,
                "8": 40.55,
                "9": 51.55,
                "10": 62.55
            },
            "gap": {
                "0": {
                    "bottom": -63.45,
                    "top": -63.45
                },
                "1": {
                    "bottom": -48.335,
                    "top": -52.565000000000005
                },
                "2": {
                    "bottom": -35.335,
                    "top": -39.565000000000005
                },
                "3": {
                    "bottom": -22.335000000000004,
                    "top": -26.565
                },
                "4": {
                    "bottom": -9.335000000000003,
                    "top": -13.565000000000003
                },
                "5": {
                    "bottom": 3.664999999999997,
                    "top": -0.5650000000000026
                },
                "6": {
                    "bottom": 16.664999999999996,
                    "top": 12.434999999999997
                },
                "7": {
                    "bottom": 29.664999999999996,
                    "top": 25.435
                },
                "8": {
                    "bottom": 42.665,
                    "top": 38.434999999999995
                },
                "9": {
                    "bottom": 53.665,
                    "top": 49.434999999999995
                },
                "10": {
                    "bottom": 62.55,
                    "top": 62.55
                }
            },
            "l": [
                13,
                13,
                13,
                13,
                13,
                13,
                13,
                13,
                11.95,
                11.95
            ]
        },
        heights: [
            12.38095238095238,
            12.38095238095238,
            12.38095238095238,
            12.38095238095238,
            12.38095238095238,
            12.38095238095238,
            12.38095238095238,
            12.38095238095238,
            11.38095238095238,
            11.38095238095238
        ],
        widths: [
            144.40023803710938,
            74.92420959472656,
            47.67530822753906,
            48.9495849609375,
            100.42433166503906,
            13.045364379882812,
            148.280029296875,
            40.75384521484375,
            193.45982360839844,
            88.27268981933594
        ],
        visualWeights: [
            548.2469503051699,
            354.99399306265246,
            261.69230634799567,
            229.9707345363731,
            347.5307752921171,
            81.14857600614351,
            592.8610498000362,
            199.1372925214631,
            968.8753906494605,
            291.6050576564197
        ],
        res: 0.6983685363606276,
        mode: `CENTER`,
        valid: true
    },
    {
        rows: {
            "x": {
                "left": -45,
                "right": 45
            },
            "center": {
                "0": -63.45,
                "1": 59.55
            },
            "gap": {
                "0": {
                    "bottom": -63.45,
                    "top": -63.45
                },
                "1": {
                    "bottom": 59.55,
                    "top": 59.55
                }
            },
            "l": [
                123.85000000000001
            ]
        },
        heights: [117.95238095238095],
        widths: [276.33221435546875],
        visualWeights: [7973.376582108727],
        res: 0.37440557682834674,
        mode: `CENTER`,
        valid: true,
    },
    {
        rows: {
            "x": {
                "left": -45,
                "right": 45
            },
            "center": {
                "0": -63.45,
                "1": 59.55
            },
            "gap": {
                "0": {
                    "bottom": -63.45,
                    "top": -63.45
                },
                "1": {
                    "bottom": 59.55,
                    "top": 59.55
                }
            },
            "l": [
                123.85000000000001
            ]
        },
        heights: [117.95238095238095],
        widths: [276],
        visualWeights: [7973],
        res: 0,
        mode: `CENTER`,
        valid: false,
    },
    {
        rows: {
            "x": {
                "left": -45,
                "right": 45
            },
            "center": {
                "0": -58.44999999999998,
                "1": -18.44999999999998,
                "2": 20.55000000000002,
                "3": 61.55000000000002
            },
            "gap": {
                "0": {
                    "bottom": -58.44999999999998,
                    "top": -58.44999999999998
                },
                "1": {
                    "bottom": -16.334999999999983,
                    "top": -20.56499999999998
                },
                "2": {
                    "bottom": 22.665000000000017,
                    "top": 18.43500000000002
                },
                "3": {
                    "bottom": 61.55000000000002,
                    "top": 61.55000000000002
                }
            },
            "l": [
                40.95,
                39.949999999999996,
                41
            ]
        },
        heights: [
            39,
            38.047619047619044,
            39.047619047619044
        ],
        widths: [
            51.25154113769531,
            48.15863037109375,
            51.46736145019531
        ],
        visualWeights: [
            1080.9193401063121,
            1068.5792176811547,
            1108.3613454753233
        ],
        res: 0.7099021460649569,
        mode: `CENTER`,
        valid: true
    },
    {
        rows: {
            "x": {
                "left": -45,
                "right": 45
            },
            "center": {
                "0": -58.44999999999998,
                "1": -18.44999999999998,
                "2": 20.55000000000002,
                "3": 61.55000000000002
            },
            "gap": {
                "0": {
                    "bottom": -58.44999999999998,
                    "top": -58.44999999999998
                },
                "1": {
                    "bottom": -16.334999999999983,
                    "top": -20.56499999999998
                },
                "2": {
                    "bottom": 22.665000000000017,
                    "top": 18.43500000000002
                },
                "3": {
                    "bottom": 61.55000000000002,
                    "top": 61.55000000000002
                }
            },
            "l": [
                40.95,
                39.949999999999996,
                41
            ]
        },
        heights: [
            39,
            38.047619047619044,
            39.047619047619044
        ],
        widths: [
            51.25154113769531,
            48.15863037109375,
            51.46736145019531
        ],
        visualWeights: [
            1080.9193401063121,
            1068.5792176811547,
            1108.3613454753233
        ],
        res: 1,
        mode: `CENTER`,
        valid: false
    },
    {
        rows: {
            "x": {
                "left": -45,
                "right": 45
            },
            "center": {
                "0": -60.39999999999999,
                "1": -30.39999999999999,
                "2": -1.3999999999999915,
                "3": 27.60000000000001,
                "4": 56.60000000000001
            },
            "gap": {
                "0": {
                    "bottom": -60.39999999999999,
                    "top": -60.39999999999999
                },
                "1": {
                    "bottom": -28.284999999999993,
                    "top": -32.51499999999999
                },
                "2": {
                    "bottom": 0.7150000000000083,
                    "top": -3.5149999999999912
                },
                "3": {
                    "bottom": 29.715000000000007,
                    "top": 25.48500000000001
                },
                "4": {
                    "bottom": 56.60000000000001,
                    "top": 56.60000000000001
                }
            },
            "l": [
                30.95,
                29.95,
                29.95,
                29.95
            ]
        },
        heights: [
            342.25732421875,
            287.4759826660156,
            293.0855712890625,
            437.04632568359375
        ],
        widths: [
            29.476190476190474,
            28.523809523809522,
            28.523809523809522,
            28.523809523809522
        ],
        visualWeights: [
            3727.5057306443678,
            3622.4177405315445,
            3234.7133591917686,
            4203.703294362204
        ],
        res: 0.5303072425405706,
        mode: `RIGHT-TOP`,
        valid: true
    },
    {
        rows: {
            "x": {
                "left": -45,
                "right": 45
            },
            "center": {
                "0": -63.45,
                "1": -31.450000000000003,
                "2": -1.4500000000000028,
                "3": 28.549999999999997,
                "4": 58.55
            },
            "gap": {
                "0": {
                    "bottom": -63.45,
                    "top": -63.45
                },
                "1": {
                    "bottom": -29.335000000000004,
                    "top": -33.565000000000005
                },
                "2": {
                    "bottom": 0.6649999999999969,
                    "top": -3.5650000000000026
                },
                "3": {
                    "bottom": 30.664999999999996,
                    "top": 26.435
                },
                "4": {
                    "bottom": 58.55,
                    "top": 58.55
                }
            },
            "l": [
                32,
                30.95,
                30.95,
                30.95
            ]
        },
        heights: [
            170.4186553955078,
            297.0517272949219,
            174.01736450195312,
            230.81512451171875
        ],
        widths: [
            30.476190476190474,
            29.476190476190474,
            29.476190476190474,
            29.476190476190474
        ],
        visualWeights: [
            2144.2423788076026,
            3100.417377039685,
            2374.310169650738,
            2925.722717489419
        ],
        res: 0.5367634140653805,
        mode: `RIGHT-TOP`,
        valid: true
    },
    {
        rows: {
            "x": {
                "left": -45,
                "right": 45
            },
            "center": {
                "0": -62.425,
                "1": -30.424999999999997,
                "2": 1.5750000000000028,
                "3": 30.575000000000003,
                "4": 60.575
            },
            "gap": {
                "0": {
                    "bottom": -62.425,
                    "top": -62.425
                },
                "1": {
                    "bottom": -28.31,
                    "top": -32.54
                },
                "2": {
                    "bottom": 3.6900000000000026,
                    "top": -0.5399999999999969
                },
                "3": {
                    "bottom": 32.690000000000005,
                    "top": 28.460000000000004
                },
                "4": {
                    "bottom": 60.575,
                    "top": 60.575
                }
            },
            "l": [
                32,
                32,
                29.9,
                30.95
            ]
        },
        widths: [
            30.476190476190474,
            30.476190476190474,
            28.476190476190474,
            29.476190476190474
        ],
        heights: [
            133.9654083251953,
            382.00225830078125,
            343.7714538574219,
            477.23687744140625
        ],
        visualWeights: [
            1381.1239085281425,
            5107.805296971529,
            3543.086645087024,
            4825.177613113833
        ],
        mode: `RIGHT-TOP`,
        res:  0.5367276624494475,
        valid: true
    },
    {
        rows: {
            "x": {
                "left": -45,
                "right": 45
            },
            "center": {
                "0": -55.39999999999999,
                "1": -16.39999999999999,
                "2": 23.60000000000001,
                "3": 61.60000000000001
            },
            "gap": {
                "0": {
                    "bottom": -55.39999999999999,
                    "top": -55.39999999999999
                },
                "1": {
                    "bottom": -14.284999999999991,
                    "top": -18.51499999999999
                },
                "2": {
                    "bottom": 25.715000000000007,
                    "top": 21.48500000000001
                },
                "3": {
                    "bottom": 61.60000000000001,
                    "top": 61.60000000000001
                }
            },
            "l": [
                39.9,
                40,
                38.95
            ]
        },
        widths: [
            38,
            38.095238095238095,
            37.095238095238095
        ],
        heights: [
            594.3903198242188,
            760.325927734375,
            456.15655517578125
        ],
        mode: `RIGHT-BOTTOM`,
        visualWeights: [
            9704.27382043399,
            15381.23748966179,
            10104.313922673464
        ],
        res: 0,
        valid: true
    }
];

describe(`Testing visual Balance metric`, () => {
    for (let i in TESTING_PARAMS) {
        let params = TESTING_PARAMS[i];
        test(`Test ${i}`, async () => {
            const res = await visualBalance(null, SIZE, params.rows, params.widths, params.heights, params.mode,  params.visualWeights);
            if (params.valid) {
                expect(res).toBe(params.res);
            } else {
                expect(res).not.toBe(params.res);
            }
        });
    }
});