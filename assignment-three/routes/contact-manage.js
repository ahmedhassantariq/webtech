let express = require("express");
let router = express.Router();
const Contact = require("../models/Contact");

router.get("/delete/:id", async (req, res) => {
    let contact = await Contact.findByIdAndDelete(req.params.id);
    return res.redirect("/contact-manage");
  });


router.get("/", async (req, res) => {
    let contacts = await Contact.find();
    return res.render("contact-us/contact-us-manage", {
      contacts
    });
  });
  
  module.exports = router;