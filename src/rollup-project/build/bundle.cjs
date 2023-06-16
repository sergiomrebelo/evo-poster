'use strict';

const paragraphContainer = (
    info = [], title= null, classes = [], id = null
) => {
    const container = document.createElement("div");

    if (title !== null) {
        const titleContainer = headline("h3", title, ["d-inline"]);
        container.appendChild(titleContainer);
    }

    const p = document.createElement("p");

    for (let c of classes) {
        p.classList.add(c);
    }

    if (id !== null) {
        p.id = id;
    }

    container.appendChild(p);
    return container;
};

const headline = (
    type = "h3", text, classes = [], id = null
) => {
    const headline = document.createElement(type);
    for (let c of classes) {
        headline.classList.add(c);
    }
    if (id !== null) headline.id = id;
    headline.textContent = text;
    return headline;
};

const container = (
    type = "div", classes = [], id = null
) => {
    const container = document.createElement(type);
    for (let c of classes) {
        container.classList.add(c);
    }
    if (id !== null) container.id = id;

    return container;
};

const resultsContainer = () => {
    const containerOuter = container("div", ["temp-results","container-fluid","bg-light"],"temp-info");
    const containerInner = container("div", ["row"]);
    const mainSection = container("section", ["col-10", "offset-1", "my-5"]);

    const h1 = headline ("h1", `Emotional analysis Results`, ["mb-3"]);
    mainSection.appendChild(h1);

    // create only when it shows results
    const inputText = paragraphContainer("","Text:", ["d-inline"], "temp-res-text");
    mainSection.appendChild(inputText);

    const resultingSentences = paragraphContainer("","Sentences:", ["d-inline"], "temp-res-sentences");
    mainSection.appendChild(resultingSentences);

    const classificationResults = paragraphContainer("","Classification results::", ["d-inline"], "temp-res-classification");
    mainSection.appendChild(classificationResults);

    const lexiconResultsContainer = container("div", ["mt-4"]);
    const lexiconHeadline = headline("h3", "Lexicon results");
    const lexiconResultsLines = container("div", [], "temp-res-lexicon-lines");
    const lexiconGlobalResult = paragraphContainer("", null, [], "temp-res-lexicon-global");

    lexiconResultsContainer.appendChild(lexiconHeadline);
    lexiconResultsContainer.appendChild(lexiconResultsLines);
    lexiconResultsContainer.appendChild(lexiconGlobalResult);
    mainSection.appendChild(lexiconResultsContainer);

    const inputImagesContainer = container("div", ["mt-4", "d-none"], "input-images");
    mainSection.appendChild(inputImagesContainer);

    containerOuter.appendChild(mainSection);
    containerOuter.appendChild(containerInner);

    return containerOuter;
};

const inputForm = () => {
    const containerOuter = container("aside", ["container-fluid"]);
    const containerInner = container("div", ["row"]);
    const mainSection = container("section", ["input-form-outer", "col-10","offset-1", "mt-5"]);

    const h1 = headline ("h1", `FORM`, ["mb-3"]);
    mainSection.appendChild(h1);

    containerOuter.appendChild(mainSection);
    containerOuter.appendChild(containerInner);
    return containerOuter;
};

class App {
    constructor()  {
        this.images = {
            "imageRandomPlacement": true,
            "hasImages": false,
            "blobs": [],
            "amount": 0,
            "loading": false,
            "randomPlacement": false
        };
        this.text = null;
        this.screen = 0;

        this.init();
    }

    init = () => {
        const resultsScreen = resultsContainer();
        const formInput = inputForm();
        // screen.style(style);
        document.body.appendChild(resultsScreen);
        document.body.appendChild(formInput);
    }


}

window.onload = () => {
    new App();
};

module.exports = App;
