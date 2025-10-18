import React from "react";
import "./ServicePage.css";
import cabinateInstallation_banner from '../Assets/cabinate_installation.jpg'
import cabinates1 from '../Assets/cabinate1.jpeg'
import cabinates2 from '../Assets/cabinate2.jpeg'
import cabinates3 from '../Assets/cabinate3.jpeg'
import video from '../Assets/cabinate_video.mp4'

export const CabinetInstallation = () => {
  return (
    <div className="service-page">
      <div className="banner">
         <img src={cabinateInstallation_banner} alt="" />
         <h1>Cabinet Installation</h1>  
      </div>
      <div className="content">
      <p>
        Cabinets are more than storage—they define the look and function of
        kitchens, offices, and homes. We provide high-quality custom cabinet
        installation to maximize your space.
      </p>

      <h2>Why Choose Our Cabinet Services?</h2>
      <ul className="service-list">
        <li>✔ Custom designs for kitchens, bathrooms, and offices.</li>
        <li>✔ Premium wood, laminate, and modern materials.</li>
        <li>✔ Space optimization with elegant finishes.</li>
        <li>✔ Quick and professional installations.</li>
        <li>✔ Budget-friendly packages.</li>
      </ul>

      <h2>Our Process</h2>
      <ol className="service-steps">
        <li>Space measurement and design consultation.</li>
        <li>Material and finish selection.</li>
        <li>Cabinet manufacturing and delivery.</li>
        <li>Installation and adjustments.</li>
        <li>Final touch and quality inspection.</li>
      </ol>

      <h2>Benefits</h2>
      <p>
        Enhances storage, improves organization, boosts property aesthetics,
        and adds lasting value.
      </p>

      <div className="video-placeholder">
        <section className="video-section">
  <h2>Watch Our Work in Action</h2>
  <video controls autoPlay muted loop>
    <source src={video} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <p>
    Here’s a quick look at how we bring our installation and design services 
    to life. Our process is seamless, professional, and tailored for you.
  </p>
</section>
      </div>

      <div className="image-gallery">
        <img src={cabinates1} alt="Cabinet 1" />
        <img src={cabinates2} alt="Cabinet 2" />
        <img src={cabinates3} alt="Cabinet 3" />
      </div>

      <div className="cta-box">
        <h3>Maximize Your Space Today</h3>
        <p>Contact us to design and install your perfect cabinets.</p>
         <a  href="https://wa.me/254724568690?text=Hello%20SuperHome%20Interiors%2C%20I%27m%20interested%20in%20your%20products." target="_blank" rel="noopener noreferrer"><button>Get a Free Quote</button></a> 
      </div>
      </div>
    </div>
  );
};
