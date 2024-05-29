let express = require("express");
let router = express.Router();
const Product = require("../models/Portfolio");
require('dotenv').config();
let multer = require('multer');
let path = require('path');
let cloudinary = require('cloudinary');

const upload = multer({ dest: 'uploads/' });

router.get("/new", (req, res) => {
    res.render("portfolio/new");
  });

  router.post("/new", upload.single('image'), async (req, res) => {

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
  
    let product = new Product(req.body);
      await product.save();
      return res.redirect("/portfolio-manage");
    
    });




  router.get("/edit/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    return res.render("portfolio/edit", { product });
  });
  
  router.post("/edit/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.description = req.body.description;
    await product.save();
    return res.redirect("/portfolio-manage");
  });


  router.get("/delete/:id", async (req, res) => {
    let product = await Product.findByIdAndDelete(req.params.id);
    return res.redirect("/portfolio-manage");
  });

  router.get("/", async (req, res) => {
    let products = await Product.find();
    return res.render("portfolio/portfolios-manage", {
      products
    });
  });
  
  module.exports = router;