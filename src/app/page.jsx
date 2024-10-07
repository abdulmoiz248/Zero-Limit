'use client';

import React, { useEffect, useRef } from 'react';


import CatCarousel from '@/components/CategoriesCarousel';
import ContinuousCarousel from '@/components/Featured'
import JoinUs from '@/components/JoinUs';
import ReviewSection from '@/components/ReviewUs';
import MarqueeDemo from '@/components/Reviews'

import ZeroLimitPage from '@/components/Tiger';

export default function Home() {
   
 
   

  return (
    <>
      
     <ZeroLimitPage></ZeroLimitPage>
    <CatCarousel />
    <ContinuousCarousel/>
    <JoinUs/>
    <MarqueeDemo/>
    <ReviewSection/>
  
    </>
  
  
  );
}
