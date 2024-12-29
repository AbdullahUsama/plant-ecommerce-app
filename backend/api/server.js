const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const multer = require("multer");
const stripe = require("stripe")(
  "sk_test_51QWl3LEDlSfRh7kMa2x9zb35fkAigCNdNcN0NWsErYk5470kbvcDva96ADK3tT01S6DT0pfpJ5quBOfDY6PRfZ9b00QdOudqdb"
);
// dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// MongoDB connection

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  img: { type: String, required: true }, // New field for image URL
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const url = `http://localhost:5000/uploads/${file.filename}`;
    res.status(200).json({ url });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
});
app.use("/uploads", express.static("uploads"));

const Product = mongoose.model("Product", productSchema);

// Order Schema and Model
const orderSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

const Order = mongoose.model("Order", orderSchema);

// Product APIs
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

app.get("/get-all-products", async (req, res) => {
  try {
    const response = await Product.find();
    res.status(200).json(response);
  } catch (e) {
    console.log("Error: ", e);
    res
      .status(500)
      .json({ message: "Error fetching products", error: e.message });
  }
});

app.post("/stripe-payout-session", async (req, res) => {
  const { selectedItems, storeInventory } = req.body;

  try {
    // Convert storeInventory back to a Map
    const inventoryMap = new Map(storeInventory);

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: selectedItems.items.map((item) => {
        const storeItem = inventoryMap.get(item.id); // Fetch the store item from the inventory map
        if (!storeItem) {
          throw new Error(`Item with ID ${item.id} not found in inventory`);
        }
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: Math.round(storeItem.priceInCents / 2.8),
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:3000/success", // Adjust to your actual success URL
      cancel_url: "http://localhost:3000/cancel", // Adjust to your actual cancel URL
    });

    // Send the session URL back to the frontend
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/products", async (req, res) => {
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
});

app.put("/update-product/:id", async (req, res) => {
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
});

app.delete("/api/products/:id", async (req, res) => {
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
});

// Order APIs
app.post("/api/orders", async (req, res) => {
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
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

app.get("/api/orders/:userId", async (req, res) => {
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
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
