import React, { useContext, useState,useEffect} from 'react';

import './Navbar.css'
import { Link,useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';
import hamburger_icon from '../Assets/hamburger_icon.png';
import close_icon from '../Assets/the_close_icon.png';
import shopping_Bag from '../Assets/shoppingBag.png'
import seat_icon from '../Assets/seat-icon.png'
import profile_icon from '../Assets/profile_icon.jpg'
import logout_icon from '../Assets/logout_icon.jpg'
import order_icon from '../Assets/orders_icon.jpg'
import cart from '../Assets/cart_icon.png'
import search_icon from "../Assets/search_icon.png";
import { ShopContext } from '../../Contexts/ShopContext';


export const Navbar = () => {
 const location = useLocation();
 const navigate = useNavigate();

const getRouteKey = (path) => {
  if (path === "/") return "shop";
  if (path.includes("bed")) return "bed";
  if (path.includes("sofa")) return "sofa";
  if (path.includes("stand")) return "stand";
  if (path.includes("dining")) return "dining";
  if (path.includes("chair")) return "chair";
  if (path.includes("table")) return "table";
  if (path.includes("mattress")) return "mattress";
  if (path.includes("pillow")) return "pillow";
  return ""; 
};

const [isProfileOpen, setIsProfileOpen] = useState(false);
const [menu, setMenu] = useState(getRouteKey(location.pathname));
const {getTotalCartItems} = useContext(ShopContext);

const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
};

// Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  // Update state on route change
  useEffect(() => {
    setMenu(getRouteKey(location.pathname));
  }, [location.pathname]);

  const handleMenuClick = (key) => {
    setMenu(key);
    setIsMobileMenuOpen(false); // close after selecting item
  };

  return (
    <div className="navbar">
       <div className="navbar-logo">
<div className="closeNOpen_icon" onClick={toggleMobileMenu}>
      <img src={isMobileMenuOpen ? close_icon : hamburger_icon} alt="menu toggle" />
        </div>
  <img src={shopping_Bag} alt="Shopping Bag" className="shopping-bag" />
  <div className="navbar-logo-content">
    <img src={seat_icon} alt="Seat Icon" className="seat-icon" />
    <div className="navbar-logo-text">
      <h1>SuperHome Interiors</h1>
      <p>For affordable furniture n services</p>
    </div>
  </div>
</div>


         <ul className={`nav-menu ${isMobileMenuOpen ? "show" : ""}`}>
        <li onClick={() => handleMenuClick("shop")}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">shop</Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("bed")}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/bed">bed</Link>
          {menu === "bed" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("sofa")}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/sofa">sofa</Link>
          {menu === "sofa" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("stand")}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/stand">stand</Link>
          {menu === "stand" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("dining")}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/dining">dining</Link>
          {menu === "dining" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("chair")}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/chair">chair</Link>
          {menu === "chair" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("table")}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/table">table</Link>
          {menu === "table" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("mattress")}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/mattress">mattress</Link>
          {menu === "mattress" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("pillow")}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/pillow">pillow</Link>
          {menu === "pillow" ? <hr /> : null}
        </li>
      </ul>

      {/* Overlay appears only when menu is open */}
     {isMobileMenuOpen && (
  <div className="nav-overlay show" onClick={toggleMobileMenu}></div>
)}

<div className="nav-login-cart-search">
<div className="search-icon">
  <Link to="/search">
    <img src={search_icon} alt="search" />
  </Link>
</div>



<div className="nav-login-cart">
  <Link to="/cart">
    <img src={cart} alt="cart" />
  </Link>
  <div className="nav-cart-count">{getTotalCartItems()}</div>

  {localStorage.getItem("auth-token") ? (
    <div className="nav-profile">
      <img
        src={profile_icon}
        alt="profile"
        className="profile-icon"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      />
      {isProfileOpen && (
        <ul className="nav-profile-dropdown">
          <li onClick={()=>navigate('/myorders')}>
              <img src={order_icon} alt="" />
              <p>Orders</p>
          </li>
          <hr />
          <li
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            <img src={logout_icon} alt="" />
            <p>Logout</p>
          </li>
        </ul>
      )}
    </div>
  ) : (
    <Link to="/login">
      <button>Login</button>
    </Link>
  )}
</div>

</div>

    </div>
  )
}

