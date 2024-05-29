const mongoose = require("mongoose");

let contactSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  text: String
});
let Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;