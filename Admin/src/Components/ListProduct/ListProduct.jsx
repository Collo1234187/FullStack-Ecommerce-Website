import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import remove_icon from '../../assets/remove_icon.png';

const ListProduct = ({ url }) => {
  const [allproducts, setALLProducts] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`${url}/allproducts`);
        const data = await res.json();
        setALLProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchInfo();
  }, [url]); // effect only runs if `url` changes

  const remove_product = async (id) => {
    try {
      await fetch(`${url}/removeproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      // Refresh list after deletion
      const res = await fetch(`${url}/allproducts`);
      const data = await res.json();
      setALLProducts(data);
    } catch (err) {
      console.error("Error removing product:", err);
    }
  };

  return (
    <div className="listProduct">
      <h1>All Products</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product) => (
          <React.Fragment key={product._id}>
            <div className="listproduct-format-main listproduct-format">
              <img
                src={product.image}
                alt={product.name}
                className="listproduct-product-icon"
              />
              <p>{product.name}</p>
              <p>ksh.{product.old_price}</p>
              <p>ksh.{product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => remove_product(product._id)}
                src={remove_icon}
                alt="remove"
                className="listproduct-remove-icon"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
