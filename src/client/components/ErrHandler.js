import {LitElement, html, css} from "lit";
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

export class ErrHandler extends LitElement {
    static properties = {
        _content: undefined,
        visible: false,
        msg: ``
    };

    constructor() {
        super();
        this.visible = false;
        this._content = {};
        this.msg = undefined;
    }

    add = (content) => {
        const msg = (content.message !== null) ? content.message : content.msg;
        this.msg +=`<br>${msg}`;
        this._content = html`<p id="err-message">${unsafeHTML(this.msg)}</p>`;
        this.visible = true;
    }

    set = (content) => {
        this.msg = (content.message !== null) ? content.message : content.msg;
        this._content = html`<p id="err-message">${unsafeHTML(this.msg)}</p>`;
        this.visible = true;
    }

    clear = () => {
        this.msg = undefined;
        this._content = {};
        this.visible = false;
    }


    render(){
       return html`
            <div class="temp-results container-fluid bg-light ${this.visible ? "d-block" : "d-none"}" id="error-handle">
                <div class="row">
                    <section class="col-12 bg-warning p-3" id="error-handle-inner">
                        ${this._content}
                    </section>
                </div>
            </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('err-handler', ErrHandler);