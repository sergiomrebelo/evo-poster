import {Params} from "../Params.js";
import Poster, {Grid} from "./Poster.js";
import {randomScheme} from "./ColorGenerator.js";

// TODO: place in config file
const SIZE_MUTATION_ADJUST = 5;
const TOURNAMENT_SIZE = 5;

export class Population {
    #typefaces;
    constructor(params) {
        this.size = params["evo"]["popSize"];
        this.params = params;
        this.population = [];
        this.generations = 0;
        this.ready = false;
        this.evolving = false;
        this.pause = false;
        
        this.#typefaces = [];
        this.updated = true;

        this.log = {
            config: this.params,
            generations: []
        };

        // this._data = data; // private variable new version
    }

    initialisation = async () => {
        this.updated = true;
        this.generations = 0;

        this.#cleanGraphics();

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
    }

    // evolve
    evolve = async () => {
        // clean graphics hidden on canvas
        await this.#cleanGraphics();
        document.getElementById(`generation-number`).textContent=this.generations;

        const offspring = [];

        // copy the elite to next generation
        const eliteSize = parseInt(this.params["evo"]["eliteSize"]);
        for (let i=0; i<eliteSize; i++) {
            offspring.push(this.population[i].copy());
        }

        // crossover
        for (let i = eliteSize; i < this.params["evo"]["popSize"]; i++) {
            if (Math.random() <= this.params["evo"]["crossoverProb"]) {

                const parentA = this.tournament(TOURNAMENT_SIZE);
                const parentB = this.tournament(TOURNAMENT_SIZE);
                // crossover method
                const child = await this.uniformCrossover(parentA, parentB);
                offspring.push(child);
            } else {
                const ind = this.tournament();
                offspring.push(ind);
            }
        }

        // mutation
        for (let i = eliteSize; i < offspring.length; i++) {
            await this.mutate(offspring[i]);
        }

        // replace the individuals in the population with the new offspring
        this.population = offspring;

        // evaluate
        await this.evaluate();

        // log config data to file
        if (this.generations === 0)  {
            this.log["config"] = this.params;
        }
        // TODO log generation data
        // this.log["generations"]

        this.generations++;
        this.updated = true;

        if(this.generations < this.params["evo"]["noGen"] && !this.pause) {
            // need to possible to visualise the posters evolving
            setTimeout(() => {
                this.evolve();
            }, 100);
        }
    }

    uniformCrossover = (parentA, parentB) => {
        const child = parentA.copy();
        parentB = parentB.copy();
        // text align
        if (Math.random() > 0.5) {
            // child.genotype["grid"] = parentB.genotype["grid"];
            // grid is defined based on the verticalAlignment
            child.genotype["typography"]["verticalAlignment"] = parentB.genotype["typography"]["verticalAlignment"];
        }
        // textboxes
        for (const i in child.genotype["textboxes"]) {
            if (Math.random() > 0.5) {
                child.genotype["textboxes"][i] = parentB.genotype["textboxes"][i];
            }
        }
        // force update size
        // child.genotype["grid"].resetMargins();
        child.genotype["grid"] = new Grid(this.params.size, 2, this.params.sentences.length, this.params.size.margin);
        for (const i in child.genotype["textboxes"]) {
            const tb = child.genotype["textboxes"][i];
            const leading = Params.availableTypefacesInfo[tb["typeface"]].leading;
            child.genotype["grid"].defineRow(i, (tb["size"] * leading), child.genotype["typography"]["verticalAlignment"]);
        }
        // background
        // style
        if (Math.random() > 0.5) {
            child.genotype["background"]["style"] = parentB.genotype["background"]["style"];
        }
        // colours
        // designed to maintain the colour scheme
        if (Math.random() > 0.5) {
            child.genotype["background"]["colors"][0] = parentB.genotype["background"]["colors"][0];
            child.genotype["background"]["colors"][1] = parentB.genotype["background"]["colors"][1];
            for (const i in child.genotype["textboxes"]) {
               child.genotype["textboxes"][i]["color"] = parentB.genotype["textboxes"][i]["color"];
            }
        } else {
            // designed to maintain the colour scheme
            let original = parentA.genotype["textboxes"][0]["color"];
            let c = original["levels"] ? color(original["levels"][0],original["levels"][1], original["levels"][2]) : color(original);
            for (const i in child.genotype["textboxes"]) {
                child.genotype["textboxes"][i]["color"] = c;
            }
        }
        //images
        for (const i in child.genotype["images"]) {
            if (Math.random() > 0.5) {
                child.genotype["images"][i] = parentB.genotype["images"][i];
            }
        }
        return child;
    }

