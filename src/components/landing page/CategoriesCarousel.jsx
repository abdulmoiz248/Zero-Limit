"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import BorderButton from "../buttons/BorderButton"

export default function ProductCarousel({categories}) {
  const [carouselData, setCarouselData] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const categoriesWithId = categories.map((category) => ({
      id: category._id,
      name: category.name,
      link: category.link
    }))
    setCarouselData(categoriesWithId)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length)
  }

  return (
    <div className="w-full bg-gradient-to-br bg-white text-black p-4 md:p-6 min-h-[80vh] md:min-h-screen">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center pt-6 md:pt-10 text-black">
        Explore Our Product Categories
      </h1>
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mt-6 md:mt-10 max-w-5xl mx-auto">
        <div className="w-full lg:w-2/3 relative overflow-hidden rounded-xl shadow-xl aspect-[16/9] bg-white">
          <AnimatePresence mode="wait">
            {carouselData.length > 0 && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={carouselData[currentSlide].link}
                  alt={carouselData[currentSlide].name}
                  layout="fill"
                  objectFit="cover"
                  className="z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col justify-between gap-4">
          {carouselData.length > 0 && (
            <div className="space-y-4">
              <motion.h2
                key={carouselData[currentSlide].name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold text-gray-800"
              >
                {carouselData[currentSlide].name}
              </motion.h2>
              <BorderButton text="Shop Now"
                className="w-full md:w-auto px-6 py-2 text-base font-semibold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-all hover:shadow-lg hover:scale-105"
                label="Shop Now"
                onClick={() => {
                  localStorage.setItem('category', JSON.stringify(carouselData[currentSlide]));
                  router.push(`/Categories/${carouselData[currentSlide].id}`)
                }}
              />
            </div>
          )}
          <div className="relative">
            <div className="overflow-hidden rounded-lg bg-white p-3 shadow-inner">
              <motion.div
                className="flex gap-3"
                animate={{ x: `${-currentSlide * (100 / carouselData.length)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {carouselData.map((slide, index) => (
                  <div key={slide.id} className="w-1/4 flex-shrink-0">
                    <div 
                      className={`relative aspect-square rounded-md overflow-hidden cursor-pointer transition-all ${
                        index === currentSlide ? 'ring-3 ring-purple-600 scale-105 z-10' : 'opacity-50 scale-90'
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <Image
                        src={slide.link}
                        alt={slide.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white shadow-md hover:bg-gray-100"
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
