import {LitElement, html} from "lit";
import {InputForm} from "./components/InputForm.js";
import {ResultsContainer} from "./components/ResultsContainer.js";
import {ErrHandler} from "./components/ErrHandler.js";

import 'bootstrap/scss/bootstrap.scss';

import 'p5';


window.preload = () => {}

window.setup = () => {
    window.app = document.createElement(`app-evo`); // create app
    document.querySelector(`main`).appendChild(app);

    // not init canvas
    noCanvas();
    noLoop();
}

window.draw = () => {
    if (window.app.screen === 0) return null;
}

window.windowResized = () => {
    if (window.app.screen === 0) return null;
}

export class App extends LitElement {
    static properties = {
        _screen: 0
    }
    constructor() {
        super();
        this.text = null;
        this.results = null;
        this._screen = 0;
        this.errorMessage = new ErrHandler();
        this._resultsContainer = new ResultsContainer();
        this._inputForm = new InputForm(this.analyse, this._resultsContainer,  this.errorMessage);
    }

    analyse = async () => {
        // get data from input form

        const formData = this._inputForm.data();
        let params = formData.shouldDivide ? `text` : `lines/${formData.delimiter}`;
        let req = `/${params}/${formData.lang}/${formData.textContent}`;


        fetch(req).then((response) => response.json()).then((res) => {
           this.results = res;
           if (res.success === false) {
               this.errorMessage.set(res);
           }
            this._resultsContainer.set(this.results);

           this._inputForm.dis();
           this._screen = 1
        }).catch((err) => {
            this.errorMessage.set(err);
        })
    }

    initEvolution = (e) => {
        e.preventDefault();
        // init canvas
        console.log(`init canvas`);
        // init pop
        if (this.results !== null) {
            console.log(`evolve`);
        } else {
            this.errorMessage.set({msg: "text input not defined"});
        }
    }

    _nextBts = () => {
        return html`
            <button type="button" id="btReload" @click="${() => { window.location.reload()}}"
                            class="btn d-none btn-secondary my-2 nextBts">
                New Analysis
            </button>
            <button type="button" @click="${this.initEvolution}"
                class="btn d-none btn-primary my-2 nextBts mx-3 ">
                Next
            </button>`;
    }

    render() {
        return html`
            ${this.errorMessage}
            <h1 class="mb-3">Evolving Posters</h1>
            <div id="input-module">
                ${this._resultsContainer}
                ${this._inputForm}
                ${this._screen === 1 ? this._nextBts() : ``}
            </div>
        `;
    }
}

customElements.define('app-evo', App);

