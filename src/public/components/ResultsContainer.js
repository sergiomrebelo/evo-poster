import {LitElement, html} from "lit";
import {Divider} from "./Divider.js";
import {unsafeHTML} from "lit/directives/unsafe-html.js";

export class ResultsContainer extends LitElement {
    static properties = {
        _available: false,
        _data: {},
        _images: [],
        _imagesAvailable: false };

    constructor() {
        super();

        this._available = false;
        this._data = {
            text: `inside`,
            lang: `en`
        }

        this._images =  [];
        this._imagesAvailable = false;
    }

    _pTitle = (titleContent, textContent="", id) => {
        return html`<div>
            <h3 class="d-inline">${titleContent}</h3>
            <p class="d-inline" id=${id}>${textContent}</p>
        </div>`;
    }

    set = (res) => {
        this._available = true;
        let lexiconLines = `<span>`;
        for (let i in res.lexicon.sentences) {
            const sentence = res.lexicon.sentences[i]
            lexiconLines += `[${i}] ${sentence.text} (${sentence.emotions.data.predominant.emotion}, ${sentence.emotions.data.predominant.weight}) <br>`
        }
        lexiconLines +=`</span>`;

        this._data = {
            text: res.text,
            lang: res.lang,
            sentences: res.sentences,
            classification: {
                predominant: res.classification.emotions.data.predominant.emotion,
                score: res.classification.emotions.data.predominant.weight
            },
            lexicon: {
                lines: lexiconLines,
                global: `<b>global lexicon</b>: ${res.lexicon.global[0][0]} (${res.lexicon.global[0][1]})`
            }
        }



    }

    displayImages = (files) => {
        this._imagesAvailable = files.length > 0;
        this._images = [];
        for (let i = 0; i<files.length; i++) {
            const img = html`<img src="${files[i]}" class="d-inline-block mb-2 mr-2" height="100px" width="auto"/>`;
            this._images.push(img);
        }
    }

    render() {
        let imagesContainer = html``;
        if (this._imagesAvailable) {
            imagesContainer =
                html`<div class="text-uppercase">
                    <h3 id="input-images-headline">Input Images</h3>
                    <div class="mt-4 d-none" id="input-images">${this._images}</div>
                </div>`
        }

        return this._available
        ? html`
            <div class="temp-results container-fluid" id="temp-info">
                <div class="row">
                    <section class="col-10 offset-1 my-4">
                        <div class="results-info d-none" id="info-results-section">
                            <p class="d-inline" id="temp-res-text">${this._data.text} (${this._data.lang})</p>
                        </div>
                        ${this._pTitle("Sentences: ", `${this._data.sentences.flat()} (${this._data.sentences.flat().length})}`, "temp-res-sentences")}
                        ${this._pTitle("Classification results: ",  `${this._data.classification.predominant} (${this._data.classification.score})}`, "temp-res-classification")}
                        ${Divider.get()}
                        <div class="d-none" id="input-images-results">
                            <h3 class="d-block my-0">Lexicon results:</h3>
                            <div id="temp-res-lexicon-lines">
                                ${unsafeHTML(this._data.lexicon.lines)}
                                <p id="temp-res-lexicon-global">${unsafeHTML(this._data.lexicon.global)}</p>
                            </div>
                        </div>
                        ${imagesContainer}
                    </section>
                </div>
            </div>`
        : html`<div class="temp-results container-fluid" id="temp-info">
                    ${imagesContainer}
                </div>`;

    }
}

customElements.define('results-container', ResultsContainer);
