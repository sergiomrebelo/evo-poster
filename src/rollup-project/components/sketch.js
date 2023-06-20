import '../../../node_modules/p5js/p5.js/p5.min.js';

export const preload = () => {
    console.log (`p5js preload`);
}

export const setup = (msg = "kfjkgjkg") =>  {
    console.log(p5);
    createCanvas(windowWidth, windowHeight, WEBGL)
}

export const draw = () =>  {
    background(50)
}

export const windowResized = () =>  {
    resizeCanvas(windowWidth, windowHeight)
}

export default setup;