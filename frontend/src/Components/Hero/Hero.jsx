import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import './Hero.css'

export const Hero = () => {
  const navigate = useNavigate();
   
  const products = React.useMemo(() => [
  { id: 1,model: process.env.PUBLIC_URL + "/Models/SOFA_BANNER5.jpg", route:"/sofa" },
  { id: 2,model: process.env.PUBLIC_URL + "/Models/DINIING_BANNER3.jpg", route:"/dining" },
  { id: 3,model: process.env.PUBLIC_URL + "/Models/CHAIR_BANNER2.jpg", route:"/chair" },
  { id: 4,model: process.env.PUBLIC_URL + "/Models/MATTRESS_BANNER6.jpg", route:"/mattress" },
  { id: 5,model: process.env.PUBLIC_URL + "/Models/PILLOW_BANNER7.jpg", route:"/pillow" },
  { id: 6,model: process.env.PUBLIC_URL + "/Models/BED_BANNER4.jpg", route:"/bed" }
], []);


  const lastTap = React.useRef(0);

  const handleDoubleTap = (route) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      navigate(route); 
    }
    lastTap.current = now;
  };

  return (
   
      <div className="hero-swiper">
        <Swiper
          className="swiper"
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000, 
            disableOnInteraction: false, 
          }}
          modules={[Autoplay]} 
          style={{ width: '100%', height: 'auto'}}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div
                className="banner-wrapper"
                onClick={() => handleDoubleTap(product.route)}
                style={{ cursor: 'pointer'}}
              >  
                
              
                <img 
                  className="banner"
                  src={product.model} 
                  alt={product.name} 
       
                />
                

                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
   
  );
};
