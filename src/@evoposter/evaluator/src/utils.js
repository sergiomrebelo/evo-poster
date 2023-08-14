export const map = (value, minA, maxA, minB, maxB) => {
    return minB + (maxB - minB) * ((value - minA) / (maxA - minA));
}

export const constraint = (value, min, max) => {
    return Math.min(max, Math.max(min, value));
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

export const arrUnique = (arr) => {
    return arr.filter((value, index, array) => array.indexOf(value) === index);
}

export const hexToRGB = (hex) => {
    if (hex["levels"]) {
        return {
            r: parseInt(hex["levels"][0]),
            g: parseInt(hex["levels"][1]),
            b: parseInt(hex["levels"][2])
        }
    }

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export const colorDistance = (a, b) => {
    return Math.sqrt(Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2));
}