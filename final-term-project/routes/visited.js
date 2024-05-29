let express = require("express");
const Product = require("../models/Product");
let router = express.Router();

router.get("/", async (req, res) => {
    let visitedProducts = req.session.visitedProducts;
    if(!visitedProducts) visitedProducts = [];
    let products = await Product.find();

    filter = [];

    for(let index=0;index<visitedProducts.length; index++){
        if(products[index]._id==visitedProducts[index]){
            filter.push(products[index]);
            // console.log(products[index]);
        }
    }
    visitedProducts = filter;

    return res.render("visited", {
        visitedProducts,
    });
  });
  
  module.exports = router;