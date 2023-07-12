import {html, LitElement, nothing} from "lit";

export class ColorInput extends LitElement {
    static properties = {
        label: "label",
        showLabel: true,
        colorA: `#fff`,
        colorB: `#000`,
        onChange: () => {},
    }

    constructor(label, colorA, colorB = null, id, onChange = () => {}, classList = []) {
        super();
        this.classList.add(...classList);
        this.colorA = colorA;
        this.colorB = colorB;
        this.id = id;
        this.disable = true
        this.showLabel = label !== null;
        this.label = this.showLabel ? label : null;
        this.onChange = onChange
    }

    render() {
        return html`<div>
            <div class="input-group input-group-sm" id="${this.id}-inner">
                ${this.showLabel ? html`<span class="input-group-text" id="${this.id}-colour-picker-label">${this.label}</span>` : nothing}
                <input type="color"
                       class="form-control form-control-color colour-picker mr-2 d-inline-flex ${this.id}-colour-picker"
                       id="${this.id}-colour-picker-1"
                       value="${this.colorA}"
                       title="colour-typography" data-param="valueA"
                       disabled
                       @change="${this.onChange}">
                ${this.colorB !== null ? html`<input type="color"
                       class="form-control form-control-color colour-picker mr-2 d-inline-flex ${this.id}-colour-picker"
                       id="${this.id}-colour-picker-2"
                       value="${this.colorB}"
                       title="colour-typography" data-param="valueB"
                       disabled
                       @change="${this.onChange}">` : nothing}
            </div>
        </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('color-input', ColorInput);