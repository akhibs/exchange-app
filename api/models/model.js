const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  dateOfBirth: Date,
  country: String,
  phoneNumber: String,
  balance: Number,
  plan: String,
  profit: Number,
  mineStatus: String
});

const Model = mongoose.model("user", Schema);

module.exports = Model;
