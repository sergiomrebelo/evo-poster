import {LitElement, html} from "lit";
import {Params} from "../Params.js";
import {Divider} from "./Divider.js";

export class InputForm extends LitElement {
    static properties = {
        images: {}
    }
    constructor(onSubmit, container, errHandler) {
        super();
        this.images = {
            "imageRandomPlacement": true,
            "hasImages": false,
            "blobs": [],
            "amount": 0,
            "loading": false,
            "randomPlacement": false
        }
        this.disable = false;
        this._resultsContainer = container;
        this._errHandlerRef = errHandler;
        this._onSubmit = async (e) => {
            e.preventDefault();
            await onSubmit();
        }
    }

    _toggleVisibility = (e) => {
        const related = e.target.dataset.related;
        // this.renderRoot
        const el = document.getElementById(related);
        if (e.target.checked && el !== null) {
            el.classList.add('d-none');
        } else {
            el.classList.remove('d-none');
        }
    }

    dis = () => {
        this.disable = true;
        document.querySelector(`fieldset`).disabled = this.disable;
    }

    data = () => {
        return {
            "textContent": encodeURIComponent(document.getElementById('formControlTextarea').value),
            "shouldDivide": document.getElementById('lineDivisionCheck').checked,
            "lang": encodeURIComponent(document.getElementById('formControlLang').value),
            "delimiter": encodeURIComponent(document.getElementById('formControlTextDelimiter').value),
            "images": this.images
        }
    }

    _uploadImages = async (e) => {
        this.images.blobs = [];
        this.images.hasImages = true;
        this.images.loading = true;
        this.images.amount = e.target.files.length;

        console.log(this._formRef,  this._errHandlerRef);

        this.images.blobs = await this._readImages(e.target.files).catch((err) => {
            this._errHandlerRef.set({message: `not possible to load the image ${err}`});
        })


        this.images.loading = false;

        this._resultsContainer.displayImages(this.images.blobs);
    }

    _readImages = async (files) => {
        const res = [];
        let err = [];
        const getBase64 = (file) => {
            const reader = new FileReader()
            return new Promise(resolve => {
                reader.onload = (ev) => {
                    resolve(ev.target.result)
                }
                reader.readAsDataURL(file);
            });
        };

        for (let i = 0; i < files.length; i++) {
            if (files[i].size/1024 < Params.imageMaxSize) {
                if (files[i].type.includes('image')) {
                    res.push(getBase64(files[i]));
                } else {
                    err.push(`error loading the following image(s): ${files[i].name}.`);
                }
            } else {
                err.push(`${files[i].name} size bigger than ${Params.imageMaxSize} kb. (size: ${files[i].size})`);
            }
        }

        if (err.length > 0) {
            let msg = "";
            for (let i=0; i<err.length; i++) {
                msg += err[i];
                if (i !== err.length-1) {
                    msg += "<br>";
                }
            }
            this._errHandlerRef.set({message: msg});
        }
        return await Promise.all(res);
    }

    render() {
        return html`
            <div class="container-fluid" id="input-form-section">
                <section class="input-form-outer row mt-5">
                    <form id="input-form" class="input-form-inner" @submit=${this._onSubmit}>
                        <fieldset class="col-10">
                            <div class="form-group mb-2">
                                <label for="formControlTextarea" class="col-sm-6 col-form-label-sm">Input Text</label>
                                <textarea id="formControlTextarea" class="form-control col-sm-10" required rows=6></textarea>
                            </div>
                            <div class="form-group mb-2 col-sm-3">
                                <label for="formControlLang" class="col-sm-6 col-form-label-sm">Language</label>
                                <select class="form-control custom-select mr-sm-2" id="formControlLang" type="text">
                                    ${Params.availableLanguages.map((lang) => {
                                        let opt = html`
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
                                <label for="lineDivisionCheck" class="col-form-label-sm">
                                    Automatic line division
                                </label>
                                <input
                                        type="checkbox" @change="${this._toggleVisibility}"
                                        class="form-check-input" value="1" id="lineDivisionCheck"
                                        data-related="textDelimiterField" checked>
                            </div>
                            <div class="form-group mb-2 d-none col-sm-3" id="textDelimiterField">
                                <label for="formControlTextDelimiter" class="col-form-label-sm">Text Line delimiter</label>
                                <input type="text" value="¶" class="form-control" id="formControlTextDelimiter">
                            </div>
                            ${Divider.get()}
                            <div class="form-group mb-2 col-sm-6">
                                <label for="formControlImages" class="col-form-label-sm">Images</label><br/>
                                <input type="file" class="form-control-file col-form-label-sm" id="formControlImages"
                                       @change="${this._uploadImages}"
                                       checked="files[]" accept="image/jpeg, image/png, image/jpg" multiple>
                            </div>
                            ${Divider.get()}
                            <div class="form-check form-check-inline mb-2" id="imagePlacementField">
                                <label for="form-check-label" class="col-form-label-sm" id="imagePlacementCheck">Image Random Placement</label>
                                <input type="checkbox" value="1" @change="${this._toggleVisibility}"
                                       class="form-check-input" id="imagePlacementCheck" data-related="imageAnchorField" checked>
                            </div>
                            <div class="form-group mb-2 d-none col-sm-3" id="imageAnchorField">
                                <label for="formControlImagePlaceholderDelimiter" class="col-form-label-sm" checked=${false}>Image
                                    Placement Anchor</label>
                                <input type="text" value=${null} class="form-control"
                                       id="formControlImagePlaceholderDelimiter" value="∑">
                            </div>
                            ${Divider.get()}
                            <div class="col-auto">
                                <button type="submit" class="btn btn-primary mb-2">Submit</button>
                            </div>
                        </fieldset>
                    </form>
                </section>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('input-form', InputForm);