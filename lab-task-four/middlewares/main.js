module.exports = async function (req, res, next) {
    let cart = req.cookies.cart;
    if (!cart) cart = [];
    res.locals.cart = cart;
    res.locals.user = req.session.user;
  
    next();
  };