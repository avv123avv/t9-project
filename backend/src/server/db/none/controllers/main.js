import { polyfill } from 'es6-promise';
import Validator from 'validator';
import fs from 'fs-promise';

import * as getWords from '../../../services/getWords';

const wordlist = require('../../../static/files/english-words.json');

polyfill();

/**
 * GET /t9
 * @param req
 * @param res
 * @returns {Request}
 */
export function t9(req, res) {
    const number = parseInt(req.params.number);
    if (number) {
        const matches = getWords.makeT9(number, wordlist);
        return res.json({
            number,
            data: matches,
        });
    } else {
        return res.status(500).send('Main.t9 error!');
    }
}

export default {
    t9,
};
