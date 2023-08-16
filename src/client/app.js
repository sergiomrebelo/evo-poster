import {LitElement, html, css, nothing} from "lit";
import * as config from '../../evo-poster.config.js';
import {InputForm} from "./components/InputForm.js";
import {ResultsContainer} from "./components/ResultsContainer.js";
import {ErrHandler} from "./components/ErrHandler.js";
import {Interface} from "./components/Interface.js"
import {Header} from "./components/Header.js";
import Population from "./controllers/Population.js";
import {sumArr} from "./utils.js";

const VISIBLE_POSTERS =  config["default"]["display"] !== undefined ? config["default"]["display"]["VISIBLE_POSTERS"] : 10;
const MARGIN_Y =  config["default"]["display"] !== undefined ? config["default"]["display"]["MARGIN_Y"] : 10;
const POP_SIZE = config["default"]["evo"]["POP_SIZE"];
const SIZE = config["default"]["size"];
const BACKGROUND = config["default"]["color"]["BACKGROUND"];
const TYPOGRAPHY = config["default"]["typography"];
const TYPEFACES = config["default"]["typefaces"];
const EVAL_WEIGHTS = [config["default"]["evaluation"]["GLOBAL_WEIGHTS"]["SEMANTICS"], config["default"]["evaluation"]["GLOBAL_WEIGHTS"]["AESTHETICS"]];
const SEMANTICS_WEIGHTS = [config["default"]["evaluation"]["SEMANTICS_WEIGHTS"]["EMPHASIS"],
    config["default"]["evaluation"]["SEMANTICS_WEIGHTS"]["LAYOUT"], config["default"]["evaluation"]["SEMANTICS_WEIGHTS"]["VISUALS"]];
const AESTHETICS_WEIGHTS = [config["default"]["evaluation"]["AESTHETICS_WEIGHTS"]["ALIGNMENT"], config["default"]["evaluation"]["AESTHETICS_WEIGHTS"]["REGULARITY"],
    config["default"]["evaluation"]["AESTHETICS_WEIGHTS"]["JUSTIFICATION"], config["default"]["evaluation"]["AESTHETICS_WEIGHTS"]["TYPEFACE_PARING"],
    config["default"]["evaluation"]["AESTHETICS_WEIGHTS"]["WHITE_BALANCE_FRACTION"], config["default"]["evaluation"]["AESTHETICS_WEIGHTS"]["BALANCE"]]



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

        // evolution controllers
        this.config = {
            evo: {
                popSize: POP_SIZE,
                noGen: config["default"]["evo"]["NO_GEN"],
                crossoverProb: config["default"]["evo"]["CROSSOVER_PROB"],
                mutationProb: config["default"]["evo"]["MUTATION_PROB"],
                eliteSize: config["default"]["evo"]["ELITE_SIZE"]
            },
            evaluation: {
                weights: EVAL_WEIGHTS.map((x) => x/sumArr(EVAL_WEIGHTS)),
                aestheticsWeights: AESTHETICS_WEIGHTS.map ((x) => x/sumArr(AESTHETICS_WEIGHTS)),
                semanticsWeights: SEMANTICS_WEIGHTS.map((x) => x/sumArr(SEMANTICS_WEIGHTS)),
                modes: {
                    semanticsVisuals: config["default"]["evaluation"]["MODES"]["SEMANTICS_VISUALS"]
                }
            },
            size: {
                width: SIZE.WIDTH,
                height: SIZE.HEIGHT,
                margin: SIZE.MARGINS
            },
            images: [],
            sentences: null,
            background: {
                style: 0,
                color: {
                    random: true,
                    valueA: BACKGROUND["DEFAULT_COLORS"][0],
                    valueB: BACKGROUND["DEFAULT_COLORS"][1],
                },
                lock: [false, false]
            },
            typography: {
                verticalAlignment: 0,
                color:  {
                    random: true,
                    value: TYPOGRAPHY["DEFAULT_COLOR"],
                },
                textAlignment: 0,
                typefaces: fonts.typefaces,
                weight: fonts.weight,
                stretch: fonts.stretch,
                uppercase: false,
                lock: [false, false, false, false, false, false, false, false]
            },
            display: {
                grid: config["default"]["display"]["GRID"] !== undefined ? config["default"]["display"]["GRID"] : true
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
            if (Object.keys(TYPEFACES).includes(font.family)) {
                let stretch = font.stretch.replaceAll(`%`, ``);
                let stretchValues = [100, 100];
                if (stretch !== `normal`) {
                    stretchValues = stretch.split(" ").map((x) => parseInt(x));
                }

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
                    stretch: stretchValues,
                    tags: TYPEFACES[font.family]["tags"],
                    category: TYPEFACES[font.family]["category"],
                    leading: TYPEFACES[font.family]["leading"]
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
            this.population = new Population(this.config, this.results);
            // this.population.initialisation();
            this.initPopForm.pop = this.population;
            this.screen = 3;
            this.header.showControls();

        } else {
            this.errorMessage.set({msg: "text input not defined. Not possible to init population"});
        }
    }

    #initCanvas = () => {
        // calculate the height of canvas
        console.log(`MARGIN_Y`, MARGIN_Y);
        let numberOfPosters = VISIBLE_POSTERS > POP_SIZE ? POP_SIZE : VISIBLE_POSTERS;
        let h = Math.ceil(numberOfPosters / Math.floor(windowWidth/this.config.size.width));
        h *= this.config.size.height + MARGIN_Y * 2;
        createCanvas(windowWidth, h); // WEBGL
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

