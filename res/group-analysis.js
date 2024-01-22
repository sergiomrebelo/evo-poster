import * as fs from 'fs';
import * as Path from 'path';
import { stringify } from 'csv-stringify';

import {arrUtils} from "./arr-utils.cjs";


const options = [
    [`experiment-s-0`, `1000`],
    [`experiment-s-a`, `0505`],
    [`experiment-0-a`, `0010`]
];


// const dirname = `/Users/srebelo/Documents/localhost/evo-poster/res/experiment-0-a/results`;
// const name = `res-experiments-0010`;

const ignored = [`.DS_Store`]
const logFormats = [`.json`];

const roundDecimal = (value) => {
    return Math.min(Math.max(0, Math.round(value * 100)/100), 1);
}

const analyseResults = async (dir) => {
    const data = [];
    const files = fs.readdirSync(dir, 'utf8');
    for await (const file of files) {
        const extension = Path.extname(file);
        if (logFormats.includes(extension)) {
            try {
                let d = fs.readFileSync(`${dir}/${file}`, 'utf8');
                d = JSON.parse(d);
                // d["name"] = `${dir}/${file}`;
                data.push(d)
            } catch (err) {
                console.error(err);
            }
        }
    }

    let nogen = arrUtils.max(data.map((res) => res.params[1]));
    // fitness []
    // fitness min, fitness max, fitness average min, fitness average max, average fitness average, average fitness median
    let results = [];
    for (let i=0; i<nogen; i++) {
        // fitness-max, fitness min, fitness average min, fitness average max, average fitness average, average fitness median
        // constraint-max, constraint-min, constraint-avg-min, constraint-avg-max, constraint-avg, constraint-avg-median
        // m-leg, m-grid, m-align, m-reg, m-just, m-type-par, m-balance, m-ng-space, m-sem-emp, m-sem-lay, m-sem-vis

        results.push([
            [i],
            [],[],[],[],[],[],
            [],[],[],[],[],[],
            [],[], [],[],[],[],[],[], [],[],[],
            [],[],[],
            [],[],[],
            [],[],[],
            [],[], [],[],[],[],[],[], [],[],[],
        ]);
    }

    for (let i in data) {
        let experiment = data[i]["data"];
        let fittest = data[i]["fittest"];
        for (let gen in experiment) {
            results[gen][1].push(experiment[gen][0]);
            results[gen][2].push(experiment[gen][1]);
            results[gen][3].push(experiment[gen][2]);
            results[gen][4].push(experiment[gen][2]);
            results[gen][5].push(experiment[gen][2]);
            results[gen][6].push(experiment[gen][3]);

            results[gen][7].push(experiment[gen][4]);
            results[gen][8].push(experiment[gen][5]);
            results[gen][9].push(experiment[gen][6]);
            results[gen][10].push(experiment[gen][6]);
            results[gen][11].push(experiment[gen][6]);
            results[gen][12].push(experiment[gen][7]);

            results[gen][13].push(experiment[gen][8]);
            results[gen][14].push(experiment[gen][9]);
            results[gen][15].push(experiment[gen][10]);
            results[gen][16].push(experiment[gen][11]);
            results[gen][17].push(experiment[gen][12]);
            results[gen][18].push(experiment[gen][13]);
            results[gen][19].push(experiment[gen][14]);
            results[gen][20].push(experiment[gen][15]);
            results[gen][21].push(experiment[gen][16]);
            results[gen][22].push(experiment[gen][17]);
            results[gen][23].push(experiment[gen][18]);

            // avg fittest individual
            results[gen][24].push(fittest[gen][0]); // avg fitness
            results[gen][25].push(fittest[gen][1]); // avg constraints
            results[gen][26].push(fittest[gen][2]); // avg penalty

            // max fittest individual
            results[gen][27].push(fittest[gen][3]); // max avg fitness
            results[gen][28].push(fittest[gen][4]); // max avg constraints
            results[gen][29].push(fittest[gen][5]); // max avg penalty

            // min fittest individual
            results[gen][30].push(fittest[gen][6]); // min avg fitness
            results[gen][31].push(fittest[gen][7]); // min avg constraints
            results[gen][32].push(fittest[gen][8]); // min avg penalty

            // metrics of the fittest individual
            results[gen][33].push(fittest[gen][9]);
            results[gen][34].push(fittest[gen][10]);
            results[gen][35].push(fittest[gen][11]);
            results[gen][36].push(fittest[gen][12]);
            results[gen][37].push(fittest[gen][13]);
            results[gen][38].push(fittest[gen][14]);
            results[gen][39].push(fittest[gen][15]);
            results[gen][40].push(fittest[gen][16]);
            results[gen][41].push(fittest[gen][17]);
            results[gen][42].push(fittest[gen][18]);
            results[gen][43].push(fittest[gen][19]);
        }
    }

    for (let res of results) {
        for (let i in res) {
            i = parseInt(i);
            if (i===1 || i===3 || i===7 || i===9) {
                res[i] = roundDecimal(arrUtils.max(res[i]));
            } else if (i===2 || i===4 || i===8 || i===10) {
                res[i] = roundDecimal(arrUtils.min(res[i]));
            }
            else if (i !== 0) {
                res[i] = roundDecimal(arrUtils.mean(res[i]));
                if (i===13 || i===14) {
                    res[i] =  1-res[i];
                }
            } else {
                res[i] = res[i].toString();
            }
        }
    }

    return results;
}


for (let opts of options) {
    console.log(opts);
    const dirname = `/Users/srebelo/Documents/localhost/evo-poster/res/${opts[0]}/results`;
    const data = await analyseResults(dirname);
    const writableStream = fs.createWriteStream(`res-experiments-${opts[1]}.csv`);
    console.group(`results of res-experiments-${opts[1]}`);
    const headers = [`index`, `fit-max`, `fit-min`, `fit-avg-min`, `fit-avg-max`, `fit-avg`, `fit-avg-median`,
        `const-max`, `const-min`, `const-avg-min`, `const-avg-max`, `const-avg`, `const-avg-median`,
        `m-leg`, `m-grid`, `m-align`, `m-reg`, `m-just`, `m-type-par`, `m-balance`, `m-ng-space`, `m-sem-emp`, `m-sem-lay`, `m-sem-vis`,
        `fittest-avg-fit`, `fittest-avg-const`, `fittest-avg-penalty`,
        `fittest-avg-max-fit`, `fittest-avg-max-const`, `fittest-avg-max-penalty`,
        `fittest-avg-min-fit`, `fittest-avg-min-const`, `fittest-avg-min-penalty`,
        `fittest-avg-m-leg`, `fittest-avg-m-grid`,
        `fittest-avg-m-align`, `fittest-avg-m-reg`,`fittest-avg-m-just`, `fittest-avg-m-type-par`, `fittest-avg-m-balance`, `fittest-avg-m-ng-space`,
        `fittest-avg-m-sem-emp`, `fittest-avg-m-sem-lay`, `fittest-avg-m-sem-vis`
    ];
    const stringifier = stringify({ header: true, columns: headers });

    for (let row of data) {
        stringifier.write(row);
    }
    try {
        stringifier.pipe(writableStream);
    } catch (err) {
        console.log(`error on save to file: ${err}`);
    }

    console.groupEnd();
}



