import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import OrderList from '../../Components/OrderList/OrderList'

const Admin = () => {
  const url = 'http://localhost:4000'
  return (
    <div className='admin'>
       <Sidebar/>
            
       <Routes>
            <Route path='/addproduct' element={<AddProduct url={url}/>}/>
            <Route path='/listproduct' element={<ListProduct url={url}/>}/>
            <Route path='/orderlist' element={<OrderList url={url}/>}/>
       </Routes>
    </div>
  )
}

export default Admin