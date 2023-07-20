const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
});
const PRODUCT = model("product", productSchema);

module.exports = PRODUCT;
