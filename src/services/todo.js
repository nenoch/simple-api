const Todo = require('../models/todo.js');

async function getTodos() {
  const todos = await Todo.find();
  return todos;
}

async function postTodo(todoData) {
  if (Object.keys(todoData).length === 0) {
    throw 'the body of the request can not be empty';
  }
  if (!todoData.title) {
    throw 'title is required';
  }
  const todo = new Todo({
    title: todoData.title || 'Untitled Note',
    completed: todoData.completed || false
  });

  todo.save();
  return todo;
}

module.exports.getTodos = getTodos;
module.exports.postTodo = postTodo;
