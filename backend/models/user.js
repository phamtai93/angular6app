const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);

// test for commit
// test 2 for commit
// test 2.2 for commit
// test 2.3