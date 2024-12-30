// routes/productRoutes.js
const express = require("express");
const {
  getAllProducts,
  getAllProductsAlternative,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/api/products", getAllProducts);
router.get("/get-all-products", getAllProductsAlternative);
router.post("/api/products", createProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);

module.exports = router;
