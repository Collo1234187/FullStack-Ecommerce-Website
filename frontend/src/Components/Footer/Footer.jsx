import React from 'react'
import './Footer.css'
import shopping_Bag from '../Assets/shoppingBag.png'
import seat_icon from '../Assets/seat-icon.png'
import facebook from '../Assets/facebook.png'
import whatsapp from '../Assets/whatsapp.png'
import youtube from '../Assets/youtube.png'
import instagram from '../Assets/instagram.png'
import tiktok from '../Assets/tiktok (2).png'

export const Footer = () => {
  return (
    <div className="footer">
     <div className="footer-logo">
          <img src={shopping_Bag} alt="Shopping Bag" className="shopping-bag" />
          <div className="footer-logo-content">
            <img src={seat_icon} alt="Seat Icon" className="seat-icon" />
            <div className="footer-logo-text">
              <h1>SuperHome Interiors</h1>
              <p>For affordable furniture n services</p>
            </div>
          </div>
          </div>
          <ul className="footer-links">
            <li>company</li>
            <li>products</li>
            <li>offices</li>
            <li>About</li>
            <li>contact</li>
          </ul>
          <div className="footer-social-icon">
            <div className="footer-icons-container">
               <a href="https://www.facebook.com/SuperHomeInterior/" target="_blank" rel="noopener noreferrer"><img  src={facebook} alt="" /></a>  
            </div> 
            <div className="footer-icons-container">
               <a  href="https://wa.me/254724568690?text=Hello%20SuperHome%20Interiors%2C%20I%27m%20interested%20in%20your%20products." target="_blank" rel="noopener noreferrer"><img src={whatsapp} alt="" /></a> 
            </div>     
            <div className="footer-icons-container">
                <a href="https://www.tiktok.com/@superhomeinteriorske" target="_blank" rel="noopener noreferrer"><img src={tiktok} alt="" /></a>
            </div> 
            <div className="footer-icons-container">
                
                <a href="https://www.instagram.com/superhomeinteriorske/" target="_blank" rel="noopener noreferrer"> <img src={instagram} alt="" /></a>
            </div> 
             <div className="footer-icons-container">
                 <a href="https://www.youtube.com/@superhomeinteriorske" target="_blank" rel="noopener noreferrer"><img src={youtube} alt="" /></a>
            </div> 
          </div>
          <div className="footer-copyright">
            <hr/>
            <p>copyright @ collinstone.All rights reserved</p>
          </div>
    </div>
  )
}
