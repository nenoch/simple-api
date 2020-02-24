const express = require('express');
const TodosService = require('../services/todo');
const router = express.Router();

router.get('/todos', async (req, res, next) => {
  const { db } = req;
  const todosService = new TodosService(db);
  try {
    const todos = await todosService.getAllTodos()
    return res.status(200).json({ todos })
  }
  catch (err) {
    return next(err)
  }
});

router.post('/todos', async (req, res, next) => {
  const { db, body } = req;
  const todosService = new TodosService(db);
  try {
    const todo = await todosService.createTodo(body)
    return res.status(200).json({ todo })
  }
  catch (err) {
    return next(err)
  }
});

module.exports = router;
