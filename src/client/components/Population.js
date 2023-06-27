import {Params} from "../Params.js";
import Poster from "./Poster.js";

export class Population {
    constructor(data) {
        this.size = Params.populationSize;
        this.population = [];
        this.generation = 0;
        this._data = data;
    }

    initialisation = () => {
        for (let i=0; i<this.size; i++) {
            const poster = new Poster(`${this.generation}-${this.population}`, "hello!");
            this.population.push(poster);
        }
    }

    draw = () => {
        for (let ind of this.population) {
            ind.draw();
        }
    }
}

export default Population;