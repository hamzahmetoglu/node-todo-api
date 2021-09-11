const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: "true",
});

mongoose.set("debug", true);

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("Database connected");
});

module.exports = mongoose;
