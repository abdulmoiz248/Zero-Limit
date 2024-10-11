'use client';

import React from 'react';
import LionLoader from '@/components/LionLoader'

import CatCarousel from '@/components/CategoriesCarousel';
import ContinuousCarousel from '@/components/Featured'
import JoinUs from '@/components/JoinUs';
import ReviewSection from '@/components/ReviewUs';
import MarqueeDemo from '@/components/Reviews'
 import ZeroCard from '@/components/ZeroCard';
import ZeroLimitPage from '@/components/Tiger';

export default function Home() {
   
 
   

  return (
   
    <>
    {/* <ZeroCard/> */}
    <ZeroLimitPage></ZeroLimitPage>
    <CatCarousel />
    <ContinuousCarousel/>
    
     <JoinUs/>
     <MarqueeDemo/>
     <ReviewSection/>
  

   <LionLoader/>
    </>
  
  
  );
}
