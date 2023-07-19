import {html, LitElement} from "lit";
import {TextInput} from "../inputs/TextInput.js";
import {validateNumberInput} from "../inputs/utils.js"
import {Params} from "../../Params.js";
import {Divider} from "../Divider.js";
import {ColorInput} from "../inputs/ColorInput.js";
import {Checkbox} from "../inputs/Checkbox.js";
import {Slider} from "../inputs/Slider.js";
import {DropDownList} from "../inputs/DropDownList.js";
import {TextArea} from "../inputs/TextArea.js";

export class GenerationPanel extends LitElement {
    static properties = {
        params: {},
        changesInTypefaces: 0

    }
    constructor(params, restart, errorMessage, id = "poster-features") {
        super();

        this.id = id;
        // configuration params
        this.params = params;

        // restart pop
        this.restart = restart;

        // available fonts
        // this.fonts = this.#getAvailableTypefaces();
        /* if (this.params) {
            if (this.params["typography"]) {
                this.params["typography"]["weight"] && (this.params["typography"]["weight"] = this.fonts["weight"]);
                this.params["typography"]["stretch"] && (this.params["typography"]["stretch"]  = this.fonts["stretch"] );
                this.params["typography"]["typefaces"] && (this.params["typography"]["typefaces"]  = this.fonts["typefaces"] );
            }
        }*/
        this.changesInTypefaces = 0;

        // error handler
        this.errorMessage = errorMessage;

        // input fields
        // TODO: refactor to list or array
        const sentences = this.params ? this.params["sentences"] : [];
        this.fields = {
            content: new TextArea(`<b>Content</b> The text lines are defined by pilcrows (¶)`,
                sentences, `text-area-content`, (e) => {
                    const textContent = e.target.value.split("¶")
                    this.params["sentences"] && (this.params["sentences"] = textContent.map(t => t.trim()));
                    this.restart();
                }),
            size: {
                width: new TextInput("Width", 1, `size-x`, this.#updateSize, ["col-8", "mb-2"]),
                height: new TextInput("Height", Math.round(this.params["size"]["height"] / this.params["size"]["width"] * 100) / 100, `size-y`, this.#updateSize, ["col-8", "mb-2"]),
                margins: {
                    left: new TextInput("Margins (ltrb)", this.params.size.margin[0], `size-mg-l`, this.#updateSize, ["col-8", "my-2"]),
                    top: new TextInput(null, this.params.size.margin[1], `size-mg-t`, this.#updateSize, ["col-4", "my-2"]),
                    right: new TextInput(null, this.params.size.margin[2], `size-mg-r`, this.#updateSize, ["col-4"]),
                    bottom: new TextInput(null, this.params.size.margin[3], `size-mg-b`, this.#updateSize, ["col-4"])
                }
            },
            typography: {
                color: new ColorInput(
                    "Main Colour", this.params.typography.color.value, null,
                    "typography", (e) => {
                        if (this.params.typography.color.value !== e.target.value) {
                            this.params.typography.color.value = e.target.value;
                            this.restart();
                        }
                    },
                    ["col-8", "my-2"]),
                random: new Checkbox(`Random`, true, `random-colour-typo`, async (e) => {
                    const el = document.getElementById(`typography-colour-picker-1`);
                    this.params.typography.color.random = e.target.checked;
                    el.disabled = e.target.checked;
                    this.params.typography.lock[1] = !e.target.checked;
                    this.restart();
                }, ["col-4"]),
                weight: {
                    min: new Slider(`Min`, this.params["typography"]["typefaces"]["weight"]["min"], this.params["typography"]["typefaces"]["weight"]["min"], this.params["typography"]["typefaces"]["weight"]["max"], 1, `typeface-weight-min`, (e) => {
                        this.params["typography"]["weight"]["min"] = parseInt(e.target.value);
                        if (this.params["typography"]["weight"]["min"] > this.params["typography"]["weight"]["max"]) {
                            this.params["typography"]["weight"]["min"] = this.params["typography"]["weight"]["max"];
                            e.target.value = this.params["typography"]["weight"]["max"];
                        }
                        this.restart();
                    }, ["my-2"]),
                    max: new Slider(`Max`, this.params["typography"]["typefaces"]["weight"]["max"], this.params["typography"]["typefaces"]["weight"]["min"], this.params["typography"]["typefaces"]["weight"]["max"], 1, `typeface-weight-max`, (e) => {
                        this.params["typography"]["weight"]["max"] = parseInt(e.target.value);
                        if (this.params["typography"]["weight"]["max"] < this.params["typography"]["weight"]["min"]) {
                            this.params["typography"]["weight"]["max"] = this.params["typography"]["weight"]["min"];
                            e.target.value = this.params["typography"]["weight"]["min"];
                        }
                        this.restart();
                    }, ["my-2"])
                },
                stretch: {
                    min: new Slider(`Min`, this.params["typography"]["typefaces"]["stretch"]["min"], this.params["typography"]["typefaces"]["stretch"]["min"], this.params["typography"]["typefaces"]["stretch"]["max"], 1, `typeface-stretch-min`, (e) => {
                        this.params["typography"]["stretch"]["min"] = parseInt(e.target.value);
                        if (this.params["typography"]["stretch"]["min"] > this.params["typography"]["stretch"]["max"]) {
                            this.params["typography"]["stretch"]["min"] = this.params["typography"]["stretch"]["max"];
                            e.target.value = this.params["typography"]["stretch"]["max"];
                        }
                        this.restart();
                    }, ["my-2"]),
                    max: new Slider(`Max`, this.params["typography"]["typefaces"]["stretch"]["max"], this.params["typography"]["typefaces"]["stretch"]["min"], this.params["typography"]["typefaces"]["stretch"]["max"], 1, `typeface-stretch-max`, (e) => {
                        this.params["typography"]["stretch"]["max"] = parseInt(e.target.value);
                        if (this.params["typography"]["stretch"]["max"] < this.params["typography"]["stretch"]["min"]) {
                            this.params["typography"]["stretch"]["max"] = this.params["typography"]["stretch"]["min"];
                            e.target.value = this.params["typography"]["stretch"]["max"];
                        }
                        this.restart();
                    }, ["my-2"]),
                },
                verticalAlignment: new DropDownList(`Vertical alignment`, Params.textAlignmentOptions, 0, `vertical-align`, (e) => {
                    this.params.typography.verticalAlignment = parseInt(e.target.value);
                    this.restart();
                }, ["mb-2"]),
                typefaces: new TextInput(`Add Typeface`, "", `typefaces-add`, (e) => {
                    const name = e.target.value;
                    const current = this.params.typography.typefaces.map(e => e.family);
                    if (Params.availableTypefaces.includes(name) && !current.includes(name)) {
                        for (let f of this.fonts.typefaces) {
                            if (f.family === name) {
                                this.params.typography.typefaces.push(f)
                                break;
                            }
                        }
                        this.restart();
                        this.changesInTypefaces++;
                    } else {
                        this.errorMessage.set({message: `Typeface ${name} is not available<br>available typefaces: ${Params.availableTypefaces}`});
                        this.numberOfTypeface += 1;
                    }
                }, ["mb-2"])
            },
            textboxes: {
                align: new DropDownList(`Texbox alignment`, Params.textAlignmentTbOptions, 0, `texbox-align`, (e) => {
                    this.params.typography.textAlignment = parseInt(e.target.value);
                    this.params.typography.lock[7] = e.target.value !== 0;
                    this.restart();
                }, ["mb-2"]),
                uppercase: new Checkbox(`Uppercase`, this.params.typography.uppercase, `case`, (e) => {
                    this.params.typography.uppercase = e.target.checked;
                    this.restart();
                })
            },
            background: {
                style: new DropDownList(`Background Style`, Params.background.availableStyles, 0, `background-style`, (e) => {
                    const els = document.querySelectorAll(`.background-colour-picker`);
                    const isRandom = document.getElementById(`bk-color-check`).checked;
                    this.params.background.color.random = isRandom;
                    this.params.background.style = parseInt(e.target.value);
                    this.params.background.lock[0] = (this.params.background.style !== 0);
                    if (!isRandom) {
                        const numberOfColours = Params.background.availableStyles[parseInt(e.target.value)][1];
                        els.forEach((el, i) => {
                            if (i < numberOfColours) {
                                el.disabled = false;
                            } else {
                                el.disabled = true;
                            }
                        });
                    }
                    this.restart();
                }, ["mb-2"]),
                colors: new ColorInput(`Color`, this.params.background.color.valueA, this.params.background.color.valueB, `background`, (e) => {
                    const attr = e.target.getAttribute("data-param");
                    if (this.params["background"]["color"][attr] !== e.target.value) {
                        this.params["background"]["color"][attr] = e.target.value;
                    }
                    this.restart();
                }),
                random: new Checkbox(`Random`, true, `bk-color`, (e) => {
                    const els = document.querySelectorAll(`.background-colour-picker`);
                    const isRandom = e.target.checked;
                    this.params.background.color.random = isRandom;
                    this.params.background.lock[1] = !isRandom;
                    if (!isRandom) {
                        const style = document.getElementById(`background-style-list`).value;
                        const numberOfColours = Params.background.availableStyles[parseInt(style)][1];
                        els.forEach((el, i) => {
                            if (i < numberOfColours) {
                                el.disabled = false;
                                this.params.background.color.random = false;
                            } else {
                                el.disabled = true;
                            }
                        });
                    } else {
                        els.forEach((el) => el.disabled = true);
                    }
                    this.restart();
                })
            }
        }
    }



    #updateSize = () => {
        let width = validateNumberInput(document.getElementById(`size-x-input`).value);
        let height = validateNumberInput(document.getElementById(`size-y-input`).value);
        let ml = validateNumberInput(document.getElementById(`size-mg-l-input`).value, this.params.size.margin[0]);
        let mt = validateNumberInput(document.getElementById(`size-mg-t-input`).value, this.params.size.margin[1]);
        let mr = validateNumberInput(document.getElementById(`size-mg-r-input`).value, this.params.size.margin[2]);
        let mb = validateNumberInput(document.getElementById(`size-mg-b-input`).value, this.params.size.margin[3]);

        if (width !== 1) {
            height = Math.round(parseFloat(height / width) * 100) / 100;
            width = 1;
        }

        this.params.size.width = Params.visualisationGrid.width * width;
        this.params.size.height = Params.visualisationGrid.width * height;
        this.params.size.margin = [ml, mt, mr, mb];

        // console.log(`margins=[${ml} | ${mt} | ${mr} | ${mb}]`);
        // console.log(`width=${width}. height=${height}`);

        document.getElementById(`size-x-input`).value = width;
        document.getElementById(`size-y-input`).value = height;
        document.getElementById(`size-mg-l-input`).value = ml;
        document.getElementById(`size-mg-t-input`).value = mt;
        document.getElementById(`size-mg-r-input`).value = mr;
        document.getElementById(`size-mg-b-input`).value = mb;

        this.restart(true);
    }

    #tag = (value = "", i) => {
        return html`<span class="badge text-bg-secondary mr-2 typeface-badge-${value}"
                          id="typeface-badge-${value}">${value}
            <span role="button" @click="${() => {
            if (this.params.typography.typefaces.length > 1) {
                this.params.typography.typefaces = this.params.typography.typefaces.filter((el) => {
                    return el.family !== value;
                });
                this.changesInTypefaces++;
                this.restart();
            } else {
                this.errorMessage.set({message: "You must select, at least, one typeface"});
            }
        }}">&times</span>
        </span>`;
    }

    #getTypefaceTags = () => {
        let tags = [];
        if (this.params !== undefined) {
            for (let i = 0; i < this.params.typography.typefaces.length; i++) {
                let f = this.params.typography.typefaces[i];
                const tag = this.#tag(f.family, i);
                tags.push(tag);
            }
        }
        return tags;
    }

    // panel sections
    #posterSizeFeatures = () => {
        return html`
            <div class="form-group row">
                <h3 class="fw-bold col-12">Posters size</h3>
                ${this.fields.size.width}
                ${this.fields.size.height}
                <div class="row mt-2 mb-4">
                    ${this.fields.size.margins.left}
                    ${this.fields.size.margins.top}
                    ${this.fields.size.margins.right}
                    ${this.fields.size.margins.bottom}
                </div>
                <hr>
            </div>`;
    }

    #posterTypographyFeatures = () => {
        return html`
            <div class="form-group row">
                <h3 class="mb-3 fw-bold col-12">Typography</h3>
                <div class="row form-group my-2" id="typeface-selector">
                    <small class="fw-bold col-12">Typeface</small>
                    <div class="typefaces-input my-2 bootstrap-tagsinput" id="typeface-tags-${this.numberOfTypeface}">
                        ${this.#getTypefaceTags()}
                    </div>
                    ${this.fields.typography.typefaces}
                </div>
                <div class="row d-flex align-items-center">
                    ${this.fields.typography.color}
                    ${this.fields.typography.random}
                </div>
                <div class="row mt-2">
                    <small class="fw-bold col-12">Weight</small>
                    ${this.fields.typography.weight.min}
                    ${this.fields.typography.weight.max}
                </div>
                <div class="row my-2">
                    <small class="fw-bold col-12">Horizontal Motion</small>
                    ${this.fields.typography.stretch.min}
                    ${this.fields.typography.stretch.max}
                </div>
                ${this.fields.typography.verticalAlignment}
                <hr>
            </div>`;
    }

    #textBoxesFeatures = () => {
        return html`
            <div class="form-group row">
                <h3 class="mb-3 fw-bold col-12">Text box features</h3>
                ${this.fields.textboxes.align}
                ${this.fields.textboxes.uppercase}
                <hr class="mt-4">
            </div>`
    }

    #contentFeatures = () => {
        this.fields.content.set(this.params.sentences);

        return html`<div class="form-group row">
            ${this.fields.content}
            <hr class="mt-4">
        </div>`;
    }

    #backgroundFeatures = () => {
        return html`<div class="form-group row">
            <h3 class="mb-3 fw-bold col-12">Background features</h3>
            ${this.fields.background.style}
            <div class="row d-flex align-items-center">
                <div class="col-8">
                    ${this.fields.background.colors}
                </div>
                <div class="col-4">
                    ${this.fields.background.random}
                </div>
            </div>
            <hr class="mt-4">
        </div>`;
    }

    render() {

        return html`
            <div class="row form-group my-2 init-selector">
                <form>
                    ${this.#contentFeatures()}
                    ${Divider.get()}
                    ${this.#posterSizeFeatures()}
                    ${Divider.get()}
                    ${this.#posterTypographyFeatures()}
                    ${Divider.get()}
                    ${this.#textBoxesFeatures()}
                    ${Divider.get()}
                    ${this.#backgroundFeatures()}
                </form>
            </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('generation-panel', GenerationPanel);


