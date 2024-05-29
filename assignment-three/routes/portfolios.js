let express = require("express");
let router = express.Router();
const Product = require("../models/Portfolio");



router.get("/:page?", async (req, res) => {
  let pageTitle = "List of All products";

  let page = req.params.page ? req.params.page : 1;
  let pageSize = 5;
  let skip = (page - 1) * pageSize;
  let total = await Product.countDocuments();
  let totalPages = Math.ceil(total / pageSize);
  let products = await Product.find().limit(pageSize).skip(skip);
  return res.render("portfolio/portfolio", {
    pageTitle,
    products,
    page,
    pageSize,
    total,
    totalPages,
  });
});


module.exports = router;