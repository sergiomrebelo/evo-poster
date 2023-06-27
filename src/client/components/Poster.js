import {Params} from "../Params.js";

class Poster {
    constructor(n, generation, sentences = []) {
        this.id = `${generation}-${n}`;
        this.n = n;
        this.generation = generation;

        // genotype
        // [size, colour, textboxes]

        this.textboxes = [];

        for (let sentence of sentences) {
            this.textboxes.push({
                "content": sentence,
                "weight": Math.round(100+Math.random()*800),
                "font-stretch": null, // "ultra-expanded"
                "alignment": Math.round(Math.random()*3),
                "size": Math.round(Params.typography.minSize + Math.random()*Params.typography.maxSize),
                "typeface": null,
                "color": color(Math.random()*255, Math.random()*255, Math.random()*255),
                "uppercase": Math.random() > 0.5,
            });
        }

        this.background = {
            backgroundStyle: 0,
            backgroundColors: [
                color(Math.random()*255, Math.random()*255, Math.random()*255),
                color(Math.random()*255, Math.random()*255, Math.random()*255)
            ]
        }

        this.size = {};

        // text alignment
        this.globalProperties = {}
    }

    draw = (posX = 0, posY=0) => {
        push();
        const pg = createGraphics(Params.visualisationGrid.width, Params.visualisationGrid.height);
        pg.background(this.background.backgroundColors[0]);
        this.typeset(pg);

        const sideX = width / Math.floor(width/Params.visualisationGrid.width);
        const sideY = Params.visualisationGrid.height + Params.visualisationGrid.marginY;
        const x = posX * sideX + sideX/2;
        const y = posY * sideY + sideY/2;
        // translate (x, y);
        // rect(0,0, Params.visualisationGrid.width, Params.visualisationGrid.height);
        pg.textSize(10);
        pg.fill(0);
        pg.textAlign(CENTER, CENTER);
        pg.text(this.id, 20, 20)
        imageMode(CENTER);
        image(pg, x, y);
        pop();
    }

    typeset = (pg) => {
        pg.push();
        pg.textAlign(CENTER, CENTER);
        for (let i in this.textboxes) {
            const textbox = this.textboxes[i];
            pg.fill(textbox["color"]);
            pg.textSize(textbox["size"]);
            pg.text(textbox["content"],
                pg.width/2,
                pg.height/2 - Params.typography.maxSize * (i-this.textboxes.length/2)
            ); //(Params.visualisationGrid.width/this.textboxes.length)*(i-this.textboxes.length/2)
        }
        pg.pop();
    }
}

export default Poster;