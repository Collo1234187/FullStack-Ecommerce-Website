import React from 'react'
import '@google/model-viewer';
import { Hero } from '../Components/Hero/Hero'
import { Hero1 } from '../Components/Hero1/Hero1';

import { New } from '../Components/New/New';
import { All } from '../Components/All/All';
import { NewsLetter } from '../Components/NewLetter/NewsLetter';
import { HotCategory } from '../Components/HotCategory/HotCategory';



export const Shop = () => {
  return (
    <div>
      
      <Hero/>
      <Hero1/>
      <HotCategory/>
      <New/>
      <All/>
      <NewsLetter/>
     
     
    </div>
  )
}
