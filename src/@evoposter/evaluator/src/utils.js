export const map = (value, minA, maxA, minB, maxB) => {
    return minB + (maxB - minB) * ((value - minA) / (maxA - minA));
}

export const arrMean = (arr) => {
    const sum = arr.reduce((a, b) => a + b, 0);
    return (sum / arr.length) || 0;
}