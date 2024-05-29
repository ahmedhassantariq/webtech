const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');
let userSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  roles: [],
});
userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
  return token;
}
let User = mongoose.model("User", userSchema);
module.exports = User;