import {html, LitElement} from "lit";
import {TextInput} from "../inputs/TextInput.js";
import {Divider} from "../Divider.js";
import {Params} from "../../Params.js";
import {validateNumberInput} from "../inputs/utils.js";

export class EvolutionPanel extends LitElement {
    static properties = {}

    constructor(params, restart, errorMessage) {
        super();

        this.params = params;
        this.restart = restart;
        this.errorMessage = errorMessage;

        this.fields = {
            populationSize: new TextInput("Population size", params["evo"]["popSize"], `pop-size`, (e) => {
                params["evo"]["popSize"] = this.#validateValue(e.target.value, this.params["evo"]["popSize"],  2);
                e.target.value = params["evo"]["popSize"];
                this.restart();
            }, ["col-12", "evolution-locked"]),
            numberOfGenerations: new TextInput("No. generations", params["evo"]["noGen"], "no-gen", (e) => {
                params["evo"]["noGen"] = this.#validateValue(e.target.value, this.params["evo"]["noGen"],  2);
                e.target.value = params["evo"]["popSize"];
            }, ["col-12", "my-2"]),
            eliteSize: new TextInput("Elite size", params["evo"]["eliteSize"], "elite-size", (e) => {
                let max = Math.round(parseInt(params["evo"]["popSize"])/2);
                params["evo"]["eliteSize"] = this.#validateValue(e.target.value, this.params["evo"]["eliteSize"], 0, max);
                if (parseInt(e.target.value) > max) {
                    this.errorMessage.set({message: `elite size must be in the maximum half of the full population`});
                }
                e.target.value = params["evo"]["eliteSize"];
            }, ["col-12", "my-2"]),
            crossoverProbability: new TextInput("Crossover probability", params["evo"]["crossoverProb"], "crossover-probability", (e) => {
                params["evo"]["crossoverProb"] = this.#validateValue(e.target.value, params["evo"]["crossoverProb"],  0, 1);
                e.target.value = params["evo"]["crossoverProb"];
            }, ["col-12", "my-2"]),
            mutationProbability: new TextInput("Mutation probability", params["evo"]["mutationProb"], "mutation-probability", (e) => {
                params["evo"]["mutationProb"] = this.#validateValue(e.target.value, params["evo"]["mutationProb"],  0, 1);
                e.target.value = params["evo"]["mutationProb"];
            }, ["col-12", "my-2"])
        }
    }


    #validateValue = (value, current, min, max = null) => {
        let v = validateNumberInput(value, current);
        console.log("max inside", max);
        if (current !== v) {
            if (max !== null) {
                value = Math.min(max, value);
                console.log("max inside 2", value);
            }

            current = Math.max(min, value);
        }
        return current;
    }


    render() {
        return html`
            <div id="evolution-panel-inner">
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