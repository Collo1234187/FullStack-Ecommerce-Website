import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  

  return (
    <div>
      <Navbar />
      <Admin />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
