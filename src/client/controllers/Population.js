import {Params} from "../Params.js";
import Poster from "./Poster.js";

export class Population {
    constructor(data) {
        this.size = Params.populationSize;
        this.population = [];
        this.generation = 0;
        this._data = data; // private variable new version
    }

    initialisation = () => {
        for (let i=0; i<this.size; i++) {
            const poster = new Poster(i, this.generation, this._data['sentences']);
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
    }
}

export default Population;