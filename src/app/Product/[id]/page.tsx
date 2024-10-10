'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductReviews from '@/components/ProductReviews'

// Sample product data
const product = {
  id: 1,
  name: "Ultra HD Smart TV",
  price: 1299,
  rating: 4.5,
  description: "lorem ipsum dolor sit amet lorem lorem ipsum dolor sit amet lorem ipsum d Lorem ipsum dolor sit amet lorem lorem ips   lorem ipsum dolor sit amet lorem lore  lorem lorem  lorem*2 lorem*2 lorem      lorem ipsum dolor sit amet lorem ipsum d Lore m lorem ipsum dolor sit amet lorem lorem ipsum dolor sit amet lorem ipsum d Lorem ipsum dolor sit amet lorem lorem ips   lorem ipsum dolor sit amet lorem lore  lorem lorem  lorem*2 lorem*2 lorem      lorem ipsum dolor sit amet lorem ipsum d Lore m lorem ipsum dolor sit amet lorem lorem ipsum dolor sit amet lorem ipsum d Lorem ipsum dolor sit amet lorem lorem ips   lorem ipsum dolor sit amet lorem lore  lorem lorem  lorem*2 lorem*2 lorem      lorem ipsum dolor sit amet lorem ipsum d Lore m lorem ipsum dolor sit amet lorem lorem ipsum dolor sit amet lorem ipsum d Lorem ipsum dolor sit amet lorem lorem ips   lorem ipsum dolor sit amet lorem lore  lorem lorem  lorem*2 lorem*2 lorem      lorem ipsum dolor sit amet lorem ipsum d Lore m lorem ipsum dolor sit amet lorem lorem ipsum dolor sit amet lorem ipsum d Lorem ipsum dolor sit amet lorem lorem ips   lorem ipsum dolor sit amet lorem lore  lorem lorem  lorem*2 lorem*2 lorem      lorem ipsum dolor sit amet lorem ipsum d Lore m lorem ipsum dolor sit amet lorem lorem ipsum dolor sit amet lorem ipsum d Lorem ipsum dolor sit amet lorem lorem ips   lorem ipsum dolor sit amet lorem lore  lorem lorem  lorem*2 lorem*2 lorem      lorem ipsum dolor sit amet lorem ipsum d Lore m",
  features: [
    "4K Ultra HD Resolution",
    "Smart TV capabilities",
    "HDR technology",
    "Multiple HDMI ports",
    "Voice control compatibility",
    "Sleek, modern design",
  ],
  images: [
   "/images/download.jfif",
    "/images/download.jfif"
  ],
}

// Hardcoded reviews array (to be replaced with API data later)
const reviews = [
  { id: 1, username: "TechEnthusiast", rating: 5, comment: "This TV is a game-changer! The picture quality is unbelievable, and the smart features are so intuitive. Highly recommend!", date: "2023-05-15" },
  { id: 2, username: "MovieBuff123", rating: 4, comment: "Great TV for movie nights. The colors are vibrant, and the sound is pretty good too. Only wish it had a few more apps available.", date: "2023-05-10" },
  { id: 3, username: "GamingPro", rating: 5, comment: "As a gamer, I'm blown away by the low input lag and smooth motion. It's like this TV was made for gaming!", date: "2023-05-05" },
  // ... (other reviews)
]

export default function ProductPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <div className="sticky top-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-96 md:h-full"
                  >
                    <Image
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      fill // Modern prop replacing layout="fill"
                      style={{ objectFit: "cover" }} // Modern style replacing objectFit="cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                      <button
                        onClick={prevImage}
                        className="bg-white rounded-full p-2 mt-[30%] shadow-md z-10 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-800" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="bg-white rounded-full mt-[30%] p-2 shadow-md z-10 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-800" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
                >
                  {product.name}
                </motion.h2>
                <p className="mt-2 text-3xl font-bold text-[#3498db]">${product.price}</p>
                <div className="mt-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                    />
                  ))}
                  <span className="ml-2 text-gray-600">{product.rating} out of 5 stars</span>
                </div>
                <motion.div
                  initial={{ height: 'auto' }}
                  animate={{ height: isDescriptionExpanded ? 'auto' : '4.5em' }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-base text-gray-700 overflow-hidden relative"
                >
                  <p>{product.description}</p>
                  {!isDescriptionExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
                  )}
                </motion.div>
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-2 text-[#3498db] hover:underline focus:outline-none font-semibold"
                >
                  {isDescriptionExpanded ? 'Read less' : 'Read more'}
                </button>
                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-6 space-y-2"
                >
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center text-gray-600"
                    >
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              <div className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#3498db] text-white px-6 py-3 rounded-md font-semibold text-lg flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <ProductReviews reviews={reviews} />
        </div>
      </div>
    </div>
  )
}
