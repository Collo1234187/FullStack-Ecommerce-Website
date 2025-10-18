import React from 'react'
import './Sidebar.css'
import {NavLink} from 'react-router-dom'
import add_product_icon from '../../assets/add-product.png'
import list_product_icon from '../../assets/product-list.png'
import Order_List_icon from '../../assets/order_list.png'

const Sidebar = () => {
  return (
    <div className='Sidebar'>
        <NavLink to={'/addproduct'} style={{textDecoration:"none"}} className='sidebar-item'>
            <img src={add_product_icon} alt="" />
            <p>Add Product</p> 
        </NavLink>
        <NavLink to={'/listproduct'} style={{textDecoration:"none"}} className='sidebar-item'>
            <img src={list_product_icon} alt="" />
            <p>Product List</p>
        </NavLink>
        <NavLink to={'/orderlist'} style={{textDecoration:"none"}} className='sidebar-item'>
            <img src={Order_List_icon} alt="" />
            <p>Orders</p>
        </NavLink>
    </div>
  )
}

export default Sidebar