import {LitElement, html, css} from "lit";
import {Divider} from "./Divider.js";

export class ResultsContainer extends LitElement {
    constructor() {
        super();
    }

    _pTitle = (titleContent, textContent="", id) => {
        return html`<div>
            <h3 class="d-inline">${titleContent}</h3>
            <p class="d-inline" id=${id}>${textContent}</p>
        </div>`;
    }



    render() {
        return html`
            <div class="temp-results container-fluid" id="temp-info">
                <div class="row">
                    <section class="col-10 offset-1 my-4">
                        <div class="results-info d-none" id="info-results-section">
                            <p class="d-inline" id="temp-res-text"></p>
                        </div>
                        ${this._pTitle("Sentences: ", "", "temp-res-sentences")}
                        ${this._pTitle("Classification results: ", "", "temp-res-classification")}
                        ${Divider.get()}
                        <div class="d-none" id="input-images-results">
                            <h3 class="d-block my-0">Lexicon results:</h3>
                            <div id="temp-res-lexicon-lines">
                                <p id="temp-res-lexicon-global"></p>
                            </div>
                            <div class="text-uppercase">
                                <h3 id="input-images-headline">Input Images</h3>
                                <div class="mt-4 d-none" id="input-images"></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
}


customElements.define('results-container', ResultsContainer);
