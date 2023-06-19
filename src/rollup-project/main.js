import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './main.css';
// TODO: (!) "this" has been rewritten to "undefined"
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';


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
        const resultsScreen = resultsContainer();
        const formInput = inputForm();

        // screen.style(style);
        document.body.appendChild(resultsScreen);
        document.body.appendChild(formInput);
    }


}

window.onload = () => {
    const app = new App();
}
