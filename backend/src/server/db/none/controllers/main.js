import { polyfill }                 from 'es6-promise';
import Validator                    from 'validator';
import fs                           from 'fs-promise';

import * as makeRequest             from '../../../services/makeRequest';
import * as mergeFiles              from '../../../services/mergeFiles';
import {remoteUrl1, remoteUrl2,
    localFile}                      from '../../../../config/app';


polyfill();

/**
 * POST /mergeRequest
 * Merge the data from local file and remote data in one and then - answer to the client
 * @param req
 * @param res
 */

export function mergeRequest(req, res) {
    let id = parseInt(req.params.id);
    if(id && (id == 1 || id == 2)) {
        //1) get local file
        fs.readFile(`${localFile}${id}.json`)
            .then((file1)=>{
                file1 = JSON.parse(file1.toString());
                //2) get remote file
                let api = (id == 1 ? remoteUrl1 : '') || (id == 2 ? remoteUrl2 : '');
                if(api != '') {
                    makeRequest.getRemoteFile(api)
                        .then((file2)=>{
                            if(file1 && file2 &&
                                file1.data && file2.data) {
                                //3) if all is ok - merge and return the file
                                return res.json({
                                    key     :id,
                                    data    :mergeFiles.mergeRequests(file1.data, file2.data)
                                });
                            }
                            return res.status(500).json('File1 or file2 format error!');
                        })
                        .catch((e) => {
                            res.status(500).json(e);
                        });
                } else
                    res.status(500).json('getRemoteFile error!');
            })
            .catch((e) => {
                res.status(500).json(e);
            });
    } else
        return res.status(500).send('Main.mergeRequest error!');
}

export default {
    mergeRequest
};