import {html, LitElement} from "lit";

export class InitForm extends LitElement {
    static properties = {
    }
    constructor() {
        super();
    }

    render(){
        return html`<div></div>`;
    }
    createRenderRoot() {
        return this;
    }
}

customElements.define('init-form', InitForm);