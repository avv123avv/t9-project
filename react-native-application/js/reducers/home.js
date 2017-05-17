
import type { Action } from '../actions/types';
import { SET_WORD, SET_DIGIT } from '../actions/home';

export type State = {
    name: string
}

const initialState = {
  word: [],
  digit: [],
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_DIGIT) {
    return {
      ...state,
      digit: action.payload,
    };
  } else if (action.type === SET_WORD) {
    console.log('word',action.payload);
    return {
      ...state,
      word: action.payload,
    };
  }
  return state;
}
