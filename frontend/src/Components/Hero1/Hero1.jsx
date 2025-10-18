import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Hero1.css'

import wood_floor from '../Assets/floor.jpeg'
import office_partition from '../Assets/officePartitioning.jpeg'
import frameNdoor_installation from '../Assets/doorInstallations.jpeg'
import wall_painting from '../Assets/painting.jpeg'
import cabinet_installation from '../Assets/cabinet_installation.jpeg'





export const Hero1 = () => {
    const navigate = useNavigate();
  return (
    <div className="hero-services">
         
    <h2>Our Services</h2>
    <hr/>
      <div className="services-row">
        <div className="service-card" onClick={() => navigate('/wood-flooring')}>
          <img onClick={() => window.scrollTo(0, 0)} src={wood_floor} alt="wood flooring" />
          <p>wood flooring</p>
        </div>
        <div className="service-card" onClick={() => navigate('/office-partitioning')}>
          <img onClick={() => window.scrollTo(0, 0)} src={office_partition} alt="office partitioning" />
          <p>office partitioning</p>
        </div>
        <div className="service-card" onClick={() => navigate('/installation-of-frame-and-doors')}>
          <img onClick={() => window.scrollTo(0, 0)} src={frameNdoor_installation} alt="frame and doors installation" />
          <p>installation of frame and doors</p>
        </div>
        <div className="service-card" onClick={() => navigate('/installation-of-cabinets')}>
          <img onClick={() => window.scrollTo(0, 0)} src={cabinet_installation} alt="cabinet_installation" />
          <p>installation of cabinets</p>
          
        </div>
        <div className="service-card" onClick={() => navigate('/wall-painting')}>
          <img onClick={() => window.scrollTo(0, 0)} src={wall_painting} alt="wall painting" />
          <p>wall painting</p>
          
        </div>
      </div>
      </div>
  )
}
