module.exports = async function (req, res, next) {
    let cart = req.cookies.cart;
    // let visitedProducts = req.cookies.visitedProducts;
    if (!cart) cart = [];
    // if(!visitedProducts) visitedProducts = [];
    res.locals.cart = cart;

    // res.locals.visitedProducts = visitedProducts;
    // if(!req.visitedProducts) res.locals.visitedProducts = [];
    
    res.locals.user = req.session.user;
  
    next();
  };