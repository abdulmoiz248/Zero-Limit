'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import ProductReviews from '@/components/ProductReviews'
import { Product } from '@/Models/Product'
import { Review } from '@/Models/Review'
import { addToCart, removeFromCart, getCart } from '@/helper/cart'

export default function ProductPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [showReviews, setShowReviews] = useState(false)
  const [loadingReviews, setLoadingReviews] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isInCart, setIsInCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/getProduct/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          if (data.success) {
            setProduct(data.product)
            localStorage.setItem('product', JSON.stringify(data.product))
          }
        }
      } catch (error) {
        console.error("Error fetching product", error)
      }
    }

    const storedProduct = localStorage.getItem('product')
    if (storedProduct) {
      try {
        const parsedProduct: Product = JSON.parse(storedProduct)
        if (parsedProduct._id !== params.id) {
          fetchProduct()
          return
        }
        setProduct(parsedProduct)
      } catch (error) {
        console.error("Error parsing product from localStorage", error)
      }
    } else {
      fetchProduct()
    }
  }, [params.id])

  useEffect(() => {
    const cart = getCart()
    setIsInCart(!!cart[params.id])
  }, [params.id])

  const nextImage = () => {
    if (product && product.link) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.link.length)
    }
  }

  const prevImage = () => {
    if (product && product.link) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.link.length) % product.link.length)
    }
  }

  const handleShowReviews = async () => {
    setLoadingReviews(true)
    try {
      const res = await fetch(`/api/reviews/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setShowReviews(true)
          setReviews(data.reviews)
        }
      }
    } catch (error) {
      console.error("Error fetching reviews", error)
    } finally {
      setLoadingReviews(false)
    }
  }

  const handleCartToggle = () => {
    if (product) {
      if (isInCart) {
        removeFromCart(product._id)
      } else {
        addToCart(product, 1)
      }
      setIsInCart(!isInCart)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Skeleton className="w-full max-w-4xl h-[600px] rounded-lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <Card className="bg-gray-900 shadow-xl rounded-lg overflow-hidden mb-8">
          <CardContent className="p-0">
            <div className="lg:flex">
              <div className="lg:w-1/2 relative">
                <div className="sticky top-0 lg:h-[calc(100vh-2rem)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative w-full h-96 lg:h-full"
                    >
                      <Image
                        src={product.link[currentImageIndex]}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-between p-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={prevImage}
                          className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={nextImage}
                          className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl sm:text-4xl font-extrabold mb-4"
                  >
                    {product.name}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl sm:text-3xl font-bold text-primary mb-4"
                  >
                    ${product.price}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center mb-6"
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.ratings) ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                      />
                    ))}
                    <span className="ml-2 text-sm sm:text-base text-gray-400">
                      {product.ratings} out of 5 stars
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ height: 'auto' }}
                    animate={{ height: isDescriptionExpanded ? 'auto' : '4.5em' }}
                    transition={{ duration: 0.3 }}
                    className="text-sm sm:text-base text-gray-300 overflow-hidden relative mb-4"
                  >
                    <p>{product.description}</p>
                    {!isDescriptionExpanded && (
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent" />
                    )}
                  </motion.div>
                  <Button
                    variant="link"
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="text-primary hover:text-primary/80"
                  >
                    {isDescriptionExpanded ? 'Read less' : 'Read more'}
                  </Button>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-8"
                >
                  <Button
                    onClick={handleCartToggle}
                    className={`w-full ${isInCart ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary/90'} text-white`}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-gray-900 shadow-md rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
              {!showReviews && (
                <Button
                  variant="outline"
                  onClick={handleShowReviews}
                  className="text-primary hover:text-primary/80"
                >
                  View Reviews
                </Button>
              )}
              {loadingReviews && <Skeleton className="w-full h-20 rounded" />}
              {showReviews && !loadingReviews && <ProductReviews reviews={reviews} />}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}