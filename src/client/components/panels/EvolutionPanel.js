import {html, LitElement} from "lit";
import {TextInput} from "../inputs/TextInput.js";
import {Divider} from "../Divider.js";
import {Params} from "../../Params.js";
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
            }, ["col-12", "my-2"])
        }
    }


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
            </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('evo-panel', EvolutionPanel);