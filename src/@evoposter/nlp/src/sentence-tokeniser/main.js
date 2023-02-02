import sentences from "../../../../test/testing-text.js";
import sentenceTokenizer from "./sentence-tokeniser.mjs";
// const txt = "Usually, one has to grab ¶ an image from a server (either localhost or a remote one) ¶ in order to get past $ the SameOrigin policy. Error checking is minimal - ¶ i.e, you can select a text/video/whatever file and ¶ the code will still attempt $ to load it and set its ¶ contents to be the data used to $ construct a dataURI ¶ for an image element.";
// const txt = `RT @sergiomrebelo: ❌ @cdv.lab Usually, one has to grab ¶ an https://sergiorebelo.work image from a server (either localhost or a remote one) ¶ in order @cdv.lab @sergimrebelo to get 🧑‍💻past $ the https://www2.sergiorebelo.work SameOrigin policy. Error checking is minimal - ¶ i.e, you can select a text/video/whatever file and ¶ the code will still attempt $ to load it and set its ¶ contents to be the data used to $ construct a dataURI ¶ for an image element. #testing #testing2`;
const number = 10;

for (let sentence of sentences) {
    let mean = 0;
    for (let i=0; i<number; i++) {
        let res = await sentenceTokenizer(sentence.text);
        res = res.flat();
        mean += res.length;
    }
    mean /= number;
    console.table({
        "sentences": `${sentence.text.substring(0, 100)}`,
        "mean": mean,
        "default": `${sentence.sentenceNumber}`
    });
}



