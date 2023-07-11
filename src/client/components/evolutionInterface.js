import {html, LitElement, nothing} from "lit";
import {Divider} from "./Divider.js";
import {Params} from "../Params.js";

import {TextInput} from "../components/inputs/TextInput.js";

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

        // inputs
        console.log("Params", Params["populationSize"]);
        this.inputs = {
            evolution: {
                populationSize: new TextInput("Population Size", Params["populationSize"], `pop-size`, (e) => {
                    console.log(e);
                    console.log("changing pop size");
                }, 6),
                numberOfGenerations: new TextInput( "No. Generations", Params["NumberOfGenerations"], "no-gen", (e) => {
                    console.log(e);
                    console.log("changing no gene");
                }, 6),
                eliteSize: null,
                crossoverProbability: null,
                mutationProbability: null
            }
        }
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
                                <div class="row form-group my-2" id="poster-features">
                                    <form>
                                        
                                        <div class="form-group row">
                                            <small class="my-2 fw-bold">Poster size</small>
                                            <div class="col-4">
                                                <div class="input-group  input-group-sm" id="size-x">
                                                    <span class="input-group-text" id="size-x-input-label">Width</span>
                                                    <input type="text" class="form-control" id="size-x-input"
                                                           placeholder="width" value="1"
                                                           @change="${this.#updateSize}">
                                                </div>
                                            </div>
                                            <div class="col-4 mb-2">
                                                <div class="input-group  input-group-sm" id="size-y">
                                                    <span class="input-group-text" id="size-y-input-label">Height</span>
                                                    <input type="text" class="form-control" id="size-y-input"
                                                           placeholder="height"
                                                           value="${Math.round(this.params.size.height / this.params.size.width * 100) / 100}"
                                                           @change="${this.#updateSize}">
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-8 mb-3">
                                                <div class="input-group input-group-sm" id="size-mg">
                                                    <span class="input-group-text" id="size-mg-input-label">Margins (ltrb)</span>
                                                    <input type="text" class="form-control mr-2 mg-input col-2" id="size-mg-input-l"
                                                           placeholder="left" value="${this.params.size.margin[0]}"
                                                           @change="${this.#updateSize}">
                                                    <input type="text" class="form-control mr-2 mg-input col-2" id="size-mg-input-t"
                                                           placeholder="top" value="${this.params.size.margin[1]}"
                                                           @change="${this.#updateSize}">
                                                    <input type="text" class="form-control mr-2 mg-input col-2" id="size-mg-input-r"
                                                           placeholder="right" value="${this.params.size.margin[2]}"
                                                           @change="${this.#updateSize}">
                                                    <input type="text" class="form-control mr-2 mg-input col-2" id="size-mg-input-b"
                                                           placeholder="bottom" value="${this.params.size.margin[3]}"
                                                           @change="${this.#updateSize}">
                                                </div>
                                            </div>
                                            <hr>
                                        </div>
                                        
                                        ${Divider.get()}
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

                                        ${Divider.get()}
                                        <div class="form-group">
                                            <small class="my-2">
                                                <b>Typography Main Colour</b>
                                            </small>
                                            <div class="my-2">
                                                <input type="color"
                                                       class="form-control form-control-color colour-picker mr-2 d-inline-flex"
                                                       id="typography-colour-picker"
                                                       value="${this.params.typography.color.value}"
                                                       title="colour-typography" disabled
                                                       @change="${(e) => {
                                                           if (this.params.typography.color.value !== e.target.value) {
                                                               this.params.typography.color.value = e.target.value;
                                                               this.initPop();
                                                           }
                                                       }}">
                                                <div class="d-inline-flex flex-md-fill mx-2">
                                                    <input class="form-check-input" type="checkbox" value=""
                                                           id="random-colour-typo-check" checked=true
                                                           @change="${async (e) => {
                                                               const el = document.getElementById(`typography-colour-picker`);
                                                               this.params.typography.color.random = e.target.checked;
                                                               el.disabled = e.target.checked;
                                                               this.initPop();
                                                           }}">
                                                    <label class="form-check-label small px-2" for="color-typo-check">Random</label>
                                                </div>
                                            </div>
                                        </div>
                                        ${Divider.get()}
                                        <div class="form-group">
                                            <small class="my-2">
                                                <b>Typography Weight</b>
                                            </small>
                                            <div class="row">
                                                <div class="col-12">
                                                    <label for="weight-slider-min" class="form-label small">Min
                                                        Weight</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="range" class="form-range" id="weight-slider-min"
                                                           min="${this.fonts.weight.min}"
                                                           max="${this.fonts.weight.max}" step="1"
                                                           value=${this.fonts.weight.min}
                                                           data-mirror="weight-text-min" @change="${(e) => {
                                                        this.#mirrorUpdate(e);
                                                        this.params.typography.weight.min = parseInt(e.target.value);
                                                        if (this.params.typography.weight.min > this.params.typography.weight.max) {
                                                            this.params.typography.weight.min = this.params.typography.weight.max;
                                                            e.target.value = this.params.typography.weight.max;
                                                        }
                                                        this.initPop();
                                                    }}">
                                                </div>
                                                <div class="col-4">
                                                    <div class="input-group input-group-sm">
                                                        <span class="input-group-text">Min</span>
                                                        <input type="text" id="weight-text-min" class="form-control"
                                                               value="${this.fonts.weight.min}"
                                                               data-mirror="weight-slider-min"
                                                               @change="${(e) => {
                                                                   this.#mirrorUpdate(e);
                                                                   this.params.typography.weight.min = parseInt(e.target.value);
                                                                   if (this.params.typography.weight.min > this.params.typography.weight.max) {
                                                                       this.params.typography.weight.min = this.params.typography.weight.max;
                                                                       e.target.value = this.params.typography.weight.max;
                                                                   }
                                                                   this.initPop();
                                                               }}">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <label for="weight-slider-max" class="form-label small">Max
                                                        Weight</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="range" class="form-range" id="weight-slider-max"
                                                           min="${this.fonts.weight.min}"
                                                           max="${this.fonts.weight.max}" step="1"
                                                           value=${this.fonts.weight.max}
                                                           data-mirror="weight-text-max"
                                                           @change="${(e) => {
                                                               this.#mirrorUpdate(e);
                                                               this.params.typography.weight.max = parseInt(e.target.value);
                                                               if (this.params.typography.weight.max < this.params.typography.weight.min) {
                                                                   this.params.typography.weight.max = this.params.typography.weight.min;
                                                                   e.target.value = this.params.typography.weight.min;
                                                               }
                                                               this.initPop();
                                                           }}">
                                                </div>
                                                <div class="col-4">
                                                    <div class="input-group input-group-sm">
                                                        <span class="input-group-text">Min</span>
                                                        <input type="text" id="weight-text-max" class="form-control"
                                                               value="${this.fonts.weight.max}"
                                                               data-mirror="weight-slider-max"
                                                               @change="${(e) => {
                                                                   this.#mirrorUpdate(e);
                                                                   this.params.typography.weight.max = parseInt(e.target.value);
                                                                   if (this.params.typography.weight.max < this.params.typography.weight.min) {
                                                                       this.params.typography.weight.max = this.params.typography.weight.min;
                                                                       e.target.value = this.params.typography.weight.min;
                                                                   }
                                                                   this.initPop();
                                                               }}">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        ${Divider.get()}
                                        <div class="form-group input-group-sm">
                                            <small class="my-2">
                                                <b>Typography Horizontal Motion</b>
                                            </small>
                                            <br>
                                            <div class="row">
                                                <div class="col-12">
                                                    <label for="stretch-slider-min" class="form-label small">Min
                                                        Horizontal Motion</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="range" class="form-range" id="weight-slider-min"
                                                           min="${this.fonts.stretch.min}"
                                                           max="${this.fonts.stretch.max}" step="10"
                                                           value=${this.fonts.stretch.min}
                                                           data-mirror="stretch-text-min"
                                                           @change="${(e) => {
                                                               this.#mirrorUpdate(e);
                                                               this.params.typography.stretch.min = parseInt(e.target.value);
                                                               if (this.params.typography.stretch.min > this.params.typography.stretch.max) {
                                                                   this.params.typography.stretch.min = this.params.typography.stretch.max;
                                                                   e.target.value = this.params.typography.stretch.max;
                                                               }
                                                               this.initPop();
                                                           }}">
                                                </div>
                                                <div class="col-4">
                                                    <div class="input-group input-group-sm">
                                                        <span class="input-group-text">Min</span>
                                                        <input type="text" id="stretch-text-min" class="form-control"
                                                               value="${this.fonts.stretch.min}"
                                                               data-mirror="stretch-slider-min"
                                                               @change="${(e) => {
                                                                   this.#mirrorUpdate(e);
                                                                   this.params.typography.stretch.min = parseInt(e.target.value);
                                                                   if (this.params.typography.stretch.min > this.params.typography.stretch.max) {
                                                                       this.params.typography.stretch.min = this.params.typography.stretch.max;
                                                                       e.target.value = this.params.typography.stretch.max;
                                                                   }
                                                                   this.initPop();
                                                               }}">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <label for="stretch-slider-max" class="form-label small">Max
                                                        Horizontal Motion</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="range" class="form-range" id="stretch-slider-max"
                                                           min="${this.fonts.stretch.min}"
                                                           max="${this.fonts.stretch.max}"
                                                           value=${this.fonts.stretch.max} step="10"
                                                           data-mirror="stretch-text-max"
                                                           @change="${(e) => {
                                                               this.#mirrorUpdate(e);
                                                               this.params.typography.stretch.max = parseInt(e.target.value);
                                                               if (this.params.typography.stretch.min > this.params.typography.stretch.max) {
                                                                   this.params.typography.stretch.max = this.params.typography.stretch.min;
                                                                   e.target.value = this.params.typography.stretch.min;
                                                               }
                                                               this.initPop();
                                                           }}">
                                                </div>
                                                <div class="col-4">
                                                    <div class="input-group input-group-sm">
                                                        <span class="input-group-text"
                                                              id="inputGroup-sizing-sm">Max</span>
                                                        <input type="text" class="form-control" id="stretch-text-max"
                                                               value="${this.fonts.stretch.max}"
                                                               data-mirror="stretch-slider-max"
                                                               @change="${(e) => {
                                                                   this.#mirrorUpdate(e);
                                                                   this.params.typography.stretch.max = parseInt(e.target.value);
                                                                   if (this.params.typography.stretch.min > this.params.typography.stretch.max) {
                                                                       this.params.typography.stretch.max = this.params.typography.stretch.min;
                                                                       e.target.value = this.params.typography.stretch.min;
                                                                   }
                                                                   this.initPop();
                                                               }}">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        ${Divider.get()}
                                        <div class="com-group my-2">
                                            <input class="form-check-input" type="checkbox" value="" id="case-check"
                                                   @change="${(e) => {
                                                       this.params.typography.uppercase = e.target.checked;
                                                       this.initPop();
                                                   }}">
                                            <label class="form-check-label small px-2" for="case-check">Uppercase</label>
                                        </div>
                                        ${Divider.get()}
                                        <div class="form-group">
                                            <small class="my-2">
                                                <b>Texbox Alignment</b><br>
                                            </small>
                                            <select
                                                    class="form-select form-select-sm my-2" id="texbox-align-style-form"
                                                    @change="${(e) => {
                                                        this.params.typography.textAlignment = parseInt(e.target.value);
                                                        this.initPop();
                                                    }}"
                                            >
                                                ${Params.textAlignmentTbOptions.map((x, i) =>
                                                        html`
                                                                <option value=${i}>${x[0]}</option>`)
                                                }
                                            </select>
                                        </div>
                                        ${Divider.get()}
                                        <div class="form-group">
                                            <small class="my-2">
                                                <b>Content</b><br>
                                                (each line of text must be defined using a semicolon)
                                            </small>
                                            <textarea class="form-control my-2" id="text-area-content-begin"
                                                      rows="${this.params.sentences.length}"
                                                      @change="${async (e) => {
                                                          const textContent = e.target.value.split("¶")
                                                          this.params["sentences"] = textContent.map(t => t.trim());
                                                          this.initPop();
                                                      }}">${this.params.sentences.join(`¶`)}</textarea>
                                        </div>
                                        ${Divider.get()}
                                        <div class="form-group">
                                            <small class="my-2">
                                                <b>Background</b><br>
                                                (Visual style of background)
                                            </small>
                                            <select
                                                    class="form-select form-select-sm my-2" id="background-style-form"
                                                    @change="${(e) => {
                                                        const els = document.querySelectorAll(`.colour-background`);
                                                        const randomColours = document.getElementById(`random-colour-background-check`);
                                                        this.params.background.color.random = randomColours.checked;
                                                        this.params.background.style = parseInt(e.target.value);
                                                        if (!randomColours.checked) {
                                                            const numberOfColours = Params.background.availableStyles[parseInt(e.target.value)][1];
                                                            els.forEach((el, i) => {
                                                                if (i < numberOfColours) {
                                                                    el.disabled = false;
                                                                } else {
                                                                    el.disabled = true;
                                                                }
                                                            });
                                                        }
                                                        this.initPop();
                                                    }}"
                                            >
                                                ${Params.background.availableStyles.map((x, i) =>
                                                        html`
                                                            <option value=${i}>${x[0]}</option>`)
                                                }
                                            </select>
                                            <div class="my-2 align-items-baseline">
                                                <input type="color"
                                                       class="form-control form-control-color colour-picker d-inline-flex mr-2 colour-background"
                                                       id="background-1-colour-picker"
                                                       value="${this.params.background.color.valueA}"
                                                       title="colour-background-1" disabled
                                                       @change="${(e) => {
                                                           if (this.params.background.color.valueA !== e.target.value) {
                                                               this.params.background.color.valueA = e.target.value;
                                                               this.initPop();
                                                           }
                                                       }}">
                                                <input type="color"
                                                       class="form-control form-control-color colour-picker mx-2 d-inline-flex colour-background"
                                                       id="background-2-colour-picker"
                                                       value="${this.params.background.color.valueB}"
                                                       title="colour-background-2" disabled
                                                       @change="${(e) => {
                                                           if (this.params.background.color.valueB !== e.target.value) {
                                                               this.params.background.color.valueB = e.target.value;
                                                               this.initPop();
                                                           }
                                                       }}">
                                                <div class="d-inline-flex flex-md-fill">
                                                    <input class="form-check-input" type="checkbox"
                                                           value="" id="random-colour-background-check" checked
                                                           @change="${(e) => {
                                                               const els = document.querySelectorAll(`.colour-background`);
                                                               this.params.background.color.random = e.target.checked;
                                                               if (!e.target.checked) {
                                                                   const mainEl = document.querySelector(`#background-style-form`);
                                                                   const numberOfColours = Params.background.availableStyles[parseInt(mainEl.value)][1];
                                                                   els.forEach((el, i) => {
                                                                       if (i < numberOfColours) {
                                                                           el.disabled = false;
                                                                           this.params.background.color.random = false;
                                                                           /* el.classList.add( `d-inline-flex`);
                                                                           el.classList.remove (`d-none`)*/
                                                                       } else {
                                                                           el.disabled = true;
                                                                           /*el.classList.remove( `d-inline-flex`);
                                                                           el.classList.add (`d-none`)*/
                                                                       }
                                                                   });

                                                               } else {
                                                                   els.forEach((el, i) => {
                                                                       el.disabled = true;
                                                                       /*el.classList.remove( `d-inline-flex`);
                                                                       el.classList.add (`d-none`)*/
                                                                   });
                                                               }
                                                               this.initPop();
                                                           }}">
                                                    <label class="form-check-label small px-2"
                                                           for="debug-check">Random</label>
                                                </div>
                                            </div>
                                        </div>
                                        ${Divider.get()}
                                        <div class="form-group">
                                            <small class="my-2">
                                                <b>Alignment</b><br>
                                                (Text alignment on poster)
                                            </small>
                                            <select class="form-select form-select-sm my-2" id="background-style-form"
                                                    @change="${(e) => {
                                                        this.params.typography.verticalAlignment = parseInt(e.target.value);
                                                        this.initPop();
                                                    }}">
                                                ${Params.textAlignmentOptions.map((x, i) =>
                                                        html`
                                                            <option value=${i}>${x[0]}</option>`)
                                                }
                                            </select>
                                        </div>
                                        ${Divider.get()}
                                        <div class="com-group my-2">
                                            <input class="form-check-input" type="checkbox" value="" id="debug-check"
                                                   checked="${this.params.display.grid}"
                                                   @change="${(e) => {
                                                       this.params.display.grid = e.target.checked;
                                                       this.pop.toggleGrid(this.params.display.grid);
                                                   }}">
                                            <label class="form-check-label small px-2" for="debug-check">Show
                                                Grid</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="evolution-tab-pane" role="tabpanel" aria-labelledby="evolution-tab" tabindex="1">
                                <h3>Evolutionary Setup</h3>
                                ${Divider.get()}
                                ${this.inputs.evolution.populationSize}
                                ${this.inputs.evolution.numberOfGenerations}
                                ${this.inputs.evolution.eliteSize}
                                ${this.inputs.evolution.crossoverProbability}
                                ${this.inputs.evolution.mutationProbability}
                                <hr>
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