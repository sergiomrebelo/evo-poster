const bootstrap = require('bootstrap');
const style = require('./main.css');

window.onload = () => {
    const form = document.getElementById('input-form');
    form.addEventListener("submit", get);
}

const get = (e) => {
    e.preventDefault();
    let textArea = encodeURIComponent(document.getElementById('formControlTextarea').value);
    const shouldDivide = document.getElementById('lineDivisionCheck').checked;
    const lang = encodeURIComponent(document.getElementById('formControlLang').value);
    let handler = `text`;
    if (!shouldDivide) {
        const delimiter = encodeURIComponent(document.getElementById('formControlTextDelimiter').value);
        handler = `lines/${delimiter}`;
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
    document.getElementById('err-message').textContent = res.message;
    document.getElementById('error-handle').classList.replace('d-none', 'd-block');
}

const displayResults = (res) => {
    if (!res.success)  { return handleErr(res);}

    document.getElementById('error-handle').classList.replace('d-block', 'd-none');
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
}