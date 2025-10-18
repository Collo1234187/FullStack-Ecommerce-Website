import React, { useState, useContext } from "react";
import { AllProduct } from "../Components/AllProduct/AllProduct";
import { ShopContext } from "../Contexts/ShopContext";

export const Search = () => {
  const [query, setQuery] = useState("");
  const { allItems } = useContext(ShopContext); // fetch from context

  const filteredProducts = allItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <h2>Search Products</h2>
      <input
        type="text"
        placeholder="Search for furniture..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <div className="search-results">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <AllProduct
              key={product._id}
              id={product._id}
              name={product.name}
              image={product.image}
              old_price={product.old_price}
              new_price={product.new_price}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};
