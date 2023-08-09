import {Params} from "../Params.js";
import backgroundStyles from "./BackgroundStyles.js";

import * as evaluator from "../../@evoposter/evaluator/src/index.mjs";
import {randomScheme} from "./ColorGenerator.js";
import {sumArr} from "../utils.js";


class Poster {
    #showGrid = false;
    #debug = false;
    constructor(n, generation, params = null, genotype = null) {
        this.id = `${generation}-${n}`;
        this.n = n;
        this.generation = generation;
        this.ready = false;
        // ensure we use a deep copy of params
        this.params = JSON.parse(JSON.stringify(params));

        this.fitness = 1;
        this.constraint = 0;

        this.metrics = {
            legibility: 1,
            gridAppropriateness: 1
        }
        this.sentencesLenght = [];

        const h = (genotype === null) ? params["size"]["height"] : genotype["size"]["height"];
        this.maxFontSize = Params.typography.maxSize * h;
        this.minFontSize = Params.typography.minSize * h;

        this.genotype = (genotype === null) ? this.#generateGenotype(params) : genotype;

        this.#showGrid = params !== null ? params.display.grid : false;
        this.phenotype = null;
        // this.evaluate();
    }

    copy = () => {
        const gridData = this.genotype["grid"];
        const grid = new Grid(
            JSON.parse(JSON.stringify(gridData.size)),
            JSON.parse(JSON.stringify(gridData.v)),
            JSON.parse(JSON.stringify(gridData.h)),
            JSON.parse(JSON.stringify(gridData.defaultMargins)),
            JSON.parse(JSON.stringify(gridData.gwper)),
            JSON.parse(JSON.stringify(gridData.ghper)),
        );
        const size = JSON.parse(JSON.stringify(this.genotype["size"]));
        const textboxes = JSON.parse(JSON.stringify(this.genotype["textboxes"]));
        for (let i in textboxes) {
            textboxes[i]["color"] = color(this.genotype["textboxes"][i]["color"]);
        }
        const background = JSON.parse(JSON.stringify(this.genotype["background"]));
        background["colors"][0] = color(this.genotype["background"]["colors"][0]);
        background["colors"][1] = color(this.genotype["background"]["colors"][1]);
        let images = [];
        for (let img of this.genotype["images"]) {
            const p = {
                "scale": img["scale"],
                "src": img["src"],
                "x": img["x"],
                "y": img["y"]
            }
            images.push(p);
        }
        const typography = JSON.parse(JSON.stringify(this.genotype["typography"]));
        const genotypeCopy = {
            grid: grid,
            textboxes: textboxes,
            size: size,
            background: background,
            typography: typography,
            images: images
        }
        return new Poster(this.n, this.generation, this.params, genotypeCopy);
    }

    #generateGenotype = (params) => {
        const colorScheme = randomScheme();

        // define grid
        const grid = new Grid(
            {
                width: params.size.width,
                height: params.size.height,
                margin: params.size.margin
            },
            2,
            params.sentences.length,
            JSON.parse(JSON.stringify(params.size.margin))
        );

        // define texboxes
        const textboxes = [];

        const alignment = params.typography.verticalAlignment === 0 ?
            Math.round(Math.random() * (Params.textAlignmentOptions.length-2) + 1) :
            params.typography.verticalAlignment;

