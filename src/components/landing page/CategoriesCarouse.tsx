"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Maximize2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Component({ categories = [] }: { categories: Array<{ _id: string, name: string, link: string }> }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showFullSize, setShowFullSize] = useState(false)
  const router = useRouter()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categories.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [currentSlide])

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 p-4 md:p-8 min-h-[80vh] lg:min-h-[60vh] flex flex-col justify-center">
    <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-black">
        Explore Our Collections
      </h1>
      <div className="max-w-4xl mx-auto w-full">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
          <AnimatePresence mode="wait">
            {categories.length > 0 && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square"
              >
                <Image
                  src={categories[currentSlide].link}
                  alt={categories[currentSlide].name}
                  layout="fill"
                  objectFit="contain"
                  className="z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-20" />
                <div className="absolute bottom-6 left-6 z-30 max-w-[80%]">
                  <motion.h2
                    key={`title-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold text-white mb-2"
                  >
                    {categories[currentSlide]?.name}
                  </motion.h2>
                  <motion.div
                    key={`button-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Button
                      className="bg-white text-gray-900 hover:bg-gray-100 transition-all text-sm"
                      onClick={() => {
                        localStorage.setItem('category', JSON.stringify(categories[currentSlide]));
                        router.push(`/Categories/${categories[currentSlide]._id}`)
                      }}
                    >
                      Shop Now
                    </Button>
                  </motion.div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20 z-30"
                  onClick={() => setShowFullSize(true)}
                >
                  <Maximize2 className="h-6 w-6" />
                  <span className="sr-only">View full size</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center -translate-y-1/2 z-30">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 hover:bg-white/40 text-white"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 hover:bg-white/40 text-white"
              onClick={nextSlide}
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                index === currentSlide ? 'ring-4 ring-purple-600 scale-105 z-10' : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={category.link}
                alt={category.name}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-2 left-2 right-2 text-white font-semibold text-xs text-center">{category.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
      {showFullSize && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setShowFullSize(false)}>
          <div className="relative w-full h-full max-w-4xl max-h-4xl">
            <Image
              src={categories[currentSlide].link}
              alt={categories[currentSlide].name}
              layout="fill"
              objectFit="contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setShowFullSize(false);
              }}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Close full size image</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}