const Payment = require("../models/paymentModel");
const stripe = require("stripe")("your_stripe_secret_key");

// Add Payment
const addPayment = async (req, res) => {
  console.log("add payment");
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
