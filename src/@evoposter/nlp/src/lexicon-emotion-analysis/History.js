export default class History {
    constructor(txt) {
        this.data = txt.split(' ').map((w,i ) => [w, i, false, [[w]]]);
        this.active = this.data;
    }

    updateMultiple = (previous, current = []) => {
        for (let tokens of previous) {
            for (let token of tokens.split(' ')) {
                for (const entry of this.data) {
                    if (entry[0] === token) {
                        entry[3].push(current);
                        if (current.length === 0) {
                            entry[2] = true;
                        }
                    }
                }
            }
        }
    }

    update = (previous, current = "") => {
        // remove space in the end if exist
        let word = previous.trim();
        current = current.trim();
        for (const entry of this.data) {
            if (entry[3][entry[3].length-1][0] === word) {
                entry[3].push(current.split(" "));
                if (current === "") {
                    entry[2] = true;
                }
                return true;
            }
        }
        return false;
    }

    remove = (previous) => {
        this.updateMultiple(previous, []);
    }

    getActive = () => {
        return this.data.filter(entry => entry[2] === false);
    }

    clean = () => {
        for (let entry of this.data) {
            let i = entry[3].length-1;
            let current = entry[3][i];
            if (current.length === 0 || current === '' || current === ' ' ) {
                entry[2] = true;
            }
        }
    }

    updateActivePos = (detected = [], processed, info, remove=false) => {
        this.active = this.getActive();
        const pos = this.pos(detected.map((v) => [v[0], v[1]]), processed);
        let counter = 0, indexCounter = 0;
        for (let entry of this.active) {
            let current = entry[3][entry[3].length-1];
            for (let j = 0; j<current.length; j++) {
                if (counter === pos[indexCounter]) {
                    if (remove === false) {
                        // replace the word by another
                        let n = [...entry[3][this.data[entry[1]][3].length - 1]];
                        n[j] = info[indexCounter];
                        entry[3].push(n);
                    } else {
                        // remove the word
                        entry[3].push(['']);
                        entry[2] = true;
                    }
                    indexCounter++;
                }
                counter++;
            }

        }
    }

    updateActive = (processed) => {
        this.clean();
        this.active = this.getActive();
        let counter = 0;
        for (let j = 0; j<this.active.length; j++) {
            const words = this.active[j][3][this.active[j][3].length-1];
            let update = [];
            for (let word of words) {
                if (word !== '') {
                    update.push (processed[counter]);
                    counter++;
                }
            }
            this.active[j][3].push(update);
        }
    }

    updateLemmas = (pLemmas = [], pTokens = []) => {
        this.active = this.getActive();
        let counter = 0;
        let _raw = [];

        for (let i=0; i<pLemmas.length; i++) {
            for (let j=0; j<pTokens[i].length; j++) {
                // for saving in history purposes
                // lemma, raw, position on sentences array
                _raw.push([pLemmas[i][j], pTokens[i][j], [i,j]]);
            }
        }

        let saved = [];

        for (let w = 0; w<_raw.length; w++) {
            let word = _raw[w];
            // DEBUG
            // console.log ("history", this.data[counter], "active", this.active[counter], "counter", counter);

            const entry = this.active[counter][3][this.active[counter][3].length - 1];
            if (entry.length === 1) {
                if (word[1] === entry[0]) {
                    // const id = this.active[counter][1];
                    this.active[counter][3].push([word[0]]);
                    counter++;
                } else if ((this.active.length-1) > (counter+1)) {
                    const next = counter + 1;
                    const nextEntry = this.active[next][3][this.active[next][3].length - 1];
                    if (nextEntry !== undefined && _raw[w+1] !== undefined) {
                        if (_raw[w+1][1] === nextEntry[0]) {
                            // const id = this.active[counter][1];
                            this.active[counter][3].push(saved);
                            saved = [];
                            counter++;
                        }
                    }
                }
            } else {
                saved.push(word[0]);
                if (saved.length === entry.length) {
                    this.active[counter][3].push(saved);
                    saved = [];
                    counter++;
                }
            }
        }

    }

    pos = (arr = [0,0], processed) => {
        const out = [];
        for (let a of arr) {
            let current = 0;
            if (a[0] === 0) {
                current = a[1];
            } else if (a[0] > 0) {
                for (let i=0; i<a[0]; i++) {
                    current += processed.sentences[i].tokens.length;
                }
                current += a[1];
            }
            out.push(current);
        }
        return out;
    }

    removeBasedOnMap = (map) => {
        this.active = this.getActive();
        let counter = 0;
        for (let entry of this.active) {
            let current = entry[3][entry[3].length-1];
            let toRemove = [];
            for (let word of current) {
                toRemove.push(map[counter]);
                counter++;
            }
            let arr = [];
            for (let index in toRemove) {
                const pos = toRemove[index];
                if (pos === true) {
                    arr.push(current[index]);
                }
            }
            entry[3].push(arr);
            if (arr.length === 0) {
                entry[2] = true;
            }
        }
    }

    log = () => {
        for (let entry of this.data) {
            console.log (`raw="${entry[0]}`, `deleted=${entry[2]}`, entry[3], `(length:${entry[3].length})}`);
            // console.log(`entry no. ${entry[1]}: {raw="${entry[0]}" deleted=${entry[2]} history=[${entry[3]}] (length:${entry[3].length})}`);
        }
    }

    get = () => {
        return this.data;
    }
}