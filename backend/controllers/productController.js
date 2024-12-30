// controllers/productController.js
const Product = require("../models/Product");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// Get all products (alternative route)
const getAllProductsAlternative = async (req, res) => {
  try {
    const response = await Product.find();
    res.status(200).json(response);
  } catch (e) {
    console.log("Error: ", e);
    res
      .status(500)
      .json({ message: "Error fetching products", error: e.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, img } = req.body;
    if (!name || !description || !price || !category || !stock || !img) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      img,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getAllProductsAlternative,
  createProduct,
  updateProduct,
  deleteProduct,
};
