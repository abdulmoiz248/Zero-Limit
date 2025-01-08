'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const product = {
  name: "Zero Limit Co-ord Set",
  description: "Unleash your fearless style with the Zero Limit Special Sweat and Trouser Set. Combining bold aesthetics with premium comfort, this matching set features iconic Zero Limit branding on a sleek sweatshirt and ultra-soft trousers. Perfect for workouts, casual outings, or lounging, it offers warmth, durability, and effortless style—making a confident statement wherever you go.",
  price: 6999,
  discountedPrice: 3500,
  images: [
    "/products/set-1.jpeg", "/products/z-1.jpeg",
  ],
  rating: 5,
  features: [
    "Premium Fabric: Crafted with ultra-soft, high-quality fabric, offering unmatched comfort and durability.",
    "350+ GSM Material: Ensures superior thickness and warmth for all-day wear.",
    "Iconic Branding: Features the bold 'Zero Limit' logo, reflecting fearless style and modern aesthetics.",
    "Versatile Design: Perfect for workouts, casual outings, or relaxing in style.",
    "Matching Set: Includes a sleek sweatshirt and comfortable trousers for a cohesive, put-together look.",
    "Exceptional Fit: Designed for both comfort and style, with a flattering, modern silhouette.",
    "Long-Lasting Quality: Built to retain shape and color after repeated washes."
  ]
};

export default function EnhancedHotProductShowcase() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-800 to-white min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-6xl w-full border border-black"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-96 lg:h-full"
              >
                <Image
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} - View ${currentImageIndex + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </AnimatePresence>
            <motion.div
              className="absolute top-1/2 left-4 transform -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="outline" size="icon" onClick={prevImage} className="rounded-full bg-black/80 hover:bg-black text-white">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="outline" size="icon" onClick={nextImage} className="rounded-full bg-black/80 hover:bg-black text-white">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          <div className="lg:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-gray-900 text-white">Hot Deal</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
              <p className="text-sm sm:text-base text-gray-600 mb-6">{product.description}</p>
              <div className="flex items-center mb-6">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mr-4">Rs.{product.discountedPrice.toFixed(2)}</div>
                <div className="text-lg sm:text-xl text-gray-500 line-through">Rs.{product.price.toFixed(2)}</div>
                <Badge variant="secondary" className="ml-4 bg-black text-white">
                  Save Rs.{(product.price - product.discountedPrice).toFixed(2)}
                </Badge>
              </div>
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
              </div>
              {/* Features - Hidden on Mobile */}
              <div className="mb-6 hidden md:block">
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    router.push('/Product/67362287c0f4c9f519e15507');
                  }}
                  className="w-full py-6 text-lg font-semibold bg-black hover:bg-gray-900 text-white transition-colors duration-300"
                >
                  <ShoppingCart className="mr-2 h-6 w-6" /> Shop Now
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
