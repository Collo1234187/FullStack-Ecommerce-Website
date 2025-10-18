import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../Contexts/ShopContext";
import './CSS/VerifyPayment.css';

const VerifyPayment = () => {
  const { orderId } = useParams();
  const { url, authToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const checkPayment = async () => {
      try {
        const token = authToken || localStorage.getItem("authToken");

        const response = await axios.get(`${url}/verifympesa/${orderId}`, {
          headers: { "auth-token": token },
        });

        if (response.data.success && response.data.paid) {
          setStatusMessage("Payment Successful! Redirecting to My Orders...");
          setTimeout(() => navigate("/myorders"), 3000);
        } else {
          setStatusMessage("Payment Pending or Failed. Redirecting to Homepage...");
          setTimeout(() => navigate("/"), 3000);
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        setStatusMessage("Error verifying payment. Redirecting to Homepage...");
        setTimeout(() => navigate("/"), 3000);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) checkPayment();
    else {
      setStatusMessage("Invalid payment request. Redirecting...");
      setLoading(false);
      setTimeout(() => navigate("/"), 3000);
    }
  }, [orderId, url, navigate, authToken]);

  return (
    <div className="verify">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="payment-message">
          <h2>{statusMessage}</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyPayment;
