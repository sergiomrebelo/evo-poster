import {container, inputField, headline, paragraphContainer, button} from './utils.js'

const availableLanguages = [
    'ar', 'bn', 'bs', 'bg', 'zh', 'hr', 'cs', 'da', 'nl', 'en',
    'et', 'fi', 'fr', 'de', 'el', 'gu', 'he', 'hi', 'hu', 'ga',
    'id', 'it', 'ja', 'ko', 'lv', 'lt', 'ms', 'ml', 'mt', 'ne',
    'nb', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'es', 'sv',
    'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy'
];

export const resultsContainer = () => {
    const containerOuter = container("div", ["temp-results", "container-fluid"], "temp-info");
    const containerInner = container("div", ["row"]);

    const mainSection = container("section", ["col-10", "offset-1", "my-4"]);

    const h1 = headline("h1", `Evolving Posters`, ["mb-3"]);
    mainSection.appendChild(h1);

    const resultsSection = container("div", ["results-info", "d-none"], `info-results-section`);


    // create only when it shows results
    const inputText = paragraphContainer("", "Input Text: ", ["d-inline"], "temp-res-text");
    resultsSection.appendChild(inputText);

    const resultingSentences = paragraphContainer("", "Sentences: ", ["d-inline"], "temp-res-sentences");
    resultsSection.appendChild(resultingSentences);

    const classificationResults = paragraphContainer("", "Classification results: ", ["d-inline"], "temp-res-classification");
    resultsSection.appendChild(classificationResults);

    const lexiconResultsContainer = container("div", ["mt-4"]);
    const lexiconHeadline = headline("h3", "Lexicon results:", ["d-block", "my-0"]);
    const lexiconResultsLines = container("div", [], "temp-res-lexicon-lines");
    const lexiconGlobalResult = paragraphContainer("", null, [], "temp-res-lexicon-global");

    lexiconResultsContainer.appendChild(lexiconHeadline);
    lexiconResultsContainer.appendChild(lexiconResultsLines);
    lexiconResultsContainer.appendChild(lexiconGlobalResult);
    resultsSection.appendChild(lexiconResultsContainer);

    mainSection.appendChild(resultsSection);


    const inputImagesLabel = headline("h3", "Input Images", ["d-none", "text-uppercase"], "input-images-headline");
    mainSection.appendChild(inputImagesLabel);

    const inputImagesContainer = container("div", ["mt-4", "d-none"], "input-images");
    mainSection.appendChild(inputImagesContainer);


    containerOuter.appendChild(mainSection);
    containerOuter.appendChild(containerInner);

    return containerOuter;
}

