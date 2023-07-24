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

export default () => {
    console.log (`default export utils`);
}