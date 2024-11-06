'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/Models/Product'
import {  addToCart, isProductInCart, removeFromCart } from '@/helper/cart'
import { toast } from 'react-hot-toast';
interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const [isInCart, setIsInCart] = useState(false)

  useEffect(() => {
    if(isProductInCart(product._id as string))
       setIsInCart(true); 

  }, [product]);

  const handleCartToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isInCart) {
 
     removeFromCart(product._id as string);
     toast.error(`Product removed from cart!`, {
      duration: 2000, 
      position: 'top-right', // Position of the toast
      style: {
        backgroundColor: '#F44336', // Red background for error
        color: 'white',
        fontSize: '16px',
      },
    });
    } else {
        addToCart(product, 1);
        toast.success(`Product added to cart!`, {
          duration: 2000, // Display for 3 seconds
          position: 'top-right', // Position of the toast
          style: {
            backgroundColor: '#4CAF50', // Green background for success
            color: 'white',
            fontSize: '18px',
          },
        });
    }

    setIsInCart(!isInCart)
  }

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
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl cursor-pointer"
    >
      <div className="relative">
        <Image
          src={product.link[0] || '/placeholder.svg'}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-56 object-cover"
        />
        {product.discountPercent > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-0 left-0 bg-black text-white px-3 py-1 m-3 rounded-full text-sm font-semibold"
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
          <motion.button
            onClick={handleCartToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${
              isInCart ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'
            } text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center`}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isInCart ? 'Remove' : 'Add to Cart'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
