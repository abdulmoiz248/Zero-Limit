'use client';

import React from 'react';
import CatCarousel from '@/components/CategoriesCarousel';
import ContinuousCarousel from '@/components/Featured'
import JoinUs from '@/components/JoinUs';

import MarqueeDemo from '@/components/Reviews'
import BelowHeader from '@/components/BelowHeader'
import LimitZeroManifesto from '@/components/AboutUs';

export default function Home() {
   
 
   

  return (
   
    <>
    <BelowHeader/>
    <CatCarousel />
    <LimitZeroManifesto/>
    <ContinuousCarousel/>
    
     <JoinUs/>
     <MarqueeDemo/>
   
   

    </>
  
  
  );
}
