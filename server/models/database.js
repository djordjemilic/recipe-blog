const mongoose = require("mongoose");

// Connecting to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Connection error
db.on("error", console.error.bind(console, "Connection error"));

// Succesfull connection
db.once("open", () => {
  console.log("Connected to database");
});

// Models
require("./Category");
require("./Recipe");
