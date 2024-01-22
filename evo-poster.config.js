export const TYPEFACES = {
    Amstelvar: {
        leading: 1.05,
        tags: [`serif`],
        axes: [`wght`, `wdth`, `opsz`],
        url: `https://github.com/googlefonts/amstelvar`,
        category: `serif`,
        path: `./assets/Amstelvar-Roman[wdth,wght,opsz].ttf`,
        format: `truetype-variations`,
        weight: {
            min: 100,
            max: 900
        },
        stretch: {
            min: 50,
            max: 125,
        }
    },
    Anybody: {
        leading: 1.05,
        tags: [`sans-serif`, `90s`, `europe`],
        axes: [`wght`, `wdth`],
        url: `https://github.com/Etcetera-Type-Co/Anybody`,
        category: `sans-serif`,
    },
    Barlow: {
        leading: 1.05,
        tags: [`sans-serif`, `gothic`, `monoline`, `neo-grotesque`],
        axes: [`wght`, `wdth`],
        url: `https://tribby.com/fonts/barlow/`,
        category: `sans-serif`,
    },
    Cabin: {
        leading: 1.05,
        tags: [`sans-serif`, `gothic`, `soft-corners`],
        axes: [`wght`],
        url: `https://fonts.google.com/specimen/Cabin`,
        category: `sans-serif`,
    },
    Emberly: {
        leading: 1.05,
        tags: [`serif`, `didone`],
        axes: [`wght`, `wdth`],
        url: `https://www.behance.net/gallery/87667103/Emberly-Free-Typeface-54-Styles`,
        category: `serif`,
    },
    Epilogue: {
        leading: 1.05,
        tags: [`sans-serif`],
        axes: [`wght`, `wdth`],
        url: `https://etceteratype.co/epilogue`,
        category: `sans-serif`,
    },
    IBMPlexSans: {
        leading: 1.05,
        tags: [`sans-serif`],
        axes: [`wght`, `wdth`],
        url: `https://fonts.google.com/specimen/IBM+Plex+Sans`,
        category: `sans-serif`,
    },
    Inconsolata: {
        leading: 1.05,
        tags: [`sans-serif`, `mono`],
        axes: [`wght`, `wdth`],
        url: `https://fonts.google.com/specimen/Inconsolata`,
        category: `nonospace`,

    }
}
export const COLOR = {
    MIN_CONTRAST: 2.5,
    MAX_COLOR_SCHEME_ATTEMPT: 200,

    BACKGROUND: {
        AVAILABLE_STYLES: [ ["Random", 2], [`Solid`, 1], [`Gradient`,2], [`Triangle`,2]],
        DEFAULT_COLORS: [`#ffffff`, `#000000`]
    }
}
export const EVALUATION = {
    GLOBAL_WEIGHTS: {
        SEMANTICS: 0.5,
        AESTHETICS: 0.5
    },
    MODES: {
        SEMANTICS_VISUALS: `FIXED`
    },
    SEMANTICS_WEIGHTS: {
        EMPHASIS: 0.5,
        LAYOUT: 0.5,
        VISUALS: 0
    },
    AESTHETICS_WEIGHTS: {
        ALIGNMENT: 0.1,
        REGULARITY: 0.1,
        JUSTIFICATION: 0.3,
        TYPEFACE_PARING: 0.1,
        WHITE_BALANCE_FRACTION: 0.2,
        BALANCE: 0.2
    }
}
export const EVO = {
    POP_SIZE: 30,
    NO_GEN: 400,
    CROSSOVER_PROB: 0.9,
    MUTATION_PROB: 0.1,
    ELITE_SIZE: 1,
    SIZE_MUTATION_ADJUST: 1,
    TOURNAMENT_SIZE: 10
}
export const IBM_AVAILABLE_LANGUAGES = [
    'ar', 'bn', 'bs', 'bg', 'zh', 'hr', 'cs', 'da', 'nl', 'en',
    'et', 'fi', 'fr', 'de', 'el', 'gu', 'he', 'hi', 'hu', 'ga',
    'id', 'it', 'ja', 'ko', 'lv', 'lt', 'ms', 'ml', 'mt', 'ne',
    'nb', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'es', 'sv',
    'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy'
];
export const SIZE = {
    HEIGHT: 141,
    WIDTH: 100,
    MARGINS: [.05, .05, .05, .05],
}
export const TYPOGRAPHY = {
    DEFAULT_COLOR: `#000000`,
    RANGE: 0.05,
    SIZE: {
        MAX: 0.95,
        MIN: 0.08
    },
    TEXT_ALIGNMENT: {
        GLOBAL: [[`Random`],[`Top`],[`Middle`],["Bottom"]],
        TEXTBOXES: [[`Random`],[`LEFT`],[`CENTER`],[`RIGHT`]]
    }
}


// check if size is used

export default {
    typography: TYPOGRAPHY !== undefined ? TYPOGRAPHY : {},
    typefaces: TYPEFACES !== undefined ? TYPEFACES : {},
    color: COLOR !== undefined ? COLOR : {},
    size: SIZE !== undefined ? SIZE : {},
    evaluation: EVALUATION !== undefined ? EVALUATION : {},
    display: {
        GRID: true,
        MARGIN_Y: 10,
        VISIBLE_POSTERS: 30,
        AVAILABLE_LANGUAGES: IBM_AVAILABLE_LANGUAGES !== undefined ? IBM_AVAILABLE_LANGUAGES : [`en`],
        MAX_IMAGE_SIZE: 1024
    },
    evo: EVO !== undefined ? EVO : {},
    log: {
        SAVE_LOG: true,
        SAVE_IMAGES: `NO` // `GENERATION`, `END`, `BEST-GENERATION`, `NO`
    }
}