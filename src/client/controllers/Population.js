import {Params} from "../Params.js";
import Poster, {Grid} from "./Poster.js";
import {contrastChecker, randomScheme} from "./ColorGenerator.js";
import {shuffleArr, sumArr, sus, swap} from "../utils.js";

import * as config from './../../../evo-poster.config.js';


const SIZE_MUTATION_ADJUST = 5;
const TOURNAMENT_SIZE = 10;
const MAX_COLOR_SCHEME_ATTEMPT = config["default"]["COLOR"] !== undefined ? config["default"]["COLOR"]["MAX_COLOR_SCHEME_ATTEMPT"] : 200;

export class Population {
    #typefaces;
    #data;
    constructor(params, data) {
        this.size = params["evo"]["popSize"];
        this.params = params;
        this.population = [];
        this.generations = 0;
        this.ready = false;
        this.evolving = false;
        this.pause = false;
        this.#data = data;
        this.targetSemanticLayout = this.#calculateSemanticTargetLayout(this.#data);
        this.emotionaData = this.#data["classification"]["emotions"]["data"];

        this.#typefaces = [];
        this.updated = true;

        this.log = {
            config: this.params,
            generations: []
        };

        this.initialisation();
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
        await this.evaluate();
        this.updated = true;
    }

    evolve = async () => {
        const offspring = [];

        // clean graphics hidden on canvas
        await this.#cleanGraphics();
        document.getElementById(`generation-number`).textContent=this.generations;


        // copy the elite to next generation
        const eliteSize = parseInt(this.params["evo"]["eliteSize"]);
        for (let i=0; i<eliteSize; i++) {
            offspring.push(this.population[i].copy());
        }

        let fitness = this.population.map((ind) => ind.fitness);
        let constraints = this.population.map((ind) => ind.constraint);

        // select the indices using Stochastic Ranking
        const rank = await this.#stochasticRanking(fitness, constraints);

        // crossover
        for (let i = eliteSize; i < this.params["evo"]["popSize"]; i++) {
            if (Math.random() <= this.params["evo"]["crossoverProb"]) {
                const parents = this.#rankingTournament(rank, TOURNAMENT_SIZE, 2);
                // crossover method
                const child = await this.uniformCrossover(this.population[parents[0]], this.population[parents[1]]);
                offspring.push(child);
            } else {
                const ind = this.#rankingTournament(rank, TOURNAMENT_SIZE, 1);
                offspring.push(this.population[ind[0]].copy());
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

        // log population stats
        const genData = [];
        for (let ind of this.population) {
            genData.push({
                genotype: ind.genotype,
                fitness: ind.fitness,
                constraint: ind.constraint,
                metrics: ind.metrics
            })
        }
        this.log["generations"].push({
            gen: this.generations,
            data: genData
        })

        this.generations++;
        this.updated = true;

        if(this.generations < this.params["evo"]["noGen"] && !this.pause) {
            // need to possible to visualise the posters evolving
            setTimeout(() => {
                this.evolve();
            }, 100);
        } else {
            this.evolving = false;
            console.group (`stats`);
            console.log (this.log);
            console.groupEnd();
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
            const typefaceIndex = this.params["typography"]["typefaces"].map(t => t.family).indexOf(tb["typeface"]);
            const leading = this.params["typography"]["typefaces"][typefaceIndex]["leading"];
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
            let colorContrast = false;
            let colorScheme;
            let colorAttempt = 0;
            while (!colorContrast || colorAttempt > MAX_COLOR_SCHEME_ATTEMPT) {
                colorScheme = randomScheme();
                colorContrast = contrastChecker(colorScheme["baseColour"], colorScheme["colorA"], colorScheme["colorB"]);
                colorAttempt++;
            }

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

            if (Math.random() < prob) {
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

            // stretch
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
                const typefaceIndex = this.params["typography"]["typefaces"].map(t => t.family).indexOf(tb["typeface"]);
                const leading = this.params["typography"]["typefaces"][typefaceIndex]["leading"];
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

    evaluate = async () => {
        // force evaluation of individuals
        for (let individual of this.population) {
            await individual.evaluate(this.targetSemanticLayout, this.emotionaData);
        }


        // sort the population based on staticPenalty
        // enables visualisation and elite
        // sort individuals in the population by fitness (the fittest first)
        await this.#staticPenalty();
    }

    #stochasticRanking = async (fitness, constraints, pF= 0.45) => { //0.45
        let populationSize = this.population.length;
        let indices = Array.from(Array(populationSize).keys())

        for (let i=0; i<populationSize; i++) {
            let noSwap = true;
            for (let j=0; j<populationSize-1; j++) {
                let u = Math.random();
                if ((constraints[indices[j]] === 0 && constraints[indices[j + 1]] === 0) || u <= pF) {
                    if (fitness[indices[j]] > fitness[indices[j + 1]]) {
                        swap(indices, j, j + 1)
                        noSwap = false;
                    } else {
                        if (constraints[indices[j]] > constraints[indices[j + 1]]) {
                            swap(indices, j, j + 1)
                            noSwap = false;
                        }
                    }
                }
            }
            if (noSwap) {
                break;
            } else {
                noSwap = true;
            }
        }
        return indices;
    }

    #staticPenalty = async () => {
        this.population = this.population.sort((a,b) => (b.fitness-b.constraint) - (a.fitness-a.constraint));
    }

    copy = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    }

    // ranking based
    // return n individuals
    // More the selection pressure more will be the Convergence rate
    #rankingTournament = (rank, tournamentSize = 5, parentSize = 2, sp = 2) => {
        // check the tournament size and parentSize
        tournamentSize = tournamentSize < parentSize ? parentSize : tournamentSize;
        let parents = [];
        // select the pool of parents
        let pool = [];
        for (let i = 0; i < tournamentSize; i++) {
            const r = Math.round(Math.random() * (rank.length - 1));
            pool.push(r);
        }
        // sort by ranking
        pool.sort((a, b) => a - b);
        // define the probability based on ranking fitness
        let probabilities = pool.map((ind) => {
            return sp - (2 * ind * (sp - 1.0)) / (this.population.length - 1);
        });
        // normalize to sum up to 1
        const probabilitiesSum = sumArr(probabilities);
        probabilities = probabilities.map((p) => p / probabilitiesSum);
        probabilities = shuffleArr(probabilities);
        for (let j = 0; j < parentSize; j++) {
            let ix = sus(probabilities);
            // sus
            parents.push(parseInt(ix));
        }
        return parents;
    }

    // draw aux function
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

    // draw aux function
    // clean old files
    #cleanGraphics = () => {
        const graphics = document.querySelectorAll(`canvas:not(#defaultCanvas0)`);
        graphics.forEach((el) => {
            el.remove();
        });
    }

