import React, { useEffect, useState, useContext, useCallback } from 'react';
import './RelatedProducts.css';
import { AllProduct } from '../AllProduct/AllProduct';
import { ShopContext } from '../../Contexts/ShopContext';

export const RelatedProducts = ({ productId }) => {
  const [alsoLikeCategory, setAlsoLikeCategory] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [alsoLikeLoading, setAlsoLikeLoading] = useState(true);
  const [relatedError, setRelatedError] = useState(null);
  const [alsoLikeError, setAlsoLikeError] = useState(null);

  const { url } = useContext(ShopContext);

  // Fetch "You may also like"
  const fetchAlsoLike = useCallback(async () => {
    setAlsoLikeLoading(true);
    try {
      const res = await fetch(`${url}/alsolikecollection`);
      if (!res.ok) throw new Error("Failed to fetch 'also like' products");
      const data = await res.json();
      setAlsoLikeCategory(data);
    } catch (err) {
      setAlsoLikeError(err.message);
    } finally {
      setAlsoLikeLoading(false);
    }
  }, [url]);

  // Fetch related products
  const fetchRelatedProducts = useCallback(async (id) => {
    setRelatedLoading(true);
    try {
      const res = await fetch(`${url}/relatedproducts/${id}`);
      if (!res.ok) throw new Error("Failed to fetch related products");
      const data = await res.json();
      setRelatedProducts(data);
    } catch (err) {
      console.error(err);
      setRelatedError(err.message);
    } finally {
      setRelatedLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (productId) {
      fetchRelatedProducts(productId);
    }
  }, [productId, fetchRelatedProducts]);

  useEffect(() => {
    fetchAlsoLike();
  }, [fetchAlsoLike]);

  

  return (
    <div className="relatedProducts">
      <h1>Related Products</h1>
      <hr />
      {relatedLoading && <p>Loading...</p>}
      {relatedError && <p style={{ color: "red" }}>{relatedError}</p>}

      <div className="relatedProducts-item">
        {relatedProducts.map((item) => (
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

      <div className="alsoLikeProducts">
        <h1>You May Also Like</h1>
        <hr />
        {alsoLikeLoading && <p>Loading...</p>}
        {alsoLikeError && <p style={{ color: "red" }}>{alsoLikeError}</p>}

        <div className="alsoLikeProducts-item">
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

        <div
          className="alsoLikeProducts-loadMore"
          style={{ cursor: "pointer" }}
        >
          Explore More
        </div>
      </div>
    </div>
  );
};
