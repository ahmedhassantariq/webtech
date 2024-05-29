const mongoose = require("mongoose");

let portfolioSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String
});
let Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;