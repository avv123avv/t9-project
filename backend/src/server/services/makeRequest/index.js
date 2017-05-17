/**
 * Service to get the data from the remote file
 */
import { polyfill } from 'es6-promise';
import request      from 'axios';

polyfill();

/**
 * Make GET request by key to get the proper data
 * @param api - url to get the data
 * @returns {Promise|*|Promise<U>|Promise.<T>}
 */
function getRemoteFile(api) {
    return makeRequest({method:'get', api})
        .then((result) => {
            if (result.status === 200 && result.data) {
                return result.data;
            }
        })
        .catch((e) => { console.error(e)});

}

function makeRequest({method, data, api, id}) {
    return request[method](api + (id ? ('/' + id) : ''), data);
}

export {
    getRemoteFile
}