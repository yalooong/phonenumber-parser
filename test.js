process.env.NODE_ENV = 'test';

// require dev-dependency
let chai = require('chai');
let chatHttp = require('chai-http');
let server = require('./server.js');
let should = chai.should();

chai.use(chatHttp);

// Test /GET root request
describe('local host root /', () => {
    it("should send back status 200", (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

// Test /GET phone number request
describe('parse phone number /parse/text/string', () => {
    it("should send back ['(647) 890-2134']", (done) => {
        chai.request(server)
            .get('/api/phonenumbers/parse/text/asidifs647-890%202134edf')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});