        for (let i in params["sentences"]) {
            const sentence = params["sentences"][i]
            const selectedTypeface = Math.round(Math.random()*(params["typography"]["typefaces"].length-1));
            // stretch values
            let stretchDefaultParams = params["typography"]["typefaces"][selectedTypeface]["stretch"];
            stretchDefaultParams.map((v) => !isNaN(v) ? parseInt(v) : 100);
            if (stretchDefaultParams.length < 2) {
                stretchDefaultParams.push(100);
            }
            // weight valuers
            let weightDefaultParams = params["typography"]["typefaces"][selectedTypeface]["weight"];
            // selected values
            let selectedWeight = Math.round((Math.random() * (params["typography"]["weight"]["max"] - params["typography"]["weight"]["min"])) + params["typography"]["weight"]["min"]);
            selectedWeight = Math.max(weightDefaultParams[0], Math.min(selectedWeight, weightDefaultParams[1]));
            let selectedStretch = Math.round((Math.random() * (params["typography"]["stretch"]["max"] - params["typography"]["stretch"]["min"])) + params["typography"]["stretch"]["min"]);
            selectedStretch = Math.max(stretchDefaultParams[0], Math.min(selectedStretch, stretchDefaultParams[1]));

            // define initial size
            const leading = Params.availableTypefacesInfo[Params.availableTypefaces[selectedTypeface]]["leading"];
            let size = Math.round(grid.rows.l[0]) / leading;
            size += Math.round(-(size*Params.typography.range)+(Math.random()*(size*Params.typography.range)));
            size = Math.max(
                Math.round(params.size.height * Params.typography.minSize),
                Math.min(Math.round(params.size.height * Params.typography.maxSize), size)
            );
            grid.defineRow(i, size * leading, alignment);

            const alignmentLine = params.typography.textAlignment === 0 ?
                Math.round(Math.random() * (Params.textAlignmentTbOptions.length-2) + 1) :
                params.typography.textAlignment;

            textboxes.push({
                "content": sentence,
                "weight": selectedWeight,
                "font-stretch": selectedStretch,
                "alignment": alignmentLine,
                "size": size,
                "typeface": params["typography"]["typefaces"][selectedTypeface]["family"],
                "color": params.typography.color.random ? colorScheme.baseColour : color(params.typography.color.value),
                "uppercase": params.typography.uppercase
            });
        }

        const images = [];
        // console.log(`params.images`, params.images);
        for (let input of params.images) {
            const src = input.src;
            const img = loadImage(src, async (img) => {
                // resize image
                await img.resize(0, params.size.height);
                img.ready = true;
            });
            images.push({
                x: Math.random(),
                y: Math.random(),
                scale: Math.random(),
                src: img
            })
        }


