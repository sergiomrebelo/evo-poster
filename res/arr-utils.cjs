const arrUtils = {
    mean: (arr) => [...arr].reduce((a, b) => a + b) / arr.length,
    max: (arr) => Math.max.apply(null, [...arr]),
    min: (arr) => Math.min.apply(null, [...arr]),
    range: (arr) => arrUtils.max(arr) - arrUtils.min(arr),
    midRange: (arr) => arr.range(arr) / 2,
    sum: (arr) => [...arr].reduce((a, b) => a + b),
    median: (arr) => {
        let a = [...arr];
        a.sort((a, b) => a - b);
        let mid = a.length / 2;
        return mid % 1 ? a[mid - 0.5] : (a[mid - 1] + a[mid]) / 2;
    },
    modes: (arr) => {
        if (!arr.length) return new Array(0);
        let modeMap = {},
            maxCount = 1,
            modes = [arr[0]];

        [...arr].forEach((val) => {
            if (!modeMap[val]) {
                modeMap[val] = 1;
            } else {
                modeMap[val] = modeMap[val] + 1
            }

            if (modeMap[val] > maxCount) {
                modes = [val];
                maxCount = modeMap[val];
            } else if (modeMap[val] === maxCount) {
                modes.push(val);
                maxCount = modeMap[val];
            }
        });

        return {
            map: modeMap,
            mode: {
                value: modes,
                count: maxCount
            }
        }
    },
    variance: (arr) => {
        let mean = arrUtils.mean(arr);
        return arrUtils.mean([...arr].map((num) => Math.pow(num - mean, 2)))
    },
    standardDeviation: (arr) => Math.sqrt(arrUtils.variance([...arr])),
    meanAbsoluteDeviation: (arr) => {
        let mean = arrUtils.mean(arr);
        return arrUtils.mean([...arr].map((num) => Math.abs(num - mean)));
    },
    zScores: (arr) => {
        let mean = arrUtils.mean(arr);
        let standardDeviation = arrUtils.standardDeviation(arr);
        return [...arr].map((num) => (num - mean) / standardDeviation);
    },
    sortFunction: (a, b) => {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    },
    compareSecondN: (a, b) => {
        if (a[1] === b[1]) {
            return 0;
        } else {
            return (a[1] < b[1]) ? -1 : 1;
        }
    },
    sortN: {
        sort1: (arr) => {
            return [...arr].sort(arrUtils.sortFunction)
        },
        sort2: (arr) => {
            return [...arr].sort(arrUtils.compareSecondN)
        },
    }
};

module.exports = {
    arrUtils
};