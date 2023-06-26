import {LitElement, html, css} from "lit";
import {App} from "../app.js";
import {Divider} from "./Divider.js";

export class InputForm extends LitElement {
    constructor() {
        super();
    }

    _toggleVisibility = (e) => {
        const related = e.target.dataset.related;
        const el = this.shadowRoot.getElementById(related);

       if(e.target.checked && el !== null) {
           el.classList.add('d-none');
        } else {
           el.classList.remove('d-none');
        }
    }

    render() {
        return html`
            <div class="row">
                <section class="input-form-outer col-10 offset-1 mt-5">
                    <form id="input-form" class="input-form-inner">
                        <fieldset>
                            <div class="form-group row mb-2">
                                <label for="formControlTextarea" class="col-sm-2 col-form-label-sm">Input Text</label>
                                <textarea id="formControlTextarea" class="form-control col-sm-10" required rows=6></textarea>
                            </div>
                            <div class="form-group row mb-2">
                                <label for="formControlLang">Language</label>
                                <select class="form-control form-control-lg" id="formControlLang" type="text" >
                                    ${App.properties.availableLanguages.map((lang) => {
                                        let  opt = html`
                                                <option value=${lang}>${lang}</option>`;
                                        if (lang === 'en') {
                                            opt = html`
                                                <option selected=true value=${lang}>${lang}</option>`;
                                        }
                                        return opt;
                                        })
                                    }
                                </select>
                            </div>
                            ${Divider.get()}
                            <div class="form-check form-check-inline mb-2" id="lineDivisionField">
                                <label for="lineDivisionCheck" class="form-check-label col-form-label-sm">
                                    Automatic line division
                                </label>
                                <input 
                                        type="checkbox" @change="${this._toggleVisibility}"
                                        class="form-check-input" value="1" id="lineDivisionCheck" data-related="textDelimiterField" checked>
                            </div>
                            <div class="form-group row mb-2 d-none" id="textDelimiterField">
                                <label for="formControlTextDelimiter" class="col-form-label-sm">Text Line delimiter</label>
                                <input type="text" value="¶" class="form-control form-control-lg d-none" id="formControlTextDelimiter">
                            </div>
                            ${Divider.get()}
                            <div class="form-group row mb-2">
                                <label for="formControlImages" class="col-form-label-sm">Images</label>
                                <input type="file" class="form-control-file" id="formControlImages" 
                                       checked="files[]" accept="image/jpeg, image/png, image/jpg" multiple>
                            </div>
                            <div class="form-check form-check-inline mb-2 d-none" id="imagePlacementField">
                                <label for="form-check-label, col-form-label-sm" id="imagePlacementCheck">Image Random Placement</label>
                                <input type="checkbox" value="1" @change="${this._toggleVisibility}"
                                       class="form-check-input" id="imagePlacementCheck"  data-related="imageAnchorField"
                                       checked>
                            </div>
                            <div class="form-group row mb-2 d-none" id="imageAnchorField">
                                <label for="formControlImagePlaceholderDelimiter" class="col-form-label-sm">Image Placement Anchor</label>
                                <input type="text" value=${null} class="form-control form-control-lg" id="formControlImagePlaceholderDelimiter" checked=${false}>
                            </div>
                            ${Divider.get()}
                            <div class="col-auto">
                                <button type="submit" class="btn btn-primary mb-2">Submit</button>
                            </div>
                        </fieldset>
                    </form>
                    <button type="button" id="btReload" @click ="${() => {window.location.reload()}}"
                            class="btn d-none btn-secondary my-2 nextBts" disabled>New Analysis
                    </button>
                    <button type="button" 
                            class="btn d-none btn-primary my-2 nextBts mx-3" disabled>Next
                    </button>
                </section>
            </div>
        `;
    }
}

customElements.define('input-form', InputForm);