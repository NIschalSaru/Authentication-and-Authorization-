const express = require("express");
const app = express();
const db = require("./db");
const userRoutes = require("./routes/user");

require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
}); // port no
