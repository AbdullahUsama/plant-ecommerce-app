///////////////////////////////////////////////////////////////////////////////////////////
// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

const connectDB = require("./config/db");

// Import Routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const stripeRoutes = require("./routes/stripeRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Connect to MongoDB
connectDB();

// Use Routes
app.use(uploadRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(stripeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
