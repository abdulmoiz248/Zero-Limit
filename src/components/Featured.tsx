"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Product {
  _id: string
  name: string
  link: string[]
  price: number
  ratings: number
}

function FeaturedProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full flex flex-col transition-transform hover:scale-105">
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2 h-14">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="relative w-full h-48 mb-4">
          <Image
            src={product.link[0]}
            alt={product.name}
            fill
            className="rounded object-cover"
          />
        </div>
        <p className="text-muted-foreground mb-2">${product.price.toFixed(2)}</p>
        <div className="flex items-center mt-auto">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span>{product.ratings.toFixed(1)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ContinuousCarousel() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [width, setWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const duration = 40

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/getFeatured")
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setProducts(data.products)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
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
      const cardWidth = 280 // Fixed card width
      const gap = 16 // gap between cards
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
    controls.stop() // Stop the animation on hover
  }

  const handleMouseLeave = () => {
    startAnimation() // Restart the animation when mouse leaves
  }

  const handleProductClick = (product: Product) => {
    localStorage.setItem('product', JSON.stringify(product))
    router.push(`Product/${product._id}`)
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="w-full py-16 bg-secondary">
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
            style={{ width: `${width * 2}px` }} // Width doubled for continuous effect
          >
            {[...products, ...products].map((product, index) => (
              <div 
                key={`${product._id}-${index}`} 
                className="flex-shrink-0 w-[280px] h-[400px] mr-4 cursor-pointer" 
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