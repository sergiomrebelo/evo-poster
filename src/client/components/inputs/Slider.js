import {html, LitElement, nothing} from "lit";
import {TextInput} from "./TextInput.js";

export class Slider extends LitElement {
    static properties = {
        label: "label",
        min: 0,
        max: 100,
        step: 1,
        value: 50,
        onChange: () => {}
    }

    constructor(label, value, min, max, step, id, onChange = () => {}, classList = []) {
        super();
        this.label = label;
        this.min = min;
        this.max = max;
        this.step = step;
        this.id = id;
        this.value = value;
        this.classList.add(...classList);
        this.onChange = (e) => {
            this.#mirrorUpdate(e);
            onChange(e);
        }

        this.textField = new TextInput(this.label, this.value, `${this.id}-text`, (e) => {
            this.#mirrorUpdate(e);
            onChange(e);
        }, [], `${this.id}-slider`);
    }

    #mirrorUpdate = (e) => {
        const mirrorElement = document.getElementById(e.target.getAttribute(`data-mirror`));
        if (mirrorElement) {
            mirrorElement.value = parseInt(e.target.value);
        }
    }

    render() {
        return html`<div class="row">
            <div class="col-8">
                <input type="range" class="form-range" id="${this.id}-slider"
                       min="${this.min}" max="${this.max}" step=${this.step} value="${this.value}"
                       @change="${this.onChange}"
                       data-mirror="${this.id}-text"
                />
            </div>
            <div class="col-4">
                ${this.textField}
            </div>
            </div> `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('slider-input', Slider);