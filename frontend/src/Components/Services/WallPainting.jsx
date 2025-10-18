import React from "react";
import "./ServicePage.css";
import wallPainting_banner from '../Assets/wall_painting.jpg'
import cabinates1 from '../Assets/cabinate1.jpeg'
import cabinates2 from '../Assets/cabinate2.jpeg'
import cabinates3 from '../Assets/cabinate3.jpeg'
import video from '../Assets/cabinate_video.mp4'


export const WallPainting = () => {
  return (
    <div className="service-page">
      <div className="banner">
        <img src={wallPainting_banner} alt="" />
         <h1>Wall Painting</h1>
      </div>
     <div className="content">
      <p>
        A fresh coat of paint transforms spaces. We provide high-quality wall
        painting services for residential and commercial projects, with expert
        color consultation and flawless finishes.
      </p>

      <h2>Why Choose Our Painting Services?</h2>
      <ul className="service-list">
        <li>✔ Professional painters with years of experience.</li>
        <li>✔ Premium paints for lasting results.</li>
        <li>✔ Smooth, streak-free finishes.</li>
        <li>✔ Custom colors and textures available.</li>
        <li>✔ Affordable, flexible packages.</li>
      </ul>

      <h2>Our Process</h2>
      <ol className="service-steps">
        <li>Surface preparation and cleaning.</li>
        <li>Primer application.</li>
        <li>Color consultation and testing.</li>
        <li>Professional painting with precision tools.</li>
        <li>Final inspection and touch-ups.</li>
      </ol>

      <h2>Benefits</h2>
      <p>
        Enhances beauty, protects walls, improves indoor air quality, and
        raises property value instantly.
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
        <img src={cabinates1} alt="Wall Paint 1" />
        <img src={cabinates2} alt="Wall Paint 2" />
        <img src={cabinates3} alt="Wall Paint 3" />
      </div>

      <div className="cta-box">
        <h3>Brighten Up Your Walls</h3>
        <p>Book a professional wall painting session today.</p>
        <a  href="https://wa.me/254724568690?text=Hello%20SuperHome%20Interiors%2C%20I%27m%20interested%20in%20your%20products." target="_blank" rel="noopener noreferrer"><button>Get a Free Quote</button></a> 
      </div>
    </div>
    </div>
  );
};
