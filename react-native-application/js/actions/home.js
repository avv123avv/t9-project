import 'whatwg-fetch';
import { Alert } from 'react-native';
import type { Action } from '../types';

export const SET_DIGIT = 'SET_DIGIT';
export const SET_WORD = 'SET_WORD';

export function setDigit(digit:string):Action {
    return {
        type: SET_DIGIT,
        payload: digit,
    };
}

export function setWord(word:string):Action {
    console.log('setword', word);
    return {
        type: SET_WORD,
        payload: word,
    };
}

/**
 * Send digit number to server and wait for the response
 * @param digit
 * @param serverUrl
 * @returns {Promise<Promise<T>|Promise.<T>>}
 */
export async function sendDigit(digit, serverUrl) {
    return fetch(`${serverUrl}/t9/${digit}`)
    .then(response => {
        return response._bodyText;
    })
    .catch((err) => {
        console.info('sendDigit error:', err);
        Alert.alert('sendDigit error:', err.toString());
        return err;
    });
}