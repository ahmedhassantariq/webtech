const express = require('express')
const mongoose = require('mongoose')
let server = express()
server.use(express.json())
server.set("view engine", "ejs")
server.use(express.urlencoded());
let cookieParser = require("cookie-parser");
let ejsLayouts = require("express-ejs-layouts");
let expressSession = require("express-session");
const config = require('config');

require('dotenv').config();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }

//middlewares
server.use(expressSession({ secret: "My Secret Key" }));
server.use(cookieParser());
server.use(ejsLayouts);
server.use(express.static("public"))
let mainMiddleware = require("./middlewares/main");
const adminAuthMiddleware = require('./middlewares/checkAdminAuth');
const userAuthMiddleware = require('./middlewares/checkUserAuth')

const Product = require('./models/Product')
server.use(mainMiddleware)


//Routes
server.use("/", require("./routes/home"));
server.use("/shop", require("./routes/products"));
server.use("/portfolio" ,require("./routes/portfolios"));
server.use("/contact-us", require("./routes/contact"));
server.use("/visited", require("./routes/visited"));

server.use("/checkout", userAuthMiddleware, require("./routes/checkout"));


//Managing Routes
server.use("/manage", adminAuthMiddleware ,require("./routes/manage"));
server.use("/portfolio-manage", adminAuthMiddleware ,require("./routes/portfolio-manage"));
server.use("/contact-manage", adminAuthMiddleware ,require("./routes/contact-manage"));
server.use("/checkout-manage", adminAuthMiddleware ,require("./routes/checkout-manage"));




server.use("/", require("./routes/auth"));



// server.get("/", async(req, res)=>{
//     res.render("homepage")
// })



server.get("/cart", async (req, res) => {
    let cart = req.cookies.cart;
    if (!cart) cart = [];
    // let products = await Product.find({ _id: { $in: cart } });
    let products = await Product.find({ _id: { $in: cart.map(item => item.id) } });
    res.render("cart", { products, cart });
  });



server.listen(4000, ()=>{
    console.log("Server started at localhost: 4000")
});



mongoose.connect("mongodb://localhost:27017/").then(
    () => {
        console.log("DB connected")
    }
).catch((err) =>{
    console.log("Unable to connect")
})