const TYPEFACES = {
    Amstelvar: {
        leading: 1.05,
        tags: [`serif`],
        axes: [`wght`, `wdth`],
        url: `https://github.com/googlefonts/amstelvar`
    },
    Anybody: {
        leading: 1.05,
        tags: [`sans-serif`, `90s`, `europe`],
        axes: [`wght`, `wdth`],
        url: `https://github.com/Etcetera-Type-Co/Anybody`,
    },
    Barlow: {
        leading: 1.05,
        tags: [`sans-serif`, `gothic`, `monoline`, `neo-grotesque`],
        axes: [`wght`, `wdth`],
        url: `https://tribby.com/fonts/barlow/`,
    },
    Cabin: {
        leading: 1.05,
        tags: [`sans-serif`, `gothic`, `soft-corners`],
        axes: [`wght`],
        url: `https://fonts.google.com/specimen/Cabin`,
    },
    Emberly: {
        leading: 1.05,
        tags: [`serif`, `didone`],
        axes: [`wght`, `wdth`],
        url: `https://www.behance.net/gallery/87667103/Emberly-Free-Typeface-54-Styles`,
    },
    Epilogue: {
        leading: 1.05,
        tags: [`sans-serif`],
        axes: [`wght`, `wdth`],
        url: `https://etceteratype.co/epilogue`,
    },
    IBMPlexSans: {
        leading: 1.05,
        tags: [`sans-serif`],
        axes: [`wght`, `wdth`],
        url: `https://fonts.google.com/specimen/IBM+Plex+Sans`,
    },
    Inconsolata: {
        leading: 1.05,
        tags: [`sans-serif`, `mono`],
        axes: [`wght`, `wdth`],
        url: `https://fonts.google.com/specimen/Inconsolata`,

    }
}

const COLOR = {
    MIN_CONTRAST: 2.5,
    MAX_COLOR_SCHEME_ATTEMPT: 200,
}


export default {
    typography: TYPEFACES !== undefined ? TYPEFACES : {},
    color: COLOR !== undefined ? COLOR : {}
}