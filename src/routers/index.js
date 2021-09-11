const express = require("express");
const todoRouter = require("./todo");
const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    message: "Ok",
    uptime: process.uptime(),
  });
});

router.use("/todos", todoRouter);

module.exports = router;
