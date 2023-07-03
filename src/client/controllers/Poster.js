import {Params} from "../Params.js";

class Poster {
    constructor(n, generation, params) {
        this.id = `${generation}-${n}`;
        this.n = n;
        this.generation = generation;


        // genotype
        // [size, colour, textboxes]

        this.textboxes = [];
        // console.log("params.sentences", params.sentences);


        for (let sentence of params.sentences) {
            this.textboxes.push({
                "content": sentence,
                "weight": Math.round(100+Math.random()*800),
                "font-stretch": null, // "ultra-expanded"
                "alignment": Math.round(Math.random()*3),
                "size": Math.round(Params.typography.minSize + Math.random()*Params.typography.maxSize),
                "typeface": null,
                "color": params.typography.color.random ? color(random(255), random(255), random(255)) : color(params.typography.color.value),
                "uppercase": Math.random() > 0.5,
            });
        }



        // text alignment
        this.globalProperties = {}


        this.genotype = {
            size: {
                width: params.size.width,
                height: params.size.height
            },
            background: {
                style: 0,
                colors: [
                    params.background.color.random ? color(random(255), random(255), random(255)) : color(params.background.color.valueA),
                    params.background.color.random ? color(random(255), random(255), random(255)) : color(params.background.color.valueB)
                ]
            },
            typography: {
                color: params.typography.color.random ? color(random(255), random(255), random(255)) : color(params.typography.color.value),
            }
        }
    }

    draw = (posX = 0, posY=0) => {
        push();

        const pg = createGraphics(this.genotype.size.width, this.genotype.size.height);

        pg.background(this.genotype.background.colors[0]);
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
                pg.height/2 + Params.typography.maxSize * (i-this.textboxes.length/2)
            ); //(Params.visualisationGrid.width/this.textboxes.length)*(i-this.textboxes.length/2)
        }
        pg.pop();
    }
}

export default Poster;