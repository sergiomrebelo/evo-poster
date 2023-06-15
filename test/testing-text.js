/**
 * Testing Instances v300123
 *
 * text: text to testing
 * v: control number of this testing instance. The data when instance is created
 * sentenceNumber: number of resulting sentences
 * classification: obtained classification result
 * lexicon: obtained lexicon result (line and global)
 * meta : meta information about the quote [author, year, book, page]
 */


const data = [
    {
        text: "The feelings that hurt most, the emotions that sting most, are those that are absurd - The longing for impossible things, precisely because they are impossible; nostalgia for what never was; the desire for what could have been; regret over not being someone else; dissatisfaction with the world’s existence. All these half-tones of the soul’s consciousness create in us a painful landscape, an eternal sunset of what we are.",
        translation: null,
        v: 300123.1,
        sentenceNumber: 16,
        lang: "en",
        classification: ["sadness", 0.65],
        mostImportantPart: ["painful landscape, an eternal"],
        lines: [
            "The feelings that hurt",
            "most, the emotions that",
            "sting most, are those",
            "that are absurd - The longing",
            "for impossible things,",
            "precisely because they are impossible;",
            "nostalgia for what never",
            "was; the desire for what",
            "could have been; regret",
            "over not being someone",
            "else; dissatisfaction with",
            "the world’s existence.",
            "All these half-tones of the soul’s",
            "consciousness create in us a painful",
            "landscape, an eternal",
            "sunset of what we are."
        ],
        lexicon: {
            sentences: [
                ["fear", 0.69],
                ["neutral", 0],
                ["anger", 0.54],
                ["neutral", 0],
                ["sadness", 0.5],
                ["sadness", 0.5],
                ["neutral", 0],
                ["neutral", 0],
                ["neutral", 0],
                ["neutral", 0],
                ["joy", 0.65],
                ["neutral", 0],
                ["neutral", 0],
                ["sadness", 0.72],
                ["neutral", 0],
                ["neutral", 0]
            ],
            global: ["sadness", 2.41],
        },
        meta: ["Fernando Pessoa", null, "The Book of Disquiet", null]
    },
    {
        text: "El mundo era tan reciente, que muchas cosas carecían de nombre, y para mencionarlas había que señalarlas con el dedo",
        translation: "The world was so recent, that many things were lacking in name, and to mention them had to be pointed with the finger",
        v: 300123.1,
        sentenceNumber: 5,
        lang: "es",
        classification: ["neutral", 0],
        mostImportantPart: [],
        lines: [
            "The world was so recent,",
            "that many things were",
            "lacking in name, and to mention",
            "them had to be pointed",
            "with the finger"
        ],
        lexicon: {
            sentences: [
                ["neutral", 0],
                ["neutral", 0],
                ["neutral", 0],
                ["neutral", 0],
                ["neutral", 0]
            ],
            global: ["neutral", 0],
        },
        meta: ["Gabriel Garcia Márquez", 1967, "Cien años de soledad", null]
    },
    {
        text: "Éste es el final de la historia de los cuarenta y siete hombres leales —salvo que no tiene final, porque los otros hombres, que no somos leales tal vez, pero que nunca perderemos del todo la esperanza de serlo, seguiremos honrándolos con palabras.",
        translation: "This is the end of the story of the forty-seven loyal men-except that it has no end, because the other men, that we are not loyal perhaps, but that we will never lose out of all hope of being, will continue to honor them with words.",
        v: 300123.1,
        sentenceNumber: 9,
        lang: "es",
        classification: ["optimism", 0.78],
        mostImportantPart: ["honrándolos con palabras"],
        lines: [
            "This is the end of the story",
            "of the forty-seven loyal",
            "men-except that it has no end,",
            "because the other men,",
            "that we are not loyal",
            "perhaps, but that we will",
            "never lose out of all hope",
            "of being, will continue",
            "to honor them with words."
        ],
        lexicon: {
            sentences: [
                ["neutral", 0],
                ["trust", 0.75],
                ["neutral", 0],
                ["neutral", 0],
                ["trust", 0.75],
                ["neutral", 0],
                ["anticipation", 0.77],
                ["neutral", 0],
                ["trust", 1.32]
            ],
            global: ["trust", 3.5],
        },
        meta: ["Jorge Luis Borges", 1935, "Historia universal de la infamia", null]
    },
    {
        text: "En un instante descubrió los arañazos, los verdugones, las mataduras, las úlceras y cicatrices que había dejado en ella más de medio siglo de vida cotidiana, y comprobó que esos estragos no suscitaban en él ni siquiera un sentimiento de piedad. Hizo entonces un último esfuerzo para buscar en su corazón el sitio donde se le había podrido los afectos, y no pudo encontrarlo",
        translation: "In an instant he discovered the scratches, the verdugons, the matures, the ulcers and scars that he had left in it more than half a century of daily life, and he found that these havoc did not raise even a feeling of piety. He then made a last effort to search in his heart the place where the affections had been rotten, and he could not find it.",
        v: 300123.1,
        sentenceNumber: 13,
        lang: "es",
        classification: ["neutral", 0],
        mostImportantPart: ["las mataduras, las úlceras"],
        lines : [
            "In an instant he discovered",
            "the scratches, the verdugons,",
            "the matures, the ulcers",
            "and scars that he had left",
            "in it more than half a century",
            "of daily life, and he found",
            "that these havoc did not raise",
            "even a feeling of piety.",
            "He then made a last",
            "effort to search in his heart",
            "the place where the affections",
            "had been rotten, and he could",
            "not find it."
        ],
        lexicon: {
            sentences: [
                ["neutral", 0],
                ["neutral", 0],
                ["disgust", 0.63],
                ["sadness", 0.7],
                ["neutral", 0],
                ["joy", 0.7],
                ["fear", 0.72],
                ["neutral", 0],
                ["neutral", 0],
                ["joy", 0.55],
                ["neutral", 0],
                ["neutral", 0],
                ["neutral", 0]
            ],
            global: ["fear", 1.28],
        },
        meta: ["Gabriel Garcia Márquez", 1967, "Cien años de soledad", null]
    }
];

export default data;