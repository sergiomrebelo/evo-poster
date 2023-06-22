const inputText = {
  "en": {
    automatic: {
      text: "Those who make peaceful revolution impossible will make violent revolution inevitable",
      sentences: "Those who make peaceful,revolution impossible will,make violent",
      global: "disgust (1.18)",
      first: "[0] Those who make peaceful (trust, 0.6)",
      lexicon: "anger (2.06)"
    },
    divider : {
      text: "Those who make peaceful revolution impossible¶will make violent revolution inevitable",
      sentences: "Those who make peaceful revolution impossible,will make violent revolution inevitable (2)",
      divider: "¶",
      global: "disgust (1.18)",
      first: "[0] Those who make peaceful revolution impossible (anticipation, 1.07)",
      lexicon: "anger (2.06)"
    }
  }
}

for (let lang of Object.keys(inputText)) {
  // automatic line
  describe(`rollup parsing test (lang: ${lang})`, () => {
    beforeEach(() => {
      cy.visit("http://localhost:8000")
    })

    it('automatic division of input text', () => {
      cy.get("#formControlTextarea").type(inputText[lang]["automatic"]["text"]);
      cy.get("#formControlLang").select(lang);
      cy.get('button.btn.btn-primary.mb-2').click();

      // results
      cy.get('#temp-res-sentences').should("be.visible").contains(inputText[lang]["automatic"]["sentences"]);
      cy.get('#temp-res-classification').should("be.visible").contains(inputText[lang]["automatic"]["global"]);
      cy.get('#temp-res-lexicon-lines').should("be.visible");
      cy.get('#temp-res-lexicon-lines').first().contains(inputText[lang]["automatic"]["first"]);
      cy.get('#temp-res-lexicon-global').should("be.visible").contains(inputText[lang]["automatic"]["lexicon"]);

      // input images
    });

    it (`predefined division of input text`, () => {
      cy.get("#formControlTextarea").type(inputText[lang]["divider"]["text"]);
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