'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {  Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/Models/Product'


interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()

  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)



  useEffect(() => {
    if (isHovered && product.link.length > 1) {
      const timer = setTimeout(() => {
        setCurrentImageIndex(1)
      }, 300) // Delay the image change by 300ms
      return () => clearTimeout(timer)
    } else {
      setCurrentImageIndex(0)
    }
  }, [isHovered, product.link])

    

  const discountAmount = (product.price * product.discountPercent) / 100
  const discountedPrice = product.price - discountAmount

  return (
    <motion.div
      onClick={() => {
        localStorage.setItem('product', JSON.stringify(product))
        router.push(`/Product/${product._id}`)
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl cursor-pointer"
    >
      <div className="relative w-full pt-[100%]"> {/* Changed height to padding-top for aspect ratio */}
        <div className="absolute inset-0 overflow-hidden">
          {product.link.slice(0, 2).map((src, index) => (
            <Image
              key={index}
              src={src || '/placeholder.svg'}
              alt={`${product.name} - Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center 20%" // Adjust this value to move the focal point up
              className={`transition-opacity duration-300 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        {product.discountPercent > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-0 left-0 bg-black text-white px-3 py-1 m-3 rounded-full text-sm font-semibold z-10"
          >
            -{product.discountPercent}%
          </motion.div>
        )}
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2 text-gray-800 truncate">{product.name}</h2>
        <div className="flex items-center mb-3">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${
                index < Math.round(product.ratings) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({product.ratings.toFixed(1)})</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            {product.discountPercent > 0 && (
              <p className="text-gray-500 text-sm line-through">
                Rs{product.price.toFixed(2)}
              </p>
            )}
            <p className="text-2xl font-bold text-gray-800">
              Rs {(product.discountPercent > 0 ? discountedPrice : product.price).toFixed(2)}
            </p>
          </div>
          {/* <motion.button
            onClick={handleCartToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${
              isInCart ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'
            } text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center`}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isInCart ? 'Remove' : 'Add to Cart'}
          </motion.button> */}
        </div>
      </div>
    </motion.div>
  )
}