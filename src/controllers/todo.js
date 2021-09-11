const todoService = require("../services/todo");

const getTodos = async (req, res, next) => {
  await todoService
    .getTodos()
    .then((todos) => {
      res.json({ todos, total_count: todos.length });
    })
    .catch((err) => {
      next(err);
    });
};

const getTodo = async (req, res, next) => {
  const { todoId } = req.params;

  await todoService
    .getTodo(todoId)
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      next(err);
    });
};

const createTodo = async (req, res, next) => {
  await todoService
    .createTodo(req.body)
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      next(err);
    });
};

const updateTodo = async (req, res, next) => {
  const { todoId } = req.params;
  const body = req.body;

  await todoService
    .updateTodo(todoId, body)
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteTodo = async (req, res, next) => {
  const { todoId } = req.params;

  await todoService
    .deleteTodo(todoId)
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
