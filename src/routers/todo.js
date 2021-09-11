const express = require("express");
const todoController = require("../controllers/todo");
const todoRouter = express.Router();

todoRouter.get("/", todoController.getTodos);
todoRouter.get("/:todoId", todoController.getTodo);
todoRouter.post("/", todoController.createTodo);
todoRouter.patch("/:todoId", todoController.updateTodo);
todoRouter.delete("/:todoId", todoController.deleteTodo);

module.exports = todoRouter;
