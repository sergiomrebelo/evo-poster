const inputText = {
    "en": {
        divider: {
            text: "Those who make¶peaceful revolution¶impossible will¶make violent revolution¶inevitable",
            result: "Those who make¶peaceful revolution¶impossible will¶make violent revolution¶inevitable",
            modifiedText: "Those who make¶peaceful revolution¶impossible will¶make violent¶revolution¶inevitable",
            divider: "¶",
            size: {
                width: "1",
                height: "1.41",
                modifiedWidth: "0.8",
                modifiedHeight: "1.76",
            },
            margins: [0.05, 0.05, 0.05, 0.05],
            typography: {
                testingTypeface: "Amstelvar",
                mainColor: {
                    color: "#000000",
                    random: true,
                    testingColor: "#ffffff"
                },
                weight: {
                    min: 22,
                    max: 900,
                    testingMinValue: 200,
                    testingMaxValue: 500
                },
                stretch: {
                    min: 0,
                    max: 500,
                    testingMinValue: 100,
                    testingMaxValue: 300
                },
                verticalAlign: {
                    init: 0,
                    testing: "Top",
                    testingValue: 1
                },
                tbAlign: {
                    init: 0,
                    testing: "CENTER",
                    testingValue: 2
                },
                uppercase: {
                    init: false,
                    changed: true
                },
            },
            background: {
                init: 0,
                testing: "Gradient",
                testingValue: 2,
                random: true,
                colorA: "#ffffff",
                colorB: "#000000",
                TestingColorA: "#ff00ff",
                TestingColorB: "#0000ff"
            },
            evo: {
                popSize: {
                    init: 30,
                    testing: 20
                },
                noGen: {
                    init: 400,
                    testing: 300
                },
                elite: {
                    init: 1,
                    testing: 3
                },
                xover: {
                    init: 0.9,
                    testing: 0.5
                },
                mutate: {
                    init: 0.1,
                    testing: 0.3
                },
                evaluation: {
                    general: {
                        semantics: {
                            init: 0.5,
                            testing: 0.3
                        },
                        aesthetics: {
                            init: 0.5,
                            testing: 0.7
                        }
                    },
                    semantics: {
                        emphasis: {
                            init: 0.5,
                            testing: 0.3
                        },
                        layout: {
                            init: 0.5,
                            testing: 0.3
                        },
                        visuals: {
                            init: 0,
                            testing: 1
                        }
                    },
                    aesthetics: {
                        alignment: {
                            init: 0.1,
                            testing: 0.3
                        },
                        regularity: {
                            init: 0.1,
                            testing: 0.4
                        },
                        balance: {
                            init: 0.2,
                            testing: 0.5
                        },
                        whiteSpace: {
                            init: 0.2,
                            testing: 0.2
                        },
                        justification: {
                            init: 0.3,
                            testing: 0.5
                        },
                        typographyParing: {
                            init: 0.1,
                            testing: 0.2
                        }
                    }
                }
            },
            grid: true
        }
    },
}

