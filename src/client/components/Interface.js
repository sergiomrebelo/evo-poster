import {html, LitElement, nothing} from "lit";
import {Divider} from "./Divider.js";
import {EvolutionPanel} from "./panels/EvolutionPanel.js";
import {GenerationPanel} from "./panels/GenerationPanel.js";
import {Checkbox} from "./inputs/Checkbox.js";

export class Interface extends LitElement {
    static properties = {
        evolving: false
    }

    constructor(params, initFunction, pop, errorMessage, initEvolution) {
        super();
        this.params = params;
        this.restart = initFunction;
        this.pop = pop;
        this.errorMessage = errorMessage;
        this.initEvolution = initEvolution;
        this.evolving = false;

        // ui
        this.generationPanelID = "poster-tab";
        this.evolutionPanelID = "evolution-tab";
        this.refinePanelID = "refine-tab";
        // tabs
        this.tabGeneration = this.#createTab(`General`, this.generationPanelID, true);
        this.tabEvolution = this.#createTab(`Evolution`, this.evolutionPanelID, false);
        this.tabRefine = this.#createTab(`Refine`, this.refinePanelID, false);
        // panels
        this.generationPanel = new GenerationPanel(this.params, this.restart, this.errorMessage);
        this.evolutionPanel = new EvolutionPanel(this.params, this.restart, this.errorMessage, this.pop);
    }

    #createTab = (name, id, active = false) => {
        const c = active ? `nav-link active` : `nav-link disabled`;
        return html`<li class="nav-item" role="presentation">
            <button class="${c}" id="${id}" data-bs-toggle="tab"  data-bs-target="#${id}-panel"
                    type="button" role="tab" aria-controls="${id}-pane" aria-selected="true">${name}</button></li>`;
    }

    render() {
        return html`
            <div class="backdrop z-1 opacity-fade show" id="evo-interface-backdrop"></div>
            <div class="wrapper initial-form-outer container-fluid show z-2" id="evo-interface-outer">
                <section id="initialForm" class="initial-form-inner row">
                    <div class="offset-sm-6 col-12 col-sm-6 p-3 pt-5 collapse-horizontal collapse show" id="evo-interface-inner">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            ${this.tabGeneration}
                            ${this.tabEvolution}
                            ${this.tabRefine}
                        </ul>
                        <div class="tab-content m-3" id="tabs-contents">
                            <div class="tab-pane fade show active" id="${this.generationPanelID}-panel" role="tabpanel" aria-labelledby="${this.generationPanelID}" tabindex="0">
                                ${this.generationPanel}
                            </div>
                            <div class="tab-pane fade" id="${this.evolutionPanelID}-panel" role="tabpanel" aria-labelledby="${this.evolutionPanelID}" tabindex="1">
                               ${this.evolutionPanel}
                            </div>
                            <div class="tab-pane fade" id="${this.refinePanelID}-panel" role="tabpanel" aria-labelledby="${this.refinePanelID}" tabindex="2">
                                <p>TBD</p>
                            </div>
                        </div>
                        <div class="m-3">
                            <div class="row">
                                <div class="col-12 px-2">
                                    ${new Checkbox(`Show grid`, this.params.display.grid, `grid-display`, (e) => {
                                        this.params.display.grid = e.target.checked;
                                        this.pop.toggleGrid(this.params.display.grid);
                                    })}
                                </div>
                                ${Divider.get()}
                                <div class="col-12 mb-3">
                                    <button type="button" id="evolve-bt" class="btn btn-primary mb-2" @click="${(e) => {
                                        // lock interface evo
                                        document.querySelectorAll(`.init-selector`).forEach((el) => {
                                            el.classList.add("disabled-inputs");
                                        });
                                        // disable evolutionary tab
                                        document.getElementById(this.generationPanelID).classList.remove(`active`);
                                        document.getElementById(this.evolutionPanelID).classList.remove(`disabled`);
                                        document.getElementById(this.evolutionPanelID).classList.add(`active`);
                                        // show evolutionary tab
                                        document.getElementById(`${this.generationPanelID}-panel`).classList.remove(...[`active`, `show`]);
                                        document.getElementById(`${this.evolutionPanelID}-panel`).classList.add(...[`active`, `show`]);
                                        
                                        // show new bts
                                        e.target.style.display = `none`;
                                        document.querySelectorAll(`.evo-bts`).forEach((el) => {
                                            el.classList.remove("d-none");
                                        });
                                        
                                    }}">Evolve</button>
                                    <button type="button" id="start-bt" class="btn btn-primary mb-2 d-none evo-bts" ?disabled="${this.evolving}"
                                            @click="${(e) => {
                                                this.pop.evolving = true;
                                                this.pop.evolve();
                                                this.evolving = true;
                                                this.pop.pause = false;
                                                document.querySelectorAll(`.evolution-locked`).forEach((el) => {
                                                    el.disabled = true;
                                                    el.classList.add("disabled-inputs");
                                                });
                                                e.target.disabled = true;
                                    }}">Start</button>
                                    <button type="button" id="stop-evolving" class="btn btn-primary mx-2 mb-2 d-none evo-bts" ?disabled="${!this.evolving}"
                                            @click="${(e) => {
                                                this.pop.evolving = false;
                                                this.pop.pause = true;
                                                this.evolving = false;
                                    }}">Stop</button>
                                </div>
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

customElements.define('init-form', Interface);