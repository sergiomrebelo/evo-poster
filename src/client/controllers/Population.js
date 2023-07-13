import {Params} from "../Params.js";
import Poster from "./Poster.js";

export class Population {
    #typefaces;
    constructor(params) {
        this.size = params["evo"]["popSize"];
        this.params = params;
        this.population = [];
        this.generation = 0;
        
        this.#typefaces = [];
        this.updated = true;

        // this._data = data; // private variable new version
    }

    initialisation = async () => {
        this.updated = true;
        for (let i=0; i<this.size; i++) {
            const poster = new Poster(i, this.generation, this.params);
            this.population.push(poster);

            // save typefaces used
            const posterFonts = poster.genotype.textboxes.map((t) => t.typeface);
            for (const f of posterFonts){
                if (this.#typefaces.indexOf(f) === -1) {
                    this.#typefaces.push(f);
                }
            }
        }
        await this.draw();
    }

   /* evaluate = async () => {
        for (let ind of this.population) {
            ind.evaluate();
        }
    } */

    toggleGrid = (show) => {
        for (let poster of this.population) {
           poster.toggleGrid(show);
        }
        this.updated = true;
    }

    draw = async () => {
        this.updated = false;

        // verify if the necessary fonts are loaded
        for (let font of this.#typefaces) {
            const isLoaded = document.fonts.check(`12px ${font}`);
            if (!isLoaded) {
                this.updated = true;
            }
        }

        const n = this.population.length < Params.visiblePosters ? this.population.length : Params.visiblePosters;
        let posX = 0, posY = 0;
        for (let i=0; i<this.population.length; i++) {
            const ind = this.population[i];
            if (!ind.ready) {
                // check if individuals are loaded
                this.updated = true;
            }
            const pg = await ind.draw();

            if (i < n) {
                const sideX = width / Math.floor(width / Params.visualisationGrid.width);
                const sideY = ind.genotype.grid.size.height + Params.visualisationGrid.marginY;
                const x = posX * sideX + sideX / 2;
                const y = posY * sideY + sideY / 2;

                // draw posters on canvas
                push();
                translate(-width / 2, -height / 2);
                imageMode(CENTER);
                image(pg, x, y);
                pop();

                posX += 1;
                if (posX % Math.floor(width / Params.visualisationGrid.width) === 0) { // (Params.visualisationGrid.cols-1)
                    posX = 0;
                    posY += 1;
                }
            }
        }

        // await this.evaluate();
    }
}

export default Population;