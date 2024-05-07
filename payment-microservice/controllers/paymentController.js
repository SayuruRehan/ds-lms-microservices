const Payment = require("../models/paymentModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// Add Payment
const addPayment = async (req, res) => {
  console.log("add payment");
  const {amount, currency, products} = req.body;

  try {
    // Create a new Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product) => ({
        price_data: {
          currency,
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100, // amount in cents
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: "https://yourwebsite.com/success",
      cancel_url: "https://yourwebsite.com/cancel",
    });

    res.json({sessionId: session.id});
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .json({error: "An error occurred while creating checkout session"});
  }
};

// Get all Faculties
const getAllPayments = async (req, res) => {
  console.log("gget all payment");
};

// Get Payment by ID
const getPaymentById = async (req, res) => {
  console.log("get payment by id");
};

// Update Payment by ID
const updatePaymentById = async (req, res) => {
  console.log("update pyment by id");
};

// Delete Payment by ID
const deletePaymentById = async (req, res) => {
  console.log("delete payment");
};

module.exports = {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
