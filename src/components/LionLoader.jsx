'use client';
import React, { useEffect } from "react";
import { motion } from "framer-motion";

const LionLoader = () => {
  const hairVariants = {
    start: { fill: "#4A4A4A" }, // Initial grey color
    animate: {
      fill: ["#000000", "#4A4A4A"], // Black to grey
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2, // Adjust duration as needed
      },
    },
  };

  const svgVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // Start with hidden and small
    visible: {
      opacity: [0, 1, 0], // Fade in and out
      scale: [1, 1.2, 1], // Increase and decrease size
      transition: {
        duration: 4, // Duration of the fade and scale animation
        repeat: Infinity, // Repeat the animation infinitely
      },
    },
  };

  // Effect to handle scrolling and body overflow
  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Cleanup function to reset overflow
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 189"
        preserveAspectRatio="xMidYMid meet"
        className="w-48 h-48"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
      >
        <g
          transform="translate(0.000000,189.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          {/* Animated lion's hair */}
          <motion.path
            d="M1395 1501 c-123 -16 -223 -106 -197 -179 14 -42 -10 -91 -62 -126 -44 -30 -76 -71 -76 -98 0 -8 11 -25 25 -38 14 -13 25 -31 25 -40 0 -9 5 -21 11 -27 8 -8 8 -17 -1 -32 -6 -12 -9 -32 -7 -44 4 -19 4 -19 6 4 1 30 25 56 36 39 3 -5 13 -10 22 -10 9 0 27 -10 40 -22 13 -12 23 -16 23 -10 0 7 0 15 0 20 0 4 -4 7 -9 7 -5 0 -13 3 -17 8 -4 4 -15 7 -24 7 -27 0 -70 39 -70 64 0 15 9 27 25 34 42 19 29 32 -25 25 -31 -4 -50 -2 -50 4 0 14 84 91 115 105 16 7 25 19 25 33 0 37 46 68 118 80 28 4 42 3 42 -4 0 -6 -10 -12 -22 -12 -21 -1 -21 -2 -3 -6 11 -3 24 -9 29 -14 5 -4 18 -3 28 2 19 10 19 11 2 23 -11 8 -14 18 -9 26 7 11 10 9 15 -6 6 -17 9 -15 23 13 19 36 45 47 87 38 35 -8 71 -49 63 -73 -3 -9 -22 -32 -42 -49 -31 -28 -33 -33 -15 -33 11 0 25 5 30 10 7 7 16 4 28 -9 18 -20 47 -93 40 -100 -2 -2 -19 8 -38 23 -47 35 -64 33 -32 -5 27 -32 35 -89 16 -119 -7 -12 -11 -8 -16 18 -10 50 -24 49 -24 -2 0 -44 -3 -48 -95 -139 -91 -88 -95 -95 -95 -135 0 -24 4 -41 9 -38 4 3 13 -12 20 -34 6 -21 16 -42 22 -46 8 -4 8 0 0 14 -17 32 -13 81 10 129 20 42 58 79 149 146 25 18 55 51 68 74 40 72 50 193 16 193 -7 0 -21 11 -29 24 -14 21 -14 31 -4 65 l12 40 66 -6 c55 -5 64 -3 53 8 -7 7 -41 15 -78 17 -43 3 -67 9 -71 18 -3 8 -14 14 -24 14 -10 0 -19 5 -19 10 0 6 6 10 14 10 8 0 17 4 21 9 7 13 -60 2 -104 -15 -48 -20 -50 -10 -4 20 106 70 223 59 323 -31 52 -46 65 -43 29 8 -24 35 -87 72 -149 90 -25 7 -54 18 -65 25 -22 13 -131 16 -210 5z m5 -32 c-12 -9 -11 -9 5 -3 34 13 205 17 205 5 0 -7 -22 -11 -57 -11 -50 0 -65 -5 -112 -37 -38 -27 -50 -39 -38 -41 30 -6 -49 -52 -88 -52 -19 0 -37 -5 -40 -10 -8 -13 -25 -3 -21 13 1 7 1 9 -1 4 -3 -4 -9 -5 -14 -1 -5 3 -9 -7 -9 -21 0 -15 -4 -24 -10 -20 -19 12 -10 63 17 96 26 31 133 89 163 89 13 0 13 -2 0 -11z"
            variants={hairVariants}
            initial="start"
            animate="animate"
          />
        </g>
      </motion.svg>
    </div>
  );
};

export default LionLoader;
