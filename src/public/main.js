const bootstrap = require('bootstrap');
const style = require('./main.css');

// global variables
const app = {
    images: {
        imageRandomPlacement: true,
        hasImages: false,
        blobs: [],
        amount: 0,
        loading: false,
        randomPlacement: false
    }
};

window.onload = () => {
    const form = document.getElementById('input-form');
    const inputImages = document.getElementById('formControlImages');
    form.addEventListener('submit', get);
    inputImages.addEventListener('change', _uploadImages);

    document.getElementById('lineDivisionCheck').addEventListener('change', (e) => {
        if (e.target.checked) {
            document.getElementById('textDelimiterField').classList.add('d-none');
        } else {
            document.getElementById('textDelimiterField').classList.remove('d-none');
        }
    });

    document.getElementById('imagePlacementCheck').addEventListener('change', (e) => {
        if (e.target.checked) {
            document.getElementById('imageAnchorField').classList.add('d-none');
        } else {
            document.getElementById('imageAnchorField').classList.remove('d-none');
        }
    });
}

const get = async (e) => {
    e.preventDefault();
    let textArea = encodeURIComponent(document.getElementById('formControlTextarea').value);
    const shouldDivide = document.getElementById('lineDivisionCheck').checked;
    const lang = encodeURIComponent(document.getElementById('formControlLang').value);
    app.images.randomPlacement = document.getElementById('imagePlacementCheck').checked;

    let handler = `text`;
    let delimiter;
    if (!shouldDivide) {
        delimiter = encodeURIComponent(document.getElementById('formControlTextDelimiter').value);
        handler = `lines/${delimiter}`;
    }

    if (app.images.hasImages && !app.images.randomPlacement && !shouldDivide) {
        let imageDelimiter = encodeURIComponent(document.getElementById('formControlImagePlaceholderDelimiter').value);
        app.images.nAnchorPoints = [...textArea.matchAll(new RegExp(imageDelimiter,'g'))].length;
        textArea = textArea.replaceAll(imageDelimiter, `${delimiter}${imageDelimiter}${delimiter}`);
        if (app.images.nAnchorPoints !== app.images.amount) {
            const relation = app.images.nAnchorPoints > app.images.amount ? 'higher' : 'smaller';
            handleErr({ message: `the amount of image anchor points is ${relation} than the amount of upload images. (anchors:${app.images.nAnchorPoints} / images:${app.images.amount})`});
        }
    }

    const url = `/${handler}/${lang}/${textArea}`;

    fetch(url).then((response) => response.json()).then((result) => {
        displayResults(result);
    }).catch((error) => {
        console.error('Error:', error);
        handleErr({ message: `error on fetch. ${error}`});
    });
}

const handleErr = (res = {success: false}) => {
    const container = document.getElementById('err-message');
    if (container.innerHTML.length > 0) container.innerHTML = container.innerHTML + "<br>";
    container.innerHTML = container.innerHTML+res.message;
    document.getElementById('error-handle').classList.replace('d-none', 'd-block');
}

const _uploadImages = async (e) => {
    // display fields
    document.getElementById('imagePlacementField').classList.replace('d-none', 'd-block');
    console.log(document.getElementById('imagePlacementField'));

    app.images.blobs = [];
    app.images.hasImages = true;
    app.images.loading = true;
    app.images.amount = e.target.files.length;
    app.images.blobs = await _readImages(e.target.files).catch((err) => {
        console.error (`not possible to load the image ${err}`);
        handleErr({ message: `error on uploading image(s). ${err}`});
    })
    app.images.loading = false;
    _displayImages(app.images.blobs);
}

const _displayImages = (files) => {
    const imgContainer = document.getElementById('input-images');
    imgContainer.innerHTML = ``;
    for (let i = 0; i<files.length; i++) {
        const img = new Image();
        img.src = files[i];
        img.classList.add('d-inline-block');
        if (i > 0) img.classList.add(`mx-2`);
        img.style.height = `100px`;
        img.style.width = `auto`;
        imgContainer.appendChild(img);
    }
    imgContainer.classList.replace('d-none', 'd-block');
}

const _readImages = async (files) => {
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
        if (files[i].type.includes('image')) {
            res.push(getBase64(files[i]));
        } else {
            err.push (files[i].name);
        }
    }

    if (err.length > 0) {
        handleErr({message: `error loading the following image(s): ${err.flat()}`});
    }

    return await Promise.all(res);
}

const displayResults = (res) => {
    if (!res.success)  { return handleErr(res);}

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
}