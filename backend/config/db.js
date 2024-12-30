// config/db.js
const mongoose = require("mongoose");
// require("dotenv").config({ path: "../.env" });
require("dotenv").config();

const mURI = process.env.MONGO_URI;
console.log("uri key: ", mURI);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
