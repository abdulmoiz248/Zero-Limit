"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ProductCarousel({ categories = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categories.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length)
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-100 to-white text-gray-900 p-0 md:p-6 min-h-[70vh] sm:min-h-[60vh] mb-0 lg:mb-6">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        Explore Our Product Categories
      </h1>
      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">
        <div className="w-full lg:w-2/3 relative overflow-hidden rounded-xl shadow-xl aspect-[16/9]">
          <AnimatePresence mode="wait">
            {categories.length > 0 && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={categories[currentSlide].link}
                  alt={categories[currentSlide].name}
                  layout="fill"
                  objectFit="cover"
                  className="z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20" />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute bottom-3 left-3 z-30">
            <motion.h2
              key={categories[currentSlide]?.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-white mb-2"
            >
              {categories[currentSlide]?.name}
            </motion.h2>
            <Button
              className="bg-white text-gray-900 hover:bg-gray-100 transition-all text-sm"
              onClick={() => {
                localStorage.setItem('category', JSON.stringify(categories[currentSlide]));
                router.push(`/Categories/${categories[currentSlide]._id}`)
              }}
            >
              Shop Now
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col justify-between gap-3">
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <div
                key={category._id}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                  index === currentSlide ? 'ring-3 ring-purple-600 scale-105 z-10' : 'opacity-70 scale-95'
                }`}
                onClick={() => setCurrentSlide(index)}
              >
                <Image
                  src={category.link}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-1 left-1 text-white font-semibold text-xs">{category.name}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              size="icon"
              className="bg-white shadow-md hover:bg-gray-100"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white shadow-md hover:bg-gray-100"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
