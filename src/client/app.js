import {LitElement, html, css, nothing} from "lit";

import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap';
import './main.css';
import 'p5';

import {Params} from "./Params.js";
import {InputForm} from "./components/InputForm.js";
import {ResultsContainer} from "./components/ResultsContainer.js";
import {ErrHandler} from "./components/ErrHandler.js";
import {EvolutionInterface} from "./components/EvolutionInterface.js"
import {Header} from "./components/Header.js";

import Population from "./controllers/Population.js";


window.preload = () => {}

window.setup = () => {
    window.app = document.createElement(`app-evo`); // create app
    document.querySelector(`main`).appendChild(app);
    noCanvas();
    noLoop();
    frameRate(25);
}

window.draw = () => {
    if (window.app.screen < 3) return null;
    if (window.app.population.updated) {
        background(window.app.backgroundColor);
        window.app.population.draw();
    }
}

window.windowResized = () => {
    if (window.app.screen < 2) return null;
}

window.keyPressed = () => {}

export class App extends LitElement {
    static properties = {
        screen: 0,
        results: {},
        evolving: false
    }

    constructor() {
        super();
        this.results = null;
        this.screen = 0;
        this.evolving = false;

        // evolution controllers
        this.config = {
            size: {
                width: Params.visualisationGrid.width,
                height: Params.visualisationGrid.height,
                margin: Params.visualisationGrid.posterMargins
            },
            sentences: null,
            background: {
                style: 0,
                color: {
                    random: true,
                    valueA: Params.background.defaultColors[0],
                    valueB: Params.background.defaultColors[1]
                }
            },
            typography: {
                verticalAlignment: 0,
                color:  {
                    random: true,
                    value: Params.typography.defaultColor,
                },
                textAlignment: 0,
                typefaces: [],
                weight: null,
                stretch: null
            },
            display: {
                grid: true
            }
        }
        this.population = null;

        // ui components
        this.errorMessage = new ErrHandler();
        this.resultsContainer = new ResultsContainer();
        this.inputForm = new InputForm(this.analyse, this.resultsContainer,  this.errorMessage);
        this.header = new Header();
        this.initPopForm = new EvolutionInterface(this.config, this.#initPopulation, this.population, this.errorMessage);

        // misc
        document.getElementById(`defaultCanvas0`).style.visibility = "visible";
        this.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color');
    }

    analyse = async () => {
        const formData = this.inputForm.data();
        let params = formData.shouldDivide ? `text` : `lines/${formData.delimiter}`;
        let req = `/${params}/${formData.lang}/${formData.textContent}`;

        fetch(req).then((response) => response.json()).then((res) => {
           this.results = res;
           if (res.success === false) {
               this.errorMessage.set(res);
           }
            this.resultsContainer.set(this.results);
            this.inputForm.dis();
            this.screen = 1;
        }).catch((err) => {
            this.errorMessage.set(err);
        })
    }

    setupEvolution = (e) => {
        e.preventDefault();
        this.screen = 2;
        this.#initCanvas();
        this.#initPopulation();

        // check initialisation of population
        /* setInterval(()=> {
            console.log(`init new pop`);
            this.#initPopulation();
        }, 2000) */
    }


    #initPopulation = (size = false) => {
        if (size) {
            this.#initCanvas();
        }

        // clean the display old population
        background(this.backgroundColor);

        if (this.results !== null) {
            if (this.config["sentences"] == null) {
                this.config["sentences"] = this.results.sentences;
            }
            this.population = new Population(this.config);
            this.population.initialisation();
            this.initPopForm.pop = this.population;
            this.screen = 3;
            this.header.showControls();
        } else {
            this.errorMessage.set({msg: "text input not defined. Not possible to init population"});
        }
    }

    #initCanvas = () => {
        let numberOfPosters = Params.visiblePosters > Params.populationSize ? Params.populationSize : Params.visiblePosters;
        const h = numberOfPosters / Math.floor(windowWidth/this.config.size.width) * (this.config.size.height + Params.visualisationGrid.marginY) // calculate the height of canvas
        createCanvas(windowWidth, h);
        loop();
    }

    #nextBts = () => {
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
            ${this.header}
            ${this.screen === 3 ? this.initPopForm : nothing}
            ${this.screen < 2 ? 
                html`<div id="input-module" class="container-fluid">
                    ${this.resultsContainer}
                    ${this.inputForm}
                    ${this.screen === 1 ? this.#nextBts() : nothing}
                </div>` :
            nothing }
        `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('app-evo', App);

