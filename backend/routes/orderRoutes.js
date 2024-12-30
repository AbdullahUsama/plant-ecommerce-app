// routes/orderRoutes.js
const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrdersByUser,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/api/orders", createOrder);
router.get("/api/orders", getAllOrders);
router.get("/api/orders/:userId", getOrdersByUser);

module.exports = router;
