import React from 'react'
import { FaWhatsapp } from "react-icons/fa"
import './WhatsApp.css'

const WhatsApp = () => {
  return (
    <div>
<a  
  href="https://wa.me/254724568690?text=Hello%20SuperHome%20Interiors%2C%20I%27m%20interested%20in%20your%20products."  
  target="_blank"  
  rel="noopener noreferrer"  
  className="whatsapp-float"
>
  <FaWhatsapp size={32} />
</a>
    </div>
  )
}

export default WhatsApp