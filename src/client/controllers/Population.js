import {Params} from "../Params.js";
import Poster from "./Poster.js";

export class Population {
    constructor(params) {
        this.size = Params.populationSize;
        this.params = params;
        this.population = [];
        this.generation = 0;
        this.updated = true;
        // this._data = data; // private variable new version
    }

    initialisation = () => {
        this.updated = true;
        for (let i=0; i<this.size; i++) {
            const poster = new Poster(i, this.generation, this.params);
            this.population.push(poster);
        }
    }

    draw = () => {
        const n = this.population.length < Params.visiblePosters ? this.population.length : Params.visiblePosters;
        let posX = 0, posY = 0;
        for (let i=0; i<n; i++) {
            const ind = this.population[i];
            ind.draw(posX, posY);
            posX += 1;
            if (posX % Math.floor(width/Params.visualisationGrid.width) === 0) { // (Params.visualisationGrid.cols-1)
                posX = 0;
                posY += 1;
            }
        }
        if (this.updated) {
            this.updated = false;
        }
    }
}

export default Population;