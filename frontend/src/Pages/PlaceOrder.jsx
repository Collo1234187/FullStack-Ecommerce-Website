import React, { useContext, useState, useEffect } from "react";
import "./CSS/PlaceOrder.css";
import { ShopContext } from "../Contexts/ShopContext";
import axios from "axios";
import dropdown_icon from "../../src/Components/Assets/dropdown.png";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, authToken, allItems, cartItems, url, setCartItems, user } =
    useContext(ShopContext);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    country: "Kenya",
    phone: "",
  });

  const subtotal = getTotalCartAmount();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    // Build list of order items
    const orderItems = allItems
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItems[item._id] }));

    try {
      // Initiate M-Pesa STK push
      const response = await axios.post(
        `${url}/api/mpesa/stkpush`,
        {
          phone: data.phone,
          amount: subtotal,
          orderItems,
          address: data,
          userId: user?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      console.log("M-Pesa STK Response:", response.data);

      // Check success and get CheckoutRequestID from backend response
      if (response.data?.success && response.data?.checkoutRequestId) {
        const checkoutRequestId = response.data.checkoutRequestId;

        alert("M-Pesa payment initiated. Please check your phone and complete payment.");
        setCartItems({}); // clear cart

        // Navigate to verification page with CheckoutRequestID
        navigate(`/verifympesa/${checkoutRequestId}`);
      } else {
        alert("Error initiating M-Pesa payment. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating M-Pesa:", error);
      alert("Something went wrong while initiating payment.");
    }
  };

  useEffect(() => {
    if (!authToken) navigate("/login");
    else if (subtotal === 0) navigate("/cart");
  }, [authToken, subtotal, navigate]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      {/* LEFT: Delivery info */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name (optional)"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input required name="country" value={data.country} type="text" readOnly />
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone (07XXXXXXXX)"
        />

        <div className="cartItem-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartItems-total-item">
              <p>Subtotal</p>
              <p>ksh.{subtotal.toLocaleString()}</p>
            </div>
            <hr />
            <div className="cartItems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartItems-total-item">
              <h3>Total</h3>
              <h3>ksh.{subtotal.toLocaleString()}</h3>
            </div>
          </div>

          {/* Only M-Pesa button */}
          <button type="submit" className="proceed-button">
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>

      {/* RIGHT: Order summary */}
      <div className="order-summary-top">
        <div className="order-summary-header" onClick={() => setShowSummary(!showSummary)}>
          <div>
            <p>Order summary</p>
          </div>
          <span>
            <img
              src={dropdown_icon}
              alt=""
              className={`dropdown-icon ${showSummary ? "rotate-up" : "rotate-down"}`}
            />
          </span>
        </div>

        {showSummary && (
          <div className="order-summary">
            <div className="cartItems-format-main">
              <p>Product</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>
            <hr />
            {allItems.map(
              (e) =>
                cartItems[e._id] > 0 && (
                  <div key={e._id} className="cartItems-format cartItems-format-main">
                    <img src={e.image} alt="" className="cartIcon-product-icon" />
                    <p>{e.name}</p>
                    <p>ksh.{Number(e.new_price).toLocaleString()}</p>
                    <button className="cartItems-quantity">{cartItems[e._id]}</button>
                    <p>ksh.{(Number(e.new_price) * cartItems[e._id]).toLocaleString()}</p>
                  </div>
                )
            )}
            <hr />
          </div>
        )}
      </div>
    </form>
  );
};

export default PlaceOrder;
