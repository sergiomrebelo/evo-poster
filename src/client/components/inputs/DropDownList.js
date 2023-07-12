import {html, LitElement, nothing} from "lit";

export class DropDownList extends LitElement {
    static properties = {
        label: "label"
    }

    constructor(label = null, options = [["default", 0]], init = 0, id, onChange = () => {}, classList = []) {
        super();
        this.label = label;
        this.id = id;
        this.options = options;
        this.init = init;
        this.onChange = onChange;
        this.classList.add(...classList);

        console.log (`init= ${this.init} ${id}`)
    }

    render() {
        return html`<div class="row">
            <small class="fw-bold col-12">${this.label}</small>
            <div class="col-12 my-2">
                <select class="form-select form-select-sm" id="${this.id}-list" @change="${this.onChange}">
                    ${this.options.map ((x, i) => {
                        return html`<option value=${i} ${(this.init === i) ? `selected` : nothing }>${x[0]}</option>`;
                    })}´
                </select>
            </div>
        </div> `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('dropdown-input', DropDownList);