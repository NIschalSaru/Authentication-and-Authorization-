// var _= require('lodash');
const express = require("express");
const app = express();
const db = require("./db");
const userRoutes = require("./routes/user");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
}); // port no
