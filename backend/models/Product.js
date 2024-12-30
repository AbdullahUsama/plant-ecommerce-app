// models/Product.js
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  img: { type: String, required: true }, // New field for image URL
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
