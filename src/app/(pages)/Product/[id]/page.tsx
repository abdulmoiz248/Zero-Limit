'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Star,  X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from '@/Models/Product'
import Reviews from '@/components/Review'
import LionLoader from '@/components/LionLoader'
import { useRouter } from 'next/navigation'
import ProductModal from '@/components/ProductModal'
import Description from '@/components/Description'

export default function Component({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
 
  const fullscreenRef = useRef<HTMLDivElement>(null)
  const [product, setProduct] = useState<Product>()

  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()



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
      } finally {
        setLoading(false)
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
        setLoading(false)
      } catch (error) {
        console.error("Error parsing product from localStorage", error)
        fetchProduct()
      }
    } else {
      fetchProduct()
    }
  }, [params.id])

  const handleCartToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    
      setIsModalOpen(true);
    
  
  }

 

  const handleImageClick = () => {
    setIsFullscreen(true)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fullscreenRef.current && !fullscreenRef.current.contains(event.target as Node)) {
        setIsFullscreen(false)
      }
    }

    if (isFullscreen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFullscreen])

  if (loading) {
    return <LionLoader />
  }

  const discountedPrice = product?.discountPercent
    ? product.price - (product.price * product.discountPercent) / 100
    : product?.price

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 to-white p-8">
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    
       <ProductModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} Product={product!} />
      <Card className="max-w-7xl mx-auto shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Vertical scrollable image column */}
            <div className="w-full lg:w-24 lg:h-[600px] flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden hide-scrollbar">
              {product?.link.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 cursor-pointer ${
                    index === currentImageIndex ? 'border-2 border-primary' : 'border border-gray-200'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={96}
                    height={96}
                    className="object-cover rounded-md"
                  />
                </motion.div>
              ))}
            </div>

            {/* Main product image */}
            <motion.div 
              className="flex-grow cursor-pointer"
              onClick={handleImageClick}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={product?.link[currentImageIndex] || "/images/logo.png"}
                alt={product?.name || "Product image"}
                width={600}
                height={600}
                className="object-cover w-full h-auto rounded-lg shadow-md"
              />
            </motion.div>

            {/* Product details */}
            <div className="lg:w-1/3 space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-gray-900"
              >
                {product?.name}
              </motion.h1>
              
              {/* Expandable Description */}
             <Description description={product?.description}/>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center space-x-2"
              >
                <p className="text-3xl font-bold text-primary">Rs.{discountedPrice?.toFixed(2)}</p>
                {(product?.discountPercent!=0 ) && (
                  <div className="flex items-center">
                    <p className="text-xl text-gray-500 line-through">Rs.{product?.price.toFixed(2)}</p>
                    <p className="text-lg text-green-600 ml-2">({product?.discountPercent}% off)</p>
                  </div>
                )}
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center space-x-1 text-yellow-500"
              >
                <Star className="h-5 w-5 fill-current" />
                <span className="text-lg font-semibold">{product?.ratings}/5</span>
              </motion.div>
  
              <motion.button
                onClick={handleCartToggle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${
                 'bg-black hover:bg-gray-800'
                } text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center w-full`}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                { 'Add to Cart'}
              </motion.button>
          
              <Button 
                onClick={(e) => {
                  handleCartToggle(e)
                  router.push('/Cart')
                }}
                variant="outline" 
                className="w-full border-primary text-primary hover:bg-primary/10"
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Fullscreen image viewer */}
          <AnimatePresence>
            {isFullscreen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              >
                <motion.div 
                  ref={fullscreenRef}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="max-w-4xl max-h-full overflow-auto hide-scrollbar relative"
                >
                  <Image
                    src={product?.link[currentImageIndex] || "/images/logo.png"}
                    alt={product?.name || "Full size product image"}
                    width={1200}
                    height={1200}
                    className="object-contain w-full h-auto"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
                    onClick={() => setIsFullscreen(false)}
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <Reviews productId={params.id} />
    </div>
  )
}