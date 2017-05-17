/**
 * Routes for express app
 */
import { controllers}  from '../db';
import express         from 'express';

const main   = controllers && controllers.main;

export default (app) => {
    // main controller
    if (main) {
        app.get('/t9/:number', main.t9);
    } else {
        console.warn('main route not supported!');
    }
};
