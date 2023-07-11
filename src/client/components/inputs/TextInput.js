import {html, LitElement, nothing} from "lit";

export class TextInput extends LitElement {
    static properties = {
        label: "label",
        showLabel: true,
        value: 1,
        onChange: () => {},
    }

    // col-${this.size} mb-2
    constructor(label, value, id, onChange = () => {}, classList = []) {
        super();
        this.classList.add(...classList);
        this.value = value;
        this.id = id;
        this.showLabel = label !== null;
        this.label = this.showLabel ? label : null;
        this.onChange = onChange
    }

    getValue = () => {
        return this.value;
    }

    render() {
        return html`<div>
            <div class="input-group  input-group-sm" id="${this.id}">
                ${this.showLabel ? html`<span class="input-group-text" id="${this.id}-input-label">${this.label}</span>` : nothing}
                <input type="text" class="form-control" id="${this.id}-input"
                       placeholder="${this.showLabel ? this.label : nothing}"
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