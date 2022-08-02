const mongoose = require("mongoose");

const connectDB = () => {
  const conn = mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to DB `.white.underline);
};

module.exports = connectDB;
