import { polyfill } from 'es6-promise';
import expect from 'expect';
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import server from '../../server';

polyfill();
chai.use(chaiHttp);
chai.should();
chai.use(chaiThings);

/**
 * Test the server request GET '/merge/:id'
 **/

describe('Server requests', () => {
    describe("GET '/t9/:number'", () => {
        it("GET '/t9/9673'", function (done) {
            this.timeout(15000);
            chai.request(server)
            .get('/t9/9673')
            .end((err, res) => {
                res.body.data.should.include.something.that.deep.equals('word');
                done();
            });
        });
        it("GET '/t9/832'", function (done) {
            this.timeout(15000);
            chai.request(server)
            .get('/t9/832')
            .end((err, res) => {
                res.body.data.should.include.something.that.deep.equals('tea');
                done();
            });
        });
    });
});

