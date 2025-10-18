import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [allItems, setAllItems] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [buyNowItem, setBuyNowItem] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("auth-token") || "");
  const url = "https://fullstack-ecommerce-website-1-8it1.onrender.com";

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${url}/allproducts`);
        const data = await response.json();
        setAllItems(data);

        // Merge with existing cart or initialize if empty
        setCartItems((prevCart) => {
          const initialCart = {};
          data.forEach((item) => {
            initialCart[item._id] = prevCart[item._id] || 0;
          });
          return initialCart;
        });
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [url]);

  // Fetch user cart if logged in
  useEffect(() => {
    const fetchUserCart = async () => {
      if (!authToken) return;
      try {
        const response = await fetch(`${url}/getcart`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": authToken,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        // Merge server cart with existing cart to ensure all products are included
        setCartItems((prevCart) => {
          const mergedCart = { ...prevCart };
          Object.keys(data).forEach((id) => {
            mergedCart[id] = data[id];
          });
          return mergedCart;
        });
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchUserCart();
  }, [url, authToken]);

  const addToCart = (itemId, qty = 1) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + qty,
    }));

    if (authToken) {
      fetch(`${url}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, quantity: qty }),
      })
        .then((res) => res.json())
        .then((data) => console.log("AddCart response:", data))
        .catch((err) => console.error("Error adding to cart:", err));
    }
  };

  const removeFromCart = (itemId, qty = 1) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - qty : 0,
    }));

    if (authToken) {
      fetch(`${url}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, quantity: qty }),
      })
        .then((res) => res.json())
        .then((data) => console.log("RemoveCart response:", data))
        .catch((err) => console.error("Error removing from cart:", err));
    }
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      if (qty > 0) {
        const item = allItems.find((p) => String(p._id) === String(id));
        if (item) total += item.new_price * qty;
      }
      return total;
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const logout = () => {
    setAuthToken("");
    localStorage.removeItem("auth-token");
    setCartItems((prev) => {
      const emptyCart = {};
      allItems.forEach((item) => (emptyCart[item._id] = 0));
      return emptyCart;
    });
  };

  const contextValue = {
    getTotalCartItems,
    allItems,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    authToken,
    setAuthToken,
    logout,
    setCartItems,
    buyNowItem,
    setBuyNowItem, 
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
