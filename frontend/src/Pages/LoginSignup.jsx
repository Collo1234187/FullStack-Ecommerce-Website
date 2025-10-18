import React, { useState, useContext } from "react";
import "./CSS/LoginSignup.css";
import axios from "axios";
import { ShopContext } from "../Contexts/ShopContext";
import { useNavigate } from "react-router-dom";

export const LoginSignup = () => {
  const { url,setCartItems,setAuthToken } = useContext(ShopContext);
  const navigate = useNavigate();


  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signedUpEmail, setSignedUpEmail] = useState(""); // store email for resend
  const [showResend, setShowResend] = useState(false);   // toggle resend option

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
      };
      const res = await axios.post(`${url}/login`, payload);

      if (res.data.success) {
        const token = res.data.token;
        localStorage.setItem("auth-token", token);
        setAuthToken(token);

        // Fetch cart immediately after login
        const cartRes = await axios.post(
          `${url}/getcart`,
          {},
          {
            headers: {
              "auth-token": token,
              Accept: "application/json",
            },
          }
        );
        setCartItems(cartRes.data);

        navigate("/"); // redirect to homepage
      } else {
        if (res.data.resendOption) {
          setSignedUpEmail(res.data.email);
          setShowResend(true);
          setError("Your account is not verified. Please verify your email.");
        } else {
          setError(res.data.errors || "Login failed");
        }
        setFormData({ ...formData, password: "" });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.errors || "Something went wrong");
      setFormData({ ...formData, password: "" });
    } finally {
      setLoading(false);
    }
  };


  const signup = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const payload = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };
      const res = await axios.post(`${url}/signup`, payload);

      if (res.data.success) {
        setSignedUpEmail(formData.email.trim()); // save email for resend
        setMessage(
          "Signup successful. Please check your email to verify your account."
        );
        setFormData({ username: "", email: "", password: "" });
        setShowResend(true); // show resend after signup success
      } else {
        setError(res.data.errors || "Signup failed");
        setFormData({ ...formData, password: "" });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.errors || "Something went wrong");
      setFormData({ ...formData, password: "" });
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.post(`${url}/resend-verification`, {
        email: signedUpEmail, // use saved email
      });
      setMessage(
        res.data.message || "Verification email resent. Please check your inbox."
      );
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to resend verification email."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === "Sign Up" && !agree) {
    setError("You must agree to the terms of use & privacy policy.");
    return;
  }
  state === "Login" ? login() : signup();
};

  return (
    <div className="loginSignUp">
      <div className="loginSignUp-container">
        <h1>{state}</h1>

        {/* Show form only if signup success hasn't happened */}
        {!message.includes("Signup successful") && !showResend && (
          <form onSubmit={handleSubmit}>
            <div className="loginSignUp-fields">
              {state === "Sign Up" && (
                <input
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Your Name"
                  required
                />
              )}
              <input
                name="email"
                value={formData.email}
                onChange={changeHandler}
                type="email"
                placeholder="Email Address"
                required
              />
              <input
                name="password"
                value={formData.password}
                onChange={changeHandler}
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Please wait..." : "Continue"}
            </button>
            {state === "Sign Up" && (
           <div className="loginSignUp-agree">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              required
             />
      <p>By continuing, I agree to the terms of use & privacy policy</p>
    </div>
  )}
          </form>
        )}

        {/* Show messages */}
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Show resend verification if signup success OR login unverified */}
        {showResend && (
          <p className="loginSignUp-login">
            Didn’t get the email?{" "}
            <span onClick={resendVerification}>Resend verification</span>
          </p>
        )}

        {/* Toggle only when form is visible */}
        {!message.includes("Signup successful") && !showResend &&
          (state === "Sign Up" ? (
            <p className="loginSignUp-login">
              Already have an account?
              <span onClick={() => setState("Login")}> Login here</span>
            </p>
          ) : (
            <p className="loginSignUp-login">
              Create an account?
              <span onClick={() => setState("Sign Up")}> Click here</span>
            </p>
          ))}
      </div>
    </div>
  );
};