        // create genotype
        return {
            grid: grid,
            textboxes: textboxes,
            size: {
                width: params.size.width,
                height: params.size.height,
                margin: params.size.margin,
            },
            background: {
                style: params.background.style === 0 ? Math.round(1+Math.random()*(Params.background.availableStyles.length-2)) : params.background.style,
                colors: [
                    params.background.color.random ? colorScheme.colorA : color(params.background.color.valueA),
                    params.background.color.random ? colorScheme.colorB : color(params.background.color.valueB)
                ]
            },
            typography: {
                verticalAlignment: alignment
            },
            images: images
        }
    }

    // generate phenotype
    draw = async () => {
        this.ready = true;
        this.phenotype = createGraphics(this.genotype.size.width, this.genotype.size.height);
        this.phenotype.id = this.n;

        // background
        const backgroundStyleKey = Object.keys(backgroundStyles)[this.genotype.background.style-1];
        const backgroundFunction =  backgroundStyles[backgroundStyleKey];
        backgroundFunction(this.phenotype, this.genotype.background.colors[0], this.genotype.background.colors[1]);

        // place images
        this.ready = await this.#placeImages(this.phenotype);

        // typesetting typography on poster
        await this.typeset(this.phenotype);

        // debug
        if (this.#debug) {
            pg.textSize(10);
            pg.fill(0);
            pg.text(`${this.id}+${this.genotype.typography.verticalAlignment}+style=${this.genotype.background.style}\nfitness=${this.fitness}`, 20, 20);
        }

        if (this.#showGrid || this.#debug) {
            this.genotype.grid.display(this.phenotype);
        }

        // place graphics
        // const sideX = width / Math.floor(width/Params.visualisationGrid.width);
        // const sideY = this.genotype.grid.size.height + Params.visualisationGrid.marginY;
        // const x = posX * sideX + sideX/2;
        // const y = posY * sideY + sideY/2;
        // imageMode(CENTER);
        // image(pg, x, y);
        // pop();

        return this.phenotype;
    }

    evaluate = async (dist) => {
        this.phenotype = await this.draw();
        const noCurrentTypefaces = this.params["typography"]["typefaces"].length;

        const layoutSemantics = evaluator.layoutSemantics(this.genotype["grid"]["rows"]["l"], dist, `FIXED`, this.genotype["size"]);
        const visualSemantics = evaluator.visualSemantics(this.genotype["textboxes"], dist, noCurrentTypefaces);
        const justification = evaluator.legibility(this.sentencesLenght, this.genotype["grid"].getAvailableWidth(), `JUSTIFY`);

        // this.fitness = layoutSemantics;
        // this.fitness = (visualSemantics * 0.3 + layoutSemantics * 0.3 + justification * 0.4);
        this.fitness = visualSemantics;

        console.group();
        console.log(JSON.stringify(this.genotype["textboxes"]), JSON.stringify(dist), JSON.stringify(noCurrentTypefaces));
        console.log("visualSemantics", visualSemantics);
        console.groupEnd();

        // constraints
        const legibility = evaluator.legibility(this.sentencesLenght, this.genotype["grid"].getAvailableWidth(), `OVERSET`);
        const gridAppropriateness = evaluator.gridAppropriateSize(
            this.genotype["size"].width, this.genotype["size"].height,
            this.genotype["grid"].rows.l, this.genotype["grid"].columns.l, this.genotype["grid"].marginsPos
        );
        this.constraint = legibility + gridAppropriateness;

        this.metrics["legibility"] = legibility;
        this.metrics["gridAppropriateness"] = gridAppropriateness;

        // returns a number between 0 and 0.5
        // subtracted to fitness
        return {
            "fitness": this.fitness,
            "constraints": this.constraint
        }
    }

    typeset = async(pg) => {
        this.sentencesLenght = [];

        pg.push();
        pg.translate(pg.width/2, pg.height/2);
        const ctx = pg.drawingContext;

        for (let i in this.genotype.textboxes) {
            const tb = this.genotype.textboxes[i];

            // define text align
            let col = tb["alignment"];
            let align = LEFT;
            if (col === 2) {
                align = CENTER;
            } else if (col === 3) {
                align = RIGHT;
            }
            pg.textAlign(align, BASELINE);

            // position of text
            let xPos =  this.genotype.grid.col(col-1, false);
            let yPos = this.genotype.grid.row(parseInt(i)+1, false);

            // color
            pg.fill(tb["color"]);

            // typeface
            ctx.font = `${tb["weight"]} ${getFontStretchName(tb['font-stretch'])} ${tb["size"]}px ${tb["typeface"]}`;
            drawingContext.font = `${tb["weight"]} ${getFontStretchName(tb['font-stretch'])} ${tb["size"]}px ${tb["typeface"]}`;
            let content = tb["uppercase"] === true ? tb["content"].toUpperCase() : tb["content"];
            pg.text(content, xPos, yPos);

            // const sentenceWidth = pg.textWidth (content);
            const sentenceWidth = ctx.measureText(content).width;

            // debug
            // pg.textSize(10);
            // pg.fill (0)
            // pg.text(sentenceWidth, xPos, yPos+15);
            this.sentencesLenght.push(sentenceWidth);
        }
        pg.pop();
    }

    #placeImages = async (pg) => {
        let ready = true;
        for (let img of this.genotype["images"]) {
            if (img["src"] !== undefined && img["src"].hasOwnProperty("ready")) {
                if (img["src"]["ready"]) {
                    let x = pg.width * img.x;
                    let y = pg.height * img.y;
                    pg.imageMode(CENTER);
                    pg.image (img.src,
                        x, y,
                        (img.src.width * img.scale), (img.src.height * img.scale)
                    );
                }
            }  else {
                ready = false;
            }
        }
        return ready;
    }

    toggleGrid = (show = null) => {
        if (show === null) {
            show = !this.#showGrid;
        }
        this.#showGrid = show;
        this.draw();
    }
}

const getFontStretchName = (value) => {
    if (value > -10 && value <= 50) {
        return 'ultra-condensed';
    } else if (value > 50 && value <= 62.5) {
        return 'extra-condensed';
    } else if (value > 62.5 && value <= 75) {
        return 'condensed';
    } else if (value > 75 && value <= 87.5) {
        return 'semi-condensed';
    } else if (value > 87.5 && value <= 100) {
        return 'normal';
    } else if  (value > 100 && value <= 112.5) {
        return 'semi-expanded';
    }  else if  (value > 112.5 && value <= 125) {
        return 'expanded';
    } else if  (value > 125 && value <= 150) {
        return 'extra-expanded';
    } else {
        return `ultra-expanded`;
    }
}

