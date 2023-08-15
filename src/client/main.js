import 'bootstrap/dist/js/bootstrap';
import 'p5';

import 'bootstrap/scss/bootstrap.scss';
import './main.css';

window.preload = () => {}

window.setup = () => {
    window.app = document.createElement(`app-evo`); // create app
    document.querySelector(`main`).appendChild(app);
    noCanvas();
    noLoop();
    frameRate(25);
}

window.draw = () => {
    if (window.app.screen < 3) return null;
    if (window.app.population.updated) {
        push();
        background(window.app.backgroundColor);
        window.app.population.draw();
        pop();
    }

}

window.windowResized = () => {
    if (window.app.screen < 2) return null;
}

window.keyPressed = () => {
    if (window.app.screen < 2) return null;
    // if (key.toUpperCase() === 'S') {
    // window.app.save();
    // }
}
