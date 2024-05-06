const Payment = require("../models/paymentModel");

// Add Payment
const addPayment = async (req, res) => {
  console.log("add payment");
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
