export const map = (value, minA, maxA, minB, maxB) => {
    return minB + (maxB - minB) * ((value - minA) / (maxA - minA));
}

export const constraint = (value, min, max) => {
    return Math.min (max, Math.max(min, value));
}

export const arrMean = (arr) => {
    const sum = arr.reduce((a, b) => a + b, 0);
    return (sum / arr.length) || 0;
}

export const arrSum = (arr) => {
    return arr.reduce((partialSum, a) => partialSum + a, 0);
}

export const arrMax = (arr) => {
    return Math.max(...arr);
}

export const arrMin = (arr) => {
    return Math.min(...arr);
}