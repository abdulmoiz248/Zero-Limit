import React from 'react';
import { motion } from 'framer-motion';

export default function HeaderContent() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
   <motion.h1
  className="text-3xl text-[#F5EEDC]  sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 text-shadow-lg text-center"
  initial={{ opacity: 0, translateY: 20 }}
  animate={{ opacity: 1, translateY: 0 }}
  transition={{ duration: 0.8, delay: 0.1 }} // Delayed start for sequential animations
>
  Zero Limit
</motion.h1>


      <motion.p
        className="text-sm sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl text-center text-shadow"
        initial={{ opacity: 0, translateY: 20 }} // Initial state
        animate={{ opacity: 1, translateY: 0 }} // Animation to this state
        transition={{ duration: 0.8, delay: 0.2 }} // Animation duration with a delay
      >
        Unleash your wild side with Zero Limit Clothing. Embrace your strength and style with our unique collections
        designed for those who dare to stand out.
      </motion.p>
    </div>
  );
}
