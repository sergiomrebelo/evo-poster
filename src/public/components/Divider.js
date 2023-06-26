import {html, LitElement} from "lit";

export class Divider extends LitElement {
    constructor() {
        super();
    }

    render(){
        return html`<div class="my-4"></div>`;
    }
}

customElements.define('section-divider', Divider);