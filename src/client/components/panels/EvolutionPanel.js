import {html, LitElement} from "lit";
import {TextInput} from "../inputs/TextInput.js";
import {Divider} from "../Divider.js";
import {validateNumberInput} from "../../utils.js"

export class EvolutionPanel extends LitElement {
    static properties = {
        generations: 0,
    }

    constructor(params, restart, errorMessage, pop) {
        super();

        this.params = params;
        this.restart = restart;
        this.errorMessage = errorMessage;

        // this.generations = pop.generations;

        this.fields = {
            populationSize: new TextInput("Population size", params["evo"] ? params["evo"]["popSize"] : 0, `pop-size`, (e) => {
                if (params["evo"]) {
                    params["evo"]["popSize"] = this.#validateValue(e.target.value, this.params["evo"]["popSize"], 2);
                    e.target.value = params["evo"]["popSize"];
                    this.restart();
                }
            }, ["col-12", "evolution-locked"]),
            numberOfGenerations: new TextInput("No. generations", params["evo"] ? params["evo"]["noGen"] : 0, "no-gen", (e) => {
                if (params["evo"]) {
                    params["evo"]["noGen"] = this.#validateValue(e.target.value, this.params["evo"]["noGen"], 2);
                    e.target.value = params["evo"]["popSize"];
                }
            }, ["col-12", "my-2"]),
            eliteSize: new TextInput("Elite size", params["evo"] ? params["evo"]["eliteSize"] : 0, "elite-size", (e) => {
                if (params["evo"]) {
                    let max = Math.round(parseInt(params["evo"]["popSize"]) / 2);
                    params["evo"]["eliteSize"] = this.#validateValue(e.target.value, this.params["evo"]["eliteSize"], 0, max);
                    if (parseInt(e.target.value) > max) {
                        this.errorMessage.set({message: `elite size must be in the maximum half of the full population`});
                    }
                    e.target.value = params["evo"]["eliteSize"];
                }
            }, ["col-12", "my-2"]),
            crossoverProbability: new TextInput("Crossover probability", params["evo"] ? params["evo"]["crossoverProb"] : 1, "crossover-probability", (e) => {
                if (params["evo"]) {
                    params["evo"]["crossoverProb"] = this.#validateValue(e.target.value, params["evo"]["crossoverProb"], 0, 1);
                    e.target.value = params["evo"]["crossoverProb"];
                }
            }, ["col-12", "my-2"]),
            mutationProbability: new TextInput("Mutation probability", params["evo"] ? params["evo"]["mutationProb"] : 0, "mutation-probability", (e) => {
                if (params["evo"]) {
                    params["evo"]["mutationProb"] = this.#validateValue(e.target.value, params["evo"]["mutationProb"], 0, 1);
                    e.target.value = params["evo"]["mutationProb"];
                }
            }, ["col-12", "my-2"]),
            fitness: {
                general: {
                    semanticPart: new TextInput(`Semantics`, params["evaluation"]["weights"][0], "evaluation-semantic-weight",
                        (e) => {
                            params["evaluation"]["weights"][0] = this.#validateValue(e.target.value, params["evaluation"]["weights"][0], 0, 1);
                            e.target.value = params["evaluation"]["weights"][0];
                            this.restart();
                        }, ["col-12", "evolution-locked"]),
                    aestheticPart: new TextInput(`Aesthetics`, params["evaluation"]["weights"][1], "evaluation-aesthetics-weight",
                        (e) => {
                            params["evaluation"]["weights"][1] = this.#validateValue(e.target.value, params["evaluation"]["weights"][1], 0, 1);
                            e.target.value = params["evaluation"]["weights"][1];
                            this.restart();
                        }, ["col-12", "my-2", "evolution-locked"]),
                },
                semantics: {
                    emphasis: new TextInput(`Semantic Emphasis`, params["evaluation"]["semanticsWeights"][0], "evaluation-semantics-emphasis-weight",
                        (e) => {
                            params["evaluation"]["semanticsWeights"][0] = this.#validateValue(e.target.value, params["evaluation"]["semanticsWeights"][0], 0, 1);
                            e.target.value = params["evaluation"]["semanticsWeights"][0];
                            this.restart();
                        }, ["col-12", "evolution-locked"]),
                    layout: new TextInput(`Semantic Layout`, params["evaluation"]["semanticsWeights"][1], "evaluation-semantics-layout-weight",
                        (e) => {
                            params["evaluation"]["semanticsWeights"][1]= this.#validateValue(e.target.value, params["evaluation"]["semanticsWeights"][1], 0, 1);
                            e.target.value = params["evaluation"]["semanticsWeights"][1];
                            this.restart();
                        }, ["col-12", "my-2", "evolution-locked"]),
                    visuals: new TextInput(`Semantic Visuals`, params["evaluation"]["semanticsWeights"][2], "evaluation-semantics-visuals-weight",
                        (e) => {
                            params["evaluation"]["semanticsWeights"][2]= this.#validateValue(e.target.value, params["evaluation"]["semanticsWeights"][2], 0, 1);
                            e.target.value = params["evaluation"]["semanticsWeights"][2];
                            this.restart();
                        }, ["col-12", "evolution-locked", "mb-2"]),
                },
                aesthetics: {
                    alignment: new TextInput(`Alignment`, params["evaluation"]["aestheticsWeights"][0], "evaluation-aesthetics-alignment-weight",
                        (e) => {
                            params["evaluation"]["aestheticsWeights"][0] = this.#validateValue(e.target.value, params["evaluation"]["aestheticsWeights"][0], 0, 1);
                            e.target.value = params["evaluation"]["aestheticsWeights"][0];
                            this.restart();
                        }, ["col-12", "evolution-locked"]),
                    regularity: new TextInput(`Regularity`, params["evaluation"]["aestheticsWeights"][1], "evaluation-aesthetics-regularity-weight",
                        (e) => {
                            params["evaluation"]["aestheticsWeights"][1] = this.#validateValue(e.target.value, params["evaluation"]["aestheticsWeights"][1], 0, 1);
                            e.target.value = params["evaluation"]["aestheticsWeights"][1];
                            this.restart();
                        }, ["col-12", "evolution-locked", "my-2"]),
                    justification: new TextInput(`Justification`, params["evaluation"]["aestheticsWeights"][2], "evaluation-aesthetics-justification-weight",
                        (e) => {
                            params["evaluation"]["aestheticsWeights"][2] = this.#validateValue(e.target.value, params["evaluation"]["aestheticsWeights"][2], 0, 1);
                            e.target.value = params["evaluation"]["aestheticsWeights"][2];
                            this.restart();
                        }, ["col-12", "evolution-locked", "mb-2"]),
                    typefaceParing: new TextInput(`Typeface Paring`, params["evaluation"]["aestheticsWeights"][3], "evaluation-aesthetics-type-paring-weight",
                        (e) => {
                            params["evaluation"]["aestheticsWeights"][3] = this.#validateValue(e.target.value, params["evaluation"]["aestheticsWeights"][3], 0, 1);
                            e.target.value = params["evaluation"]["aestheticsWeights"][3];
                            this.restart();
                        }, ["col-12", "evolution-locked", "mb-2"]),
                    whiteSpace: new TextInput(`White Space Fraction`, params["evaluation"]["aestheticsWeights"][4], "evaluation-aesthetics-white-space-weight",
                        (e) => {
                            params["evaluation"]["aestheticsWeights"][4] = this.#validateValue(e.target.value, params["evaluation"]["aestheticsWeights"][4], 0, 1);
                            e.target.value = params["evaluation"]["aestheticsWeights"][4];
                            this.restart();
                        }, ["col-12", "evolution-locked", "mb-2"]),
                    balance: new TextInput(`Balance`, params["evaluation"]["aestheticsWeights"][5], "evaluation-aesthetics-balance-weight",
                        (e) => {
                            params["evaluation"]["aestheticsWeights"][5] = this.#validateValue(e.target.value, params["evaluation"]["aestheticsWeights"][5], 0, 1);
                            e.target.value = params["evaluation"]["aestheticsWeights"][5];
                            this.restart();
                        }, ["col-12", "evolution-locked", "mb-2"]),
                }
            }
        }
    }

