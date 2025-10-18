import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../Contexts/ShopContext";
import "./CSS/Resend-verification.css";


export const ResendVerification = () => {
  const { url } = useContext(ShopContext);
  const location = useLocation();

  // prefill email if passed from login
  const [email, setEmail] = useState(location.state?.email || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      setPrefilled(true); // mark input as prefilled
    }
  }, [location.state]);

  const handleResend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${url}/resend-verification`, { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="resend-container">
      <h2>Resend Email Verification</h2>
      <form onSubmit={handleResend} className="resend-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          readOnly={prefilled}
        />
        <button
          type="submit"
          disabled={loading}
          className="resend-button"
        >
          {loading ? "Sending..." : "Resend Link"}
        </button>
      </form>
      {message && (
        <p
          className={`resend-message ${
            message.toLowerCase().includes("success")
              ? "success"
              : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};