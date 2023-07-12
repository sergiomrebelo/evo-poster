import {html, LitElement} from "lit";
import {TextInput} from "../inputs/TextInput.js";
import {validateNumberInput} from "../inputs/utils.js"
import {Params} from "../../Params.js";
import {Divider} from "../Divider.js";
import {ColorInput} from "../inputs/ColorInput.js";
import {Checkbox} from "../inputs/Checkbox.js";
import {Slider} from "../inputs/Slider.js";

export class GenerationPanel extends LitElement {
    constructor(params, restart) {
        super();
        // configuration params
        this.params = params;

        // restart pop
        this.restart = restart;

        // available fonts
        this.fonts = this.#getAvailableTypefaces();

        // input fields
        this.fields = {
            size: {
                width: new TextInput("Width", 1, `size-x`, this.#updateSize, ["col-8", "mb-2"]),
                height: new TextInput("Height", Math.round(this.params.size.height / this.params.size.width * 100) / 100, `size-y`, this.#updateSize, ["col-8", "mb-2"]),
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
                    console.log(`inside`);
                    const el = document.getElementById(`typography-colour-picker`);
                    this.params.typography.color.random = e.target.checked;
                    el.disabled = e.target.checked;
                    this.restart();
                }, ["col-4"]),
                weight: {
                    min: new Slider(`Min`, this.fonts.weight.min, this.fonts.weight.min, this.fonts.weight.max, 1, `typeface-weight-min`, (e) => {
                        this.params["typography"]["weight"]["min"] = parseInt(e.target.value);
                        if (this.params["typography"]["weight"]["min"] > this.params["typography"]["weight"]["max"]) {
                            this.params["typography"]["weight"]["min"] = this.params["typography"]["weight"]["max"];
                            e.target.value = this.params["typography"]["weight"]["max"];
                        }
                        this.restart();
                    }, ["my-2"]),
                    max: new Slider(`Max`, this.fonts.weight.max, this.fonts.weight.min, this.fonts.weight.max, 1, `typeface-weight-max`, (e) => {
                        this.params["typography"]["weight"]["max"] = parseInt(e.target.value);
                        if (this.params["typography"]["weight"]["max"] < this.params["typography"]["weight"]["min"]) {
                            this.params["typography"]["weight"]["max"] = this.params["typography"]["weight"]["min"];
                            e.target.value = this.params["typography"]["weight"]["min"];
                        }
                        this.restart();
                    }, ["my-2"])
                },
                stretch: {
                    min: new Slider(`Min`, this.fonts.stretch.min, this.fonts.stretch.min, this.fonts.stretch.max, 1, `typeface-stretch-min`, (e) => {
                        this.params["typography"]["stretch"]["min"] = parseInt(e.target.value);
                        if (this.params["typography"]["stretch"]["min"] > this.params["typography"]["stretch"]["max"]) {
                            this.params["typography"]["stretch"]["min"] = this.params["typography"]["stretch"]["max"];
                            e.target.value = this.params["typography"]["stretch"]["max"];
                        }
                        this.restart();
                    }, ["my-2"]),
                    max: new Slider(`Max`, this.fonts.stretch.max, this.fonts.stretch.min, this.fonts.stretch.max, 1, `typeface-stretch-max`, (e) => {
                        this.params["typography"]["stretch"]["max"] = parseInt(e.target.value);
                        if (this.params["typography"]["stretch"]["max"] < this.params["typography"]["stretch"]["min"]) {
                            this.params["typography"]["stretch"]["max"] = this.params["typography"]["stretch"]["min"];
                            e.target.value = this.params["typography"]["stretch"]["max"];
                        }
                        this.restart();
                    }, ["my-2"]),
                }
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

    #posterSizeFeatures = () => {
        return html`
            <div class="form-group row">
                <h3 class="mt-4 mb-4 fw-bold col-12">Posters size</h3>
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
                <div class="row d-flex align-items-center">
                    ${this.fields.typography.color}
                    ${this.fields.typography.random}
                </div>
                <div class="row mt-4">
                    <small class="fw-bold col-12">Weight</small>
                    ${this.fields.typography.weight.min}
                    ${this.fields.typography.weight.max}
                </div>
                <div class="row mt-4">
                    <small class="fw-bold col-12">Horizontal Motion</small>
                    ${this.fields.typography.stretch.min}
                    ${this.fields.typography.stretch.max}
                </div>
            </div>`;
    }

    render() {
        return html`
            <div class="row form-group my-2" id="poster-features">
                <form>
                    ${this.#posterSizeFeatures()}
                    ${Divider.get()}
                    <!-- typefaces -->
                    ${this.#posterTypographyFeatures()}
                    ${Divider.get()}
                </form>
            </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('generation-panel', GenerationPanel);