export class Grid {
    constructor(size, v = 12, h = 24, defaultMargins, gwper = 0.03, ghper = null) {
        if (ghper === null) {
            ghper = gwper;
        }
        this.pos = createVector(size.width/2,size.height/2);
        this.size = JSON.parse(JSON.stringify(size));
        this.defaultMargins = defaultMargins;
        this.v = v;
        this.h = h;
        this.gwper = gwper;
        this.ghper = ghper;
        this.gapw = this.size.width * this.gwper;
        this.gaph = this.size.height * this.ghper;

        this.regular = true;
        this.verticalSpace = [];

        this.marginsPos = {};

        this.columns = {};
        this.columns.y = {};
        this.columns.center = {};
        this.columns.gap = {};

        this.rows = {}
        this.rows.x = {};
        this.rows.center = {};
        this.rows.gap = {};

        this.def();
    }

    export = () => {
        return {
            pos: [this.pos.x, this.pos.y, this.pos.z],
            size: this.size,
            defaultMargins: this.defaultMargins,
            v: this.v,
            h: this.h,
            gapw: this.gapw,
            gaph: this.gaph,
            marginsPos: this.marginsPos,
            columns: this.columns,
            rows: this.rows
        }
    }

    copy = () => {
        return new Grid (
            JSON.parse(JSON.stringify(this.size)),
            JSON.parse(JSON.stringify(this.v)),
            JSON.parse(JSON.stringify(this.h)),
            JSON.parse(JSON.stringify(this.defaultMargins)),
            JSON.parse(JSON.stringify(this.gwper)),
            JSON.parse(JSON.stringify(this.ghper))
        );
    }

    updateMarginsBasedOnSize = (updateDirection = 0, size = 1, nLines, max = this.size.height) => {
        const targetSize = size * nLines;
        let margins = this.size.height - targetSize;
        if (updateDirection === 0) margins = margins / 2;
        if ((updateDirection === 0 || updateDirection === 1) && this.size.margin[1] < max) {
            this.size.margin[1] = margins;
        }
        if ((updateDirection === 0 || updateDirection === 2) && this.size.margin[3] < max) {
            this.size.margin[3] = margins;
        }
        this.def();
    }

    updateMargins = (updateDirection = 0, inc = 1, max = this.size.height) => { //max = this.size.height*.8
        if (updateDirection === 0) inc = inc / 2;
        if ((updateDirection === 0 || updateDirection === 1) && this.size.margin[1] < max) {
            this.size.margin[1] = this.size.margin[1] + inc;
        }
        if ((updateDirection === 0 || updateDirection === 2) && this.size.margin[3] < max) {
            this.size.margin[3] = this.size.margin[3] + inc;
        }
        this.def();
    }

    resetMargins = () => {
        this.size.margin = this.defaultMargins;
        this.marginsPos.left = this.size.margin[0] * this.size.width;
        this.marginsPos.top = this.size.margin[1] * this.size.height;
        this.marginsPos.right = this.size.margin[2] * this.size.width;
        this.marginsPos.bottom = this.size.margin[3] * this.size.height;
        this.def();
    }

    def = () => {
        this.#defMargins();
        this.#defVertical();
        this.#defHorizontal();
    }

    update = (rows = null, cols = null) => {
        if ((rows !== null) && (rows !== this.v)) {
            console.log(`grid updated from ${this.v} to ${rows}`);
        }
    }

    defineRow = (id, size, align) => {
        this.regular = false;
        const init = this.rows.l[id];
        this.rows.l[id] = size;
        let dif = this.rows.l[id]-init;
        // center: update the two margins
        dif = (align === 2) ? dif/2 : dif;
        const percent = (this.marginsPos.bottom - dif) / this.size.height;
        if (align <= 2) {
            // top and center
            this.size.margin[3] = (this.marginsPos.bottom - dif) / this.size.height;
        }
        if (align >= 2){
            // button and center
            this.size.margin[1] = (this.marginsPos.top - dif) / this.size.height;
        }

        this.def();
    }

