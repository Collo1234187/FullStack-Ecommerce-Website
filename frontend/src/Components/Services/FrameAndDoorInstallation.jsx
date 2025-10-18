import React from "react";
import "./ServicePage.css";
import frameAndDoors_banner from '../Assets/door_installation.jpg'
import cabinates1 from '../Assets/cabinate1.jpeg'
import cabinates2 from '../Assets/cabinate2.jpeg'
import cabinates3 from '../Assets/cabinate3.jpeg'
import video from '../Assets/cabinate_video.mp4'


export const FrameAndDoorInstallation = () => {
  return (
    <div className="service-page">
      <div className="banner">
        <img src={frameAndDoors_banner} alt="" />
        <h1>Frame & Door Installation</h1>
      </div>
      <div className="content">
      <p>
        Strong, stylish, and secure doors and frames are key to any property.
        We specialize in professional installation of wooden, metallic, and
        modern design frames and doors.
      </p>

      <h2>Why Choose Our Door Services?</h2>
      <ul className="service-list">
        <li>✔ Wide range of styles: modern, classic, custom.</li>
        <li>✔ High-security locks and hinges.</li>
        <li>✔ Expert fitting for long-lasting durability.</li>
        <li>✔ Weather-resistant and quality finishes.</li>
        <li>✔ Affordable installation packages.</li>
      </ul>

      <h2>Our Process</h2>
      <ol className="service-steps">
        <li>Site measurement and consultation.</li>
        <li>Material and design selection.</li>
        <li>Frame installation and alignment.</li>
        <li>Door fitting and finishing.</li>
        <li>Final security and quality checks.</li>
      </ol>

      <h2>Benefits</h2>
      <p>
        Boosts property security, adds style, improves energy efficiency, and
        increases property value.
      </p>
  <div className="image-video-container">
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
        <img src={cabinates1} alt="Door Install 1" />
        <img src={cabinates2} alt="Door Install 2" />
        <img src={cabinates3} alt="Door Install 3" />
      </div>
</div>
      <div className="cta-box">
        <h3>Secure Your Space Today</h3>
        <p>Book your frame & door installation with our expert team.</p>
<a  href="https://wa.me/254724568690?text=Hello%20SuperHome%20Interiors%2C%20I%27m%20interested%20in%20your%20products." target="_blank" rel="noopener noreferrer"><button>Get a Free Quote</button></a> 
      </div>
      </div>
    </div>
  );
};
