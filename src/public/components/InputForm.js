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
        const el = this.shadowRoot.getElementById(related);
        if (e.target.checked && el !== null) {
            el.classList.add('d-none');
        } else {
            el.classList.remove('d-none');
        }
    }

    dis = () => {
        this.disable = true;
        this.shadowRoot.querySelector(`fieldset`).disabled = this.disable;
    }

    data = () => {
        return {
            "textContent": encodeURIComponent(this.shadowRoot.getElementById('formControlTextarea').value),
            "shouldDivide": this.shadowRoot.getElementById('lineDivisionCheck').checked,
            "lang": encodeURIComponent(this.shadowRoot.getElementById('formControlLang').value),
            "delimiter": encodeURIComponent(this.shadowRoot.getElementById('formControlTextDelimiter').value),
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

    /*
    _displayImages = (files) => {
        const imgContainer = document.getElementById('input-images');
        imgContainer.innerHTML = ``;

        for (let i = 0; i<files.length; i++) {
            const img = new Image();
            img.src = files[i];
            img.classList.add('d-inline-block', `mb-2`, `mr-2`);
            img.style.height = `100px`;
            img.style.width = `auto`;
            imgContainer.appendChild(img);
        }
        imgContainer.classList.replace('d-none', 'd-block');
        document.getElementById("input-images-headline").classList.replace('d-none', 'd-block');
    }
     */

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
            <div class="row">
                <section class="input-form-outer col-10 offset-1 mt-5">
                    <form id="input-form" class="input-form-inner" @submit=${this._onSubmit}>
                        <fieldset>
                            <div class="form-group row mb-2">
                                <label for="formControlTextarea" class="col-sm-2 col-form-label-sm">Input Text</label>
                                <textarea id="formControlTextarea" class="form-control col-sm-10" required
                                          rows=6></textarea>
                            </div>
                            <div class="form-group row mb-2">
                                <label for="formControlLang">Language</label>
                                <select class="form-control form-control-lg" id="formControlLang" type="text">
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
                                <label for="lineDivisionCheck" class="form-check-label col-form-label-sm">
                                    Automatic line division
                                </label>
                                <input
                                        type="checkbox" @change="${this._toggleVisibility}"
                                        class="form-check-input" value="1" id="lineDivisionCheck"
                                        data-related="textDelimiterField" checked>
                            </div>
                            <div class="form-group row mb-2 d-none" id="textDelimiterField">
                                <label for="formControlTextDelimiter" class="col-form-label-sm">Text Line
                                    delimiter</label>
                                <input type="text" value="¶" class="form-control form-control-lg d-none"
                                       id="formControlTextDelimiter">
                            </div>
                            ${Divider.get()}
                            <div class="form-group row mb-2">
                                <label for="formControlImages" class="col-form-label-sm" Images</label>
                                <input type="file" class="form-control-file" id="formControlImages"
                                       @change="${this._uploadImages}"
                                       checked="files[]" accept="image/jpeg, image/png, image/jpg" multiple>
                            </div>
                            <div class="form-check form-check-inline mb-2 d-none" id="imagePlacementField">
                                <label for="form-check-label, col-form-label-sm" id="imagePlacementCheck">Image Random
                                    Placement</label>
                                <input type="checkbox" value="1" @change="${this._toggleVisibility}"
                                       class="form-check-input" id="imagePlacementCheck" data-related="imageAnchorField"
                                       checked>
                            </div>
                            <div class="form-group row mb-2 d-none" id="imageAnchorField">
                                <label for="formControlImagePlaceholderDelimiter" class="col-form-label-sm">Image
                                    Placement Anchor</label>
                                <input type="text" value=${null} class="form-control form-control-lg"
                                       id="formControlImagePlaceholderDelimiter" checked=${false}>
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
}

customElements.define('input-form', InputForm);