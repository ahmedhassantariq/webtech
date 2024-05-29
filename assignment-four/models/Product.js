const mongoose = require("mongoose");

let productSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: BigInt
});
let Product = mongoose.model("Product", productSchema);
module.exports = Product;