import {html, LitElement, nothing} from "lit";
import {Divider} from "./Divider.js";
import {Params} from "../Params.js";

import {TextInput} from "./inputs/TextInput.js";
import {EvolutionPanel} from "./panels/EvolutionPanel.js";
import {GenerationPanel} from "./panels/GenerationPanel.js";
import {Checkbox} from "./inputs/Checkbox.js";

export class EvolutionInterface extends LitElement {
    static properties = {
        changesInTypefaces: 0
    }

    constructor(params, initFunction, pop, errorMessage) {
        super();
        this.params = params;
        this.initPop = initFunction;
        this.pop = pop;
        this.errorMessage = errorMessage;

        // ui
        // tabs
        

        // panels
        this.generationPanel = new GenerationPanel(this.params, this.initPop, this.errorMessage);
        this.evolutionPanel = new EvolutionPanel();
    }

    // poster-tab
    #createTab = (name, id, active = false) => {
        return html`<li class="nav-item" role="presentation">
            <button class="nav-link ${active ? `active` : nothing}" id="${id}" data-bs-toggle="tab"  data-bs-target="${id}-pane"
                    type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">${name}</button></li>`;
    }

    render() {
        return html`
            <div class="backdrop z-1 opacity-fade show" id="evo-interface-backdrop"></div>
            <div class="wrapper initial-form-outer container-fluid show z-2" id="evo-interface-outer">
                <section id="initialForm" class="initial-form-inner row">
                    <div class="offset-sm-6 col-12 col-sm-6 p-3 pt-5 collapse-horizontal collapse show" id="evo-interface-inner">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="poster-tab" data-bs-toggle="tab"
                                        data-bs-target="#poster-tab-pane"
                                        type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                                    General
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="evolution-tab" data-bs-toggle="tab"
                                        data-bs-target="#evolution-tab-pane"
                                        type="button" role="tab" aria-controls="evolution-tab-pane" aria-selected="true">
                                    Evolution
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="refine-tab" data-bs-toggle="tab"
                                        data-bs-target="#refine-tab-pane"
                                        type="button" role="tab" aria-controls="refine-tab-pane" aria-selected="true">
                                    Refine
                                </button>
                            </li>
                        </ul>
                        <div class="tab-content m-3" id="tabs-contents">
                            <div class="tab-pane fade show active" id="poster-tab-pane" role="tabpanel" aria-labelledby="poster-tab" tabindex="0">
                                ${this.generationPanel}
                            </div>
                            <div class="tab-pane fade" id="evolution-tab-pane" role="tabpanel" aria-labelledby="evolution-tab" tabindex="1">
                               ${this.evolutionPanel}
                            </div>
                            <div class="tab-pane fade" id="refine-tab-pane" role="tabpanel" aria-labelledby="refine-tab" tabindex="2">
                                <h2>Refine</h2>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-12">
                                ${new Checkbox(`Show grid`, this.params.display.grid, `grid-display`, (e) => {
                                    this.params.display.grid = e.target.checked;
                                    this.pop.toggleGrid(this.params.display.grid);
                                })}
                            </div>
                            ${Divider.get()}
                            <div class="col-6 mb-3">
                                <button type="button" class="btn btn-primary">Evolve</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('init-form', EvolutionInterface);