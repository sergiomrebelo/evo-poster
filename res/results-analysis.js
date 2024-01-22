import * as fs from 'fs';
import * as Path from 'path';
import {arrUtils} from "./arr-utils.cjs";

const dirname = `/Users/srebelo/Documents/localhost/evo-poster/res`;
const experiments = 20;
const options = [
    [`experiment-s-0`, `1000`],
    [`experiment-s-a`, `0505`],
    [`experiment-0-a`, `0010`]
];

const ignored = [`.DS_Store`]
const logFormats = [`.json`];


const analyseRun = async (dir) => {
    const data = []; // store raw data from experiments

    // get paths of log files and group data
    const files = fs.readdirSync(dir, 'utf8');
    for await (const file of files) {
        const extension = Path.extname(file);
        if (logFormats.includes(extension)) {
            try {
                let d = fs.readFileSync(`${dir}/${file}`, 'utf8');
                data.push(JSON.parse(d))
            } catch (err) {
                console.error (`not possible to upload "${path}"`);
                // revoke
            }
        }
    }

    // store params [pop size, no. gens, xover probability, mutation probability, elite, text, eval weights, ae weights, sem weights]
    let params = [[],[],[],[],[],[],[],[],[]];
    // store data for the different evolution runs
    let evolutionRuns = [];
    let fittestIndividualData = [];
    for await (let run of data) {
        // params
        params[0].push(run["config"]["evo"]["popSize"]);
        params[1].push(run["config"]["evo"]["noGen"]);
        params[2].push(run["config"]["evo"]["crossoverProb"]);
        params[3].push(run["config"]["evo"]["mutationProb"]);
        params[4].push(run["config"]["evo"]["eliteSize"]);
        params[5].push(run["config"]["sentences"].toString());
        params[6].push(run["config"]["evaluation"]["weights"][0].toString());
        params[7].push(run["config"]["evaluation"]["aestheticsWeights"].toString());
        params[8].push(run["config"]["evaluation"]["semanticsWeights"].toString());

        // evolutionary data
        let currentGeneration = [];
        let bests = [];
        for (let evolutionData of run["generations"]) {
            let no = evolutionData["gen"];
            let fitness = [], constraint = [], metrics = [[],[], [],[],[],[],[],[], [],[],[]];
            let fittestFit = [];
            let fittestConst = [];
            let fittestPenalty = [];
            let fittestMetrics = [];

            for (let i in evolutionData["data"]) {
                let individual = evolutionData["data"][i];

                // save the fittest individual
                if (parseInt(i) === 0) {
                    fittestFit.push(individual["fitness"]);
                    fittestConst.push(individual["constraint"]);
                    fittestPenalty.push((individual["fitness"] - individual["constraint"]));

                    fittestMetrics.push([
                        individual["metrics"]["constraints"]["legibility"],
                        individual["metrics"]["constraints"]["gridAppropriateness"],
                        individual["metrics"]["aesthetics"]["alignment"],
                        individual["metrics"]["aesthetics"]["regularity"],
                        individual["metrics"]["aesthetics"]["justification"],
                        individual["metrics"]["aesthetics"]["typefaceParing"],
                        individual["metrics"]["aesthetics"]["balance"],
                        individual["metrics"]["aesthetics"]["whiteSpace"],
                        individual["metrics"]["semantics"]["emphasis"],
                        individual["metrics"]["semantics"]["layout"],
                        individual["metrics"]["semantics"]["visuals"]
                    ]);
                }


                // console.log(individual["metrics"]);
                fitness.push(individual["fitness"]);
                constraint.push(individual["constraint"]);
                // legibility metrics
                metrics[0].push(individual["metrics"]["constraints"]["legibility"]);
                metrics[1].push(individual["metrics"]["constraints"]["gridAppropriateness"]);
                // aesthetics metrics
                metrics[2].push(individual["metrics"]["aesthetics"]["alignment"]);
                metrics[3].push(individual["metrics"]["aesthetics"]["regularity"]);
                metrics[4].push(individual["metrics"]["aesthetics"]["justification"]);
                metrics[5].push(individual["metrics"]["aesthetics"]["typefaceParing"]);
                metrics[6].push(individual["metrics"]["aesthetics"]["balance"]);
                metrics[7].push(individual["metrics"]["aesthetics"]["whiteSpace"]);
                // semantics metrics
                metrics[8].push(individual["metrics"]["semantics"]["emphasis"]);
                metrics[9].push(individual["metrics"]["semantics"]["layout"]);
                metrics[10].push(individual["metrics"]["semantics"]["visuals"]);
            }

            currentGeneration.push([
                no,
                [arrUtils.max(fitness), arrUtils.min(fitness),
                    arrUtils.mean(fitness), arrUtils.median(fitness)],
                [arrUtils.max(constraint), arrUtils.min(constraint),
                    arrUtils.mean(constraint), arrUtils.median(constraint),
                ],
                [arrUtils.mean(metrics[0]), arrUtils.mean(metrics[1]),
                    arrUtils.mean(metrics[2]), arrUtils.mean(metrics[3]), arrUtils.mean(metrics[4]),
                    arrUtils.mean(metrics[5]), arrUtils.mean(metrics[6]), arrUtils.mean(metrics[7]),
                    arrUtils.mean(metrics[8]), arrUtils.mean(metrics[9]), arrUtils.mean(metrics[10])
                ]
            ]);

            bests.push([
                no,
                [arrUtils.mean(fittestFit), arrUtils.mean(fittestConst), arrUtils.mean(fittestPenalty)],
                [arrUtils.max(fittestFit), arrUtils.max(fittestConst), arrUtils.max(fittestPenalty)],
                [arrUtils.min(fittestFit), arrUtils.min(fittestConst), arrUtils.min(fittestPenalty)],
                [
                    (1-arrUtils.mean(fittestMetrics.map(x=>x[0]))),
                    (1-arrUtils.mean(fittestMetrics.map(x=>x[1]))),
                    arrUtils.mean(fittestMetrics.map(x=>x[2])),
                    arrUtils.mean(fittestMetrics.map(x=>x[3])),
                    arrUtils.mean(fittestMetrics.map(x=>x[4])),
                    arrUtils.mean(fittestMetrics.map(x=>x[5])),
                    arrUtils.mean(fittestMetrics.map(x=>x[6])),
                    arrUtils.mean(fittestMetrics.map(x=>x[7])),
                    arrUtils.mean(fittestMetrics.map(x=>x[8])),
                    arrUtils.mean(fittestMetrics.map(x=>x[9])),
                    arrUtils.mean(fittestMetrics.map(x=>x[10])),
                ]
            ]);

        }
        evolutionRuns.push(currentGeneration);
        fittestIndividualData.push(bests);
    }


    // create unique config lists
    params = params.map((el) => el.filter((value, index, array) => array.indexOf(value) === index));

    // processing data by generation
    // for each generation stores [fitness [max, min, mean, median], constraint]
    let generations = [];
    let fittest = [];
    for (let i = 0; i<params[1]; i++) {
        generations.push([
            [],[],[],[],[],[],[],[],
            [],[], [],[],[],[],[],[],[], [],[]
        ]);
        // for penalty, fitness, constraint (avg, max, min)
        // metrics
        fittest.push([
            [], [], [],
            [], [], [],
            [], [], [],
            [],[], [],[],[],[],[],[],[], [],[]
        ])

    }

    for (let run of evolutionRuns) {
        for (let gen of run) {
            const index = gen[0];
            const fitness = gen[1];
            const constraints = gen[2];
            const metrics = gen[3];
            // max
            generations[index][0].push(fitness[0]);
            generations[index][4].push(constraints[0]);
            // min
            generations[index][1].push(fitness[1]);
            generations[index][5].push(constraints[1]);
            // mean
            generations[index][2].push(fitness[2]);
            generations[index][6].push(constraints[2]);
            // median
            generations[index][3].push(fitness[3]);
            generations[index][7].push(constraints[3]);

            // metrics
            generations[index][8].push(metrics[0]); // legibility
            generations[index][9].push(metrics[1]); // gridAppropriateness
            generations[index][10].push(metrics[2]); // alignment
            generations[index][11].push(metrics[3]); // regularity
            generations[index][12].push(metrics[4]); // justification
            generations[index][13].push(metrics[5]); // typefaceParing
            generations[index][14].push(metrics[6]); // balance
            generations[index][15].push(metrics[7]); // whiteSpace
            generations[index][16].push(metrics[8]); // emphasis
            generations[index][17].push(metrics[9]); // layout
            generations[index][18].push(metrics[10]); // visuals
        }
    }

    /*
    fittest.push([
            [], [], [],
            [], [], [],
            [], [], [],
            [],[], [],[],[],[],[],[],[], [],[]
        ])
     */

    for (let fit of fittestIndividualData) {
        // calculate the average
        for (let gen of fit) {
            const index = gen[0];
            const avgFitness = gen[1];
            const maxFitness = gen[2];
            const minFitness = gen[3];
            const metrics = gen[4];
            // avg
            fittest[index][0].push(avgFitness[0]);
            fittest[index][1].push(avgFitness[1]);
            fittest[index][2].push(avgFitness[2]);

            // max
            fittest[index][3].push(maxFitness[0]);
            fittest[index][4].push(maxFitness[1]);
            fittest[index][5].push(maxFitness[2]);

            // min
            fittest[index][6].push(minFitness[0]);
            fittest[index][7].push(minFitness[1]);
            fittest[index][8].push(minFitness[2]);

            // metrics
            fittest[index][9].push(metrics[0]);
            fittest[index][10].push(metrics[1]);

            fittest[index][11].push(metrics[2]);
            fittest[index][12].push(metrics[3]);
            fittest[index][13].push(metrics[4]);
            fittest[index][14].push(metrics[5]);
            fittest[index][15].push(metrics[6]);
            fittest[index][16].push(metrics[7]);

            fittest[index][17].push(metrics[8]);
            fittest[index][18].push(metrics[9]);
            fittest[index][19].push(metrics[10]);

        }
        // console.log (fit);
    }

    // average of bests
    for (let generation of fittest) {
        for (let i in generation) {
            i = parseInt(i);
            if (i >= 3 && i < 6) { // max
                generation[i] = arrUtils.max(generation[i]);
            } else if (i >= 6 && i < 8) {
                generation[i] = arrUtils.min(generation[i]);
            } else {
                generation[i] = arrUtils.mean(generation[i]);
            }
        }
    }

    // calculate global values
    for (let generation of generations) {
        for (let i in generation) {
            i = parseInt(i);
            // console.log ("i-generation.length", generation[i]);
           if (i===0 || i===4) {
                generation[i] = arrUtils.max(generation[i]);
            } else if (i===1 || i===5) {
                generation[i] = arrUtils.min(generation[i]);
            } else if (i===3 && i===7) {
                generation[i] = arrUtils.median(generation[i]);
            } else {
               generation[i] = arrUtils.mean(generation[i]);
           }
        }
    }

    // add the number of run in the last position of params


    return {
        "params": params,
        "data": generations,
        "fittest": fittest
    }
}


// analyse all experiments
for (let opts of options) {
    const __dir = `${dirname}/${opts[0]}`;
    for (let i = 1; i < (experiments + 1); i++) {
        console.group(`[${opts[0]}] experiment no. ${i}`);
        const folder = `${__dir}/${i}`;
        console.info(`folder=${folder}`);
        if (fs.existsSync(folder)) {
            const experiment = await analyseRun(folder);
            experiment["time"] = Date.now();
            const name = `${__dir}/results/${i}.json`;
            try {
                fs.writeFileSync(name, JSON.stringify(experiment), (err) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log(`${name} written successfully to file`);
                    }
                });
            } catch (err) {
                console.error(err);
            }

        } else {
            console.error (`folder=${folder} do not exists`);
        }
        console.groupEnd();
    }
}

// final analysis
