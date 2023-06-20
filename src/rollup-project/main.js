import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import '../../node_modules/p5js/p5.js/p5.min.js';

import {resultsContainer, inputForm} from './components/input-module.js';
import errorHandler from "./components/errHandler.js";
import {container} from "./components/utils.js";

// import {setup, preload, draw, windowResized} from "./components/sketch.js";
// import p5 from "./components/evolution-module.js"

let app;

export default class App {
    constructor()  {
        this.images = {
            "imageRandomPlacement": true,
            "hasImages": false,
            "blobs": [],
            "amount": 0,
            "loading": false,
            "randomPlacement": false
        };
        this.text = null;
        this.screen = 0;

        this.results = null;

        // params
        this.IMAGE_SIZE = 1024; // in kb
        this.BACKGROUND_COLOR = color(random(255), random(255), random(255));
    }

    evolve = () => {
        this.screen = 1;
        document.getElementById(`input-module`).style.display = "none";
        document.querySelector(`.p5Canvas`).style.display = "block";

        // init canvas
        createCanvas(windowWidth, windowHeight);
        background (this.BACKGROUND_COLOR);

        window.draw = () => {
            background (this.BACKGROUND_COLOR);
            push();
            fill(0);
            textSize(36);
            let leading = 36*1.35;
            let y = Math.round(leading * this.results.sentences.length/2);
            for (let i=0; i<this.results.sentences.length; i++) {
                let sentence =  this.results.sentences[i];
                text(
                    sentence,
                    windowWidth/2-textWidth(sentence)/2,
                    windowHeight/2 - y
                );
                y -= leading;
            }
            pop();
        }

        window.windowResized = () => {
            clearTimeout(this.resize);
            this.resize = setTimeout(() => {
                this.BACKGROUND_COLOR = color(random(255), random(255), random(255));
                resizeCanvas(windowWidth, windowHeight);
            }, 100);
        }
    }



    init = () => {
        const resultsScreen = resultsContainer();
        const formInput = inputForm();

        const inputModuleContainer = container(`div`, [],`input-module`);
        inputModuleContainer.appendChild(resultsScreen);
        inputModuleContainer.appendChild(formInput);

        document.body.appendChild(inputModuleContainer);
        formInput.addEventListener("submit", this.get);
        document.getElementById('formControlImages').addEventListener('change', this._uploadImages);


    }


    get = async (e) => {
        e.preventDefault();
        let textArea = encodeURIComponent(document.getElementById('formControlTextarea').value);
        const shouldDivide = document.getElementById('lineDivisionCheck').checked;
        const lang = encodeURIComponent(document.getElementById('formControlLang').value);

        let handler = `text`;
        let delimiter;
        if (!shouldDivide) {
            delimiter = encodeURIComponent(document.getElementById('formControlTextDelimiter').value);
            handler = `lines/${delimiter}`;
        }

        if (this.images.hasImages && !this.images.randomPlacement && !shouldDivide) {
            let imageDelimiter = encodeURIComponent(document.getElementById('formControlImagePlaceholderDelimiter').value);
            this.images.nAnchorPoints = [...textArea.matchAll(new RegExp(imageDelimiter,'g'))].length;
            textArea = textArea.replaceAll(imageDelimiter, `${delimiter}${imageDelimiter}${delimiter}`);
            if (this.images.nAnchorPoints !== app.images.amount) {
                const relation = app.images.nAnchorPoints > app.images.amount ? 'higher' : 'smaller';
                errorHandler({ message: `the amount of image anchor points is ${relation} than the amount of upload images. (anchors:${app.images.nAnchorPoints} / images:${app.images.amount})`});
            }
        }

        const url = `/${handler}/${lang}/${textArea}`;

        fetch(url).then((response) => response.json()).then((result) => {
            this._displayResults(result);
            this.results = result;
        }).catch((error) => {
            console.error('Error:', error);
            errorHandler ({ message: `error on fetch. ${error}`});
        });
    }

    _displayResults = async (res) => {
        if (!res.success)  {
            errorHandler(res.err);
        }

        document.getElementById('temp-res-text').textContent = `${res.text} (${res.lang})`;
        document.getElementById('temp-res-sentences').textContent = `${res.sentences.flat()} (${res.sentences.flat().length})`;
        document.getElementById('temp-res-classification').textContent = `${res.classification.emotions.data.predominant.emotion} (${res.classification.emotions.data.predominant.weight})`;
        const el = document.getElementById('temp-res-lexicon-lines');
        el.innerHTML = '';
        for (let i in res.lexicon.sentences) {
            const sentence = res.lexicon.sentences[i]
            const span = document.createElement("span");
            span.innerHTML = `[${i}] ${sentence.text} (${sentence.emotions.data.predominant.emotion}, ${sentence.emotions.data.predominant.weight}) <br>`;
            el.appendChild(span);
        }

        document.getElementById('temp-res-lexicon-global').innerHTML = `<b>global lexicon</b>: ${res.lexicon.global[0][0]} (${res.lexicon.global[0][1]})`
        document.getElementById('temp-info').classList.replace('d-none', 'd-block');
        document.querySelector('#input-form fieldset').disabled = true;
        document.getElementById('btReload').enable = true;

        const section = document.getElementById(`info-results-section`);
        section.classList.replace('d-none', 'd-block');

        const bts =  document.querySelectorAll(`.nextBts`);
        bts.forEach((el) => {
            el.disabled = false;
            el.classList.replace('d-none', 'd-inline');
        });

        document.getElementById(`btNext`).onclick = (e) => {
            e.preventDefault();
            if (this.results !== null) {
                this.evolve();
            } else {
                errorHandler({ message: "text input not defined"})
            }
        }

    }

    _uploadImages = async (e) => {
        this.images.blobs = [];
        this.images.hasImages = true;
        this.images.loading = true;
        this.images.amount = e.target.files.length;

       this.images.blobs = await this._readImages(e.target.files).catch((err) => {
           errorHandler ({ message: `not possible to load the image ${err}`});
        })

        this.images.loading = false;
        this._displayImages(this.images.blobs);

    }

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
            if (files[i].size/1024 < this.IMAGE_SIZE) {
                // if (files[i].size)
                if (files[i].type.includes('image')) {
                    res.push(getBase64(files[i]));
                } else {
                    err.push(`error loading the following image(s): ${files[i].name}.`);
                }
            } else {
                err.push(`${files[i].name} size bigger than ${this.IMAGE_SIZE} kb.`);
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

            errorHandler({message: msg});
        }

        return await Promise.all(res);
    }
}


window.setup = () => {
    app = new App();
    app.init();
}
