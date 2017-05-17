/**
 * Use T9 to convert digits into words
 */
import t9 from 'super-t9';

function makeT9(number, words) {
    try {
        t9.setWordList('myWordList', 'array', words);
        const matches = t9.getWordsFromNumber(number, 'myWordList');
        return matches;
    } catch (err) {
        console.error('Services makeT9 error:', err);
        return [];
    }
}

export {
    makeT9,
};
