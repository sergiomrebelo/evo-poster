import {LitElement, html, css, nothing} from "lit";

import 'bootstrap/dist/js/bootstrap';
import 'p5';

import {Params} from "./Params.js";
import {InputForm} from "./components/InputForm.js";
import {ResultsContainer} from "./components/ResultsContainer.js";
import {ErrHandler} from "./components/ErrHandler.js";
import {Interface} from "./components/Interface.js"
import {Header} from "./components/Header.js";

import Population from "./controllers/Population.js";

// TODO: upload from package.json
import {info} from "../@evoposter/evaluator/src/index.mjs";

import 'bootstrap/scss/bootstrap.scss';
import './main.css';

// TODO: separe app.js from entry point
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
        push();
        background(window.app.backgroundColor);
        window.app.population.draw();
        pop();
        // console.log(`draw`);
    }

}

window.windowResized = () => {
    if (window.app.screen < 2) return null;
}

window.keyPressed = () => {
    if (window.app.screen < 2) return null;
    if (key.toUpperCase() === 'S') {
        // window.app.save();
    }
}

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

        const fonts = this.#getAvailableTypefaces();
        console.log(fonts);
        // evolution controllers
        //
        this.config = {
            evo: {
                popSize: Params.evolution.popSize,
                noGen: Params.evolution.noGen,
                crossoverProb: Params.evolution.crossoverProb,
                mutationProb: Params.evolution.mutationProb,
                eliteSize: Params.evolution.eliteSize,
            },
            size: {
                width: Params.visualisationGrid.width,
                height: Params.visualisationGrid.height,
                margin: Params.visualisationGrid.posterMargins
            },
            images: [],
            sentences: null,
            background: {
                style: 0,
                color: {
                    random: true,
                    valueA: Params.background.defaultColors[0],
                    valueB: Params.background.defaultColors[1]
                },
                lock: [false, false]
            },
            typography: {
                verticalAlignment: 0,
                color:  {
                    random: true,
                    value: Params.typography.defaultColor,
                },
                textAlignment: 0,
                typefaces: fonts,
                weight: 100,
                stretch: 200,
                uppercase: false,
                texboxAlignment: 0,
                lock: [false, false, false, false, false, false, false, false]
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
        this.initPopForm = new Interface(this.config, this.#initPopulation, this.population, this.errorMessage);

        // misc
        document.getElementById(`defaultCanvas0`).style.visibility = "visible";
        this.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color');
    }

    #getAvailableTypefaces = () => {
        const fonts = {
            typefaces: [],
            weight: {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE
            },
            stretch: {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE
            }
        }

        for (let font of Array.from(document.fonts)) {
            if (Params.availableTypefaces.includes(font.family)) {
                let stretch = font.stretch.replaceAll(`%`, ``);
                let stretchValues = stretch.split(" ").map((x) => parseInt(x));
                if (fonts.stretch.min > stretchValues[0]) {
                    fonts.stretch.min = stretchValues[0]
                }
                if (fonts.stretch.max < stretchValues[1]) {
                    fonts.stretch.max = stretchValues[1]
                }
                let weightValues = font.weight.split(" ").map((x) => parseInt(x));
                if (fonts.weight.min > weightValues[0]) {
                    fonts.weight.min = weightValues[0]
                }
                if (fonts.weight.max < weightValues[1]) {
                    fonts.weight.max = weightValues[1]
                }
                font.load();
                fonts.typefaces.push({
                    family: font.family,
                    weight: weightValues,
                    stretch: stretchValues
                });
            }
        }
        return fonts;
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
        // get images
        // TODO: error
        this.config.images = Array.from(document.querySelectorAll(`#input-images img`));


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
        // calculate the height of canvas
        let numberOfPosters = Params.visiblePosters > Params["evolution"]["popSize"] ? Params["evolution"]["popSize"] : Params.visiblePosters;
        let h = Math.ceil(numberOfPosters / Math.floor(windowWidth/this.config.size.width));
        h *= (this.config.size.height + (Params.visualisationGrid.marginY*2));
        createCanvas(windowWidth, h); //WEBGL
        loop();
    }

    #nextBts = () => {
        return html`
            <div class="container-fluid">
                <button type="button" id="btReload" @click="${() => {window.location.reload()}}"
                                class="btn btn-secondary my-2 nextBts">
                    New Analysis
                </button>
                <button type="button" @click="${this.setupEvolution}" id="bt-start-evo"
                    class="btn btn-primary my-2 nextBts mx-3">
                    Next
                </button>
            </div>`;
    }

    save () {
        this.population.saveRaster();
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

