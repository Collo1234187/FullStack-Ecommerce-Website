import React, { useContext, useEffect, useState, useCallback } from 'react'
import './CSS/MyOrders.css'
import { ShopContext } from '../Contexts/ShopContext';
import axios from 'axios';
import percel_icon from '../Components/Assets/percel_icon.png';


const MyOrders = () => {
  const { url, authToken } = useContext(ShopContext);
  const [data, setData] = useState([]);
  

  //useCallback ensures fetchOrders is memoized
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.post(
        url + "/userorders",
        {},
        { headers: { "auth-token": authToken } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [url, authToken]);

  useEffect(() => {
    const token = authToken || localStorage.getItem("auth-token");
    if (token) {
      fetchOrders();
    }
  }, [authToken, url, fetchOrders]); 

  

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={percel_icon} alt="" />
            <p>
              {order.items.map((item, index) =>
                index === order.items.length - 1
                  ? item.name + " x " + item.quantity
                  : item.name + " x " + item.quantity + ", "
              )}
            </p>
            <p>ksh.{order.amount}.00</p>
            <p>items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span>
              <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
