import {LitElement, html} from "lit";
import {InputForm} from "./components/InputForm.js";
import {ResultsContainer} from "./components/ResultsContainer.js";
import {ErrHandler} from "./components/ErrHandler.js";
import {nothing} from "https://unpkg.com/lit-html/lit-html.js?module";

import 'bootstrap/scss/bootstrap.scss';
import './main.css';

import 'p5';


window.preload = () => {}

window.setup = () => {
    window.app = document.createElement(`app-evo`); // create app
    document.querySelector(`main`).appendChild(app);

    noCanvas();
    noLoop();
}

window.draw = () => {
    if (window.app.screen > 2) return null;
    console.log(`draw`);
}

window.windowResized = () => {
    if (window.app.screen > 2) return null;
}

export class App extends LitElement {
    static properties = {
        screen: 0,
        results: {},
        evolving: false
    }

    constructor() {
        super();
        this.text = null;
        this.results = null;
        this.screen = 0;
        this.evolving = false;
        this.errorMessage = new ErrHandler();
        this._resultsContainer = new ResultsContainer();
        this._inputForm = new InputForm(this.analyse, this._resultsContainer,  this.errorMessage);
    }

    analyse = async () => {
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
            this.screen = 1;
        }).catch((err) => {
            this.errorMessage.set(err);
        })
    }

    setupEvolution = (e) => {
        e.preventDefault();
        // init canvas
        this.screen = 2;
        createCanvas(windowWidth, windowHeight);
        document.getElementById(`defaultCanvas0`).style.visibility = "visible";
        const backgroundColour = getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color');
        background(backgroundColour);
        loop();

        // init pop
        if (this.results !== null) {
            this._initalisation();
        } else {
            this.errorMessage.set({msg: "text input not defined"});
        }
    }

    _initalisation = () => {
        console.log(`_initalisation`);
        console.log(this.results);
    }

    _nextBts = () => {
        return html`
            <div class="container-fluid">
                <button type="button" id="btReload" @click="${() => {window.location.reload()}}"
                                class="btn btn-secondary my-2 nextBts">
                    New Analysis
                </button>
                <button type="button" @click="${this.setupEvolution}"
                    class="btn btn-primary my-2 nextBts mx-3">
                    Next
                </button>
            </div>`;
    }

    render() {
        return html`
            ${this.errorMessage}
            ${this.screen < 2 ? 
                html`<div class="container-fluid">
                    <div class="row">
                        <div class="col-10">
                            <h1 class="my-2 mx-2">Evolving Posters</h1>
                        </div>
                    </div>
                </div>
                <div id="input-module" class="container-fluid">
                    ${this._resultsContainer}
                    ${this._inputForm}
                    ${this.screen === 1 ? this._nextBts() : nothing}
                </div>` :
            nothing }
        `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('app-evo', App);

