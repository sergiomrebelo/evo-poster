import 'cypress-wait-until';

const TESTING_EXAMPLES = [
    {text: `Never Mind¶The Bollocks,¶Here's the¶Sex Pistols`},
    {text: `The children¶almost broken¶by the world¶become the adults¶most likely¶to change it`}
]

// check if system is evolving
let checkingInterval;

for (let i in TESTING_EXAMPLES) {
    let e = TESTING_EXAMPLES[i];
    describe(`testing no. ${i} (elitist Mode)`, () => {
        beforeEach(() => {
            cy.visit(`http://localhost:8000`);
        });

        it(`a new poster for the text ${e.text} (elite = 1)`, () => {
            evolve(e.text, 1);
        });

        it(`a new poster for the text ${e.text} (no elite)`, () => {
            evolve(e.text, 0);
        });
    });
}


const evolve = (text, elite = 0) => {
    cy.get("#formControlTextarea").type(text);
    cy.get("#lineDivisionCheck").uncheck();
    cy.get('button.btn.btn-primary.mb-2').click();
    cy.get('#bt-start-evo').click();
    cy.get('#evolve-bt').click();
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
