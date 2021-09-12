const express = require("express");
const authMiddleware = require("../middlewares/auth");
const todoRouter = require("./todo");
const userRouter = require("./user");
const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    message: "Ok",
    uptime: process.uptime(),
  });
});

router.use("/todos", authMiddleware, todoRouter);
router.use("/user", userRouter);

module.exports = router;
