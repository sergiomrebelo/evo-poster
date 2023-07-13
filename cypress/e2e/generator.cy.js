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
                    random: true
                },
                weight: {
                    min: 22,
                    max: 900
                },
                stretch: {
                    min: 0,
                    max: 500
                },
                verticalAlign: "Random",
                uppercase: true,
            },
            background: {
                style: "Random",
                random: true,
                colorA: "#ffffff",
                colorB: "#000000"
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

        it('generate a initial population', () => {
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

            // TODO: CHECK IF TEXTBOX SIZE CHANGE

            // size modifier
            cy.get('#text-area-content-input').scrollIntoView();
            cy.get('#size-x-input').should('be.ok').focus().should('have.value', inputText[lang]["divider"]["size"]["width"]);
            cy.get('#size-y-input').should('be.ok').focus().should('have.value', inputText[lang]["divider"]["size"]["height"]);
            cy.get('#size-mg-l-input').should('be.ok').focus().should('have.value', inputText[lang]["divider"]["margins"][0]);
            cy.get('#size-mg-r-input').should('be.ok').focus().should('have.value', inputText[lang]["divider"]["margins"][1]);
            cy.get('#size-mg-t-input').should('be.ok').focus().should('have.value', inputText[lang]["divider"]["margins"][2]);
            cy.get('#size-mg-b-input').should('be.ok').focus().should('have.value', inputText[lang]["divider"]["margins"][3]);

            // modify value
            cy.get(`#size-x-input`).clear();
            cy.get(`#size-x-input`).type('{selectall}{backspace}'+inputText[lang]["divider"]["size"]["modifiedWidth"], {force: true}).blur();
            cy.get(`#size-x-input`).should('have.value', '1');
            cy.get(`#size-y-input`).should('have.value', inputText[lang]["divider"]["size"]["modifiedHeight"]);
            cy.get('#size-mg-b-input').scrollIntoView();

            // verify this typeface
            // cy.getAllLocalStorage()
            // Amstelvar
            // testingTypeface
            cy.get(`#typeface-badge-${inputText[lang]["divider"]["typography"]["testingTypeface"]}`).should('be.visible');
            cy.get(`#typeface-badge-${inputText[lang]["divider"]["typography"]["testingTypeface"]} > span`).click();
            cy.get(`#typeface-badge-${inputText[lang]["divider"]["typography"]["testingTypeface"]}`).should('not.exist');
            cy.get('#typefaces-add-input').focus().type(inputText[lang]["divider"]["typography"]["testingTypeface"], {force: true}).blur();
            cy.get(`#typeface-badge-${inputText[lang]["divider"]["typography"]["testingTypeface"]}`).should('exist');

            // colour
            cy.get('#typography-colour-picker-1').should('be.visible');
            cy.get('#random-colour-typo-check').should('be.visible');
            cy.get('#random-colour-typo-check').should('be.visible').should('be.checked');
            cy.get('#random-colour-typo-check').uncheck();
            // cy.get('#typography-colour-picker-1').focus();





            /*console.log(cy.get('#size-x-input').valueOf());
            cy.get('#size-y-input').should("be.visible").contains(inputText[lang]["divider"]["size"]["height"]);

            cy.get('#size-x-input').type ("aaaa");
            cy.get('#size-x-input').contains(inputText[lang]["divider"]["size"]["width"]);

            cy.get('#size-y-input').clear().type("2");*/

            // TODO: CHECK IF HEIGHT CHANGE

            // testing results on input interface
            // change width and scretch and see if change in the two sides

            // testing evolutionary features

            cy.end();
        });

    });
}