    // global ev

    #validateValue = (value, current, min, max = null) => {
        let v = validateNumberInput(value, current);
        if (current !== v) {
            if (max !== null) {
                value = Math.min(max, value);
            }

            current = Math.max(min, value);
        }
        return current;
    }

    render() {
        return html`
            <div id="evolution-panel-inner">
                <div class="row mb-2">
                    <div class="col-12">
                        <p>generation no. <span class="fw-bold" id="generation-number">0</span></p>
                    </div>
                    <hr>
                </div>
                <h3>Evolutionary Setup</h3>
                ${Divider.get()}
                <div class="row">
                    ${this.fields.populationSize}
                    ${this.fields.numberOfGenerations}
                    ${this.fields.eliteSize}
                    ${this.fields.crossoverProbability}
                    ${this.fields.mutationProbability}
                </div>
                <hr>
                <h3>Evolution Setup</h3>
                ${Divider.get()}
                <div class="row">
                    <p class="fw-bold small">Fitness Assignment Scheme Weights</p>
                    ${this.fields.fitness.general.semanticPart}
                    ${this.fields.fitness.general.aestheticPart}
                </div>
                ${Divider.get()}
                <div class="row">
                    <p class="fw-bold small">Semantics Metrics</p>
                    ${this.fields.fitness.semantics.emphasis}
                    ${this.fields.fitness.semantics.layout}
                    ${this.fields.fitness.semantics.visuals}
                </div>
                ${Divider.get()}
                <div class="row">
                    <p class="fw-bold small">Aesthetics Metrics</p>
                    ${this.fields.fitness.aesthetics.alignment}
                    ${this.fields.fitness.aesthetics.regularity}
                    ${this.fields.fitness.aesthetics.balance}
                    ${this.fields.fitness.aesthetics.whiteSpace}
                    ${this.fields.fitness.aesthetics.justification}
                    ${this.fields.fitness.aesthetics.typefaceParing}
                </div>
                ${Divider.get()}
            </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('evo-panel', EvolutionPanel);