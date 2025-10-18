import React, { useContext, useEffect, useState } from 'react';
import './All.css';
import { AllProduct } from '../AllProduct/AllProduct';
import { ShopContext } from '../../Contexts/ShopContext';

export const All = () => {
  const [alsoLikeCategory, setAlsoLikeCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { url } = useContext(ShopContext);

  useEffect(() => {
    const fetchAlsoLike = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${url}/alsolikecollection`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setAlsoLikeCategory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlsoLike();
  }, [url]);

  return (
    <div className="all">
      <h1>You may also like</h1>
      <hr />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && alsoLikeCategory.length === 0 && (
        <p>No products found.</p>
      )}

      <div className="all_product">
        {alsoLikeCategory.map((item) => (
          <AllProduct
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};