    mutate = (ind) => {
        // mutate background style
        let prob = this.params["evo"]["mutationProb"];

        // colours scheme
        if (Math.random() < prob) {
            const colorScheme = randomScheme();
            // mutate background colours
            if (!this.params["background"]["lock"][1]) {
                ind.genotype["background"]["colors"][0] = colorScheme.colorA;
                ind.genotype["background"]["colors"][1] = colorScheme.colorB;
            }
            // typography colour
            if (!this.params["typography"]["lock"][1]) {
                for (let tb of ind.genotype.textboxes) {
                    tb["color"] = colorScheme.baseColour;
                }
            }
        }

        // background style
        if (Math.random() < prob && !this.params["background"]["lock"][0]) {
            ind.genotype["background"]["style"] = Math.round(1+Math.random()*2);
        }

        // vertical alignment
        if (Math.random() < prob) {
            ind.genotype["typography"]["verticalAlignment"] = Math.round(1+Math.random()*2);
        }

        // textboxes
        let sizeChanged = false;
        for (let i in ind.genotype.textboxes) {
            let tb = ind.genotype.textboxes[i];

            // textAlignment
            if (Math.random() < prob && !this.params["typography"]["lock"][7]) {
                tb["textAlignment"] = Math.round(1+Math.random()*2);
            }

            // get current typeface
            let selectedTypeface = 0;
            for (let i = 0; i<this.params["typography"]["typefaces"].length; i++) {
                if (tb["typeface"] === this.params["typography"]["typefaces"][i].family) {
                    selectedTypeface = i;
                    break;
                }
            }

            // typeface
            if (Math.random() < prob && this.params["typography"]["typefaces"].length > 1) {
                const r = Math.round(Math.random()*(this.params["typography"]["typefaces"].length-1));
                selectedTypeface = r;
                tb["typeface"] = this.params["typography"]["typefaces"][r]["family"];
            }

            // size. double probability
            if (Math.random() < prob*2) {
                let size = Math.round(tb["size"] + -SIZE_MUTATION_ADJUST+(Math.random()*SIZE_MUTATION_ADJUST));
                // check if inside typeface min and max thresholds
                size = Math.min(Math.max(size, ind.minFontSize), ind.maxFontSize);
                tb["size"] = size;
                sizeChanged = true;
            }

            // weight
            if (Math.random() < prob) {
                const availableWeights = this.params["typography"]["typefaces"][selectedTypeface]["weight"];
                const minWeight = Math.max(parseInt(availableWeights[0]), this.params["typography"]["weight"]["min"]);
                const maxWeight = Math.min(parseInt(availableWeights[1]), this.params["typography"]["weight"]["max"]);
                tb["weight"] = Math.round(Math.random() * (maxWeight - minWeight) + minWeight);
            }

            // strech
            if (Math.random() < prob) {
                let availableStretch = this.params["typography"]["typefaces"][selectedTypeface]["stretch"];
                const minStretch = Math.max(parseInt(availableStretch[0]), this.params["typography"]["stretch"]["min"]);
                const maxStretch = Math.min(parseInt(availableStretch[1]), this.params["typography"]["stretch"]["max"]);
                tb["stretch"] = Math.round(Math.random() * (maxStretch - minStretch) + minStretch);
            }
            // uppercase not mutates*/
        }

        // reset grid
        if (sizeChanged) {
            // ind.genotype["grid"].resetMargins();
            ind.genotype["grid"] = new Grid(this.params.size, 2, this.params.sentences.length, this.params.size.margin);
            for (let i in ind.genotype["textboxes"]) {
                const tb = ind.genotype["textboxes"][i];
                const leading = Params.availableTypefacesInfo[tb["typeface"]].leading;
                ind.genotype["grid"].defineRow(i, (tb["size"] * leading), ind.genotype["typography"]["verticalAlignment"]);
            }
        }


        for (let img of ind.genotype["images"]) {
            if (Math.random() < prob) {
                img["scale"] = Math.random();
                img["x"] = Math.random();
                img["y"] = Math.random();
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
        // loadash
        // return Object.assign({}, obj);
        return JSON.parse(JSON.stringify(obj));
    }

    tournament = (size = 2) => {
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

    // draw() auxiliar function
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

    // draw auxiliar function
    // clean old files
    #cleanGraphics = () => {
        const graphics = document.querySelectorAll(`canvas:not(#defaultCanvas0)`);
        graphics.forEach((el) => {
            el.remove();
        });
    }

    draw = async () => {
        this.updated = false;
        // console.log(`this.population`, this.population.length);
        // TODO:
        /* const typefacesLoaded = this.#checkTypeface();
        if (!typefacesLoaded || (typefacesLoaded && !this.ready)) {
            this.updated = true;
            await this.evaluate();
            this.ready = typefacesLoaded;
        }*/

        // console.log(typefacesLoaded, this.ready);

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
                // translate(-width / 2, -height / 2);
                imageMode(CENTER);
                image(pg, x, y);
                textSize(10);
                // text (`poster no.${i} (fitness: ${ind.fitness})`, x-textWidth(`poster no.${i} (fitness: ${ind.fitness})`)/2, y + pg.height/2+15);
                pop();

                // remove the graphics from canvas and free the resources
                pg.remove();

                posX += 1;
                if (posX % Math.floor(width / Params.visualisationGrid.width) === 0) { // (Params.visualisationGrid.cols-1)
                    posX = 0;
                    posY += 1;
                }
            }
        }

        await this.evaluate();
    }

    saveRaster = () => {
        for (let i in this.population) {
            const ind = this.population[i];
            save(ind.phenotype, `${Date.now()}-${this.generations}-${i}`);
        }
    }
}

export default Population;