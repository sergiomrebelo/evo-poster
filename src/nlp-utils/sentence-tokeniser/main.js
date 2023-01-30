import tokenizer from './sentence-tokeniser.mjs';
// const txt = "Usually, one has to grab ¶ an image from a server (either localhost or a remote one) ¶ in order to get past $ the SameOrigin policy. Error checking is minimal - ¶ i.e, you can select a text/video/whatever file and ¶ the code will still attempt $ to load it and set its ¶ contents to be the data used to $ construct a dataURI ¶ for an image element.";
const txt = `RT @sergiomrebelo: ❌ @cdv.lab Usually, one has to grab ¶ an https://sergiorebelo.work image from a server (either localhost or a remote one) ¶ in order @cdv.lab @sergimrebelo to get 🧑‍💻past $ the https://www2.sergiorebelo.work SameOrigin policy. Error checking is minimal - ¶ i.e, you can select a text/video/whatever file and ¶ the code will still attempt $ to load it and set its ¶ contents to be the data used to $ construct a dataURI ¶ for an image element. #testing #testing2`;


tokenizer(txt).then ( (res) => {
    console.table(res.flat());
}).catch ((err) => {
    console.error (`err=${err}`);
});