let express = require("express");
let router = express.Router();
const Product = require("../models/Product");
let cloudinary = require('cloudinary');
let path = require('path');
require('dotenv').config();
let multer = require('multer');


const upload = multer({ dest: 'uploads/' });





router.get("/new", (req, res) => {
    res.render("shop/new");
  });
  
  router.post("/new", upload.single('image'), async (req, res) => {
    if(req.file.path){
  const absolutePath = path.resolve(req.file.path);
    cloudinary.config({ 
      cloud_name: "dotoflny3", 
      api_key: process.env.API_KEY, 
      api_secret: process.env.CLOUDINARY_API_KEY
  });
  const uploadResult = await cloudinary.uploader.upload(absolutePath).catch((error)=>{console.log(error)});
  if(uploadResult){
    req.body.image = uploadResult.url;
  }
  if(req.body.isFeatured == "on"){
    req.body.isFeatured = true;
  } else {
    req.body.isFeatured = false;
  }
  let product = new Product(req.body);
    await product.save();

    }
    return res.redirect("/manage");
  
  });

  router.get("/edit/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    return res.render("shop/edit", { product });
  });
  
  router.post("/edit/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    await product.save();
    return res.redirect("/manage");
  });


  router.get("/delete/:id", async (req, res) => {
    let product = await Product.findByIdAndDelete(req.params.id);
    return res.redirect("/manage");
  });

  router.get("/", async (req, res) => {
    let products = await Product.find();
    return res.render("shop/products-manage", {
      products
    });
  });
  
  module.exports = router;