let express = require("express");
let router = express.Router();
const Product = require("../models/Product");


router.get("/book/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  let cart = req.cookies.cart;
  let visitedProducts = req.session.visitedProducts;
  
  if(!visitedProducts) req.session.visitedProducts = [];
  req.session.visitedProducts.push(product._id);
  let isAdded = false;
  if (!cart) cart = [];
  if(cart.some(item => item.id === req.params.id)){
    isAdded = true;
  }
  res.render("shop/product", { product, isAdded });
});


router.get("/clear-cart/", async (req, res) => {
  let cart = req.cookies.cart;
  if (cart) {
    cart = [];
  } else {
    return res.redirect("/cart");
  }

  res.cookie("cart", cart);
  return res.redirect("/cart");
});

router.get("/add-to-cart/:id", async (req, res) => {
  let cart = req.cookies.cart;
  let product = {"id":req.params.id,"qty":1}
  if (!cart) cart = [];
  const foundItem = cart.find(item => item.id === req.params.id);
  if (foundItem) {
      foundItem.qty += 1;
  } else {
      cart.push(product);
  }
    res.cookie("cart", cart);
  return res.redirect("/shop#list");
});

router.get("/inc-cart/:id", async (req, res) => {
  let cart = req.cookies.cart;
  let product = {"id":req.params.id,"qty":1}
  if (!cart) cart = [];
  const foundItem = cart.find(item => item.id === req.params.id);
  if (foundItem) {
      foundItem.qty += 1;
  } else {
      cart.push(product);
  }
    res.cookie("cart", cart);
  return res.redirect("/cart");
});

router.get("/dec-cart/:id", async (req, res) => {
  let cart = req.cookies.cart;
  let product = {"id":req.params.id,"qty":1}
  if (!cart) cart = [];
  const foundItem = cart.find(item => item.id === req.params.id);
  if (foundItem) {
    if(foundItem.qty<=1){
      cart = cart.filter(e => e.id !== req.params.id);
    } else{
      foundItem.qty -= 1;
    }
  }
    res.cookie("cart", cart);
  return res.redirect("/cart");
});



router.get("/book/add-to-cart/:id", async (req, res) => {
  let cart = req.cookies.cart;
  let product = {"id":req.params.id,"qty":1}
  if (!cart) cart = [];
  const foundItem = cart.find(item => item.id === req.params.id);
  if (foundItem) {
      foundItem.qty += 1;
  } else {
      cart.push(product);
  }
    res.cookie("cart", cart);
  return res.redirect("/shop/book/"+req.params.id);
});



router.get("/delete-from-cart/:id", async (req, res) => {
  let cart = req.cookies.cart;
  if (cart.length!=0){
    cart = cart.filter(e => e.id !== req.params.id);
    res.cookie("cart", cart);
  }
  return res.redirect("/cart");
});

router.get("/book/delete-from-cart/:id", async (req, res) => {
  let cart = req.cookies.cart;
  if (cart.length!=0){
    cart = cart.filter(e => e.id !== req.params.id);
    res.cookie("cart", cart);
  }
  return res.redirect("/shop/book/"+req.params.id);
});



router.post("/:page?", async (req, res) => {
  let page = req.params.page ? req.params.page : 1;
  let pageSize = 5;
  let skip = (page - 1) * pageSize;

  let products = await Product.find({title: { $regex:req.body.search, $options: 'i'} });
  let total = await Product.countDocuments({title: { $regex:req.body.search, $options: 'i'} });
  
  let totalPages = Math.ceil(total / pageSize);
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  return res.render("shop/shop", {
    products,
    page,
    pageSize,
    total,
    totalPages,
    cart
  });
});



router.get("/:page?", async (req, res) => {
  let page = req.params.page ? req.params.page : 1;
  let pageSize = 5;
  let skip = (page - 1) * pageSize;
  let total = await Product.countDocuments();
  let totalPages = Math.ceil(total / pageSize);
  let products = await Product.find().limit(pageSize).skip(skip);
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  return res.render("shop/shop", {
    products,
    page,
    pageSize,
    total,
    totalPages,
    cart
  });
});


module.exports = router;