const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../server.js');

const request = supertest(app);

describe('Todo integration testing', () => {
  describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request.get('/todos')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.be.empty;
          done();
        });
    });
  });
});
