import React, { useEffect, useState, useContext } from 'react';
import './New.css';
import { NewProduct } from '../NewProduct/NewProduct';
import { ShopContext } from '../../Contexts/ShopContext';

export const New = () => {
  const [newCollection, setNewCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { url } = useContext(ShopContext);

  useEffect(() => {
    const fetchNewCollection = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}/newcollections`);
        if (!response.ok) throw new Error("Failed to fetch new collection");
        const data = await response.json();
        setNewCollection(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewCollection();
  }, [url]);

  return (
    <div className="new">
      <h1>New Collection</h1>
      <hr />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="new_product">
        {newCollection.map((item) => (
          <NewProduct
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
