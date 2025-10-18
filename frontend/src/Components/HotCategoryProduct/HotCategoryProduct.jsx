import React from 'react';
import './HotCategoryProduct.css';

export const HotCategoryProduct = ({ image, name }) => {
  return (
    <div className="cc">
    <div className="hot-category-item">
      <div className="image-container">
        <img src={image} alt={name} />
      </div>
      <div className="name">
        <p>{name}</p>
      </div>
    </div>
    </div>
  );
};
