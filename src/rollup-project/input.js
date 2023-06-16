import style from './main.css';
import {container, headline, paragraphContainer} from './components/textContainer.js'

export const resultsContainer = () => {
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
}

export const inputForm = () => {
    const containerOuter = container("aside", ["container-fluid"]);
    const containerInner = container("div", ["row"]);
    const mainSection = container("section", ["input-form-outer", "col-10","offset-1", "mt-5"]);

    const inputTextAreaContainer = container("div", ["form-group", "row", "mb-2"]);
    const inputTextArea = document.createElement("textarea");
    inputTextArea.id = `formControlTextarea`;
    inputTextArea.classList.add("form-control", "col-sm-10");
    inputTextArea.required = true;
    inputTextArea.rows = 6;

    const inputTextAreaLabel = createLabel(inputTextArea.id, "Input Text", ["col-sm-2","col-form-label-sm"])

    inputTextAreaContainer.appendChild(inputTextAreaLabel);
    inputTextAreaContainer.appendChild(inputTextArea);
    mainSection.appendChild(inputTextAreaContainer);

    //HERE


    containerOuter.appendChild(mainSection);
    containerOuter.appendChild(containerInner);
    return containerOuter;
}


export const createLabel = (id, textContent, classes = []) => {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = textContent;
    for (let c of classes) {
        label.classList.add(c);
    }
    return label;
}

export default inputForm;