let data = require('../data.json'),
    server = require('../app');

const chai = require('chai'),
      chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('Check functionality', () => {
  describe('Check datatypes in query', () => {
    it('Check if integer query parameters are allowed', (done) => {
      chai.request(server)
          .get('/api/movies/search?Year=1996')
          .then((res) => {
            return res.body.data;
          }).then((result) => {
            let res = data['movies'].filter(movie => movie['Year'] === 1996).slice(0, 10);
            result.should.be.eql(res);
            done();
          }).catch((err) => {
            console.log(err);
            done(err);
          });
      });

    it('Check if float query parameters are allowed', (done) => {
      chai.request(server)
          .get('/api/inventory/search?discount=13.1')
          .then((res) => {
            return res.body.data;
          }).then((result) => {
            let res = data['inventory'].filter(inv => inv['discount'] === 13.1);
            result.should.be.eql(res);
            done();
          }).catch((err) => {
            done(err);
          });
      });
  });
  // check if invalid page number results in error 400 and error message as {"error":"Invalid page number"}
  describe('Check invalid page numbers', () => {
    // check if page is 0
    it('Check page number 0', (done) => {
      chai.request(server)
        .get('/api/stocks?page=ab')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({ "error": "Invalid page number" });
          done();
        });
    });

    // check if page is -1
    it('Check page number -1', (done) => {
      chai.request(server)
        .get('/api/stocks?page=-1')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({ "error": "Invalid page number" });
          done();
        });
    });

    // check if page is NaN
    it('Check page number NaN', (done) => {
      chai.request(server)
        .get('/api/stocks?page=ab')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({ "error": "Invalid page number" });
          done();
        });
    });
  });
});
