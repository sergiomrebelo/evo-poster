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
        console.error(this.msg);
    }

    clear = () => {
        this.msg = undefined;
        this._content = {};
        this.visible = false;
    }


    render(){
       return html`
            <div class="position-relative temp-results container-fluid bg-light ${this.visible ? "d-block" : "d-none"} z-3" id="error-handle">
                <div class="row bg-warning">
                    <section class="col-11 p-3" id="error-handle-inner">
                        ${this._content}
                    </section>
                    <div class="col-1 p-3"  @click="${() => {
                        this.visible = false;
                    }}"><span role="button">&times;</span></div>
                </div>
            </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('err-handler', ErrHandler);