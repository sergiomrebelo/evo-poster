import {resultsContainer, inputForm} from './input.js';

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

        this.init();
    }

    init = () => {
        const screen = resultsContainer();
        document.body.appendChild(screen);
    }


}

window.onload = () => {
    const app = new App();
}
