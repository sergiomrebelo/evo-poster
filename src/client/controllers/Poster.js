import {Params} from "../Params.js";
import backgroundStyles from "./BackgroundStyles.js";

class Poster {
    #showGrid = false;
    #debug = true;
    constructor(n, generation, params) {
        this.id = `${generation}-${n}`;
        this.n = n;
        this.generation = generation;

        // define grid
        const grid = new Grid(
            {
                width: params.size.width,
                height: params.size.height,
                margin: params.size.margin
            },
            2,
            params.sentences.length
        );

        // define texboxes
        const textboxes = [];
        for (let sentence of params.sentences) {
            const selectedTypeface = Math.round(Math.random()*(params.typography.typefaces.length-1));
            let stretchDefaultParams = params.typography.typefaces[selectedTypeface]["stretch"]
                .replaceAll("%", "").split(" ").map(
                    (v) => {
                        if (isNaN(v)) {
                            v = 100;
                        }
                        return parseInt(v);
                    });

            if (stretchDefaultParams.length < 2) {
                stretchDefaultParams.push(100);
            }

            let weightDefaultParams = params.typography.typefaces[selectedTypeface]["weight"].split(" ").map((v) => parseInt(v));
            let selectedWeight = params.typography.weight.min+Math.round(Math.random()*(params.typography.weight.max));
            selectedWeight = Math.max(weightDefaultParams[0], Math.min(selectedWeight, weightDefaultParams[1]));

            let selectedStretch = params.typography.stretch.min+Math.round(Math.random()*(params.typography.stretch.max));
            selectedStretch = Math.max(stretchDefaultParams[0], Math.min(selectedStretch, stretchDefaultParams[1]));


            // define initial size
            let size = Math.round(grid.rows.l[0]);
            size += Math.round(-(size*Params.typography.range)+(Math.random()*(size*Params.typography.range)));
            size = Math.max(
                Math.round(params.size.height * Params.typography.minSize),
                Math.min(Math.round(params.size.height * Params.typography.maxSize), size)
            );

            let alignment = params.typography.textAlignment === 0 ?
                    Math.round(1+Math.random()*(Params.textAlignmentTbOptions.length-2)) :
                    params.typography.textAlignment;

            textboxes.push({
                "content": sentence,
                "weight": selectedWeight,
                "font-stretch": selectedStretch,
                "alignment": alignment,
                "size": size,
                "typeface": params.typography.typefaces[selectedTypeface].family,
                "color": params.typography.color.random ? color(random(255), random(255), random(255)) : color(params.typography.color.value),
                "uppercase": Math.random() > 0.5,
            });

        }

        // create genotype
        this.genotype = {
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
                    params.background.color.random ? color(random(255), random(255), random(255)) : color(params.background.color.valueA),
                    params.background.color.random ? color(random(255), random(255), random(255)) : color(params.background.color.valueB)
                ]
            },
            typography: {
                color: params.typography.color.random ? color(random(255), random(255), random(255)) : color(params.typography.color.value),
                verticalAlignment: params.typography.verticalAlignment === 0 ? Math.round(1+(Math.random()*Params.textAlignmentTbOptions.length-2)) : params.typography.verticalAlignment
            }
        }

        this.#showGrid = params.display.grid;
    }

    draw = async (posX = 0, posY=0) => {
        push();
        const pg = createGraphics(this.genotype.size.width, this.genotype.size.height);
        // pg.translate(-pg.width/2, -pg.height/2);

        // background styles
        backgroundStyles.solid(pg, this.genotype.background.colors[0]);

        // typesetting typography on poster
        await this.typeset(pg);

        // debug
        if (this.#debug) {
            pg.textSize(10);
            pg.fill(0);
            pg.text(`${this.id}+${this.genotype.typography.verticalAlignment}`, 20, 20);
        }

        if (this.#showGrid && this.#debug) {
            this.genotype.grid.display(pg);
        }

        // place graphics
        const sideX = width / Math.floor(width/Params.visualisationGrid.width);
        const sideY = this.genotype.grid.size.height + Params.visualisationGrid.marginY;
        const x = posX * sideX + sideX/2;
        const y = posY * sideY + sideY/2;
        imageMode(CENTER);
        image(pg, x, y);
        pop();

    }

    typeset = async(pg) => {
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
            // pg.textFont(tb["typeface"]);

            // TODO: weight and font-stretch
            ctx.font = `${tb["weight"]} ${getFontStretchName(tb['font-stretch'])} ${tb["size"]}px ${tb["typeface"]}`;
            drawingContext.font = `${tb["weight"]} ${getFontStretchName(tb['font-stretch'])} ${tb["size"]}px ${tb["typeface"]}`;
            console.log(ctx.font, drawingContext.font);
            let content = tb["uppercase"] === true ? tb["content"].toUpperCase() : tb["content"];
            pg.text(content, xPos, yPos);
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

class Grid {
    constructor(size, v = 12, h = 24, gwper = 0.03, ghper = null) {
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
                pg.text(key, this.rows.x.left+this.rows.x.right/2, row.top)
                pg.line(this.rows.x.left, row.top, this.rows.x.right, row.top);
                pg.line(this.rows.x.left, row.bottom, this.rows.x.right, row.bottom);
            }
        }
        pg.pop();
    }

}

export default Poster;