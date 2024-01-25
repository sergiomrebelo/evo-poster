const TESTING_EXAMPLES = [
    {
        text: `Without Music,¶life Would Be¶A Mistake`,
        author: `Friedrich Nietzsche`,
        lang: `en`,
        book: `Twilight of the Idols`
    },
    {
        text: `A Viagem¶Não Acaba¶Nunca.¶Só Os Viajantes¶Acabam.`,
        author: `José Saramago`,
        lang: `pt`,
        book: `Journey to Portugal`
    },
    {
        text: `Nothing¶Strengthens Authority¶So Much¶As Silence`,
        author: `Leonardo da Vinci`,
        lang: `en`,
        book: `tbd`
    },
    {
        text: `You Matter.¶You Are Loved.¶You Are Okay.`,
        author: ``,
        lang: `en`,
        book: `tbd`
    },
    {
        text: `System Change¶Not¶Climate Change!`,
        author: `poster`,
        lang: `en`,
        book: `tbd`
    },
    {
        text: `The Climate¶is Changing;¶Why Aren't We?`,
        author: `poster`,
        lang: `en`,
        book: `tbd`
    },
    {
        text: `WE NEED¶HUMAN¶CHANGE¶NOT¶CLIMATE CHANGE¶¶THE WORLD¶NEEDS US`,
        author: `poster`,
        lang: `en`,
        book: `tbd`
    },
    {
        text: `There Is¶Still Time!`,
        author: `poster`,
        lang: `en`,
        book: `tbd`
    },
    {
        text: `La Lutte¶Continue`,
        lang: `fr`,
        author: `poster`,
        book: `tbd`
    },
    {
        text: `La Beuté¶Est Dans¶la Rue`,
        lang: `fr`,
        author: `poster`,
        book: `tbd`
    },
    {
        text: `Amerika is¶Devouring¶its Children`,
        lang: `en`,
        author: `jay belloli`,
        book: `tbd (1970)`
    },
    {
        text: `People¶and Planet¶¶Not Pipelines¶and Prisons`,
        lang: `en`,
        author: ``,
        book: `tbd`
    },
    {
        text: `Hate¶Kills¶the¶Soul`,
        lang: `en`,
        author: ``,
        book: `tbd`
    },
    {
        text: `End Police¶Brutality¶¶Black Lives¶Matter¶¶No Justice¶No Peace`,
        lang: `en`,
        author: ``,
        book: `tbd`
    },
    {
        text: `Everything¶Will Change¶Everyone¶Can Change`,
        lang: `en`,
        author: ``,
        book: `tbd`
    },
    {
        text: `Freedom¶Yeah! Right!¶Freedom¶Yeah! Right!¶Freedom¶Yeah! Right!¶Freedom¶Yeah! Right!`,
        lang: `en`,
        author: ``,
        book: `tbd`
    },
    {
        text: `Be On¶The Right¶Side Of¶History`,
        lang: `en`,
        author: `Be On The Right Side Of History`,
        book: `tbd`
    },
    {
        text: `Girls Just¶Want To Have¶Fundamental¶Rights`,
        lang: `en`,
        author: `Be On The Right Side Of History`,
        book: `tbd`
    },
    {
        text: `Sea Feliz¶¶(No Joda al Proximo)`,
        lang: `es`,
        author: `Be On The Right Side Of History`,
        book: `tbd`
    },
    {
        text: `Educação¶Não É Gasto,¶É Investimento!`,
        lang: `pt`,
        author: `n/a`,
        book: `tbd`
    },
    {
        text: `TODAY IS¶GOING TO¶BE A¶GOOD DAY!`,
        lang: `en`,
        author: `n/a`,
        book: `tbd`
    },
    {
        text: `The Words¶You Speak¶Become¶The House¶You Live In`,
        lang: `en`,
        author: `n/a`,
        book: `tbd`
    },
    {
        text: `I'm sad¶but I¶Smile.¶That's¶my Life.`,
        lang: `en`,
        author: `n/a`,
        book: `tbd`
    },
    {
        text: `Don't¶Look¶Back¶In¶Anger`,
        lang: `en`,
        author: `n/a`,
        book: `tbd`
    },
    {
        text: `War¶is¶Over!¶¶¶If You Want It`,
        lang: `en`,
        author: `n/a`,
        book: `tbd`
    },

]

const EVAL_SET = [
    [1, 0], [0.5, 0.5], [0, 1]
];

// [0.25, 0.75] --> all metric with the same weight

const N_TIMES = 2;
const IMAGES_LOG = `END`;
const ELITE = 1;

const CURRENT_EVAL = 0;
const CURRENT_TEXT = 5; // 18 not wokring
// 11, 1 --> generate again


// check if system is evolving
let checkingInterval;


let e = TESTING_EXAMPLES[CURRENT_TEXT];
for (let j=8; j<9; j++) {
    let e = TESTING_EXAMPLES[j];
    describe(`testing no. ${j}`, () => {
        beforeEach(() => {
            cy.visit(`http://localhost:8000`);
        });
        afterEach(() => {
            cy.reload();
            Cypress.config("firstRun", true);
        });

        for (let i = 0; i < N_TIMES; i++) {
            it(`a new poster for the text ${e.text} (test no. ${i})`, () => {
                cy.window().then((w) => {
                    cy.window().should('have.property', 'app');
                    w.app.config.log.save = true;
                    w.app.config.log.saveImages = IMAGES_LOG;
                    evolve(e.text, e.lang, ELITE, EVAL_SET[CURRENT_EVAL]);
                });
            });
        }


    });
}


const evolve = (text, lang = "en", elite = 0, EVAL_SET = [0.5, 0.5]) => {
    cy.get("#formControlTextarea").type(text);
    cy.get(`#formControlLang`).select(lang);
    cy.get("#lineDivisionCheck").uncheck();
    cy.get('button.btn.btn-primary.mb-2').click();

    cy.get('#bt-start-evo').click();
    cy.get(`#grid-display-check`).uncheck();

    cy.get(`#random-colour-typo-check`).uncheck();
    cy.get(`#bk-color-check`).uncheck();
    cy.get(`#background-style-list`).select(`Solid`);


    cy.get('#evolve-bt').click();
    cy.get(`#evaluation-semantic-weight-input`).invoke(`val`, EVAL_SET[0]).trigger(`change`).then(() => {
        cy.get(`#evaluation-aesthetics-weight-input`).invoke(`val`, EVAL_SET[1]).trigger(`change`).then(() => {
            cy.get('#elite-size-input').invoke('val', elite).trigger('change').then(() => {
                cy.get('#start-bt').click();
                cy.get('.navbar-toggler-icon').click();
                cy.window().then((w) => {
                    // evolving
                    cy.wrap(isEvolving(w.app.population), {timeout: 600000}).then((res) => {
                        console.log(`evolution is complete (no. generations=${res.nGen})`);
                    })
                });
            });
        })
    });
}

const isEvolving = async (pop) => {
    return new Promise((resolve, reject) => {
        try {
            checkingInterval = setInterval(() => {
                if (!pop.evolving) {
                    try {
                        clearInterval(checkingInterval);
                        resolve({
                            type: 'success',
                            nGen: pop.generations
                        });
                    } catch (err) {
                        reject(`rejected inside=${err}`);
                    }
                }
            }, 10000);
        } catch (err) {
            reject(`rejected outside=${err}`);
        }
    });
}
