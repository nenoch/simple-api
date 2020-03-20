const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../server.js');
const request = supertest(app);
const dropCollections = require('./utils');

describe('Todo integration testing', () => {
  afterEach(async () => await dropCollections());
  
  describe('GET /todos', () => {
    it('should get all todos', done => {
      request.get('/todos').end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.be.empty;
        done();
      });
    });
  });

  describe('POST /todos', () => {
    it('should create a todo', done => {
      request
        .post('/todos')
        .send({ title: 'Test Title' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(201);
          expect(res.body.title).to.equal('Test Title');
          done();
        });
    });
  });
});
