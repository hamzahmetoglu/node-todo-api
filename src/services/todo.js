const HttpException = require("../exceptions/HttpException");
const todoModel = require("../models/todo");

const getTodos = () => {
  return new Promise(async (resolve, reject) => {
    await todoModel
      .find({ status: { $ne: "disabled" } })
      .then((todos) => {
        resolve(todos);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getTodo = (id) => {
  return new Promise(async (resolve, reject) => {
    await todoModel
      .findOne({ _id: id, status: { $ne: "disabled" } })
      .then((todo) => {
        if (todo) {
          resolve(todo);
        } else {
          reject(new HttpException(404, "Todo not found."));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const createTodo = (todo) => {
  return new Promise(async (resolve, reject) => {
    await todoModel({ task: todo.task })
      .save()
      .then((todo) => {
        resolve(todo);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateTodo = (todoId, data) => {
  return new Promise(async (resolve, reject) => {
    await todoModel
      .findOne({
        _id: todoId,
        status: { $ne: "deleted" },
      })
      .then(async (todo) => {
        if (todo) {
          if (data?.task) todo.task = data.task;
          if (data?.status) todo.status = data.status;

          await todo
            .save()
            .then((updatedTodo) => {
              resolve({ message: "Todo updated." });
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject(new HttpException(404, "Todo not found."));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteTodo = (todoId) => {
  return new Promise(async (resolve, reject) => {
    await todoModel
      .findOne({ _id: todoId, status: { $ne: "deleted" } })
      .then(async (todo) => {
        if (todo) {
          todo.status = "deleted";

          await todo
            .save()
            .then((deletedTodo) => {
              resolve({ message: "Todo deleted." });
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject(new HttpException(404, "Todo not found."));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
