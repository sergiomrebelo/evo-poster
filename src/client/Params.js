export class Params {
    static  availableLanguages = [
        'ar', 'bn', 'bs', 'bg', 'zh', 'hr', 'cs', 'da', 'nl', 'en',
        'et', 'fi', 'fr', 'de', 'el', 'gu', 'he', 'hi', 'hu', 'ga',
        'id', 'it', 'ja', 'ko', 'lv', 'lt', 'ms', 'ml', 'mt', 'ne',
        'nb', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'es', 'sv',
        'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy'
    ];

    static visualisationGrid = {
        height: 282,
        width: 200,
        marginY: 20,
        posterMargins: [.02, .02, .02, .02],
    }

    static imageMaxSize = 1024;

    static populationSize = 10;
    static visiblePosters = 10;

    static maxGenerations = 10;


    static backgroundStyleOptions = [ [`Solid`, 1], [`Gradient`,2], [`Triangle`,2]];
    static textAlignmentOptions = [ [`Random`], [`Top`], [`Middle`],  ["Bottom"]];

    static typography = {
        defaultColor: `#ff0000`,
        maxSize: 60,
        minSize: 60
    }

    static background = {
        availableStyles: [ [`Solid`, 1], [`Gradient`,2], [`Triangle`,2]],
        defaultColors: [`#ffff00`, `#000000`]
    };
}