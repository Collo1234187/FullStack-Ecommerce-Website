// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "order processing" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
  mpesaReceiptNumber: { type: String },
  amountPaid: { type: Number },
  checkoutRequestId: { type: String }
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
