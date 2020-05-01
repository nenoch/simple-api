const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const todosController = require('./controllers/todo.js');
const daysController = require('./controllers/day.js');
const usersController = require('./controllers/user.js');

const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}`);
const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'DELETE',
    'PATCH'
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

mongoose.Promise = global.Promise;

mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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

app.post('/days', daysController.create);
app.get('/days', daysController.findAll);
app.delete('/days/:id', daysController.deleteById);
app.patch('/days/:id', daysController.patch);

app.post('/users', usersController.create);
app.post('/login', usersController.login);

app.listen(PORT, err => {
  if (err) {
    throw err;
  }
  // eslint-disable-next-line no-console
  console.log(`api-server listening on port ${PORT}`);
});

module.exports = app;
