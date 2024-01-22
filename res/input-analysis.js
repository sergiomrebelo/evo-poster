const TESTING_EXAMPLES = [
    {
        text: `Without Music,¶life Would Be¶A Mistake`,
        author: `Friedrich Nietzsche`,
        lang: `en`,
        book: `Twilight of the Idols`,
        analysis: {
            lexicon: ["joy", 0.53],
            lines: [["joy", 0.53], ["neutral", 0], ["neutral", 0]],
            global: ["joy", 0.91]
        }
    },
    {
        text: `A Viagem¶Não Acaba¶Nunca.¶Só Os Viajantes¶Acabam.`,
        author: `José Saramago`,
        lang: `pt`,
        book: `Journey to Portugal`,
        analysis: {
            lexicon: ["anticipation", 0.71],
            lines: [["anticipation", 0.71], ["neutral", 0], ["neutral", 0], ["neutral", 0], ["neutral", 0]],
            global: ["optimism", 1]
        }
    },
    {
        text: `Nothing¶Strengthens Authority¶So Much¶As Silence`,
        author: `Charles de Gaulle`,
        lang: `en`,
        book: `tbd`,
        analysis: {
            lexicon: ["trust", 1.06],
            lines: [["neutral", 0], ["trust", 1.06], ["neutral", 0], ["neutral", 0]],
            global: ["neutral", 0]
        }
    },
    {
        text: `You Matter.¶You Are Loved.¶You Are Okay.`,
        author: ``,
        lang: `en`,
        book: `tbd`,
        analysis: {
            lexicon: ["joy", 0.83],
            lines: [["neutral", 0], ["joy", 0.83], ["neutral", 0]],
            global: ["surprise", 0.51]
        }
    },
    {
        text: `System Change¶Not¶Climate Change!`,
        author: `poster`,
        lang: `en`,
        book: `tbd`,
        analysis: {
            lexicon: ["neutral", 0],
            lines: [["neutral", 0], ["neutral", 0], ["neutral", 0]],
            global: ["neutral", 0]
        }
    },
    {
        text: `The Climate¶is Changing;¶Why Aren't We?`,
        author: `poster`,
        lang: `en`,
        book: `tbd`,
        analysis: {
            lexicon: ["neutral", 0],
            lines: [["neutral", 0], ["neutral", 0], ["neutral", 0]],
            global: ["neutral", 0]
        }
    },
    {
        text: `WE NEED¶HUMAN¶CHANGE¶NOT¶CLIMATE CHANGE¶¶THE WORLD¶NEEDS US`,
        author: `poster`,
        lang: `en`,
        book: `tbd`,
        analysis: {
            lexicon: ["neutral", 0],
            lines: [["neutral", 0], ["neutral", 0], ["neutral", 0], ["neutral", 0], ["neutral", 0], ["neutral", 0], ["neutral", 0]],
            global: ["neutral", 0]
        }
    },
    {
        text: `There Is¶Still Time!`,
        author: `poster`,
        lang: `en`,
        book: `tbd`,
        analysis: {
            lexicon: ["anticipation", 0.52],
            lines: [["neutral", 0], ["anticipation", 0.52]],
            global: ["sadness", 0.63]
        }
    },
    {
        text: `La Lutte¶Continue`,
        lang: `fr`,
        author: `poster`,
        book: `tbd`,
        analysis: {
            lexicon: ["fear", 0.72],
            lines: [["fear", 0.72], ["neutral", 0]],
            global: ["neutral", 0]
        }
    },
    {
        text: `La Beuté¶Est Dans¶la Rue`,
        lang: `fr`,
        author: `poster`,
        book: `tbd`,
        analysis: {
            lexicon: ["neutral", 0],
            lines: [["neutral", 0], ["neutral", 0], ["neutral", 0]],
            global: ["neutral", 0]
        }
    },
    {
        text: `Amerika is¶Devouring¶its Children`,
        lang: `en`,
        author: `jay belloli`,
        book: `tbd (1970)`,
        analysis: {
            lexicon: ["anticipation", 0.52],
            lines: [["neutral", 0], ["neutral", 0], ["anticipation", 0.52]],
            global: ["joy", 0.59]
        }
    },
    {
        text: `People¶and Planet¶¶Not Pipelines¶and Prisons`,
        lang: `en`,
        author: ``,
        book: `tbd`,
        analysis: {
            lexicon: ["fear", 0.63],
            lines: [["neutral", 0], ["neutral", 0],["neutral", 0], ["neutral", 0],["fear", 0.63]],
            global: ["sadness", 0.72]
        }
    },
    {
        text: `Hate¶Kills¶the¶Soul`,
        lang: `en`,
        author: ``,
        book: `tbd`,
        analysis: {
            lexicon: ["sadness", 1.46],
            lines: [["anger", 0.83], ["fear", 0.96],["neutral", 0], ["neutral", 0]],
            global: ["disgust", 0.72]
        }
    },
    {
        text: `End Police¶Brutality¶¶Black Lives¶Matter¶¶No Justice¶No Peace`,
        lang: `en`,
        author: ``,
        book: `tbd`,
        analysis: {
            lexicon: ["fear", 1.77],
            lines: [["anger", 0.83], ["fear", 0.83],["neutral", 0], ["neutral", 0], ["neutral", 0], ["neutral", 0], ["neutral", 0], ["fear", 0.94]],
            global: ["disgust", 0.72]
        }
    },
    {
        text: `Everything¶Will Change¶Everyone¶Can Change`,
        lang: `en`,
        author: ``,
        book: `tbd`,
        analysis: {
            lexicon: ["neutral", 0],
            lines: [["neutral", 0], ["neutral", 0], ["neutral", 0], ["neutral", 0]],
            global: ["neutral", 0]
        }
    },
    {
        text: `Freedom¶Yeah! Right!¶Freedom¶Yeah! Right!¶Freedom¶Yeah! Right!¶Freedom¶Yeah! Right!`,
        lang: `en`,
        author: ``,
        book: `tbd`,
        analysis: {
            lexicon: ["trust", 2.96],
            lines: [["trust", 0.74], ["neutral", 0], ["trust", 0.74], ["neutral", 0], ["trust", 0.74],  ["neutral", 0], ["trust", 0.74],  ["neutral", 0]],
            global: ["neutral", 0]
        }
    },
    {
        text: `Be On¶The Right¶Side Of¶History`,
        lang: `en`,
        author: `Be On The Right Side Of History`,
        book: `tbd`,
        analysis: {
            lexicon: ["neutral", 0],
            lines: [["neutral", 0], ["neutral", 0], ["neutral", 0], ["neutral", 0]],
            global: ["neutral", 0]
        }
    },
    {
        text: `Girls Just¶Want To Have¶Fundamental¶Rights`,
        lang: `en`,
        author: `Be On The Right Side Of History`,
        book: `tbd`,
        analysis: {
            lexicon: ["trust", 0.69],
            lines: [["neutral", 0], ["neutral", 0], ["trust", 0.69], ["neutral", 0]],
            global: ["disgust", 0.8]
        }
    },
    {
        text: `Educação¶Não É Gasto,¶É Investimento!`,
        lang: `pt`,
        author: `n/a`,
        book: `tbd`,
        analysis: {
            lexicon: ["neutral", 0],
            lines: [["neutral", 0], ["neutral", 0], ["neutral", 0]],
            global: ["anticipation", 0.52]
        }
    },
    {
        text: `TODAY IS¶GOING TO¶BE A¶GOOD DAY!`,
        lang: `en`,
        author: `n/a`,
        book: `tbd`,
        analysis: {
            lexicon: ["trust", 0.62],
            lines: [["neutral", 0], ["neutral", 0], ["neutral", 0], ["trust", 0.62]],
            global: ["joy", 0.8]
        }
    },
]

