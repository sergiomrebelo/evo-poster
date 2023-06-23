import {LitElement, html, css} from "lit";

export class InputForm extends LitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <aside class="row">
                <section class="input-form-outer, col-10, offset-1, mt-5">
                    <form id="input-form" class="input-form-inner">
                        <fieldset>
                            <div class="form-group, row, mb-2">
                                <textarea id="formControlTextarea" class="form-control, col-sm-10" required rows=6></textarea>
                            </div>
                        </fieldset>
                    </form>
                </form>
            </aside>
        `;
    }
}

customElements.define('input-form', InputForm);