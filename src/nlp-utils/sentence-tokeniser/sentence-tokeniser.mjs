/**
 * Sentence Tokeniser
 * Sérgio M. Rebelo
 * CDV lab. (CMS, CISUC, Portugal)
 * srebelo[at]dei.uc.pt
 *
 * v1.0.0 August 2021 (as part of NLP_utils toolkit)
 * v1.1.0 December 2021 (as part of NLP_utils toolkit)
 * v1.2.1 January 2023 (as part of NLP_utils toolkit)
 * v1.3.0 January 2023
 */

import * as SentenceTokenizer from 'sbd';
import * as defaultParams from './data/default-line-split-params.json' assert { type: "json" };

const options = {
    "newline_boundaries" : true,
    "html_boundaries"    : true,
    "sanitize"           : false,
    "allowed_tags"       : false,
    "preserve_whitespace" : false,
    "abbreviations"      : null
};


const tokenizer = async (txt, params = defaultParams.default, sdbParams = options) => {
    if (txt === null || txt === undefined) throw new Error('Sentence not defined');
    let sentences = await SentenceTokenizer.sentences(txt, sdbParams);
    let res = [];
    await sentences.forEach((s) => {
        if ((s.length > params.MAX)) {
            let lineLength = 0;
            let lines = [];
            let i = 0;
            const tokens = s.split(" ");
            tokens.forEach ((word, j) => {
                if (tokens[j-1] === undefined) {
                    // ensure that the no error appears in first words
                    if (lineLength + word.length + 1 >= params.MAX) {
                        // if the word is bigger split
                        i++;
                        lineLength = 0;
                    } else {
                        lineLength++;
                    }
                }
                else if (tokens[j + params.ORPHANS_SIZE] === undefined) {
                    // avoid orphans
                    // always ensure that exists three (ORPHANS_SIZE+1) words in the last line.
                    lineLength ++;
                }
                else if (
                    lineLength + word.length + 1 >= params.MAX &&
                    (tokens[j-1].length > params.WIDOWS_SIZE || Math.random() > params.PROB_SPLIT_AGAINST_RULES)
                ) {
                    // avoid windows
                    // break the line if characters limit is achieved
                    // as well as the last word is not small than a threshold
                    i++;
                    lineLength = 0;
                } else if (
                    ((lineLength + word.length + 1 >= params.OPTIMAL) && (Math.random() > (params.PROB_SPLIT_AGAINST_RULES - params.PROB_SPLIT_AGAINST_RULES / 3))) &&
                    (word.length >= params.STOP_WORD_MIN_SIZE_IN_OPTIMAL || params.SPLIT_PUNT.includes(word[word.length - 1])) &&
                    (tokens[j-1].length > params.WIDOWS_SIZE || Math.random() > params.PROB_SPLIT_AGAINST_RULES)
                ) {
                    // split based on a optimal size and a random factor
                    // avoid windows
                    i++;
                    lineLength = 0;
                } else {
                    lineLength ++;
                }

                lines[i] = lines[i] || [];
                lines[i].push(word);
                lineLength += (word.length + 1);
            });

            res.push(lines.map((line) => {
                return line.join(" ");
            }));
        } else {
            res.push(s);
        }
    });
    return res;
}

export default tokenizer;