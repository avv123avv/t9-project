/**
 * Routes for express app
 */
import { controllers}  from '../db';
import express         from 'express';

const main   = controllers && controllers.main;

export default (app) => {
    // main controller
    if (main) {
        app.get('/merge/:id', main.mergeRequest)
    } else {
        console.warn('main route not supported!');
    }
};
