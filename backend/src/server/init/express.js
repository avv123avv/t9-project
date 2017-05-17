import express          from 'express';
import bodyParser       from 'body-parser';
import path             from 'path';
import flash            from 'express-flash';
import methodOverride   from 'method-override';
import gzip             from 'compression';
import helmet           from 'helmet';
import { DB_TYPE, ENV } from '../../config/env';

export default (app) => {
  app.set('port', (process.env.PORT || 3000));

  if (ENV === 'production') {
    app.use(gzip());
    // Secure your Express apps by setting various HTTP headers. Documentation: https://github.com/helmetjs/helmet
    app.use(helmet());
  }

  // app.use(bodyParser.json({limit: '512mb', type: 'application/json'}));
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());

  app.use(express.static(path.join(process.cwd(), 'public')));


  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log(`===>  Environment: ${ENV}`);
  console.log(`===>  Listening on port: ${app.get('port')}`);
  console.log(`===>  Using DB TYPE: ${DB_TYPE}`);
  if (ENV === 'production') {
    console.log('===> 🚦  Note: In order for authentication to work in production');
    console.log('===>           you will need a secure HTTPS connection');
  }
  console.log('--------------------------');

  app.use(flash());
};
