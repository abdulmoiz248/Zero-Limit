"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

const carouselData = [
  { id: 1, image: "/images/download.jfif", title: "Summer Collection" },
  { id: 2, image: "/images/download (1).jfif", title: "Autumn Styles" },
  { id: 3, image: "/images/download (2).jfif", title: "Winter Warmth" },
  { id: 4, image: "/images/image.png", title: "Spring Freshness" },
]

export default function ProductCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length)
  }

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Product Categories</h1>
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        <div className="w-full lg:w-2/3 relative overflow-hidden rounded-lg aspect-square">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={carouselData[currentSlide].image}
                alt={carouselData[currentSlide].title}
                layout="fill"
                objectFit="contain"
                className="z-10"
              />
              <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-0" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col justify-start gap-4 mt-20">
          <motion.h2
            key={carouselData[currentSlide].title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold"
          >
            {carouselData[currentSlide].title}
          </motion.h2>
          <Button className="w-full md:w-40">Shop Now</Button>
          
          <div className="mt-10 relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `${-currentSlide * (100 / 3)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {carouselData.map((slide, index) => (
                  <div key={slide.id} className="w-1/3 flex-shrink-0 pr-2">
                    <div className={`relative w-24 h-24 mx-auto ${index === currentSlide ? 'ring-2 ring-white' : ''}`}>
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className={`rounded-lg ${index === currentSlide ? 'opacity-100' : 'opacity-50'}`}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 -bottom-10 transform"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}