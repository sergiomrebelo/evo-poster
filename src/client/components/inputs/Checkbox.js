import {html, LitElement, nothing} from "lit";

export class Checkbox extends LitElement {
    static properties = {
        label: "label",
        showLabel: true,
        checked: true,
        onChange: () => {},
    }

    constructor(label, checked = true, id,  onChange = () => {},  classList = []) {
        super();
        this.id = id;
        this.label = label;
        this.checked = checked;
        this.classList.add(...classList);
        this.onChange = onChange;
    }

    render() {
        return html`<div>
            <input class="form-check-input" type="checkbox"
                   id="${this.id}-check" checked="${this.checked}"
                   @change="${this.onChange}">
            <label class="form-check-label small px-2" for="${this.id}-check">${this.label}</label>
        </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('checkbox-input', Checkbox);