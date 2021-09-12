const todoService = require("../services/todo");

const getTodos = async (req, res, next) => {
  const { user } = req;

  await todoService
    .getTodos(user)
    .then((todos) => {
      res.json({ todos, total_count: todos.length });
    })
    .catch((err) => {
      next(err);
    });
};

const getTodo = async (req, res, next) => {
  const { user } = req;
  const { todoId } = req.params;

  await todoService
    .getTodo(user, todoId)
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      next(err);
    });
};

const createTodo = async (req, res, next) => {
  const { user } = req;
  const body = req.body;

  await todoService
    .createTodo(user, body)
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      next(err);
    });
};

const updateTodo = async (req, res, next) => {
  const { user } = req;
  const { todoId } = req.params;
  const body = req.body;

  await todoService
    .updateTodo(user, todoId, body)
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteTodo = async (req, res, next) => {
  const { user } = req;
  const { todoId } = req.params;

  await todoService
    .deleteTodo(user, todoId)
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
