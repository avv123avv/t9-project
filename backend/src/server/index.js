/**
 * Server entry point
 **/
import express          from 'express';
import webpack          from 'webpack';
import { isDebug }      from '../config/app';
import { connect }      from './db';
import initExpress      from './init/express';
import initRoutes       from './init/routes';


const app = express();

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();

if (isDebug) {
    // enable webpack hot module replacement
    const webpackDevMiddleware  = require('webpack-dev-middleware');
    const webpackHotMiddleware  = require('webpack-hot-middleware');
    const webpackConfig         = require('../webpack/webpack.config');
    const devBrowserConfig      = webpackConfig('browser');
    const compiler              = webpack(devBrowserConfig);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}

/*
 * Bootstrap application settings
 */
initExpress(app);

/*
 * REMOVE if you do not need any routes
 */
initRoutes(app);

app.listen(app.get('port'));

export default app;