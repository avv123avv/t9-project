
import type { Action } from '../types';

export const SERVER_URL = 'SERVER_URL';

export function setServerUrl(serverUrl:string):Action {
  return {
    type: SERVER_URL,
    payload: serverUrl,
  };
}
