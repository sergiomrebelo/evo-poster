import {html, LitElement} from "lit";
import {TextInput} from "../inputs/TextInput.js";
import {Divider} from "../Divider.js";
import {Params} from "../../Params.js";

export class EvolutionPanel extends LitElement {
    static properties = {}

    constructor() {
        super();
        this.fields = {
            populationSize: new TextInput("Population size", Params["evolution"]["popSize"], `pop-size`, (e) => {
                console.log(e);
                console.log("changing pop size");
            }, ["col-12"]),
            numberOfGenerations: new TextInput("No. generations", Params["evolution"]["noGen"], "no-gen", (e) => {
                console.log(e);
                console.log("changing no gene");
            }, ["col-12", "my-2"]),
            eliteSize: new TextInput("Elite size", Params["evolution"]["eliteSize"], "elite-size", (e) => {
                console.log(e);
                console.log("elite size");
            }, ["col-12", "my-2"]),
            crossoverProbability: new TextInput("Crossover probability", Params["evolution"]["crossoverProb"], "crossover-probability", (e) => {
                console.log(e);
                console.log("crossover prob");
            }, ["col-12", "my-2"]),
            mutationProbability: new TextInput("Mutation probability", Params["evolution"]["mutationProb"], "mutation-probability", (e) => {
                console.log(e);
                console.log("mutation prob");
            }, ["col-12", "my-2"])
        }
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