import {LitElement, html, css} from "lit";
import {InputForm} from "./components/InputForm.js";
import {ResultsContainer} from "./components/ResultsContainer.js";

import 'p5';
// import 'bootstrap/dist/css/bootstrap.css';
// import './main.css';


window.preload = () => {
}

window.setup = () => {
    window.app = document.createElement(`app-evo`); // create app
    document.querySelector(`main`).appendChild(app);

    // not init canvas
    noCanvas();
    noLoop();
}

window.draw = () => {
    if (window.app.screen === 0) return null;
}

window.windowResized = () => {
    if (window.app.screen === 0) return null;
}


export class App extends LitElement {
    // App.properties.availableLanguages
    static properties = {
        availableLanguages: [
            'ar', 'bn', 'bs', 'bg', 'zh', 'hr', 'cs', 'da', 'nl', 'en',
            'et', 'fi', 'fr', 'de', 'el', 'gu', 'he', 'hi', 'hu', 'ga',
            'id', 'it', 'ja', 'ko', 'lv', 'lt', 'ms', 'ml', 'mt', 'ne',
            'nb', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'es', 'sv',
            'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy'
        ],
        imageMaxSize: 1024 // in kb
    }

    constructor() {
        super();
        this.images = {
            "imageRandomPlacement": true,
            "hasImages": false,
            "blobs": [],
            "amount": 0,
            "loading": false,
            "randomPlacement": false
        }
        this.text = null;
        this.results = null;
        this.screen = 0;

        this._inputForm = new InputForm(this.analyse);
    }

    analyse = async () => {
        // get data from input form
        //  console.log("outside", this._inputForm.get());
        const formData = this._inputForm.data();
        console.log(formData);
        let params = formData.shouldDivide ? `text` : `lines/${formData.delimiter}`;
        let req = `/${params}/${formData.lang}/${formData.textContent}`;
        console.log("req=", req);

        fetch(req).then((response) => response.json()).then((res) => {
           console.log(res);
           // TODO: display results
           this.results = res;
        }).catch((err) => {
            console.error(err);
            //TODO: error handler
        })
    }

    render() {
        return html`
            <h1 class="mb-3">Evolving Posters</h1>
            <div id="input-module">
                <results-container></results-container>
                ${this._inputForm}
            </div>
        `;
    }
}

customElements.define('app-evo', App);

