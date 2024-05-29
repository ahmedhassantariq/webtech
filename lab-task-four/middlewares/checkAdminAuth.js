const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = async function (req, res, next) {
  // const token = req.session.token;
  // if (!token) return res.status(401).send('Access denied. No token provided.');
  // try {
  //   const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
  //   req.session.user = decoded; 
  //   next();
  // }
  // catch (ex) {
  //   res.status(400).send('Invalid token.');
  // }
    if (req.session.user && req.session.user.roles.includes("admin")) {
      next();
    } 
    else if(req.session.user) res.redirect("/");
    else res.redirect('/login');
  };