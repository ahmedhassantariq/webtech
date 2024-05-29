let express = require("express");
let router = express.Router();
const Product = require("../models/Product");


router.get("/", async (req, res) => {
    let products = await Product.find();
    featuredProducts = [];
    let cart = req.cookies.cart;
    if (!cart) cart = [];
    products.forEach(element => {
        if(element.isFeatured == true){
            featuredProducts.push(element);
        }
    }
);
console.log(products);

    return res.render("homepage", {
      featuredProducts,
      cart
    });
  });

module.exports = router;