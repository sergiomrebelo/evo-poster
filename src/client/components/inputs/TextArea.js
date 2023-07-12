import {html, LitElement, nothing} from "lit";
import {unsafeHTML} from "lit/directives/unsafe-html.js";

export class TextArea extends LitElement {
    static properties = {
        label: "label",
        content: [],
        onChange: () => {},
    }

    constructor(label, content = [],  id, onChange = () => {},  classList = []) {
        super();
        this.id = id;
        this.content = content;
        if (this.content === null) this.content = [];
        this.label = label;
        this.classList.add(...classList);
        this.onChange = onChange;

        console.log(`inside`, label, content,  id, onChange,  classList);
    }

    set = (content) => {
        this.content = content;
    }

    render() {
        return html`<div class="row">
            <small class="my-2 col-12" id="${this.id}-label">${unsafeHTML(this.label)}</small>
            <div class="col-12">
                <textarea class="form-control my-2" id="${this.id}-input" rows="${this.content.length}" 
                          @change="${this.onChange}">${this.content.join(`¶`)}</textarea>
            </div>
        </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('textarea-input', TextArea);