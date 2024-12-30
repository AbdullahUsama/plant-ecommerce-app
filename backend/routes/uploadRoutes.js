// routes/uploadRoutes.js
const express = require("express");
const { uploadFile } = require("../controllers/uploadController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/api/upload", upload.single("file"), uploadFile);
router.use("/uploads", express.static("uploads"));

module.exports = router;
