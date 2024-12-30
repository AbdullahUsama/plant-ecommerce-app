// controllers/orderController.js
const Order = require("../models/Order");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;
    if (!userId || !products || !totalAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const order = new Order({ userId, products, totalAmount });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

// Get orders by user ID
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user orders", error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
};
