import React from 'react';
import './HotCategory.css';
import { data_product } from '../Assets/data';
import { HotCategoryProduct } from '../HotCategoryProduct/HotCategoryProduct';
import { useNavigate } from 'react-router-dom';

export const HotCategory = () => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    // Convert name to a safe slug (lowercase, dashes instead of spaces)
    const slug = item.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${slug}`);
  };

  return (
    <div className="hot">
      <h1>Hot Category</h1>
      <hr />
      <div className="hot-category">
        {data_product.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className="clickable-image"
          >
            <HotCategoryProduct
              id={item.id}
              image={item.image}
              name={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
