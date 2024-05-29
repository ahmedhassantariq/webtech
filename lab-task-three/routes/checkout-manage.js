let express = require("express");
let router = express.Router();
const Checkout = require("../models/Checkout");

router.get("/delete/:id", async (req, res) => {
    let checkout = await Checkout.findByIdAndDelete(req.params.id);
    return res.redirect("/checkout-manage");
  });


router.get("/", async (req, res) => {
    let checkouts = await Checkout.find();
    return res.render("checkout/checkout-manage", {
      checkouts
    });
  });
  
  module.exports = router;