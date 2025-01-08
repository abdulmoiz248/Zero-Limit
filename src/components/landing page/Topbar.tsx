"use client";

import { motion, AnimatePresence } from "framer-motion";
 
import Link from "next/link";
import { useEffect, useState } from "react";


const messages = [
  "Welcome to Zero Limit"," Unleash Your Fearless Style!","Clearance Sale Live Now"
  ,"Upto 50% off"
];

export default function TopBar({ scrollPosition }: { scrollPosition: number }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {scrollPosition > 50 && (
        <motion.div
          className="fixed top-16 left-0 w-full bg-black text-white py-2 px-4 z-40"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center">
           
            <motion.div
              key={currentMessageIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center flex-1"
            >
              <span className="font-bold">{messages[currentMessageIndex]}</span>
            </motion.div>
            <Link
              href="/all-products"
              className="ml-4 px-4 py-1 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
