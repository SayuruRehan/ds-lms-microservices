const express = require("express");
const router = express.Router();
const {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../controllers/paymentController");

// Routes for CRUD operations
router.post("/", addPayment);
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePaymentById);
router.delete("/:id", deletePaymentById);

module.exports = router;
