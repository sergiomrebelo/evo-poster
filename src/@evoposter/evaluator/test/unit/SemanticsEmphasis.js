import {semanticsEmphasis} from '../../src/index.mjs'

const TESTING_PARAMS = [
    {
        textboxes: [{"content":"A friend","weight":188,"font-stretch":312,"alignment":2,"size":57,"typeface":"Barlow","color":"#82f295","uppercase":false},{"content":"is someone","weight":641,"font-stretch":125,"alignment":2,"size":56.14285714285714,"typeface":"Amstelvar","color":"#82f295","uppercase":false},{"content":"who knows","weight":559,"font-stretch":125,"alignment":2,"size":57.14285714285714,"typeface":"Amstelvar","color":"#82f295","uppercase":false},{"content":"all about you","weight":871,"font-stretch":97,"alignment":3,"size":56.14285714285714,"typeface":"Anybody","color":"#82f295","uppercase":false},{"content":"and still","weight":100,"font-stretch":100,"alignment":2,"size":54.14285714285714,"typeface":"Emberly","color":"#82f295","uppercase":false},{"content":"loves you","weight":275,"font-stretch":200,"alignment":1,"size":54.14285714285714,"typeface":"Inconsolata","color":"#82f295","uppercase":false}],
        dist: [[1,["trust"],0.85,0.29],[0,[],0.1,0.03],[0,[],0.1,0.03],[0,[],0.1,0.03],[0,[],0.1,0.03],[2,["joy","trust"],1.69,0.57]],
        noTypefaces: 8,
        res: 0.6198543565131808,
        valid: true,
    },
    {
        textboxes: [{"content":"To live","weight":741,"font-stretch":100,"alignment":3,"size":57,"typeface":"Emberly","color":"#85285c","uppercase":false},{"content":"is the rarest thing","weight":849,"font-stretch":200,"alignment":2,"size":54.14285714285714,"typeface":"Inconsolata","color":"#85285c","uppercase":false},{"content":"in the world.","weight":451,"font-stretch":125,"alignment":2,"size":57.14285714285714,"typeface":"Amstelvar","color":"#85285c","uppercase":false},{"content":"Most people","weight":199,"font-stretch":100,"alignment":2,"size":54.14285714285714,"typeface":"Epilogue","color":"#85285c","uppercase":false},{"content":"exist,","weight":570,"font-stretch":100,"alignment":2,"size":57.14285714285714,"typeface":"Emberly","color":"#85285c","uppercase":false},{"content":"that is all.","weight":128,"font-stretch":100,"alignment":3,"size":55.14285714285714,"typeface":"Cabin","color":"#85285c","uppercase":false}],
        dist: [[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17]],
        noTypefaces: 8,
        res: 0.7999999999999999,
        valid: true,
    },
    {
        textboxes: [{"content":"To live","weight":720,"font-stretch":230,"alignment":2,"size":59,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"is the rarest thing","weight":761,"font-stretch":242,"alignment":1,"size":56.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"in the world.","weight":400,"font-stretch":400,"alignment":3,"size":59.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"Most people","weight":398,"font-stretch":68,"alignment":2,"size":58.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"exist,","weight":607,"font-stretch":400,"alignment":1,"size":59.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"that is all.","weight":201,"font-stretch":400,"alignment":1,"size":57.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false}],
        dist: [[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17]],
        noTypefaces: 1,
        res: 0.7,
        valid: true,
    },
    {
        textboxes: [{"content":"To live","weight":720,"font-stretch":230,"alignment":2,"size":59,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"is the rarest thing","weight":761,"font-stretch":242,"alignment":1,"size":56.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"in the world.","weight":400,"font-stretch":400,"alignment":3,"size":59.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"Most people","weight":398,"font-stretch":68,"alignment":2,"size":58.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"exist,","weight":607,"font-stretch":400,"alignment":1,"size":59.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"that is all.","weight":201,"font-stretch":400,"alignment":1,"size":57.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false}],
        dist: [[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17]],
        noTypefaces: 1,
        res: 1,
        valid: false,
    },
    {
        textboxes: [{"content":"To live","weight":720,"font-stretch":230,"alignment":2,"size":59,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"is the rarest thing","weight":761,"font-stretch":242,"alignment":1,"size":56.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"in the world.","weight":400,"font-stretch":400,"alignment":3,"size":59.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"Most people","weight":398,"font-stretch":68,"alignment":2,"size":58.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"exist,","weight":607,"font-stretch":400,"alignment":1,"size":59.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false},{"content":"that is all.","weight":201,"font-stretch":400,"alignment":1,"size":57.047619047619044,"typeface":"Anybody","color":"#f5eeda","uppercase":false}],
        dist: [[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17],[0,[],0.1,0.17]],
        noTypefaces: 1,
        res: 0.7,
        valid: true,
    },
    {
        textboxes: [{"content":"Always forgive","weight":687,"font-stretch":307,"alignment":1,"size":71.38095238095238,"typeface":"Anybody","color":"#4c9ecb","uppercase":false},{"content":"your enemies;","weight":128,"font-stretch":100,"alignment":2,"size":69.42857142857143,"typeface":"Cabin","color":"#4c9ecb","uppercase":false},{"content":"nothing annoys","weight":128,"font-stretch":13,"alignment":3,"size":70.42857142857143,"typeface":"Cabin","color":"#4c9ecb","uppercase":false},{"content":"them","weight":634,"font-stretch":85,"alignment":2,"size":71.42857142857143,"typeface":"IBMPlexSans","color":"#4c9ecb","uppercase":false},{"content":"so much.","weight":488,"font-stretch":100,"alignment":2,"size":68.42857142857143,"typeface":"IBMPlexSans","color":"#4c9ecb","uppercase":false}],
        dist: [[1,["trust"],0.65,0.19],[3,["anger","fear","disgust"],1.9600000000000002,0.57],[1,["anger"],0.62,0.18],[0,[],0.1,0.03],[0,[],0.1,0.03]],
        noTypefaces: 8,
        res: 0.5757079035152126,
        valid: true,
    },
    {
        textboxes: [{"content":"Live as","weight":688,"font-stretch":400,"alignment":2,"size":49.42857142857142,"typeface":"Anybody","color":"#f579f7","uppercase":false},{"content":"if you were","weight":188,"font-stretch":308,"alignment":1,"size":47.52380952380952,"typeface":"Barlow","color":"#f579f7","uppercase":false},{"content":"to die tomorrow.","weight":287,"font-stretch":200,"alignment":2,"size":49.52380952380952,"typeface":"Inconsolata","color":"#f579f7","uppercase":false},{"content":"Learn as if","weight":860,"font-stretch":254,"alignment":3,"size":48.52380952380952,"typeface":"Anybody","color":"#f579f7","uppercase":false},{"content":"you were","weight":700,"font-stretch":100,"alignment":1,"size":48.52380952380952,"typeface":"IBMPlexSans","color":"#f579f7","uppercase":false},{"content":"to live","weight":719,"font-stretch":125,"alignment":3,"size":48.52380952380952,"typeface":"Amstelvar","color":"#f579f7","uppercase":false},{"content":" forever","weight":188,"font-stretch":300,"alignment":3,"size":48.52380952380952,"typeface":"Barlow","color":"#f579f7","uppercase":false}],
        dist: [[0,[],0.1,0.07],[0,[],0.1,0.07],[1,["anticipation"],0.75,0.56],[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07]],
        noTypefaces: 8,
        res: 0.6432108843537415,
        valid: true,
    },
    {
        textboxes: [{"content":"Live as","weight":688,"font-stretch":400,"alignment":2,"size":49.42857142857142,"typeface":"Anybody","color":"#f579f7","uppercase":false},{"content":"if you were","weight":188,"font-stretch":308,"alignment":1,"size":47.52380952380952,"typeface":"Barlow","color":"#f579f7","uppercase":false},{"content":"to die tomorrow.","weight":287,"font-stretch":200,"alignment":2,"size":49.52380952380952,"typeface":"Inconsolata","color":"#f579f7","uppercase":false},{"content":"Learn as if","weight":860,"font-stretch":254,"alignment":3,"size":48.52380952380952,"typeface":"Anybody","color":"#f579f7","uppercase":false},{"content":"you were","weight":700,"font-stretch":100,"alignment":1,"size":48.52380952380952,"typeface":"IBMPlexSans","color":"#f579f7","uppercase":false},{"content":"to live","weight":719,"font-stretch":125,"alignment":3,"size":48.52380952380952,"typeface":"Amstelvar","color":"#f579f7","uppercase":false},{"content":" forever","weight":188,"font-stretch":300,"alignment":3,"size":48.52380952380952,"typeface":"Barlow","color":"#f579f7","uppercase":false}],
        dist: [[0,[],0.1,0.07],[0,[],0.1,0.07],[1,["anticipation"],0.75,0.56],[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07],[0,[],0.1,0.07]],
        noTypefaces: 8,
        res: 0.8,
        valid: false,
    }
];


describe(`Testing Semantics Emphasis metric`, () => {
    for (let i in TESTING_PARAMS) {
        let params = TESTING_PARAMS[i];
        test(`Test ${i}`, async () => {
           const res = semanticsEmphasis(
                params.textboxes, params.dist, params.noTypefaces
            );

            if (params.valid) {
                expect(res).toBe(params.res);
            } else {
                expect(res).not.toBe(params.res);
            }
        });
    }
});
