import {config} from "dotenv";

config();

const express = require("express");
const stripe = require("stripe")("your_stripe_secret_key");

const app = express();
app.use(express.json());

// Route for processing payments
app.post("/payment", async (req, res) => {
  const {cardNumber, expMonth, expYear, cvc, amount, currency} = req.body;

  try {
    // Use Stripe to process payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method_data: {
        type: "card",
        card: {
          number: cardNumber,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvc,
        },
      },
    });

    // Payment success
    res.status(200).json({message: "Payment successful", paymentIntent});
  } catch (error) {
    console.error("Error processing payment:", error);
    res
      .status(500)
      .json({error: "An error occurred while processing your payment"});
  }
});

// Route for admin to view payments
app.get("/admin/payments", (req, res) => {
  // Implement logic to fetch and return payments
  res.status(200).json({message: "Admin view payments"});
});

const PORT = process.env.PAYMENT_PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
