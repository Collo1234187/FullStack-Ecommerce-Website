import React from 'react';
import './BreadCrums.css';
import arrow_icon from '../Assets/arrow_icon.png';

export const BreadCrums = ({ product }) => {
  if (!product) return null; // wait until product is loaded

  return (
    <div className="breadCrums">
      HOME <img src={arrow_icon} alt="arrow" /> 
      SHOP <img src={arrow_icon} alt="arrow" /> 
      {product.category} <img src={arrow_icon} alt="arrow" /> 
      {product.name}
    </div>
  );
};