    draw = async () => {
        this.updated = false;
        // commented by dev purposes
        /* const typefacesLoaded = this.#checkTypeface();
        if (!typefacesLoaded || (typefacesLoaded && !this.ready)) {
            this.updated = true;
            await this.evaluate();
            this.ready = typefacesLoaded;
        } */

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
                console.log (`outsite=${this.emotionaData}`);
                await ind.evaluate(this.targetSemanticLayout, this.emotionaData);
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
                pop();

                // remove the graphics from canvas and free the resources
                // pg.remove();

                posX += 1;
                if (posX % Math.floor(width / Params.visualisationGrid.width) === 0) { // (Params.visualisationGrid.cols-1)
                    posX = 0;
                    posY += 1;
                }
            }
        }

        // await this.evaluate();
    }

    saveRaster = () => {
        for (let i in this.population) {
            const ind = this.population[i];
            save(ind.phenotype, `${Date.now()}-${this.generations}-${i}`);
        }
    }

    #calculateSemanticTargetLayout = (data, emphasis= 0.1) => {
        // emphasis is the min importance in layout of neutrals (between 0.1 and 1)
        // emotional score is added to the emphasis
        let dist = [];
        for (let sentence of data["lexicon"]["sentences"]) {
            let amount = sentence["emotions"]["data"]["recognisedEmotions"].length;
            let emotions = sentence["emotions"]["data"]["recognisedEmotions"].map((e) => e[0]);
            let score = sentence["emotions"]["data"]["recognisedEmotions"].reduce((accumulator, a) => {
                return accumulator + a[1];
            }, 0);
            score +=emphasis;
            dist.push([amount, emotions, score]);
        }
        const sum = sumArr(dist.map((d) => d[2]));
        // normalised value
        dist = dist.map((d) => {
            return [d[0],d[1],d[2],Math.round(d[2]/sum*100)/100];
        });
        return dist;
    }
}

export default Population;