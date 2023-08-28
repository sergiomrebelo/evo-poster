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

    static availableTypefacesInfo = {
        'Amstelvar':{
            leading: 1.05
        }, 'Anybody':{
            leading: 1.05
        }, 'Barlow':{
            leading: 1.05
        }, 'Cabin':{
            leading: 1.05
        }, 'Emberly':{
            leading: 1.05
        }, 'Epilogue':{
            leading: 1.05
        }, 'IBMPlexSans':{
            leading: 1.05
        }, 'Inconsolata':{
            leading: 1.05
        }
    }

    static visualisationGrid = {
        height: 423,
        width: 300,
        marginY: 20,
        posterMargins: [.05, .05, .05, .05],
    }

    static imageMaxSize = 1024;

    static evolution = {
        popSize: 20,
        noGen: 400,
        crossoverProb: 0.75,
        mutationProb: 0.30,
        eliteSize: 1
    }

    static visiblePosters = 10;



    static backgroundStyleOptions = [ [`Random`,0], [`Solid`, 1], [`Gradient`,2], [`Triangle`,2]];
    static textAlignmentOptions = [ [`Random`], [`Top`], [`Middle`],  ["Bottom"]];
    static textAlignmentTbOptions = [ [`Random`], [`LEFT`], [`CENTER`],  [`RIGHT`]];

    static typography = {
        defaultColor: `#000000`,
        range: 0.05,
        maxSize: 0.95,
        minSize: 0.05
    }

    static background = {
        availableStyles: [ ["Random", 2], [`Solid`, 1], [`Gradient`,2], [`Triangle`,2]],
        defaultColors: [`#ffffff`, `#000000`]
    };
}