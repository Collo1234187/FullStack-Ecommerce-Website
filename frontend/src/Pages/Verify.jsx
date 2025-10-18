import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../Contexts/ShopContext";
import { useContext } from "react";
import './CSS/Verify.css';

export const Verify = () => {
  const { url } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      axios
        .post(`${url}/verify-email-token`, { token })
        .then((res) => {
          setMessage("Email verified successfully! Redirecting...");
          setTimeout(() => navigate("/login"), 2000); // redirect to homepage
        })
        .catch((err) => {
          const errorMsg =
            err.response?.data?.message || "Verification failed or expired.";
          setMessage(errorMsg);
        });
    } else {
      setMessage("No token found in URL.");
    }
  }, [location, navigate, url]);

  return (
    <div className="verify-container">
      <h2
        className={`verify-message ${
          message.includes("success")
            ? "success"
            : message.includes("failed") || message.includes("expired")
            ? "error"
            : ""
        }`}
      >
        {message}
      </h2>
      {message.includes("failed") || message.includes("expired") ? (
        <button
          className="verify-button"
          onClick={() => navigate("/resend-verification")}
        >
          Resend Verification
        </button>
      ) : null}
    </div>
  );
};