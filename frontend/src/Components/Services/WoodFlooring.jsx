import React from "react";
import "./ServicePage.css";
import woodFlooring_banner from '../Assets/wood_flooring.jpg'
import cabinates1 from '../Assets/cabinate1.jpeg'
import cabinates2 from '../Assets/cabinate2.jpeg'
import cabinates3 from '../Assets/cabinate3.jpeg'
import video from '../Assets/cabinate_video.mp4'


export const WoodFlooring = () => {
  return (
    <div className="service-page">
      <div className="banner">
        <img src={woodFlooring_banner} alt="" />
        <h1>Wood Flooring</h1>
      </div>
      <div className="content">

      {/* Intro */}
      <p>
        Wood flooring is more than just a surface—it’s an investment in the beauty,
        warmth, and character of your home or office. We specialize in high-quality
        hardwood, laminate, and engineered flooring solutions that bring timeless
        elegance to your spaces.
      </p>

      {/* Why Choose Us */}
      <h2>Why Choose Our Wood Flooring Services?</h2>
      <ul className="service-list">
        <li>✔ Wide variety of premium wood types and finishes.</li>
        <li>✔ Expert installation by skilled craftsmen.</li>
        <li>✔ Durable, long-lasting materials.</li>
        <li>✔ Affordable pricing with no hidden costs.</li>
        <li>✔ Custom designs tailored to your style.</li>
      </ul>

      {/* Process */}
      <h2>Our Process</h2>
      <ol className="service-steps">
        <li><b>Consultation:</b> We discuss your vision, budget, and needs.</li>
        <li><b>Design & Material Selection:</b> Choose from a wide range of wood textures and finishes.</li>
        <li><b>Preparation:</b> We prepare your floor base for a smooth, lasting installation.</li>
        <li><b>Installation:</b> Our team carefully installs and finishes your flooring.</li>
        <li><b>Final Touch:</b> Polishing and quality check for perfection.</li>
      </ol>

      {/* Benefits */}
      <h2>Benefits of Wood Flooring</h2>
      <p>
        Wood flooring doesn’t just look beautiful—it’s a practical choice too.
        It’s easy to maintain, adds value to your property, and creates a cozy,
        natural feel that other flooring simply cannot match.
      </p>

      {/* Video Placeholder */}
      <div className="video-placeholder">
        <p><section className="video-section">
          <h2>Watch Our Work in Action</h2>
          <video controls autoPlay muted loop>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>
            Here’s a quick look at how we bring our installation and design services 
            to life. Our process is seamless, professional, and tailored for you.
          </p>
        </section></p>
      </div>

      {/* Image Gallery */}
      <div className="image-gallery">
        <img src={cabinates1} alt="Wood Floor 1" />
        <img src={cabinates2} alt="Wood Floor 2" />
        <img src={cabinates3} alt="Wood Floor 3" />
      </div>

      {/* Call to Action */}
      <div className="cta-box">
        <h3>Ready to Transform Your Space?</h3>
        <p>Contact us today to get a free consultation and quotation.</p>
        <a  href="https://wa.me/254724568690?text=Hello%20SuperHome%20Interiors%2C%20I%27m%20interested%20in%20your%20products." target="_blank" rel="noopener noreferrer"><button>Get a Free Quote</button></a> 
      </div>
      </div>
    </div>
  );
};
