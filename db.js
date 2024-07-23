const mongoose = require("mongoose");

//Define the MongoDb connection url
const mongoUrl = "mongodb://localhost:27017/userDB";

//set up MongoDB connection
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

db.on("connected", () => {
  //pre defined callback function when the connection is established
  console.log("Connected to MongoDB Server");
});

db.on("error", () => {
  //pre defined callback function when the connection fails
  console.error("MongoDb connection failed", err);
});

db.on("disconnected", () => {
  //pre defined callback function when the connection is disconnected
  console.log("Disconnected to MongoDB Server");
});

//Export the database connection for other modules to use

module.exports = db;
