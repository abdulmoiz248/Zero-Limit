'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
const products = [
  {
    name: "Premium Wireless Headphones",
    price: 199.99,
    rating: 4.5,
    image: "/images/download.jfif"
  },
  {
    name: "Smartwatch",
    price: 149.99,
    rating: 4.7,
    image: "/images/download.jfif"
  },
  {
    name: "Bluetooth Speaker",
    price: 89.99,
    rating: 4.3,
    image: "/images/download.jfif"
  },
  {
    name: "Gaming Mouse",
    price: 59.99,
    rating: 4.8,
    image: "/images/download.jfif"
  },
  {
    name: "Wireless Charger",
    price: 29.99,
    rating: 4.6,
    image: "/images/download.jfif"
  },
];

function FeaturedProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14">{product.name}</h3>
      <div className="relative w-full h-48 mb-4">
        <Image 
          src={product.image} 
          alt={product.name} 
          layout="fill" 
          objectFit="cover" 
          className="rounded"
        />
      </div>
      <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
      <div className="flex items-center mt-auto">
        <span className="text-yellow-500 mr-1" aria-hidden="true">★</span>
        <span>{product.rating.toFixed(1)}</span>
      </div>
    </div>
  )
}

export default function ContinuousCarousel() {
  const controls = useAnimation()
  const [width, setWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateWidth = () => {
      if (containerRef.current) {
        const cardWidth = containerRef.current.offsetWidth
        const gap = 16 // gap between cards
        return products.length * (cardWidth + gap)
      }
      return 0
    }

    const handleResize = () => {
      setWidth(calculateWidth())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (width > 0) {
      controls.start({
        x: -width,
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        },
      })
    }
  }, [controls, width])

  const handleMouseEnter = () => {
    controls.stop()
  }

  const handleMouseLeave = () => {
    controls.start({
      x: -width,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    })
  }

  const headingVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  const sectionVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  }

  return (
    <motion.section 
      className="w-full py-16 bg-gray-50"
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          className="text-4xl font-bold text-primary mb-8"
          variants={headingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          Featured Products
        </motion.h1>

        <div className="overflow-hidden w-full">
          <motion.div
            className="flex"
            animate={controls}
            style={{ width: `${width * 2}px` }} // Duplicate width for continuous effect
          >
            {[...products, ...products].map((product, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-[280px] h-[400px] mr-4"
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                ref={containerRef}
              >
                <FeaturedProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}