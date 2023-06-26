import {LitElement, html} from "lit";
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

export class ErrHandler extends LitElement {
    static properties = {
        _content: {},
        msg: ``
    };

    constructor() {
        super();
    }

    add = (content) => {
        const msg = (content.message !== null) ? content.message : content.msg;
        this.msg +=`<br>${msg}`;
        this._content = html`<p id="err-message">${unsafeHTML(this.msg)}</p>`;
    }

    set = (content) => {
        this.msg = (content.message !== null) ? content.message : content.msg;
        this._content = html`<p id="err-message">${unsafeHTML(this.msg)}</p>`;
        console.log(`inside set`, this._content);
    }

    clear = () => {
        this.msg = undefined;
        this._content = {};
    }


    render(){
       return html`
            <div class="temp-results container-fluid bg-light d-none" id="error-handle">
                <div class="row">
                    <section class="col-12 bg-warning p-3">
                        ${this._content}
                    </section>
                </div>
            </div>`;
    }
}

customElements.define('err-handler', ErrHandler);