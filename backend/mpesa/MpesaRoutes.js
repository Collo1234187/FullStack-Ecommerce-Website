const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("./config");
const fetchUser = require("../middleware/fetchUser");
const mongoose = require("mongoose");

// Import order model
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "pending" },
  payment: { type: Boolean, default: false },
  checkoutRequestId: { type: String },
  mpesaReceiptNumber: String,
  amountPaid: Number,
  date: { type: Date, default: Date.now },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

const { consumerKey, consumerSecret, shortCode, passkey } = config;

// Get M-Pesa access token
const getAccessToken = async () => {
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const encodedCredentials = Buffer.from(
    consumerKey + ":" + consumerSecret
  ).toString("base64");
  const headers = { Authorization: "Basic " + encodedCredentials };
  const response = await axios.get(url, { headers });
  return response.data.access_token;
};

// ================= STK Push =================
router.post("/stkpush", fetchUser, async (req, res) => {
  try {
    //req.user is guaranteed from middleware
    const userId = req.user?.id;
    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });

    const { phone, amount, orderItems, address } = req.body;

    // Format phone
    let formattedPhone = phone;
    if (phone.startsWith("07")) formattedPhone = "254" + phone.slice(1);
    if (phone.startsWith("+254")) formattedPhone = phone.replace("+", "");

    // Get access token
    const token = await getAccessToken();

    // Generate password & timestamp
    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14);
    const password = Buffer.from(shortCode + passkey + timestamp).toString(
      "base64"
    );

    // STK Push request
    const stkURL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const headers = { Authorization: `Bearer ${token}` };
    const data = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: shortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: `${process.env.CALLBACK_URL}/api/mpesa/callback`,
      AccountReference: "E-Commerce",
      TransactionDesc: "E-Commerce Checkout",
    };

    // Send STK push
    const response = await axios.post(stkURL, data, { headers });
    const stkData = response.data;

    // Save order with checkoutRequestId
    const newOrder = new orderModel({
      userId,
      items: orderItems,
      amount,
      address,
      payment: false,
      checkoutRequestId: stkData.CheckoutRequestID,
      status: "pending",
    });

    await newOrder.save();

    res.json({
      success: true,
      message: "STK Push initiated successfully",
      order: newOrder,
      mpesaResponse: stkData,
    });
  } catch (error) {
    console.error(
      "STK Push error:",
      error.response?.data || error.message
    );
    res.status(500).json({ success: false, message: "Failed to initiate STK Push" });
  }
});

// ================= STK Callback =================
// routes/mpesa/MpesaRoutes.js
router.post("/callback", async (req, res) => {
  try {
    const callbackData = req.body;
    console.log("💡 Callback received:", JSON.stringify(callbackData, null, 2));

    // Extract the STK callback
    const stkCallback = callbackData.Body?.stkCallback;

    if (!stkCallback) {
      console.warn("⚠️ No stkCallback found in request body");
      return res.status(400).json({ success: false, message: "Invalid callback data" });
    }

    const checkoutRequestId = stkCallback.CheckoutRequestID;
    const resultCode = stkCallback.ResultCode;
    const resultDesc = stkCallback.ResultDesc;

    console.log(`CheckoutRequestID: ${checkoutRequestId}`);
    console.log(`ResultCode: ${resultCode}, ResultDesc: ${resultDesc}`);

    if (resultCode === 0) {
      // Payment successful
      const details = stkCallback.CallbackMetadata?.Item.reduce((acc, item) => {
        acc[item.Name] = item.Value;
        return acc;
      }, {});

      console.log("✅ Payment Details:", details);

      // Update order in DB
      const updatedOrder = await orderModel.findOneAndUpdate(
        { checkoutRequestId },
        {
          payment: true,
          status: "order processing",
          mpesaReceiptNumber: details.MpesaReceiptNumber,
          amountPaid: details.Amount,
          phoneNumber: details.PhoneNumber
        },
        { new: true }
      );

      if (updatedOrder) {
        console.log("🛒 Order updated successfully:", updatedOrder._id);
      } else {
        console.warn("⚠️ Order not found for this CheckoutRequestID:", checkoutRequestId);
      }
    } else {
      // Payment failed
      console.log("❌ Payment Failed:", resultDesc);

      // Optionally update order status to failed
      await orderModel.findOneAndUpdate(
        { checkoutRequestId },
        { status: "payment failed" }
      );
    }

    // Respond to M-Pesa to acknowledge receipt
    res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error("Callback processing error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================= Verify M-Pesa Payment =================
router.get("/verifympesa/:orderId", fetchUser, async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.orderId);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.json({
      success: true,
      paid: order.payment,
      status: order.status,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
