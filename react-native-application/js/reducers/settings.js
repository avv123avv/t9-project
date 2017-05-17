import type { Action } from '../actions/types';
import { SERVER_URL } from '../actions/settings';

export type State = {
    serverUrl: string,
    filePath: string,
}

const initialState = {
  serverUrl: 'http://localhost:3000',
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SERVER_URL) {
    return {
      ...state,
      serverUrl: action.payload,
    };
  }
  return state;
}
