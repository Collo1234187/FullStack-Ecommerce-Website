import React from "react";
import "./ServicePage.css";
import officePartitioning_banner from '../Assets/office_patitioning.jpg'
import cabinates1 from '../Assets/cabinate1.jpeg'
import cabinates2 from '../Assets/cabinate2.jpeg'
import cabinates3 from '../Assets/cabinate3.jpeg'
import video from '../Assets/cabinate_video.mp4'
export const OfficePartitioning = () => {
  return (
    <div className="service-page">
      <div className="banner">
        <img src={officePartitioning_banner} alt="" />
        <h1>Office Partitioning</h1>
      </div>
         <div className="content">
      <p>
        Our office partitioning services help you design modern, efficient,
        and stylish workspaces. Whether you need glass partitions for openness
        or soundproof solutions for privacy, we deliver tailored results.
      </p>

      <h2>Why Choose Our Partitioning?</h2>
      <ul className="service-list">
        <li>✔ Sleek glass, wood, and aluminum options.</li>
        <li>✔ Soundproofing for improved productivity.</li>
        <li>✔ Flexible, modular designs.</li>
        <li>✔ Professional installation with minimal disruption.</li>
        <li>✔ Affordable packages for small & large offices.</li>
      </ul>

      <h2>Our Process</h2>
      <ol className="service-steps">
        <li>Consultation to understand workspace needs.</li>
        <li>Design proposal and customization.</li>
        <li>Material selection (glass, wood, aluminum).</li>
        <li>Quick installation with safety compliance.</li>
        <li>Final walkthrough and adjustments.</li>
      </ol>

      <h2>Benefits</h2>
      <p>
        Creates privacy, improves workflow, reduces noise, and enhances the
        professional look of your office.
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
        <img src={cabinates1} alt="Office Partition 1" />
        <img src={cabinates2} alt="Office Partition 2" />
        <img src={cabinates3} alt="Office Partition 3" />
      </div>

      <div className="cta-box">
        <h3>Redesign Your Office Today</h3>
        <p>Let us help you build a modern and functional workspace.</p>
        <a  href="https://wa.me/254724568690?text=Hello%20SuperHome%20Interiors%2C%20I%27m%20interested%20in%20your%20products." target="_blank" rel="noopener noreferrer"><button>Get a Free Quote</button></a> 
      </div>
      </div>
    </div>
  );
};
