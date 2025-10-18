import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Contexts/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown.png';
import { AllProduct } from '../Components/AllProduct/AllProduct';

export const ShopCategory = (props) => {
  const { allItems } = useContext(ShopContext);

  // filter products by category
  const filteredItems = allItems.filter(item => item.category === props.category);

  // state for pagination
  const [visibleCount, setVisibleCount] = useState(12);

  // function to load more products
  const loadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  return (
    <div className="shop-category">
      <div className="shopCategory-banner-wrapper">
        <img className="shopCategory-banner" src={props.banner} alt="" />
      </div>

      <div className="shopCategory-indexSort">
        <p>
          <span>showing {Math.min(visibleCount, filteredItems.length)} </span> 
          out of {filteredItems.length} products
        </p>
        <div className="shopCategory-sort">
          sort by <img src={dropdown_icon} alt="sort icon" />
        </div>
      </div>

      <div className="products">
        <div className="shopCategory-products">
          {filteredItems.slice(0, visibleCount).map((item) => (
            <AllProduct
              className="item"
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

      {visibleCount < filteredItems.length && (
        <div 
          className="shopCategory-loadMore" 
          onClick={loadMore}
        >
          Explore More
        </div>
      )}
    </div>
  );
};
