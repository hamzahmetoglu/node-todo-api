const HttpException = require("../exceptions/HttpException");
const todoModel = require("../models/todo");
const todoValidation = require("../validations/todo");

const getTodos = (user) => {
  return new Promise(async (resolve, reject) => {
    await todoModel
      .find({
        status: { $ne: "deleted" },
        $or: [{ created_by_id: user?.id }, { updated_by_id: user?.id }],
      })
      .then((todos) => {
        resolve(todos);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getTodo = (user, id) => {
  return new Promise(async (resolve, reject) => {
    await todoModel
      .findOne({
        _id: id,
        status: { $ne: "deleted" },
        $or: [{ created_by_id: user?.id }, { updated_by_id: user?.id }],
      })
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

const createTodo = (user, todoData) => {
  return new Promise(async (resolve, reject) => {
    await todoValidation.createTodo
      .validateAsync(todoData)
      .then(async (validatedTodoData) => {
        const newTodo = new todoModel({
          created_by_id: user?.id,
          ...validatedTodoData,
        });

        await newTodo
          .save()
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateTodo = (user, todoId, todoData) => {
  return new Promise(async (resolve, reject) => {
    await todoValidation.updateTodo
      .validateAsync(todoData)
      .then(async (validatedTodoData) => {
        await todoModel
          .findOne({
            _id: todoId,
            status: { $ne: "deleted" },
            $or: [{ created_by_id: user?.id }, { updated_by_id: user?.id }],
          })
          .then(async (todo) => {
            if (todo) {
              if (validatedTodoData?.task) todo.task = validatedTodoData.task;
              if (validatedTodoData?.status)
                todo.status = validatedTodoData.status;

              todo.updated_by_id = user.id;

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
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteTodo = (user, todoId) => {
  return new Promise(async (resolve, reject) => {
    await todoModel
      .findOne({
        _id: todoId,
        status: { $ne: "deleted" },
        $or: [{ created_by_id: user?.id }, { updated_by_id: user?.id }],
      })
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
