"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { Product } from "@/Models/Product";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

let products: Product[] = [];

function FeaturedProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col transition-transform transform hover:scale-105">
      <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14">{product.name}</h3>
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.link[0]}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
      <div className="flex items-center mt-auto">
        <span className="text-yellow-500 mr-1" aria-hidden="true">
          ★
        </span>
        <span>{product.ratings.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default function ContinuousCarousel() {
  let router=useRouter();
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const duration = 40; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/getFeatured");
        if (res.data.success) {
          products = res.data.products;
          setWidth(calculateWidth());
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (width > 0) {
      startAnimation();
    }
  }, [width]);

  const calculateWidth = () => {
    if (containerRef.current) {
      const cardWidth = 280; // Fixed card width
      const gap = 16; // gap between cards
      return products.length * (cardWidth + gap);
    }
    return 0;
  };

  const startAnimation = () => {
    controls.start({
      x: [-width, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      },
    });
  };

  const handleMouseEnter = () => {
    controls.stop(); // Stop the animation on hover
  };

  const handleMouseLeave = () => {
    startAnimation(); // Restart the animation when mouse leaves
  };

  const sectionVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <motion.section
      className="w-full py-16 bg-gray-50"
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-primary mb-8">Featured Products</h1>

        <div
          className="overflow-hidden w-full"
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="flex"
            animate={controls}
            style={{ width: `${width * 2}px` }} // Width doubled for continuous effect
          >
             
            {[...products, ...products].map((product, index) => (
              <div key={index} className="flex-shrink-0 w-[280px] h-[400px] mr-4 " onClick={()=>{
                router.push(`product/${product._id}`)
              }}>
                <FeaturedProductCard product={product}  />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
