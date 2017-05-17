======================= t-9-backend development start===========================

To start the project:

1) npm i
2) npm run dev

All done, you can change code how you want - webpack will rebuild code automatically
and nodemon will restart after the rebuild.


================================== Tests =======================================

To create tests:

1) Use src/tests folder. Just create the folder which will contain files with *-test.js.
Webpack will grab all files with such extension and start tests using mocha.js.

2) To run tests: npm test


======================== t-9-backend production start===========================

To start the project in production:

1) To build and start using nodejs server: npm start
2) Just to build: npm build. Then you can use any node.js configuration to run the compiled
project from compiled/server.js