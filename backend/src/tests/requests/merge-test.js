import { polyfill }     from 'es6-promise';
import expect           from 'expect';
import chai             from 'chai';
import chaiHttp         from 'chai-http';
import server           from '../../server';

polyfill();
chai.use(chaiHttp);

/**
 * Test the server request GET '/merge/:id'
 **/

describe("Server requests", function () {
    describe("GET '/merge/:id'", function () {
        it("GET '/merge/1'", function (done) {
            this.timeout(15000);
            chai.request(server)
            .get('/merge/1')
            .end((err, res) => {
                expect(res.body.data).toBe("local file 1 remote file 1");
                done();
            })
        });
        it("GET '/merge/2'", function (done) {
            this.timeout(15000);
            chai.request(server)
                .get('/merge/2')
                .end((err, res) => {
                    expect(res.body.data).toBe("local file 2 remote file 2");
                    done();
                })
        });

    })
});

