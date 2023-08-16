const TESTING_EXAMPLES = [
    {text: `Never Mind¶The Bollocks,¶Here's the¶Sex Pistols`},
    {text: `The children¶almost broken¶by the world¶become the adults¶most likely¶to change it`}
]

const EVAL_SET = [
    [1,0], [0.75, 0.25], [0.5,0.5], [0.25,0.75], [0,1]
];

const N_TIMES = 10;
const IMAGES_LOG = `END`;
const ELITE = 1;


// check if system is evolving
let checkingInterval;

for (let i in TESTING_EXAMPLES) {
    let e = TESTING_EXAMPLES[i];
    describe(`testing no. ${i} (elitist Mode)`, () => {
        beforeEach(() => {
            cy.visit(`http://localhost:8000`);
        });

        for (let i=0; i<N_TIMES; i++) {
            it(`a new poster for the text ${e.text} (test no. ${i})`, () => {
                cy.window().then((w) => {
                    cy.window().should('have.property', 'app');
                    w.app.config.log.save = true;
                    w.app.config.log.saveImages = IMAGES_LOG;
                    evolve(e.text, ELITE, EVAL_SET[0]);
                });
            });
        }
    });
}


const evolve = (text, elite = 0, EVAL_SET = [0.5,0.5]) => {
    cy.get("#formControlTextarea").type(text);
    cy.get("#lineDivisionCheck").uncheck();
    cy.get('button.btn.btn-primary.mb-2').click();
    cy.get('#bt-start-evo').click();
    cy.get('#evolve-bt').click();
    cy.get(`#evaluation-semantic-weight-input`).invoke(`val`, EVAL_SET[0]).trigger(`change`).then( () => {
        cy.get(`#evaluation-aesthetics-weight-input`).invoke(`val`, EVAL_SET[1]).trigger(`change`).then(() => {
            cy.get('#elite-size-input').invoke('val', elite).trigger('change').then(() => {
                cy.get('#start-bt').click();
                cy.get('.navbar-toggler-icon').click();
                cy.window().then((w) => {
                    // evolving
                    cy.wrap(isEvolving(w.app.population), { timeout: 600000 }).then((res) => {
                        console.log (`evolution is complete (no. generations=${res.nGen})`);
                    })
                });
            });
        })
    });
}

const isEvolving = async (pop) => {
    return new Promise((resolve, reject) => {
        checkingInterval = setInterval(() => {
            if (!pop.evolving) {
                clearInterval(checkingInterval);
                resolve({
                    type: 'success',
                    nGen: pop.generations
                })
            }
        }, 10000)
    });
}
