const express = require("express"); // import express module
const app = express(); // create an instance of express app
const db = require("./db"); //import the database connection
const userRoutes = require("./routes/user"); //import the user routes
const menuRoutes = require("./routes/menu"); //import the menu routes
require("dotenv").config(); // import environment variables from.env file
const passport = require("./auth"); // import passport middleware

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

//Middleware function to log requests
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request: ${req.url}`);
  next();
};

app.use(logRequest); // it will run before any route middleware

// app.get("/", logRequest, function (req, res) {
//   // it will run after logRequest middleware
//   res.send("Hello World");
// });

app.use(passport.initialize());

const localAuthorization = passport.authenticate("local", { session: false });
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/user", localAuthorization, userRoutes);
app.use("/menu", localAuthorization, menuRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
}); // port no
