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

        this.fonts = this.#getAvailableTypefaces();

        this.params.typography.weight = this.fonts.weight;
        this.params.typography.stretch = this.fonts.stretch;
        this.params.typography.typefaces = this.fonts.typefaces;

        this.changesInTypefaces = 0;


        // TODO: for to save the panels
        console.log("pop outside", this.pop);
        this.generationPanel = new GenerationPanel(this.params, this.initPop, this.pop);
        this.evolutionPanel = new EvolutionPanel();
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
                fonts.typefaces.push(font);
            }
        }
        return fonts;
    }

    #validateNumberField = (value, defaultValue = 1) => {
        value = parseFloat(value.replace(",", "."));
        return isNaN(value) || value === undefined || value === null ? defaultValue : value;
    }

    #defineTextInput = (id, value) => {
        document.getElementById(id).value = value;
    }

    #updateSize = () => {
        let width = this.#validateNumberField(document.getElementById(`size-x-input`).value);
        let height = this.#validateNumberField(document.getElementById(`size-y-input`).value);

        let ml = this.#validateNumberField(document.getElementById(`size-mg-input-l`).value, this.params.size.margin[0]);
        let mt = this.#validateNumberField(document.getElementById(`size-mg-input-t`).value, this.params.size.margin[1]);
        let mr = this.#validateNumberField(document.getElementById(`size-mg-input-r`).value, this.params.size.margin[2]);
        let mb = this.#validateNumberField(document.getElementById(`size-mg-input-b`).value, this.params.size.margin[3]);

        // automatic width calculation (width remains 1)
        if (width !== 1) {
            height = Math.round(parseFloat(height / width) * 100) / 100;
            width = 1;
        }

        this.params.size.width = Params.visualisationGrid.width * width;
        this.params.size.height = Params.visualisationGrid.width * height;
        this.params.size.margin = [ml,mt,mr,mb];

        this.#defineTextInput(`size-x-input`, width);
        this.#defineTextInput(`size-y-input`, height);
        this.#defineTextInput(`size-mg-input-l`, ml);
        this.#defineTextInput(`size-mg-input-t`, mt);
        this.#defineTextInput(`size-mg-input-r`, mr);
        this.#defineTextInput(`size-mg-input-b`, mb);

        this.initPop(true);
    }

    #tag = (value = "", i) => {
        return html`<span class="badge text-bg-secondary mr-2 typeface-badge-${value}"
                          id="typeface-badge-${value}">${value}
            <span role="button"
                  @click="${() => {
                      if (this.params.typography.typefaces.length > 1) {
                          this.params.typography.typefaces = this.params.typography.typefaces.filter((el) => {
                              return el.family !== value;
                          });
                          this.changesInTypefaces++;
                          this.initPop();
                      } else {
                          this.errorMessage.set({message: "You must select, at least, one typeface"});
                      }

                  }}">&times</span>
        </span>`;
    }

    #getTypefaceTags = () => {
        let tags = [];
        for (let i = 0; i < this.params.typography.typefaces.length; i++) {
            let f = this.params.typography.typefaces[i];
            const tag = this.#tag(f.family, i);
            tags.push(tag);
        }
        return tags;
    }

    #mirrorUpdate = (e) => {
        const mirrorEl = document.getElementById(e.target.getAttribute(`data-mirror`));
        if (mirrorEl) {
            mirrorEl.value = parseInt(e.target.value);
        }
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
                            <div class="tab-pane fade show active" id="poster-tab-pane" role="tabpanel"
                                 aria-labelledby="poster-tab" tabindex="0">
                                ${this.generationPanel}
                                <div class="row">
                                    <div class="col-12">
                                        ${new Checkbox(`Show grid`, this.params.display.grid, `grid-display`, (e) => {
                                            this.params.display.grid = e.target.checked;
                                            this.pop.toggleGrid(this.params.display.grid);
                                        })}
                                    </div>
                                </div>
                                <!-- bt -->
                                <div class="my-5"></div>
                                
                                
                                <div class="row form-group my-2" id="poster-features">
                                    <form>
                                        <div class="form-group">
                                            <small class="my-2">
                                                <b>Typefaces</b>
                                            </small>
                                            <div class="typefaces-input my-2 bootstrap-tagsinput"
                                                 id="typeface-tags-${this.numberOfTypeface}">
                                                ${this.#getTypefaceTags()}
                                            </div>
                                            <div class="input-group my-2 input-group-sm">
                                                <span class="input-group-text">Add Typeface</span>
                                                <input type="text" class="form-control" placeholder="name"
                                                       aria-label="typeface-name"
                                                       @change="${async (e) => {
                                                           const name = e.target.value;
                                                           const current = this.params.typography.typefaces.map(e => e.family);
                                                           if (Params.availableTypefaces.includes(name) && !current.includes(name)) {
                                                               for (let f of this.fonts.typefaces) {
                                                                   if (f.family === name) {
                                                                       this.params.typography.typefaces.push(f)
                                                                       break;
                                                                   }
                                                               }
                                                               this.initPop();
                                                               this.changesInTypefaces++;
                                                           } else {
                                                               this.errorMessage.set({message: `Typeface ${name} is not available<br>available typefaces: ${Params.availableTypefaces}`});
                                                               this.numberOfTypeface += 1;
                                                           }
                                                       }}">
                                            </div>
                                        </div>
                                        
                                        
                                    </form>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="evolution-tab-pane" role="tabpanel" aria-labelledby="evolution-tab" tabindex="1">
                               ${this.evolutionPanel}
                            </div>
                            <div class="tab-pane fade" id="refine-tab-pane" role="tabpanel" aria-labelledby="refine-tab" tabindex="2">
                                <h2>Refine</h2>
                            </div>
                        </div>
                        ${Divider.get()}
                        <button type="button" class="btn btn-primary">Evolve</button>
                    </div>
                </section>
            </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('init-form', EvolutionInterface);