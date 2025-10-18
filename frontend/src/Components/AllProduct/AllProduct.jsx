import React from 'react';
import './AllProduct.css';
import { Link } from 'react-router-dom';

export const AllProduct = (props) => {
  return (
    <div className="all-product">
      <div className="all-product-image-container">
        <Link to={`/product/${props.id}`}>
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={props.image}
            alt={props.name}
          />
        </Link>
      </div>

      <p className="all-product-name">{props.name}</p>

      <div className="all-product-prices">
        <div className="all-product-price-old">
          ksh.{Number(props.old_price).toLocaleString()}
        </div>
        <div className="all-product-price-new">
          ksh.{Number(props.new_price).toLocaleString()}
        </div>
      </div>
    </div>
  );
};
