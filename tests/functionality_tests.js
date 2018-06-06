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
});