    #defMargins = () => {
        this.marginsPos.left = this.size.margin[0] * this.size.width;
        this.marginsPos.top = this.size.margin[1] * this.size.height;
        this.marginsPos.right = this.size.margin[2] * this.size.width;
        this.marginsPos.bottom = this.size.margin[3] * this.size.height;
    }

    getSpace = () => {
        const meanRows = this.rows.l.reduce((a, b) => a + b, 0) / this.rows.l.length;
        return {
            "centre": {
                col: this.columns.l,
                row: meanRows
            },
            "gap": {
                col: (this.columns.l - (this.gapw / 2)),
                row: (meanRows - (this.gaph / 2))
            }

        }
    }

    #defVertical = () => {
        this.columns.y.top = -(this.size.height / 2) + this.marginsPos.top; //(this.marginsPos.top
        this.columns.y.bottom = (this.size.height / 2) - (this.marginsPos.bottom);

        const inc = (this.size.width - (this.marginsPos.left + this.marginsPos.right)) / this.v;
        let horizontalSpace = [];
        for (let i=0; i<this.v; i++) {
            horizontalSpace.push(inc);
        }
        this.columns.l = horizontalSpace;

        // start cod of x
        let x = -(this.size.width / 2) + this.marginsPos.left;

        for (let y = 0; y < (this.v + 1); y++) {
            // center ruler
            this.columns.center[y] = x + (inc * y);

            // gap
            this.columns.gap[y] = {};

            if (y > 0 && y < (this.v)) {
                this.columns.gap[y].right = this.columns.center[y] + (this.gapw / 2);
                this.columns.gap[y].left = this.columns.center[y] - (this.gapw / 2);
            } else {
                this.columns.gap[y].right = this.columns.center[y];
                this.columns.gap[y].left = this.columns.center[y];
            }
        }
    }

    defHorizontalUsingSize = (size) => {
        this.rows.x.left = -(this.size.width / 2) + this.marginsPos.left;
        this.rows.x.right = (this.size.width / 2) - this.marginsPos.right;
        const inc = size;
        this.rows.l = inc;
        let y = -(this.size.height / 2) + this.marginsPos.top;
        for (let x = 0; x < (this.h + 1); x++) {
            // center rulers
            this.rows.center[x] = y + (inc * x);
            // gap
            this.rows.gap[x] = {};
            if (x > 0 && x < (this.h)) {
                this.rows.gap[x].bottom = this.rows.center[x] + (this.gaph / 2);
                this.rows.gap[x].top = this.rows.center[x] - (this.gaph / 2);
            } else {
                this.rows.gap[x].bottom = this.rows.center[x];
                this.rows.gap[x].top = this.rows.center[x];
            }
        }
    }

    #defHorizontal = () => {
        // horizontal margins
        this.rows.x.left = -(this.size.width / 2) + this.marginsPos.left;
        this.rows.x.right = (this.size.width / 2) - this.marginsPos.right;
        const inc = (this.size.height - (this.marginsPos.top + this.marginsPos.bottom)) / this.h;
        if (this.verticalSpace === null || this.verticalSpace.length !== this.h || this.regular) {
            this.verticalSpace = [];
            for (let i = 0; i < this.h; i++) {
                this.verticalSpace.push(inc);
            }
        }
        this.rows.l = this.verticalSpace;
        let y = -(this.size.height / 2) + this.marginsPos.top;
        let value = 0;
        for (let x = 0; x < (this.h + 1); x++) {
            // center rulers
            if (isNaN(value)) value = 0;
            this.rows.center[x] = y + value;
            if (x > this.h) {
                value += parseInt(this.rows.l[x - 1]);
            } else {
                value += parseInt(this.rows.l[x]);
            }
            // gap
            this.rows.gap[x] = {};
            if (x > 0 && x < (this.h)) {
                this.rows.gap[x].bottom = this.rows.center[x] + (this.gaph / 2);
                this.rows.gap[x].top = this.rows.center[x] - (this.gaph / 2);
            } else {
                this.rows.gap[x].bottom = this.rows.center[x];
                this.rows.gap[x].top = this.rows.center[x];
            }
        }
    }

    col = (n, center = false) => {
        if (n < (this.v + 1) && n >= 0) {
            if (center) {
                return this.columns.center[n];
            } else {
                return this.columns.gap[n].right;
            }
        }
        console.error(`this col dod not exists in grid. requested number ${n}`);
        return 0;
    }

    row = (n, center = false) => {
        if (n < (this.h + 1) && n >= 0) {
            if (center) {
                return this.rows.center[n];
            } else {
                return this.rows.gap[n].top;
            }
        }
        console.error(`this row do not exists in grid. requested number ${n}`);
        return 0;
    }

    getAvailableWidth = (margins = true) => {
        if (margins) {
            let availableWidth = this.size.width - (this.size.width * this.size.margin[0]) - (this.size.width * this.size.margin[2]);
            return availableWidth;
        } else {
            return this.size.width;
        }
    }

    width = (n, center = false, inMargin = false) => {
        if (n < (this.v + 1) && n > 0) {
            if (center) {
                return (this.columns.l * n);
            } else {
                if (n === (this.v)) {
                    return (this.columns.l * n);
                } else if (inMargin) {
                    return (this.columns.l * n) - (this.gapw / 2);
                }

                return (this.columns.l * n) - (this.gapw);
            }
        }

        console.error(`side bigger than grid. requested side ${n}`);
        return 0;
    }

    height = (n, center = false, inMargin = false) => {
        if (n < (this.h + 1) && n > 0) {
            if (center) {
                return (this.rows.l * n);
            } else {
                if (n === (this.h)) {
                    return (this.rows.l * n);
                } else if (inMargin) {
                    return (this.rows.l * n) - (this.gaph / 2);
                }

                return (this.rows.l * n) - (this.gaph);
            }
        }

        console.error(`side bigger than row grid. requested side ${n}`);
        return 0;
    }

    display = (pg, margins = true, cols = true, rows = true) => {
        pg.push();
        pg.translate(this.size.width/2, this.size.height/2);
        // columns
        if (cols) this.#displayCols(pg);
        // rows
        if (rows) this.#displayRows(pg);
        // display margins
        if (margins) this.#displayMargins(pg);
        pg.pop();
    }

    #displayMargins = (pg, c = '#0000ff') => {
        pg.push();
        pg.stroke(c);
        pg.rectMode(CORNER);
        pg.noFill();
        /*pg.rect(
            this.rows.x.left,
            this.columns.y.top,
            (this.size.width - (this.marginsPos.left + this.marginsPos.right)),
            (this.size.height - (this.marginsPos.top + this.marginsPos.bottom))
        );*/
        pg.rect(
            this.rows.x.left,
            this.columns.y.top,
            (this.size.width - (this.marginsPos.left + this.marginsPos.right)),
            (this.size.height - (this.marginsPos.top + this.marginsPos.bottom))
        );
        pg.pop();
    }

    #displayCols = (pg, ccenter = '#ff00ff', cgap = '#009800') => {
        pg.push();
        pg.stroke(ccenter);
        for (let key of Object.keys(this.columns.center)) {
            const col = this.columns.center[key];
            pg.line(col, this.columns.y.top, col, this.columns.y.bottom);
        }
        pg.stroke(cgap);
        for (let key of Object.keys(this.columns.gap)) {
            const col = this.columns.gap[key];
            if (key !== '0' && key !== "" + this.v) {
                pg.line(col.left, this.columns.y.top, col.left, this.columns.y.bottom);
                pg.line(col.right, this.columns.y.top, col.right, this.columns.y.bottom);
            }
        }
        pg.pop();
    }

    #displayRows = (pg, ccenter = '#ff00ff', cgap = '#009800') => {
        pg.push();
        pg.stroke(ccenter);

        for (let key of Object.keys(this.rows.center)) {
            const row = this.rows.center[key];
            pg.line(this.rows.x.left, row, this.rows.x.right, row);
        }
        pg.stroke(cgap);
        for (let key of Object.keys(this.rows.gap)) {
            key = parseInt(key);
            const row = this.rows.gap[key];
            if (key !== 0 && key !== this.h) {
                pg.text(key, this.rows.x.left+this.rows.x.right/2, row.top)
                pg.line(this.rows.x.left, row.top, this.rows.x.right, row.top);
                pg.line(this.rows.x.left, row.bottom, this.rows.x.right, row.bottom);
            }
        }
        pg.pop();
    }

}

export default Poster;