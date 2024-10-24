"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Star, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Product } from "@/Models/Product"


function FeaturedProductCard({ product }: { product: Product }) {
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discountPercent / 100) 
    : product.price;

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="relative p-0">
        <div className="relative w-full h-48">
          <Image
            src={product.link[0]}
            alt={product.name}
            fill
            className="rounded-t-lg object-cover"
          />
          {product.discount && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              {product.discountPercent}% OFF
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-4">
        <CardTitle className="text-lg line-clamp-2 h-14 mb-2">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-lg font-semibold text-primary">${discountedPrice.toFixed(2)}</p>
            {product.discount && (
              <p className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</p>
            )}
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.ratings) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">({product.numReviews})</span>
          </div>
        </div>
      </CardContent>
     
    </Card>
  )
}

export default function ContinuousCarousel({ featuredProducts}: { featuredProducts: Product[] }) {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>(featuredProducts)
  const [width, setWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const duration = 60 

  useEffect(() => {
    console.log(featuredProducts);
    if (products.length > 0) {
      setWidth(calculateWidth())
    }
  }, [products])

  useEffect(() => {
    if (width > 0) {
      startAnimation()
    }
  }, [width])

  const calculateWidth = () => {
    if (containerRef.current) {
      const cardWidth = 300 // Increased card width
      const gap = 24 // Increased gap between cards
      return products.length * (cardWidth + gap)
    }
    return 0
  }

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
    })
  }

  const handleMouseEnter = () => {
    controls.stop()
  }

  const handleMouseLeave = () => {
    startAnimation()
  }

  const handleProductClick = (product: Product) => {
    localStorage.setItem('product', JSON.stringify(product))
    router.push(`Product/${product._id}`)
  }

  if (products.length === 0) {
    return (
      <section className="w-full py-16 bg-gradient-to-r from-secondary to-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-primary mb-10">Featured Products</h1>
          <p className="text-lg text-muted-foreground">No featured products available at the moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-16 bg-gradient-to-r from-secondary to-secondary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-primary mb-10">Featured Products</h1>

        <div
          className="overflow-hidden w-full"
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="flex"
            animate={controls}
            style={{ width: `${width * 2}px` }}
          >
            {[...products, ...products].map((product, index) => (
              <div 
                key={`${product._id}-${index}`} 
                className="flex-shrink-0 w-[300px] h-[450px] mx-3 cursor-pointer" 
                onClick={() => handleProductClick(product)}
              >
                <FeaturedProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}