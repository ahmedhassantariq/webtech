let express = require("express");
let router = express.Router();
let User = require("../models/User");
let bcrypt = require('bcryptjs');
router.get("/register", (req, res) => {
  res.render("auth/register");
});
router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if(!user){
    var salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash
    let newUser = new User(req.body);
    await newUser.save();
    req.session.user = newUser;
    res.redirect("/");
  } else {
    res.redirect("/register");
  }
});
router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});
router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.redirect("/register");
  if (bcrypt.compareSync(req.body.password, user.password)) {
    // const token = user.generateAuthToken();
    // req.session.token = token;
    req.session.user = user;
    return res.redirect("/");
  } else{
    return res.redirect("/login");
  }
  
  
});
module.exports = router;