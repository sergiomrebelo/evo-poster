export class Params {
    /* TODO: create evo.config.js */
    static  availableLanguages = [
        'ar', 'bn', 'bs', 'bg', 'zh', 'hr', 'cs', 'da', 'nl', 'en',
        'et', 'fi', 'fr', 'de', 'el', 'gu', 'he', 'hi', 'hu', 'ga',
        'id', 'it', 'ja', 'ko', 'lv', 'lt', 'ms', 'ml', 'mt', 'ne',
        'nb', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'es', 'sv',
        'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy'
    ];

    static availableTypefaces = [
        'Amstelvar', 'Anybody', 'Barlow', 'Cabin', 'Emberly', 'Epilogue', 'IBMPlexSans', 'Inconsolata'
    ]

    static visualisationGrid = {
        height: 423,
        width: 300,
        marginY: 20,
        posterMargins: [.05, .05, .05, .05],
    }

    static imageMaxSize = 1024;

    static populationSize = 10;
    static visiblePosters = 10;

    static maxGenerations = 10;


    static backgroundStyleOptions = [ [`Random`,0], [`Solid`, 1], [`Gradient`,2], [`Triangle`,2]];
    static textAlignmentOptions = [ [`Random`], [`Top`], [`Middle`],  ["Bottom"]];
    static textAlignmentTbOptions = [ [`Random`], [`LEFT`], [`CENTER`],  [`RIGHT`]];

    static typography = {
        defaultColor: `#000000`,
        range: 0.1,
        maxSize: 0.95,
        minSize: 0.03
    }

    static background = {
        availableStyles: [ [`Solid`, 1], [`Gradient`,2], [`Triangle`,2]],
        defaultColors: [`#ffffff`, `#000000`]
    };
}