export const inputForm = () => {
    const containerOuter = container("aside", ["container-fluid"]);
    const containerInner = container("div", ["row"]);
    const section = container("section", ["input-form-outer", "col-10", "offset-1", "mt-5"]);
    const form = document.createElement("form");
    form.id = "input-form";
    form.classList.add("input-form-inner");
    const mainSection = document.createElement("fieldset");

    const inputTextAreaContainer = container("div", ["form-group", "row", "mb-2"]);
    const inputTextArea = document.createElement("textarea");
    inputTextArea.id = `formControlTextarea`;
    inputTextArea.classList.add("form-control", "col-sm-10");
    inputTextArea.required = true;
    inputTextArea.rows = 6;

    const inputTextAreaLabel = createLabel(inputTextArea.id, "Input Text", ["col-sm-2", "col-form-label-sm"])

    inputTextAreaContainer.appendChild(inputTextAreaLabel);
    inputTextAreaContainer.appendChild(inputTextArea);
    mainSection.appendChild(inputTextAreaContainer);

    const inputSelectContainer = container("div", ["form-group", "row", "mb-2"]);
    const inputSelect = document.createElement("select");
    inputSelect.id = `formControlLang`;
    inputSelect.classList.add('form-control', 'form-control-lg');
    const inputSelectLabel = createLabel(inputSelect.id, "Language", ["col-form-label-sm"]);

    for (let lang of availableLanguages) {
        const option = document.createElement("option");
        option.textContent = lang;
        option.value = lang;
        option.selected = (lang === 'en');
        inputSelect.appendChild(option);
    }

    inputSelectContainer.appendChild(inputSelectLabel);
    inputSelectContainer.appendChild(inputSelect);
    mainSection.appendChild(inputSelectContainer);

    mainSection.appendChild(divider());

    const lineDivisionContainer = container("div", ["form-check", "form-check-inline", "mb-2"], `lineDivisionField`);
    const checkAutomaticLineDivision = inputField(`checkbox`, "1", ["form-check-input"], "lineDivisionCheck", true);
    const labelCheckAutomaticLineDivision = createLabel(checkAutomaticLineDivision.id, "Automatic line division", ["form-check-label", "col-form-label-sm"]);


    checkAutomaticLineDivision.addEventListener('change', (e) => {
        const delimiter = document.getElementById('textDelimiterField');
        if (e.target.checked && delimiter !== null) {
            delimiter.classList.add('d-none');
        } else {
            delimiter.classList.remove('d-none');
        }
    });

    const textDelimiterContainer = container("div", ["form-group", "row", "mb-2", "d-none"], `textDelimiterField`);
    const inputTextDelimiter = inputField("text", "¶", ["form-control", "form-control-lg"], "formControlTextDelimiter");
    const inputTextDelimiterLabel = createLabel(inputTextDelimiter.id, "Text Line delimiter", ["col-form-label-sm"]);


    lineDivisionContainer.appendChild(labelCheckAutomaticLineDivision);
    lineDivisionContainer.appendChild(checkAutomaticLineDivision);
    mainSection.appendChild(lineDivisionContainer);

    textDelimiterContainer.appendChild(inputTextDelimiterLabel);
    textDelimiterContainer.appendChild(inputTextDelimiter);
    mainSection.appendChild(textDelimiterContainer);

    mainSection.appendChild(divider());

    const imagesContainer = container("div", ["form-group", "row", "mb-2"]);
    const inputImagesContainer = inputField("file", null, ["form-control-file"], "formControlImages", "files[]");
    inputImagesContainer.accept = "image/jpeg, image/png, image/jpg";
    inputImagesContainer.multiple = true;
    const inputImagesContainerLabel = createLabel(inputImagesContainer.id, "Images", ["col-form-label-sm"]);

    imagesContainer.appendChild(inputImagesContainerLabel);
    imagesContainer.appendChild(inputImagesContainer);
    mainSection.appendChild(imagesContainer);

    const imagePlacementCheckContainer = container("div", ["form-check", "form-check-inline", "mb-2", "d-none"], "imagePlacementField");
    const inputImagePlacementCheck = inputField(`checkbox`, "1", ["form-check-input"], "imagePlacementCheck", true);
    const inputImagePlacementCheckLabel = createLabel(inputImagePlacementCheck.id, "Image Random Placement", ["form-check-label", "col-form-label-sm"]);
    imagePlacementCheckContainer.appendChild(inputImagePlacementCheckLabel);
    imagePlacementCheckContainer.appendChild(inputImagePlacementCheck);
    mainSection.appendChild(imagePlacementCheckContainer);


    inputImagePlacementCheck.addEventListener('change', (e) => {
        const imageAnchor = document.getElementById('imageAnchorField');
        if (e.target.checked && imageAnchor !== null) {
            imageAnchor.classList.add('d-none');
        } else {
            imageAnchor.classList.remove('d-none');
        }
    });

    const imagePlaceholderDelimiterContainer = container("div", ["form-group", "row", "mb-2", "d-none"], "imageAnchorField");
    const imagePlaceholderDelimiterInput = inputField(`text`, null, ["form-control", "form-control-lg"], "formControlImagePlaceholderDelimiter", false)
    const imagePlaceholderDelimiterLabel = createLabel(imagePlaceholderDelimiterInput.id, "Image Placement Anchor", ["col-form-label-sm"]);
    imagePlaceholderDelimiterContainer.appendChild(imagePlaceholderDelimiterLabel);
    imagePlaceholderDelimiterContainer.appendChild(imagePlaceholderDelimiterInput);
    mainSection.appendChild(imagePlaceholderDelimiterContainer);

    mainSection.appendChild(divider());

    const submitContainer = container("div", ["col-auto"]);
    const submitBt = button("Submit", ["btn", "btn-primary", "mb-2"], "submit");

    submitContainer.appendChild(submitBt);
    mainSection.appendChild(submitContainer);

    form.appendChild(mainSection);
    section.appendChild(form);

    const reloadBt = button("New Analysis", ["btn", "d-none", "btn-secondary", "my-2", "nextBts"], null, "btReload");
    reloadBt.disabled = true;
    reloadBt.onclick = () => {
        window.location.reload();
    }

    const nextBt = button("Next", ["btn", "d-none", "btn-primary", "my-2", "nextBts", "mx-3"], "button", "btNext");
    nextBt.disabled = true;

    section.appendChild(reloadBt);
    section.appendChild(nextBt);

    containerOuter.appendChild(section);
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

const divider = () => {
    return container("div", ["my-4"]);
}

export default inputForm;