export const validateNumberInput = (value, defaultValue = 1) => {
    value = parseFloat(value.replace(",", "."));
    return isNaN(value) || value === undefined || value === null ? defaultValue : value;
}

export default () => {
    console.log (`default export utils`);
}