const mongoose = require("mongoose");
let checkoutSchema = mongoose.Schema({
    name:String,
    email: String,
    phone: String,
    postal:String,
    address:String,
    cart: []
});

let Checkout = mongoose.model("Checkout", checkoutSchema);
module.exports = Checkout;