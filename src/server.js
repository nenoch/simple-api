const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'simple-api';

const server = async () => {

  const mongoClient = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true
  });
  
  const db = mongoClient.db(MONGODB_DB);

  const app = express();
  app.use(bodyParser.json());

  app.use(
    (attachDb = (req, res, next) => {
      req.db = db;
      next();
    })
  );

  app.get('/', (req, res, next) => {
    res.status(200).json({ name: 'simple-api' });
  });
  
  app.use(require('./routes/todo'));

  // Error handling
  app.use((err, req, res, next) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    next(err);
  });

  app.listen(PORT, err => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log(`api-server listening on port ${PORT}`);
  });
};

server();
