import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Contexts/ShopContext';
import dropdown_icon from '../../src/Components/Assets/dropdown.png';


const BuyNowCheckout = () => {
  const { authToken, buyNowItem, setBuyNowItem, url } = useContext(ShopContext);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    country: "Kenya",
    phone: ""
  });

  // clear BuyNowItem when leaving page
  useEffect(() => {
    return () => {
      setBuyNowItem(null);
    };
  }, [setBuyNowItem]);

  // calculate subtotal
  const subtotal = buyNowItem ? buyNowItem.new_price * buyNowItem.quantity : 0;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!buyNowItem) {
      alert("No item selected for Buy Now");
      return;
    }

    let orderData = {
      address: data,
      items: [buyNowItem],
      amount: subtotal,
    };

    try {
      let response = await axios.post(url + "/place", orderData, {
        headers: { "auth-token": authToken },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        setBuyNowItem(null);
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while placing the order.");
    }
  };

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    } 
  }, [authToken, navigate, buyNowItem]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      {/* Delivery info */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name(optional)"
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
          placeholder="Phone"
        />

        <div className="cartItem-total">
          <h1>Order Total</h1>
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
          <button type="submit" className="proceed-button">
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>

      {/* Collapsible order summary */}
      <div className="order-summary-top">
        <div
          className="order-summary-header"
          onClick={() => setShowSummary(!showSummary)}
        >
          <div>
            <p>Order summary</p>
          </div>
          <span>
            <div>
              <img
                src={dropdown_icon}
                alt=""
                className={`dropdown-icon ${showSummary ? "rotate-up" : "rotate-down"}`}
              />
            </div>
          </span>
        </div>

        {showSummary && buyNowItem && (
          <div className="order-summary">
            <div className="cartItems-format-main">
              <p>Product</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>
            <hr />
            <div className="cartItems-format cartItems-format-main">
              <img src={buyNowItem.image} alt="" className="cartIcon-product-icon" />
              <p>{buyNowItem.name}</p>
              <p>ksh.{Number(buyNowItem.new_price).toLocaleString()}</p>
              <button className="cartItems-quantity">{buyNowItem.quantity}</button>
              <p>
                ksh.{(Number(buyNowItem.new_price) * buyNowItem.quantity).toLocaleString()}
              </p>
            </div>
            <hr />
          </div>
        )}
      </div>
    </form>
  );
};

export default BuyNowCheckout;
