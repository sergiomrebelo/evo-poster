export const ALIGNMENT = {
    "A": 10, // limit to the non-linear function
    "WEIGHTS": [.8, .2] // alignment parts weights
}

export const LEGIBILITY = {
    "MAX_CONSTRAINT": 1,
    "WHITE_SPACE_FACTOR": 3,
    "MODES": [`OVERSET`, `JUSTIFY`,`ATTEMPT_JUSTIFY`],
    "DEFAULT_MAX_LIMIT_SCALE": 1
}

export const REGULARITY = {
    "A": 10, // limit to the non-linear function
}

export const SEMANTICS_EMPHASIS = {
    "MIN_RANGE": 50,
    "THRESHOLD_VALID": 0.2,
    "MODES": [`DIF`, `MIN`]
}

export const SEMANTICS_VISUALS = {
    "MAX_COLOR_DISTANCE": 441.67
}

export const SEMANTICS_LAYOUT = {
    "MODES": [`RELATIVE`, `FIXED`]
}

export const TYPEFACE_PARING = {
    "MODES": [`BOTH`, `TYPE_FAMILY`, `CATEGORY`]
}

export const VISUAL_BALANCE = {
    "VISUAL_CENTER_FT": 20,
}

export const WHITE_SPACE_FRACTION = {
    "OPTIMAL": .5,
    "MIN_DISTANCE": 10
}


export default {
    "DEBUG": false,
}