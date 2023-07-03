import {Params} from "../Params.js";

class Poster {
    #showGrid = false;
    constructor(n, generation, params) {
        this.id = `${generation}-${n}`;
        this.n = n;
        this.generation = generation;


        // TODO: add to genotype
        this.textboxes = [];
        for (let sentence of params.sentences) {
            this.textboxes.push({
                "content": sentence,
                "weight": Math.round(100+Math.random()*800),
                "font-stretch": null, // "ultra-expanded"
                "alignment": Math.round(Math.random()*3),
                "size": Math.round(Params.typography.minSize + Math.random()*Params.typography.maxSize),
                "typeface": null,
                "color": params.typography.color.random ? color(random(255), random(255), random(255)) : color(params.typography.color.value),
                "uppercase": Math.random() > 0.5,
            });
        }



        this.globalProperties = {}


        const grid = new Grid(
            {
                width: params.size.width,
                height: params.size.height,
                margin: Params.visualisationGrid.posterMargins
            },
            2,
            params.sentences.length
        );
        
        this.#showGrid = params.display.grid;

        this.genotype = {
            grid: grid,
            size: {
                width: params.size.width,
                height: params.size.height
            },
            background: {
                style: 0,
                colors: [
                    params.background.color.random ? color(random(255), random(255), random(255)) : color(params.background.color.valueA),
                    params.background.color.random ? color(random(255), random(255), random(255)) : color(params.background.color.valueB)
                ]
            },
            typography: {
                color: params.typography.color.random ? color(random(255), random(255), random(255)) : color(params.typography.color.value),
                globalTextAlignment: params.typography.globalTextAlignment === 0 ? Math.round(1+Math.random()*2) : params.typography.globalTextAlignment
            }
        }
    }

    draw = (posX = 0, posY=0) => {
        push();

        const pg = createGraphics(this.genotype.size.width, this.genotype.size.height);

        pg.background(this.genotype.background.colors[0]);
        this.typeset(pg);

        const sideX = width / Math.floor(width/Params.visualisationGrid.width);
        const sideY = Params.visualisationGrid.height + Params.visualisationGrid.marginY;
        const x = posX * sideX + sideX/2;
        const y = posY * sideY + sideY/2;
        // translate (x, y);
        // rect(0,0, Params.visualisationGrid.width, Params.visualisationGrid.height);
        pg.textSize(10);
        pg.fill(0);
        pg.textAlign(CENTER, CENTER);
        pg.text(`${this.id}+${this.genotype.typography.globalTextAlignment}`, 20, 20)
        if (this.#showGrid) {
            this.genotype.grid.display(pg);
        }
        imageMode(CENTER);
        image(pg, x, y);
        pop();

    }

    typeset = (pg) => {
        pg.push();
        pg.textAlign(CENTER, CENTER);
        for (let i in this.textboxes) {
            const textbox = this.textboxes[i];
            pg.fill(textbox["color"]);
            pg.textSize(textbox["size"]);
            pg.text(textbox["content"],
                pg.width/2,
                pg.height/2 + Params.typography.maxSize * (i-this.textboxes.length/2)
            ); //(Params.visualisationGrid.width/this.textboxes.length)*(i-this.textboxes.length/2)
        }
        pg.pop();
    }

    toggleGrid = (show = null) => {
        if (show === null) {
            show = !this.#showGrid;
        }
        this.#showGrid = show;
    }
}

class Grid {
    //right, top, left, bottom
    constructor(size, v = 12, h = 24, gwper = .03, ghper = null) {
        if (ghper === null) {
            ghper = gwper;
        }
        this.pos = createVector(size.width/2,size.height/2);
        this.size = size;
        // this._size = Object.assign({}, size.margin);
        this.v = v;
        this.h = h;
        this.gapw = this.size.width * gwper;
        this.gaph = this.size.height * ghper;

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
            v: this.v,
            h: this.h,
            gapw: this.gapw,
            gaph: this.gaph,
            marginsPos: this.marginsPos,
            columns: this.columns,
            rows: this.rows
        }
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

    defineRow = (id, size) => {
        this.regular = false;
        const init = this.rows.l[id];
        this.rows.l[id] = size;
        const dif = (this.rows.l[id]-init);
        this.size.margin[3] -= dif;
        this.def();
    }

    #defMargins = () => {
        this.marginsPos.left = this.size.margin[0];
        this.marginsPos.top = this.size.margin[1];
        this.marginsPos.right = this.size.margin[2];
        this.marginsPos.bottom = this.size.margin[3];
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


        const inc = (this.size.width - (this.size.margin[0] + this.size.margin[2])) / this.v;
        this.columns.l = inc;

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
        const inc = (this.size.height - (this.size.margin[1] + this.size.margin[3])) / this.h;
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
        pg.translate(this.size.width/2, this.size.height/2);
        // columns
        if (cols) this.#displayCols(pg);
        // rows
        if (rows) this.#displayRows(pg);
        // display margins
        if (margins) this.#displayMargins(pg);
    }

    #displayMargins = (pg, c = '#0000ff') => {
        pg.push();
        pg.stroke(c);
        pg.rectMode(CORNER);
        pg.noFill();
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
                pg.line(this.rows.x.left, row.top, this.rows.x.right, row.top);
                pg.line(this.rows.x.left, row.bottom, this.rows.x.right, row.bottom);
            }
        }
        pg.pop();
    }
}

export default Poster;