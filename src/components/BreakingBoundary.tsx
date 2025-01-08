'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const BoundaryBreakingBanner: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      className="relative w-full h-[60vh] md:h-screen bg-white overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="banner"
    >
      {/* Stylish Gradient Background */}
      <div className="absolute inset-0 "></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 md:px-12 py-8 lg:py-12">
        <h1 className="text-6xl md:text-8xl font-extrabold text-black mb-6 leading-tight">
          Fearless<br /> Clearance Sale
        </h1>
        <p className="text-2xl md:text-4xl font-semibold mb-8 tracking-wide text-black opacity-90">
          Save upto <span className="text-indigo-500">50% OFF</span> on All Items
        </p>
        <button
          className="relative overflow-hidden bg-indigo-600 text-white px-10 py-5 rounded-full font-bold text-lg md:text-xl transition-all duration-300 transform hover:scale-110"
          style={{
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
          }}
          onClick={() => {
            router.push('/all-products');
          }}
        >
          <span className="relative z-10">Shop the Collection</span>
          <div
            className="absolute inset-0 bg-indigo-800"
            style={{
              clipPath: `circle(${isHovered ? '150%' : '0%'} at 50% 50%)`,
              transition: 'clip-path 0.4s ease-out',
            }}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default BoundaryBreakingBanner;
