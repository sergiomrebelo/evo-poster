import {Params} from "../Params.js";
import Poster from "./Poster.js";

export class Population {
    #typefaces;
    constructor(params) {
        this.size = params["evo"]["popSize"];
        this.params = params;
        this.population = [];
        this.generations = 0;
        this.ready = false;
        
        this.#typefaces = [];
        this.updated = true;

        // this._data = data; // private variable new version
    }

    initialisation = async () => {
        this.updated = true;
        this.generations = 0;

        // init individuals
        for (let i=0; i<this.size; i++) {
            const poster = new Poster(i, this.generations, this.params);
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

        // testing
        this.evolve();
    }

    // evolve
    evolve = () => {
        const offspring = [];

        console.log(this.params["evo"]);

        // copy the elite to next generation
        const eliteSize = parseInt(this.params["evo"]["eliteSize"]);
        for (let i=0; i<eliteSize; i++) {
            offspring.push(this.copy(this.population[i]));
        }

        // crossover
        for (let i = eliteSize; i < this.params["evo"]["popSize"]; i++) {
            if (Math.random() <= this.params["evo"]["crossoverProb"]) {
                const parentA = this.tournament();
                const parentB = this.tournament();
                // croosover method
                // TODO: replace parentA
                const child = parentA;
                offspring.push(child);
            } else {
                const ind = this.tournament();
                offspring.push(ind);
            }
        }

    }


    toggleGrid = (show) => {
        for (let poster of this.population) {
           poster.toggleGrid(show);
        }
        this.updated = true;
    }

    // TODO: eval
    evaluate = async () => {
        // force evaluation of individuals
        for (let individual of this.population) {
            await individual.evaluate();
        }

        // sort individuals in the population by fitness (fittest first)
        this.population = this.population.sort((a,b) => b.fitness - a.fitness);
        // console.log(this.population.map(ind => ind.fitness));
    }

    copy = (obj) => {
        return Object.assign({}, obj);
    }

    tournament = (size = 4) => {
        let pool = [];
        for (let i = 0; i < size; i++) {
            const r = Math.round(Math.random()*(this.population.length-1));
            pool.push(this.population[r]);
        }
        let fittest = pool[0];
        for (let i=1; i <pool.length; i++) {
            if (pool[i].fitness > fittest.fitness) {
                fittest = pool[i];
            }
        }
        return fittest;
    }

    // draw auxiliar function
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