const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config');
const mongoose = require('mongoose');
const todosController = require('./controllers/todo.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res, next) => {
  res.status(200).json({ name: 'simple-api' });
});

app.post('/todos', todosController.create);

app.get('/todos', todosController.findAll);

app.listen(PORT, err => {
  if (err) {
    throw err;
  }
  // eslint-disable-next-line no-console
  console.log(`api-server listening on port ${PORT}`);
});
