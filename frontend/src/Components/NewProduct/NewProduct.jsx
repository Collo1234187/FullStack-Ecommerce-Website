import React from 'react'
import './NewProduct.css'
import { Link } from 'react-router-dom'

export const NewProduct = (props) => {
  return (
    <div className="new-product-item">
      <div className="new-product-image-container">
        <Link to={`/product/${props.id}`}>
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={props.image}
            alt={props.name}
          />
        </Link>
      </div>

      <p className="new-product-name">{props.name}</p>

      <div className="new-item-prices">
        <div className="new-item-price-old">
          ksh.{Number(props.old_price).toLocaleString()}
        </div>
        <div className="new-item-price-new">
          ksh.{Number(props.new_price).toLocaleString()}
        </div>
      </div>
    </div>
  )
}
