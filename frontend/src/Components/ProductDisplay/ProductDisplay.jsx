import React, { useState, useContext } from "react";
import "./ProductDisplay.css";
import brightStar from "../Assets/star2.png";
import dullStar from "../Assets/star1.png";
import tickIcon from "../Assets/TICK_ICON.png";
import likeIcon from "../Assets/like_icon.png";
import shareIcon from "../Assets/share_icon.png";
import { ShopContext } from "../../Contexts/ShopContext";
import { FaWhatsapp, FaTwitter, FaFacebook, FaEnvelope,FaLink } from "react-icons/fa";


export const ProductDisplay = ({ product }) => {
  const { addToCart} = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [showShareOptions, setShowShareOptions] = useState(false);

  

  //handles share
  const toggleShareOptions = () => {
  setShowShareOptions((prev) => !prev);
};
const handleShare = (platform) => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    `Check out this product: ${product.name} - only Ksh. ${Number(
      product.new_price
    ).toLocaleString()}`
  );

  switch (platform) {
    case "whatsapp":
      window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
      break;
    case "twitter":
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank"
      );
      break;
    case "facebook":
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
      break;
    case "email":
      window.location.href = `mailto:?subject=${text}&body=${url}`;
      break;
    default:
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
  }
};


  // Handlers for quantity
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };



  

  return (
    <div className="product-display">
      {/* Left Side: Images */}
      <div className="display-left">
        <div className="product-display-img-list">
          <img src={product.image} alt="preview-1" />
          <img src={product.image} alt="preview-2" />
          <img src={product.image} alt="preview-3" />
          <img src={product.image} alt="preview-4" />
        </div>
        <div className="product-display-image">
          <img
            className="product-display-main-image"
            src={product.image}
            alt={product.name}
          />
        </div>
      </div>

      {/* Right Side: Details */}
      <div className="display-right">
        <h1>{product.name}</h1>

        {/* Rating */}
        <div className="product-display-right-star">
          <img src={brightStar} alt="star" />
          <img src={brightStar} alt="star" />
          <img src={brightStar} alt="star" />
          <img src={brightStar} alt="star" />
          <img src={dullStar} alt="star" />
          <p>(70 reviews)</p>
        </div>

        {/* Price */}
        <div className="product-display-right-price">
          <div className="product-display-right-price-old">
            Ksh. {Number(product.old_price).toLocaleString()}
          </div>
          <div className="product-display-right-price-new">
            Ksh. {Number(product.new_price).toLocaleString()}
          </div>
        </div>

        {/* Description */}
        <div className="product-display-right-description">
           {product.description}
        </div>

        {/* Services */}
        <div className="product-display-right-size">
          <span>Services:</span>
          <img src={tickIcon} alt="tick" className="tick-icon" />
          Fulfilled by Superhome Interiors
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="product-display-right-quantity">
            Quantity:
          </label>
          <span className="quantity">
            <button onClick={decreaseQty}>-</button>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              readOnly
            />
            <button onClick={increaseQty}>+</button>
          </span>
        </div>

        {/* Action Buttons */}
        <div
          className="action-buttons"
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <button
            className="add-to-cart"
            onClick={() => addToCart(product._id,quantity)}
          >
            Add to Cart
          </button>
        
          <button className="icon-button">
            <img src={likeIcon} alt="wishlist" />
          </button>
          <div className="share-container" style={{ position: "relative" }}>
  <button className="icon-button" onClick={toggleShareOptions}>
    <img src={shareIcon} alt="share" />
  </button>

  {showShareOptions && (
    <div className="share-options">
     
  <button onClick={() => handleShare("whatsapp")}>
    <FaWhatsapp size={30} color="green" />
  </button>
  <button onClick={() => handleShare("twitter")}>
    <FaTwitter size={30} color="#1DA1F2" />
  </button>
  <button onClick={() => handleShare("facebook")}>
    <FaFacebook size={30} color="#1877F2" />
  </button>
  <button onClick={() => handleShare("email")}>
    <FaEnvelope size={30} color="gray" />
  </button>
  <button onClick={() => handleShare("copy")}>
    <FaLink size={30} color="#555" />
  </button>
    </div>
  )}
</div>
        </div>
      </div>
    </div>
  );
};
