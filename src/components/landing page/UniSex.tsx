'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

import { useRouter } from 'next/navigation'

export default function UnisexClothingSection() {
  const router=useRouter();
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const products = [
    {
      name: "Fearless Monochrome Jacket",
      description: "The Fearless Monochrome Jacket combines bold style, comfort, and durability with a striking abstract pattern and lion crest.",
      image: "/products/bw-1.jpeg"
      ,link:"/Product/67361e98c0f4c9f519e154f6"
    },
    {
      name: "Special Co-ord Set",
      description: "The Zero Limit Sweat and Trouser Set is a unisex, bold, and comfortable matching set with iconic branding, made from premium fabric for all-day wear.",
      image: "/products/z-1.jpeg"
      ,link:"/Product/67362287c0f4c9f519e15507"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length)
    }, 5000) // Change product every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-white text-black min-h-screen overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-[#1b03a3] opacity-5 pointer-events-none"
        animate={{
          backgroundImage: [
            'radial-gradient(circle at 20% 20%, #1b03a3 0%, transparent 70%)',
            'radial-gradient(circle at 80% 80%, #1b03a3 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, #1b03a3 0%, transparent 70%)',
            'radial-gradient(circle at 20% 20%, #1b03a3 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Header */}
      <motion.header
        className="relative z-10 pt-16 pb-8 px-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">ZERO LIMIT</h1>
        <p className="text-lg md:text-xl mb-8">Unisex Collection - Style Without Boundaries</p>
        <motion.div
          className="w-24 h-1 bg-[#1b03a3] mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.header>

      {/* Featured Products */}
      <motion.section
        className="relative z-10 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentProductIndex === index ? 1 : 0, y: currentProductIndex === index ? 0 : 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`bg-black text-white p-4 sm:p-8 rounded-lg overflow-hidden ${currentProductIndex === index ? 'block' : 'hidden'}`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-3xl font-bold mb-4">Featured: {product.name}</h2>
                    <p className="mb-6">{product.description}</p>
                    <Button
                   onClick={()=>router.push(product.link)}
                     className="bg-white text-black hover:bg-[#1b03a3] hover:text-white transition-colors">
                      Shop Now <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="md:w-1/2 w-full relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="responsive"
                      width={500}
                      height={500} // Adjust these values as necessary to maintain the desired aspect ratio
                      className="object-contain rounded-lg"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  )
}
