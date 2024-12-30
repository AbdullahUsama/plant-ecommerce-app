// routes/stripeRoutes.js
const express = require("express");
const { createStripeSession } = require("../controllers/stripeController");

const router = express.Router();

router.post("/stripe-payout-session", createStripeSession);

module.exports = router;
