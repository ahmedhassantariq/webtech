let express = require("express");
const Checkout = require("../models/Checkout");
let router = express.Router();


router.post("/", async (req, res) => {
    let checkout = new Checkout(req.body);
      let cart = req.cookies.cart;
      if (!cart) { 
          return res.redirect("/cart");
      } else if(cart.length == 0){
          return res.redirect("/cart");
      } else {
        checkout.cart = cart
        await checkout.save();
      }
      cart = [];
      res.cookie("cart", cart);
      return res.render("checkout/checkout-success"); 
    });


router.get("/", async (req, res) => {
    let cart = req.cookies.cart;
    if (!cart) { 
        return res.redirect("/cart");
    } else if(cart.length == 0){
        return res.redirect("/cart");
    }


  return res.render("checkout/checkout");
});

module.exports = router;