console.group(`INPUT STATS`);
console.log (`no. of text= ${TESTING_EXAMPLES.length}`)

const average = {
    "words": 0,
    "characters": 0,
    "lines": 0
};

const values = {
    "max": Number.MIN_VALUE,
    "min": Number.MAX_VALUE
}

const lang = [];
const lexicon = [];
const global = [];

for (let txt of TESTING_EXAMPLES) {
    const lines = (txt["text"].match(new RegExp("¶", "g")) || []).length + 1;
    const txtnd = txt.text.replaceAll(`¶`, ` `);
    const words = txtnd.split(` `);
    const chars = txtnd.trim().length;

    if (!lang.includes(txt.lang)) {
        lang.push(txt.lang);
    }

    if (chars > values["max"]) {
        values["max"] = chars;
    }

    if (chars < values["min"]) {
        values["min"] = chars;
    }

    if (!lexicon.includes(txt.analysis.lexicon[0])) {
        lexicon.push(txt.analysis.lexicon[0]);
    }

    if (!global.includes(txt.analysis.global[0])) {
        global.push(txt.analysis.global[0]);
    }
    average["words"] += words.length;
    average["characters"] += chars;
    average["lines"] += lines;
}

for (let key of Object.keys(average)) {
    average[key] /= TESTING_EXAMPLES.length;
}

console.log(average);
console.log(values);
console.log (lang);
console.log (`global=`, global);
console.log (`lexicon=`, lexicon);

console.groupEnd();