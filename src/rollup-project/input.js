import {container, input, headline, paragraphContainer, button} from './components/textContainer.js'

const availableLanguages = [
    'ar', 'bn', 'bs', 'bg', 'zh', 'hr', 'cs', 'da', 'nl', 'en',
    'et', 'fi', 'fr', 'de', 'el', 'gu', 'he', 'hi', 'hu', 'ga',
    'id', 'it', 'ja', 'ko', 'lv', 'lt', 'ms', 'ml', 'mt', 'ne',
    'nb', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'es', 'sv',
    'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy'
];

export const resultsContainer = () => {
    const containerOuter = container("div", ["temp-results", "container-fluid", "bg-light"], "temp-info");
    const containerInner = container("div", ["row"]);
    const mainSection = container("section", ["col-10", "offset-1", "my-5"]);

    const h1 = headline("h1", `Emotional analysis Results`, ["mb-3"]);
    mainSection.appendChild(h1);

    // create only when it shows results
    const inputText = paragraphContainer("", "Text:", ["d-inline"], "temp-res-text");
    mainSection.appendChild(inputText);

    const resultingSentences = paragraphContainer("", "Sentences:", ["d-inline"], "temp-res-sentences");
    mainSection.appendChild(resultingSentences);

    const classificationResults = paragraphContainer("", "Classification results:", ["d-inline"], "temp-res-classification");
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
    const inputSelectLabel = createLabel(inputSelect.id, "Language");

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
    const checkAutomaticLineDivision = input(`checkbox`, "1", ["form-check-input"], "lineDivisionCheck", true);
    const labelCheckAutomaticLineDivision = createLabel(checkAutomaticLineDivision.id, "Automatic line division", ["form-check-label"]);


    checkAutomaticLineDivision.addEventListener('change', (e) => {
        const delimiter = document.getElementById('textDelimiterField');
        if (e.target.checked && delimiter !== null) {
            delimiter.classList.add('d-none');
        } else {
            delimiter.classList.remove('d-none');
        }
    });

    const textDelimiterContainer = container("div", ["form-group", "row", "mb-2", "d-none"], `textDelimiterField`);
    const inputTextDelimiter = input("text", "¶", ["form-control", "form-control-lg"], "formControlTextDelimiter");
    const inputTextDelimiterLabel = createLabel(inputTextDelimiter.id, "Text Line delimiter");


    lineDivisionContainer.appendChild(labelCheckAutomaticLineDivision);
    lineDivisionContainer.appendChild(checkAutomaticLineDivision);
    mainSection.appendChild(lineDivisionContainer);

    textDelimiterContainer.appendChild(inputTextDelimiterLabel);
    textDelimiterContainer.appendChild(inputTextDelimiter);
    mainSection.appendChild(textDelimiterContainer);

    mainSection.appendChild(divider());

    const imagesContainer = container("div", ["form-group", "row", "mb-2"]);
    const inputImagesContainer = input("file", null, ["form-control-file"], "formControlImages", "files[]");
    inputImagesContainer.accept = "image/jpeg, image/png, image/jpg";
    inputImagesContainer.multiple = true;
    const inputImagesContainerLabel = createLabel(inputImagesContainer.id, "Images");

    imagesContainer.appendChild(inputImagesContainerLabel);
    imagesContainer.appendChild(inputImagesContainer);
    // TODO: check size
    mainSection.appendChild(imagesContainer);

    const imagePlacementCheckContainer = container("div", ["form-check", "form-check-inline", "mb-2", "d-none"], "imagePlacementField");
    const inputImagePlacementCheck = input(`checkbox`, "1", ["form-check-input"], "imagePlacementCheck", true);
    const inputImagePlacementCheckLabel = createLabel(inputImagePlacementCheck.id, "Image Random Placement", ["form-check-label"]);
    imagePlacementCheckContainer.appendChild(inputImagePlacementCheckLabel);
    imagePlacementCheckContainer.appendChild(inputImagePlacementCheck);
    mainSection.appendChild(imagePlacementCheckContainer);

    // TODO: not implemented
    inputImagePlacementCheck.addEventListener('change', (e) => {
        const imageAnchor = document.getElementById('imageAnchorField');
        if (e.target.checked && imageAnchor !== null) {
            imageAnchor.classList.add('d-none');
        } else {
            imageAnchor.classList.remove('d-none');
        }
    });

    const imagePlaceholderDelimiterContainer = container("div", ["form-group", "row", "mb-2", "d-none"], "imageAnchorField");
    const imagePlaceholderDelimiterInput = input(`text`, null, ["form-control", "form-control-lg"], "formControlImagePlaceholderDelimiter", false)
    const imagePlaceholderDelimiterLabel = createLabel(imagePlaceholderDelimiterInput.id, "Image Placement Anchor");
    imagePlaceholderDelimiterContainer.appendChild(imagePlaceholderDelimiterLabel);
    imagePlaceholderDelimiterContainer.appendChild(imagePlaceholderDelimiterInput);
    mainSection.appendChild(imagePlaceholderDelimiterContainer);

    mainSection.appendChild(divider());

    const submitContainer = container("div", ["col-auto"]);
    const submitBt = button("Submit", ["btn", "btn-primary", "mb-2"], "submit");

    const resetBt = button("Reset", ["btn", "btn-secondary", "mx-3", "mb-2"], "reset");

    submitContainer.appendChild(submitBt);
    submitContainer.appendChild(resetBt);

    mainSection.appendChild(submitContainer);
    form.appendChild(mainSection);
    section.appendChild(form);

    const reloadBt = button("New Analysis", ["btn", "d-none", "btn-secondary"], null, "btReload");
    reloadBt.disabled = true;
    reloadBt.onclick = () => {
        window.location.reload();
    }

    section.appendChild(reloadBt);
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
    return container("div", ["my-5"]);
}

export default inputForm;