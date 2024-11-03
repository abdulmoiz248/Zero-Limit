
'use client'

import { motion } from 'framer-motion'
import {  ShoppingCart } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from '@/Models/Product'
import Reviews from '@/components/Review'
import { addToCart, isProductInCart } from '@/helper/cart'
import LionLoader from '@/components/LionLoader'
import { useRouter } from 'next/navigation'

export default function Component({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const fullscreenRef = useRef<HTMLDivElement>(null)
  const [product, setProduct] = useState<Product>()
  const [isInCart, setIsInCart] = useState(false)
  const [loading,setLoading]=useState(true);

  const router=useRouter();
  useEffect(() => {
    
    if(isProductInCart(product?._id as string))
       setIsInCart(true); 
    console.log("cart")
  }, [product]);

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
          setLoading(false);
          return
        }
        setProduct(parsedProduct)
        setLoading(false);
      } catch (error) {
        console.error("Error parsing product from localStorage", error)
      }
    } else {
      fetchProduct()
      setLoading(false);
    }
  }, [])

  const handleCartToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart') || '{}')

    if (isInCart) {
 
      delete cart[product?._id as string]
    } else {
        addToCart(product!, 1);
    }

    setIsInCart(!isInCart)
  }
  


  const toggleDescription = () => {
    setIsDescriptionExpanded((prev) => !prev)
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

  if(loading){
    return <LionLoader/>
  }
  return (
    <div className="min-h-screen pt-20 bg-white p-8">
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <Card className="max-w-7xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Vertical scrollable image column */}
            <div className="w-full lg:w-24 lg:h-[600px] flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden hide-scrollbar">
              {product?.link.map((image, index) => (
                <div
                  key={index}
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
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main product image */}
            <div className="flex-grow cursor-pointer" onClick={handleImageClick}>
              <Image
                src={product?.link[currentImageIndex] || "/images/logo.png"}
                alt={product?.name || "img"}
                width={600}
                height={600}
                className="object-cover w-full h-auto"
              />
            </div>

            {/* Product details */}
            <div className="lg:w-1/3 space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">{product?.name}</h1>
              
              {/* Expandable Description */}
              <div>
                <p className={`text-gray-600 ${isDescriptionExpanded ? '' : 'line-clamp-5'}`}>
                  {product?.description}
                </p>
                {product?.description && product.description.split('\n').length > 5 && (
                  <button
                    onClick={toggleDescription}
                    className="text-primary hover:underline mt-2"
                  >
                    {isDescriptionExpanded ? 'Read less' : 'Read more'}
                  </button>
                )}
              </div>
              
              <p className="text-3xl font-bold text-primary">Rs.{product?.price.toFixed(2)}</p>
              <div className="flex items-center space-x-1 text-yellow-500">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5 fill-current" 
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927a1 1 0 011.902 0l1.45 4.455a1 1 0 00.95.691h4.708a1 1 0 01.6 1.8l-3.812 2.766a1 1 0 00-.364 1.118l1.45 4.455a1 1 0 01-1.54 1.117L10 15.347l-3.942 2.882a1 1 0 01-1.54-1.118l1.45-4.455a1 1 0 00-.364-1.118L1.793 9.873a1 1 0 01.6-1.8h4.708a1 1 0 00.95-.691l1.45-4.455z" />
  </svg>
  <span className="text-lg font-semibold">{product?.ratings}/5</span>
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
          
              <Button onClick={(e)=>{
                handleCartToggle(e);
                router.push('/Cart');
              }}
               variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">Buy Now</Button>
            </div>
          </div>

          {/* Fullscreen image viewer */}
          {isFullscreen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div ref={fullscreenRef} className="max-w-4xl max-h-full overflow-auto hide-scrollbar">
                <Image
                  src={product?.link[currentImageIndex] || "/images/logo.png"}
                  alt={product?.name || "img"}
                  width={1200}
                  height={1200}
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Reviews productId={params.id}></Reviews>
    </div>
  )
}
