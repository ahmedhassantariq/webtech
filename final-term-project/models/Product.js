const mongoose = require("mongoose");

let productSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  isFeatured: Boolean,
  price: BigInt
});
let Product = mongoose.model("Product", productSchema);
module.exports = Product;