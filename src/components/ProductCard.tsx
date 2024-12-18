'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/Models/Product'
import ProductModal from './ProductModal'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"
interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()

  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (isHovered && product.link.length > 1) {
      const timer = setTimeout(() => {
        setCurrentImageIndex(1)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setCurrentImageIndex(0)
    }
  }, [isHovered, product.link])

  const discountAmount = (product.price * product.discountPercent) / 100
  const discountedPrice = product.price - discountAmount

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  return (
    <>
      <motion.div
        onClick={() => {
          localStorage.setItem('product', JSON.stringify(product))
          router.push(`/Product/${product._id}`)
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05, y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl cursor-pointer"
      >
        <div className="relative w-full pt-[100%]">
          <AnimatePresence>
            {product.link.slice(0, 2).map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={src || '/placeholder.svg'}
                  alt={`${product.name} - Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center 20%"
                />
              </motion.div>
            ))}
          </AnimatePresence>
         {
          product.unisex && 
          <Badge className="absolute top-2 right-2 rounded-full px-4 py-1 bg-[#000000] text-white shadow-lg hover:shadow-xl transition-shadow">
          Unisex
        </Badge>
         }

          {product.discountPercent > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-0 left-0 bg-[#1b03a3] text-white px-3 py-1 m-3 rounded-full text-sm font-semibold z-10"
            >
              -{product.discountPercent}%
            </motion.div>
          )}
        </div>
        <div className="p-5 bg-gradient-to-b from-white to-gray-50">
          <h2 className="text-xl font-bold mb-2 text-black truncate">{product.name}</h2>
          <div className="flex items-center mb-3">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={`h-5 w-5 ${
                  index < Math.round(product.ratings) ? 'text-[#ffff30] fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({product.ratings.toFixed(1)})</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              {product.discountPercent > 0 && (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-500 text-sm line-through"
                >
                  Rs. {product.price.toFixed(2)}
                </motion.p>
              )}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-[#1b03a3]"
              >
                Rs. {(product.discountPercent > 0 ? discountedPrice.toFixed(0) : product.price)}
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleAddToCart}
                variant="outline"
                size="sm"
                className="flex rounded items-center space-x-2 bg-[#1b03a3] text-white hover:bg-[#2d14b5] border-none"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <ProductModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} Product={product} />
    </>
  )
}

