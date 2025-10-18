import React, { useState, useEffect } from "react";
import "./OrderList.css";
import axios from "axios";
import parcel_icon from "../../assets/parcel_icon.png";


const OrderList = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/list");
      if (response.data.success) {
        setOrders(response.data.data); 
        console.log("Orders:", response.data.data);
      } else {
        console.error("Failed to fetch orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };
  const statusHandler = async(event,orderId)=>{
    const response = await axios.post(url+"/status",{orderId,status:event.target.value})
    if (response.data.success)  {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [url]);


  return (
  <div className="order add">
    <h3>Order Page</h3>
    <div className="order-list">
      {orders.map((order, index) => (
        <div key={index} className="order-item">
          <img src={parcel_icon} alt="Parcel" className="parcel-icon" />

          {/* Products */}
          <div className="order-item-products">
            {order.items.map((item, i) => (
              <div key={i} className="order-product">
                <img
                  src={item.image}
                  alt={item.name}
                  className="order-item-product-img"
                />
                <span>{item.name} x {item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Customer Name */}
          <p className="order-item-name">
            {order.address.firstName + " " + order.address.lastName}
          </p>

          {/* Address in a single line */}
          <p className="order-item-address">
            {order.address.street}, {order.address.city}, {order.address.country}
          </p>

          {/* Phone */}
          <p className="order-item-phone">{order.address.phone}</p>

          {/* Summary */}
          <p>Items: {order.items.length}</p>
          <p>Ksh: {order.amount}</p>

          {/* Status */}
          <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
            <option value="Order processing">Order Processing</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  </div>
)}

export default OrderList