// controllers/stripeController.js
const stripe = require("stripe")(
  "sk_test_51QWl3LEDlSfRh7kMa2x9zb35fkAigCNdNcN0NWsErYk5470kbvcDva96ADK3tT01S6DT0pfpJ5quBOfDY6PRfZ9b00QdOudqdb"
);

const createStripeSession = async (req, res) => {
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
};

module.exports = { createStripeSession };
