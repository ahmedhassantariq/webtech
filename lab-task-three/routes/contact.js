let express = require("express");
let router = express.Router();
const Contact = require("../models/Contact");


router.post("/", async (req, res) => {
    let contact = new Contact(req.body);
      await contact.save();
      return res.redirect("/contact-us"); 
    });


router.get("/", async (req, res) => {
  return res.render("contact-us/contact-us");
});

module.exports = router;