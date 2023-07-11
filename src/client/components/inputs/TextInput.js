import {html, LitElement, nothing} from "lit";

export class TextInput extends LitElement {
    static properties = {
        label: "label",
        value: 1,
        onChange: () => {}
    }
    constructor(label, value, id, onChange = () => {}, size=4) {
        super();
        this.size = size;
        this.value = value;
        this.id = id;
        this.label = label;
        this.onChange = onChange
        console.log(`size=${this.value}`);
    }

    render() {
        return html`<div class="col-${this.size} mb-2">
            <div class="input-group  input-group-sm" id="${this.id}">
                <span class="input-group-text" id="${this.id}-input-label">${this.label}</span>
                <input type="text" class="form-control" id="${this.id}-input"
                       placeholder="${this.label}"
                       value="${this.value}"
                       @change="${this.onChange}">
            </div>
        </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('text-input', TextInput);