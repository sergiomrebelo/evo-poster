export const validateNumberInput = (value, defaultValue = 1) => {
    value = parseFloat(value.replace(",", "."));
    return isNaN(value) || value === undefined || value === null ? defaultValue : value;
}

export const swap = (arr, i, j) => {
    const tmp = arr[j];
    arr[j] = arr[i]
    arr[i] = tmp;
    return arr;
}

export const sumArr = (arr) => {
    return arr.reduce((partialSum, a) => partialSum + a, 0);
}

export const sus = (probs, max=1) => {
    const r = Math.random()*max;
    let c = 0;
    for (let i in probs) {
        c += probs[i];
        if (r < c) {
            return i;
        }
    }

}

export const shuffleArr = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default () => {
    console.log (`default export utils`);
}