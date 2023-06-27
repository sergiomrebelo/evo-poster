const inputText = {
    "en": {
        automatic: {
            text: "Those who make peaceful revolution impossible will make violent revolution inevitable",
            sentences: "Those who make peaceful,revolution impossible will,make violent",
            global: "disgust (1.18)",
            first: "[0] Those who make peaceful (trust, 0.6)",
            lexicon: "anger (2.06)"
        },
        divider: {
            text: "Those who make peaceful revolution impossible¶will make violent revolution inevitable",
            sentences: "Those who make peaceful revolution impossible,will make violent revolution inevitable (2)",
            divider: "¶",
            global: "disgust (1.18)",
            first: "[0] Those who make peaceful revolution impossible (anticipation, 1.07)",
            lexicon: "anger (2.06)"
        }
    },
    "pt": {
        automatic: {
            text: "Aqueles que tornam a revolução pacífica impossível tornarão a revolução violenta inevitável",
            sentences: "Aqueles que tornam a revolução,pacífica impossível,tornarão a revolução,violenta inevitável (4)",
            global: "disgust (1.14)",
            first: "[0] Aqueles que tornam a revolução (surprise, 0.66)",
            lexicon: "anger (2.06)"
        },
        divider: {
            text: "Aqueles que tornam a¶revolução pacífica impossível tornarão¶a revolução violenta inevitável",
            sentences: "Aqueles que tornam a,revolução pacífica impossível tornarão,a revolução violenta inevitável (3)",
            divider: "¶",
            global: "disgust (1.14)",
            first: "[0] Aqueles que tornam a (neutral, 0)",
            lexicon: "anger (2.06)"
        }
    },
    "es": {
        automatic: {
            text: "Los que hacen imposible,la revolución pacífica,harán inevitable la revolución violenta.",
            sentences: "Los que hacen",
            global: "disgust (1.24)",
            first: "[0] Los que hacen (neutral, 0)",
            lexicon: "anger (2.06)"
        },
        divider: {
            text: "Los que hacen imposible¶la revolución pacífica¶harán inevitable la revolución violenta",
            sentences: "Los que hacen imposible,la revolución pacífica,harán inevitable la revolución violenta (3)",
            divider: "¶",
            global: "disgust (1.14)",
            first: "[0] Los que hacen imposible (sadness, 0.5)",
            lexicon: "anger (2.06)"
        }
    }
}

const b = false; //only to test old version

for (let lang of Object.keys(inputText)) {
    // automatic line
    describe(`rollup parsing test (lang: ${lang})`, () => {
        beforeEach(() => {
            let url = `http://localhost:8000`;
            if (b) {
                url = `http://localhost:8000/browserify/`;
            }
            cy.visit(url);
        })

        it('automatic division of input text', () => {
            cy.get("#formControlTextarea").type(inputText[lang]["automatic"]["text"]);
            cy.get("#formControlLang").select(lang);

            // input images
            if (!b) {
                cy.get('#formControlImages').selectFile('cypress/e2e/files/image-testing-no.png');
                cy.get('#err-message').should("be.visible").contains("size bigger than");

                cy.get('#formControlImages').selectFile('cypress/e2e/files/image-testing-pass-1.png');
                cy.get("#input-images-headline").should("be.visible");
                cy.get("#input-images").should("be.visible");
                cy.get("#input-images").first().find('img');


                cy.get('#formControlImages').selectFile('cypress/e2e/files/image-testing-no-1.png');
                cy.get('#err-message').should("be.visible").contains("size bigger than");


                cy.get('#formControlImages').selectFile('cypress/e2e/files/image-testing-pass-2.png');
                cy.get("#input-images-headline").should("be.visible");
                cy.get("#input-images").should("be.visible");
                cy.get("#input-images").first().find('img');


                cy.get('#formControlImages').selectFile('cypress/e2e/files/image-testing-no-3.txt');
                cy.get('#err-message').should("be.visible").contains("error loading the following image(s)");


                cy.get('#formControlImages').selectFile(['cypress/e2e/files/image-testing-pass-2.png', 'cypress/e2e/files/image-testing-pass-1.png']);
                cy.get("#input-images-headline").should("be.visible");
                cy.get("#input-images").should("be.visible");
                cy.get("#input-images").find('img').should('have.length', 2);
            }

            cy.get("#formControlLang").select(lang);

            cy.get('button.btn.btn-primary.mb-2').click();

            // results
            cy.get('#temp-res-sentences', {timeout: 500000}).should("be.visible").contains(inputText[lang]["automatic"]["sentences"]);
            cy.get('#temp-res-classification', {timeout: 500000}).should("be.visible").contains(inputText[lang]["automatic"]["global"]);
            cy.get('#temp-res-lexicon-lines', {timeout: 500000}).should("be.visible");
            cy.get('#temp-res-lexicon-lines', {timeout: 500000}).first().contains(inputText[lang]["automatic"]["first"]);
            cy.get('#temp-res-lexicon-global', {timeout: 500000}).should("be.visible").contains(inputText[lang]["automatic"]["lexicon"],);


        });

        it(`predefined division of input text`, () => {
            cy.get("#formControlTextarea").type(inputText[lang]["divider"]["text"]);
            cy.get("#formControlLang").select(lang);

            cy.get("#lineDivisionCheck").uncheck();
            cy.get("#formControlTextDelimiter").should("be.visible").valueOf(inputText[lang]["divider"]["divider"]);
            cy.get('button.btn.btn-primary.mb-2').click();

            cy.get('#temp-res-sentences').should("be.visible").contains(inputText[lang]["divider"]["sentences"]);
            cy.get('#temp-res-classification').should("be.visible").contains(inputText[lang]["divider"]["global"]);
            cy.get('#temp-res-lexicon-lines').should("be.visible");
            cy.get('#temp-res-lexicon-lines').first().contains(inputText[lang]["divider"]["first"]);
            cy.get('#temp-res-lexicon-global').should("be.visible").contains(inputText[lang]["divider"]["lexicon"]);
        });

    });
}