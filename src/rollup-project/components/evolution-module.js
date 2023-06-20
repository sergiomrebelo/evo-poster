import '../../../node_modules/p5js/p5.js/p5.min.js';

export default () => {

    window.preload = () => {
        console.log(`preload`);
    };

    window.setup = () => {
        console.log(`setup`);
    }

    window.draw = () => {
        console.log(`draw`);
    }

    window.windowResized = () => {
        console.log(`windowResized`);
    }

};


