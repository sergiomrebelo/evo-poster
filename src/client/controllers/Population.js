import {Params} from "../Params.js";
import Poster from "./Poster.js";

export class Population {
    #typefaces;
    constructor(params) {
        this.size = params["evo"]["popSize"];
        this.params = params;
        this.population = [];
        this.generation = 0;
        this.ready = false;
        
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

        // evaluate
        this.evaluate();

        this.updated = true;
    }

    // evolve
    evolve = () => {
        // TODO
    }


    toggleGrid = (show) => {
        for (let poster of this.population) {
           poster.toggleGrid(show);
        }
        this.updated = true;
    }

    // TODO: eval
    evaluate = async () => {
        // force evaluation
        for (let individual of this.population) {
            await individual.evaluate();
        }

        // sort by fitness
        this.population = this.population.sort((a,b) => b.fitness - a.fitness);
        console.log(this.population.map(ind => ind.fitness));

        // update this.update
    }


    // verify if the necessary fonts are loaded
    #checkTypeface = () => {
        for (let font of this.#typefaces) {
            const isLoaded = document.fonts.check(`12px ${font}`);
            if (!isLoaded) {
                return false;
            }
        }
        return true;
    }

    // TODO: divide into two
    draw = async () => {
        this.updated = false;
        const typefacesLoaded = this.#checkTypeface();
        if (!typefacesLoaded || (typefacesLoaded && !this.ready)) {
            this.updated = true;
            this.evaluate();
            this.ready = typefacesLoaded;
        }

        const n = this.population.length < Params.visiblePosters ? this.population.length : Params.visiblePosters;
        let posX = 0, posY = 0;
        for (let i=0; i<this.population.length; i++) {
            const ind = this.population[i];
            if (!ind.ready) {
                this.updated = true;
            }

            // ensure that phenotype is created
            if (ind.phenotype === null) {
                this.updated = true;
                await ind.evaluate();
            }

            // display
            if (i < n) {
                // get phenotype
                let pg = ind.phenotype;
                const sideX = width / Math.floor(width / Params.visualisationGrid.width);
                const sideY = ind.genotype.grid.size.height + Params.visualisationGrid.marginY;
                const x = posX * sideX + sideX / 2;
                const y = posY * sideY + sideY / 2;

                // draw posters on canvas
                push();
                translate(-width / 2, -height / 2);
                imageMode(CENTER);
                image(pg, x, y);
                textSize(10);
                // text (`poster no.${i} (fitness: ${ind.fitness})`, x-textWidth(`poster no.${i} (fitness: ${ind.fitness})`)/2, y + pg.height/2+15);
                pop();

                posX += 1;
                if (posX % Math.floor(width / Params.visualisationGrid.width) === 0) { // (Params.visualisationGrid.cols-1)
                    posX = 0;
                    posY += 1;
                }
            }
        }

        await this.evaluate();
    }
}

export default Population;