for (let lang of Object.keys(inputText)) {
    describe(`rollup parsing test (lang: ${lang})`, () => {
        before(() => {
            let url = `http://localhost:8000`;
            cy.visit(url);
        });

        it(`generate a initial population for ${inputText["en"]["text"]}`, () => {
            // testing the input module (see parcing.cy.js)
            cy.get("#formControlTextarea").type(inputText[lang]["divider"]["text"]);
            cy.get("#formControlLang").select(lang);

            cy.get("#lineDivisionCheck").uncheck();
            cy.get("#formControlTextDelimiter").should("be.visible").valueOf(inputText[lang]["divider"]["divider"]);
            cy.get('button.btn.btn-primary.mb-2').click();
            cy.get('#bt-start-evo').click();


            // testing fields on input interface
            cy.wait(1000);
            cy.window().should('have.property', 'app');
            cy.get('#text-area-content-input').scrollIntoView();
            cy.get('#text-area-content-input').should("be.visible").contains(inputText[lang]["divider"]["result"]);


            // modify text
            cy.get('#text-area-content-input').clear();
            cy.get('#text-area-content-input').focus().type(inputText[lang]["divider"]["modifiedText"]);
            cy.get('#text-area-content-input').blur();

            // size modifier
            cy.get('#text-area-content-input').scrollIntoView();
            cy.get('#size-x-input').should('be.ok').focus().should('have.value', inputText[lang]["divider"]["size"]["width"]);
            cy.get('#size-y-input').should('be.ok').focus().should('have.value', inputText[lang]["divider"]["size"]["height"]);
            cy.get('#size-mg-l-input').should('be.ok').focus().should('have.value', inputText[lang]["divider"]["margins"][0]);
            cy.get('#size-mg-r-input').should('be.ok').focus().should('have.value', inputText[lang]["divider"]["margins"][1]);
            cy.get('#size-mg-t-input').should('be.ok').focus().should('have.value', inputText[lang]["divider"]["margins"][2]);
            cy.get('#size-mg-b-input').should('be.ok').focus().should('have.value', inputText[lang]["divider"]["margins"][3]);
            cy.get(`#size-x-input`).clear();
            cy.get(`#size-x-input`).type('{selectall}{backspace}'+inputText[lang]["divider"]["size"]["modifiedWidth"], {force: true}).blur();
            cy.get(`#size-x-input`).should('have.value', '1');
            cy.wait(100);
            cy.get(`#size-y-input`).should('have.value', inputText[lang]["divider"]["size"]["modifiedHeight"]);
            cy.get('#size-mg-b-input').scrollIntoView();
            // verify the typefaces
            cy.get(`#typeface-badge-${inputText[lang]["divider"]["typography"]["testingTypeface"]}`).should('be.visible');
            cy.get(`#typeface-badge-${inputText[lang]["divider"]["typography"]["testingTypeface"]} > span`).click();
            cy.get(`#typeface-badge-${inputText[lang]["divider"]["typography"]["testingTypeface"]}`).should('not.exist');
            cy.get('#typefaces-add-input').focus().type(inputText[lang]["divider"]["typography"]["testingTypeface"], {force: true}).blur();
            cy.get(`#typeface-badge-${inputText[lang]["divider"]["typography"]["testingTypeface"]}`).should('exist');

            // verify text colour
            cy.get('#typography-colour-picker-1').should('be.visible');
            cy.get('#random-colour-typo-check').should('be.visible');
            cy.get('#typography-colour-picker-1').should('be.disabled');
            cy.get('#random-colour-typo-check').should('be.visible').should('be.checked');
            cy.get('#random-colour-typo-check').uncheck();
            cy.get('#typography-colour-picker-1').should('not.be.disabled');

            cy.get('#typography-colour-picker-1').invoke('val', inputText[lang]["divider"]["typography"]["mainColor"]["testingColor"]).trigger('change');
            cy.get('#typography-colour-picker-1').scrollIntoView();

            // verify slider weight
            // min
            cy.get('#typeface-weight-min-slider').should('exist');
            cy.get('#typeface-weight-min-text').should('exist').invoke('val').should('eq', inputText[lang]["divider"]["typography"]["weight"]["min"]);
            cy.get('#typeface-weight-min-slider').invoke('val', inputText[lang]["divider"]["typography"]["weight"]["testingMinValue"]).trigger('change');
            cy.get('#typeface-weight-min-text').invoke('val').should('eq', inputText[lang]["divider"]["typography"]["weight"]["testingMinValue"]);
            cy.get('#typeface-weight-min-text').invoke('val', inputText[lang]["divider"]["typography"]["weight"]["min"]).trigger('change');
            cy.get('#typeface-weight-min-slider').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["typography"]["weight"]["min"]);
            // max
            cy.get('#typeface-weight-max-slider').should('exist');
            cy.get('#typeface-weight-max-text').should('exist');
            cy.get('#typeface-weight-max-slider').invoke('val', inputText[lang]["divider"]["typography"]["weight"]["testingMaxValue"]).trigger('change');
            cy.get('#typeface-weight-max-text').invoke('val').should('eq', inputText[lang]["divider"]["typography"]["weight"]["testingMaxValue"]);
            cy.get('#typeface-weight-max-text').invoke('val', inputText[lang]["divider"]["typography"]["weight"]["max"]).trigger('change');
            cy.get('#typeface-weight-max-slider').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["typography"]["weight"]["max"]);

            // verify slider stretch
            // min
            cy.get('#typeface-stretch-min-slider').should('exist');
            cy.get('#typeface-stretch-min-text').should('exist').invoke('val').should('eq', inputText[lang]["divider"]["typography"]["stretch"]["min"]);
            cy.get('#typeface-stretch-min-slider').invoke('val', inputText[lang]["divider"]["typography"]["stretch"]["testingMinValue"]).trigger('change');
            cy.get('#typeface-stretch-min-text').invoke('val').should('eq', inputText[lang]["divider"]["typography"]["stretch"]["testingMinValue"]);
            cy.get('#typeface-stretch-min-text').invoke('val', inputText[lang]["divider"]["typography"]["stretch"]["min"]).trigger('change');
            cy.get('#typeface-stretch-min-slider').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["typography"]["stretch"]["min"]);
            // max
            cy.get('#typeface-stretch-max-slider').should('exist');
            cy.get('#typeface-stretch-max-text').should('exist');
            cy.get('#typeface-stretch-max-slider').invoke('val', inputText[lang]["divider"]["typography"]["stretch"]["testingMaxValue"]).trigger('change');
            cy.get('#typeface-stretch-max-text').invoke('val').should('eq', inputText[lang]["divider"]["typography"]["stretch"]["testingMaxValue"]);
            cy.get('#typeface-stretch-max-text').invoke('val', inputText[lang]["divider"]["typography"]["stretch"]["max"]).trigger('change');
            cy.get('#typeface-stretch-max-slider').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["typography"]["stretch"]["max"]);

            // vertical alignment
            cy.get('#vertical-align-list').should('exist');
            cy.get('#vertical-align-list').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["typography"]["verticalAlign"]["init"]);
            cy.get('#vertical-align-list').select(inputText[lang]["divider"]["typography"]["verticalAlign"]["testing"]);
            cy.get('#vertical-align-list').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["typography"]["verticalAlign"]["testingValue"]);

            // textbox alignment
            cy.get('#texbox-align-list').should('exist');
            cy.get('#texbox-align-list').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["typography"]["tbAlign"]["init"]);
            cy.get('#texbox-align-list').select(inputText[lang]["divider"]["typography"]["tbAlign"]["testing"]);
            cy.get('#texbox-align-list').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["typography"]["tbAlign"]["testingValue"]);

            //background
            // style
            cy.get('#background-style-list').should('exist');
            cy.get('#background-style-list').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["background"]["init"]);
            cy.get('#background-style-list').select(inputText[lang]["divider"]["background"]["testing"]);
            cy.get('#background-style-list').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["background"]["testingValue"]);
            // colours
            cy.get('#background-colour-picker-1').should('exist').should('be.disabled');
            cy.get('#background-colour-picker-2').should('exist').should('be.disabled');
            cy.get('#bk-color-check').should('exist').should('be.checked');
            cy.get('#background-colour-picker-1').invoke('val').should('eq', inputText[lang]["divider"]["background"]["colorA"])
            cy.get('#background-colour-picker-2').invoke('val').should('eq', inputText[lang]["divider"]["background"]["colorB"])
            cy.get('#bk-color-check').uncheck();
            // TestingColorA
            cy.get('#background-colour-picker-1').should('not.be.disabled');
            cy.get('#background-colour-picker-1').invoke('val',  inputText[lang]["divider"]["background"]["TestingColorA"]).trigger('change');
            // TestingColorB
            cy.get('#background-colour-picker-2').should('not.be.disabled');
            cy.get('#background-colour-picker-2').invoke('val',  inputText[lang]["divider"]["background"]["TestingColorB"]).trigger('change');
            // check function
            cy.get('#background-style-list').select("Solid");
            cy.get('#background-colour-picker-2').should('be.disabled');

            cy.get('#background-style-list').select(inputText[lang]["divider"]["background"]["testing"]);

            // uppercase
            cy.get('#case-check').should('exist');
            cy.get('#case-check').should('not.be.checked');
            cy.get('#case-check').check();

            // grid
            cy.get('#grid-display-check').should('exist');
            cy.get('#grid-display-check').should('be.checked');
            cy.get('#grid-display-check').uncheck();


            // go to evolution panel
            cy.get('#evolve-bt').click();
            cy.get('#poster-features').should('not.be.visible');
            cy.get('#poster-tab').click();
            cy.get('#poster-features > div').should('have.class', 'disabled-inputs');
            cy.get('#evolution-tab').click();

            cy.get('#evolution-panel-inner').should('be.visible');

            // evo panel
            cy.get('#pop-size-input').should('exist');
            cy.get('#pop-size-input').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["evo"]["popSize"]["init"]);
            cy.get('#pop-size-input').invoke('val', inputText[lang]["divider"]["evo"]["popSize"]["testing"]).trigger('change');

            cy.get('#no-gen-input').should('exist');
            cy.get('#no-gen-input').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["evo"]["noGen"]["init"]);
            cy.get('#no-gen-input').invoke('val', inputText[lang]["divider"]["evo"]["noGen"]["testing"]).trigger('change');

            cy.get('#elite-size-input').should('exist');
            cy.get('#elite-size-input').invoke('val').then(parseInt).should('eq', inputText[lang]["divider"]["evo"]["elite"]["init"]);
            cy.get('#elite-size-input').invoke('val', inputText[lang]["divider"]["evo"]["elite"]["testing"]).trigger('change');

            cy.get('#crossover-probability-input').should('exist');
            cy.get('#crossover-probability-input').invoke('val').then(parseFloat).should('eq', inputText[lang]["divider"]["evo"]["xover"]["init"]);
            cy.get('#crossover-probability-input').invoke('val', inputText[lang]["divider"]["evo"]["xover"]["testing"]).trigger('change');

            cy.get('#mutation-probability-input').should('exist');
            cy.get('#mutation-probability-input').invoke('val').then(parseFloat).should('eq', inputText[lang]["divider"]["evo"]["mutate"]["init"]);
            cy.get('#mutation-probability-input').invoke('val', inputText[lang]["divider"]["evo"]["mutate"]["testing"]).trigger('change');

            // aesthetic measures
            testingField ("#evaluation-semantic-weight-input", inputText[lang]["divider"]["evo"]["evaluation"]["general"]["semantics"]);
            testingField ("#evaluation-aesthetics-weight-input", inputText[lang]["divider"]["evo"]["evaluation"]["general"]["aesthetics"]);

            testingField ("#evaluation-semantics-emphasis-weight-input", inputText[lang]["divider"]["evo"]["evaluation"]["semantics"]["emphasis"]);
            testingField ("#evaluation-semantics-layout-weight-input", inputText[lang]["divider"]["evo"]["evaluation"]["semantics"]["layout"]);
            testingField ("#evaluation-semantics-visuals-weight-input", inputText[lang]["divider"]["evo"]["evaluation"]["semantics"]["visuals"]);

            let fields = [
                `#evaluation-aesthetics-alignment-weight-input`, `#evaluation-aesthetics-regularity-weight-input`,
                `#evaluation-aesthetics-balance-weight-input`, `#evaluation-aesthetics-white-space-weight-input`,
                `#evaluation-aesthetics-justification-weight-input`, `#evaluation-aesthetics-type-paring-weight-input`
            ];

            let keys = [`alignment`, `regularity`, `balance`, `whiteSpace`, `justification`, `typographyParing`];

            for (let i in fields) {
                testingField (fields[i], inputText[lang]["divider"]["evo"]["evaluation"]["aesthetics"][keys[i]]);
            }


            cy.get('.navbar-toggler-icon').click();
            cy.wait(1000);
            cy.get('#evo-interface-inner').should('not.be.visible');
            cy.get('.navbar-toggler-icon').click();

            cy.get('#start-bt').should('not.be.disabled');
            cy.get('#stop-evolving').should('be.disabled');
            cy.get('#evolve-bt').should('not.be.visible');

            cy.get('#start-bt').click();
            cy.get('#start-bt').should('be.disabled');
            cy.get('#pop-size').should('have.class', 'disabled-inputs');
            // evolve by 5s
            cy.wait(5000);
            // stop
            cy.get('#stop-evolving').should('not.be.disabled');
            cy.get('#stop-evolving').click();

            cy.get('.navbar-toggler-icon').click();

            // verify the value on config data
            cy.window().then((w) => {
                let valueInterface = w.app.config.size.height/w.app.config.size.width;
                const configFile = parseFloat(inputText[lang]["divider"]["size"]["modifiedHeight"]);
                // FIXME

                expect(valueInterface).to.equal(configFile);

                const typefaces = w.app.config.typography.typefaces.map(x => x.family);
                expect(typefaces).to.include(inputText[lang]["divider"]["typography"]["testingTypeface"]);

                const typefaceColour = w.app.config.typography.color.value;

                expect(typefaceColour).to.equal(inputText[lang]["divider"]["typography"]["mainColor"]["testingColor"]);

                const weight = w.app.config.typography.weight;

                expect(weight.min).to.equal(inputText[lang]["divider"]["typography"]["weight"]["min"]);
                expect(weight.max).to.equal(inputText[lang]["divider"]["typography"]["weight"]["max"]);

                const stretch = w.app.config.typography.stretch;

                expect(stretch.min).to.equal(inputText[lang]["divider"]["typography"]["stretch"]["min"]);
                expect(stretch.max).to.equal(inputText[lang]["divider"]["typography"]["stretch"]["max"]);

                const textAlign = w.app.config.typography.verticalAlignment;
                expect(textAlign).to.equal(inputText[lang]["divider"]["typography"]["verticalAlign"]["testingValue"]);

                const upper = w.app.config.typography.uppercase;
                expect(upper).to.equal(inputText[lang]["divider"]["typography"]["uppercase"]["changed"]);

                const backgroundStyle = w.app.config.background.style;
                expect(backgroundStyle).to.equal(inputText[lang]["divider"]["background"]["testingValue"]);

                const backgroundColors = w.app.config.background.color;
                expect(backgroundColors.valueA).to.equal(inputText[lang]["divider"]["background"]["TestingColorA"]);
                expect(backgroundColors.valueB).to.equal(inputText[lang]["divider"]["background"]["TestingColorB"]);

                const gridValue = w.app.config.display.grid;
                expect(gridValue).to.equal(false);

                // evolutionary interface
                const popSize = w.app.config.evo.popSize;
                expect(popSize).to.equal(inputText[lang]["divider"]["evo"]["popSize"]["testing"]);

                const noGen = w.app.config.evo.noGen;
                expect(noGen).to.equal(inputText[lang]["divider"]["evo"]["noGen"]["testing"]);

                const elite = w.app.config.evo.eliteSize;
                expect(elite).to.equal(inputText[lang]["divider"]["evo"]["elite"]["testing"]);

                const xoverProb = w.app.config.evo.crossoverProb;
                expect(xoverProb).to.equal(inputText[lang]["divider"]["evo"]["xover"]["testing"]);

                const mutateProb = w.app.config.evo.mutationProb;
                expect(mutateProb).to.equal(inputText[lang]["divider"]["evo"]["mutate"]["testing"]);

                cy.end();
            });

            cy.on("uncaught:exception", (e, runnable) => {
                console.log("error", e);
                console.log("runnable", runnable);
                return false;
            });
        });

    });
}


const testingField = (id,obj) => {
    cy.get(id).should('exist');
    cy.get(id).invoke('val').then(parseFloat).should('eq', obj["init"]);
    cy.get(id).invoke('val', obj["testing"]).trigger('change');

}