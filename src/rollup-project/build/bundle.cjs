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

const input = (
     type = "text", value = null, classes = [], id = null, checked = null, name = null
) => {
    const input = document.createElement(`input`);
    input.type = type;
    if (value !== null) input.value = value;
    for (let c of classes) {
        input.classList.add(c);
    }
    if (id !== null) input.id = id;
    if (checked !== null) input.checked = checked;
    if (name !== null) input.name = name;
    return input;
};


const button = (
    textContent, classes = [], type = null, id = null
) => {
    const bt = document.createElement(`button`);
    if (type !== null) bt.type = type;
    if (id !== null) bt.id = id;
    for (let c of classes) {
        bt.classList.add(c);
    }
    bt.textContent = textContent;
    return bt;
};

const availableLanguages = [
    'ar', 'bn', 'bs', 'bg', 'zh', 'hr', 'cs', 'da', 'nl', 'en',
    'et', 'fi', 'fr', 'de', 'el', 'gu', 'he', 'hi', 'hu', 'ga',
    'id', 'it', 'ja', 'ko', 'lv', 'lt', 'ms', 'ml', 'mt', 'ne',
    'nb', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'es', 'sv',
    'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy'
];

const resultsContainer = () => {
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
};

const inputForm = () => {
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

    const inputTextAreaLabel = createLabel(inputTextArea.id, "Input Text", ["col-sm-2", "col-form-label-sm"]);

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
    const imagePlaceholderDelimiterInput = input(`text`, null, ["form-control", "form-control-lg"], "formControlImagePlaceholderDelimiter", false);
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
    };

    section.appendChild(reloadBt);
    containerOuter.appendChild(section);
    containerOuter.appendChild(containerInner);
    return containerOuter;
};

const createLabel = (id, textContent, classes = []) => {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = textContent;
    for (let c of classes) {
        label.classList.add(c);
    }
    return label;
};

const divider = () => {
    return container("div", ["my-5"]);
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
        formInput.addEventListener("submit", this.get);
        document.getElementById('formControlImages').addEventListener('change', this._uploadImages);
    }

    get = async (e) => {
        e.preventDefault();
        let textArea = encodeURIComponent(document.getElementById('formControlTextarea').value);
        const shouldDivide = document.getElementById('lineDivisionCheck').checked;
        const lang = encodeURIComponent(document.getElementById('formControlLang').value);

        let handler = `text`;
        let delimiter;
        if (!shouldDivide) {
            delimiter = encodeURIComponent(document.getElementById('formControlTextDelimiter').value);
            handler = `lines/${delimiter}`;
        }

        if (this.images.hasImages && !this.images.randomPlacement && !shouldDivide) {
            let imageDelimiter = encodeURIComponent(document.getElementById('formControlImagePlaceholderDelimiter').value);
            this.images.nAnchorPoints = [...textArea.matchAll(new RegExp(imageDelimiter,'g'))].length;
            textArea = textArea.replaceAll(imageDelimiter, `${delimiter}${imageDelimiter}${delimiter}`);
            if (this.images.nAnchorPoints !== app.images.amount) {
                const relation = app.images.nAnchorPoints > app.images.amount ? 'higher' : 'smaller';
                // handleErr({ message: `the amount of image anchor points is ${relation} than the amount of upload images. (anchors:${app.images.nAnchorPoints} / images:${app.images.amount})`});
                console.error({ message: `the amount of image anchor points is ${relation} than the amount of upload images. (anchors:${app.images.nAnchorPoints} / images:${app.images.amount})`});
            }
        }


        const url = `/${handler}/${lang}/${textArea}`;

        fetch(url).then((response) => response.json()).then((result) => {
            this._displayResults(result);
        }).catch((error) => {
            console.error('Error:', error);
            // handleErr({ message: `error on fetch. ${error}`});
            console.error ({ message: `error on fetch. ${error}`});
        });
    }

    _displayResults = async (res) => {
        if (!res.success)  {
            // return handleErr(res);
            console.log(res.err);
        }

        document.getElementById('temp-res-text').textContent = `${res.text} (${res.lang})`;
        document.getElementById('temp-res-sentences').textContent = `${res.sentences.flat()} (${res.sentences.flat().length})`;
        document.getElementById('temp-res-classification').textContent = `${res.classification.emotions.data.predominant.emotion} (${res.classification.emotions.data.predominant.weight})`;
        const el = document.getElementById('temp-res-lexicon-lines');
        el.innerHTML = '';
        for (let i in res.lexicon.sentences) {
            const sentence = res.lexicon.sentences[i];
            const span = document.createElement("span");
            span.innerHTML = `[${i}] ${sentence.text} (${sentence.emotions.data.predominant.emotion}, ${sentence.emotions.data.predominant.weight}) <br>`;
            el.appendChild(span);
        }

        document.getElementById('temp-res-lexicon-global').innerHTML = `<b>global lexicon</b>: ${res.lexicon.global[0][0]} (${res.lexicon.global[0][1]})`;
        document.getElementById('temp-info').classList.replace('d-none', 'd-block');
        document.querySelector('#input-form fieldset').disabled = true;
        document.getElementById('btReload').enable = true;

        const btReload =  document.getElementById(`btReload`);
        btReload.disabled = false;
        btReload.classList.replace('d-none', 'd-block');
    }

    _uploadImages = async (e) => {
        this.images.blobs = [];
        this.images.hasImages = true;
        this.images.loading = true;
        this.images.amount = e.target.files.length;

       this.images.blobs = await this._readImages(e.target.files).catch((err) => {
            console.error (`not possible to load the image ${err}`);
            // handleErr({ message: `error on uploading image(s). ${err}`});
        });

        this.images.loading = false;
        this._displayImages(this.images.blobs);

    }

    _displayImages = (files) => {
        const imgContainer = document.getElementById('input-images');
        imgContainer.innerHTML = ``;

        for (let i = 0; i<files.length; i++) {
            const img = new Image();
            img.src = files[i];
            img.classList.add('d-inline-block');
            if (i > 0) img.classList.add(`mx-2`);
            img.style.height = `100px`;
            img.style.width = `auto`;
            imgContainer.appendChild(img);
        }
        imgContainer.classList.replace('d-none', 'd-block');
    }

    _readImages = async (files) => {
        const res = [];
        let err = [];
        const getBase64 = (file) => {
            const reader = new FileReader();
            return new Promise(resolve => {
                reader.onload = (ev) => {
                    resolve(ev.target.result);
                };
                reader.readAsDataURL(file);
            });
        };
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.includes('image')) {
                res.push(getBase64(files[i]));
            } else {
                err.push (files[i].name);
            }
        }

        if (err.length > 0) {
            // ERROR
            // handleErr({message: `error loading the following image(s): ${err.flat()}`});
            console.error({message: `error loading the following image(s): ${err.flat()}`});
        }

        return await Promise.all(res);
    }
}


window.onload = () => {
    new App();
};

module.exports = App;
