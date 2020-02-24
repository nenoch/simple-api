const todoService = require('../services/todo.js');

async function create(req, res) {
    try {
      const todo = await todoService.postTodo(req.body);
      return res.status(201).send(todo);
    } catch (err) {
      res.status(500).send({
        message: err || 'Some error occurred while creating a todo.'
      });
    }
  }

async function findAll(req, res) {
  try {
    const todos = await todoService.getTodos();
    return res.status(200).send(todos);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving todos.'
    });
  }
}

module.exports.findAll = findAll;
module.exports.create = create;

