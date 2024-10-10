"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Router } from "lucide-react";
import Image from "next/image";
import axios from "axios"; // Don't forget to import axios
import { useRouter } from "next/navigation";

export default function ProductCarousel() {
  const [carouselData, setCarouselData] = useState([]); // Initialize state for carousel data
  const [currentSlide, setCurrentSlide] = useState(0);
  let router=useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get('/api/getCategories'); // Ensure this matches your API route
        if (res.data.success) {
          const categoriesWithId = res.data.categories.map((category) => ({
            id: category._id, // Use _id from MongoDB
            name: category.name, // The category name
            link: category.link // The link to the category
          }));
          setCarouselData(categoriesWithId); // Set state with categories
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {

    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Product Categories</h1>
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        <div className="w-full lg:w-2/3 relative overflow-hidden rounded-lg aspect-square">
          <AnimatePresence mode="wait">
            {carouselData.length > 0 && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={carouselData[currentSlide].link}
                  alt={carouselData[currentSlide].name}
                  layout="fill"
                  objectFit="contain"
                  className="z-10"
                />
                <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-0" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col justify-start gap-4 mt-20">
          {carouselData.length > 0 && (
            <>
              <motion.h2
                key={carouselData[currentSlide].name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold"
              >
                {carouselData[currentSlide].name}
              </motion.h2>
              <Button className="w-full md:w-40 border-white border-2" onClick={()=>{
                router.push(`/Categories/${carouselData[currentSlide].id}`)
              }}>Shop Now</Button>
            </>
          )}
          <div className="mt-10 relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `${-currentSlide * (100 / carouselData.length)}%` }} // Adjust the width dynamically
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {carouselData.map((slide, index) => (
                  <div key={slide.id} className="w-1/3 flex-shrink-0 pr-2">
                    <div className={`relative w-24 h-24 mx-auto ${index === currentSlide ? 'ring-2 ring-white' : ''}`}>
                      <Image
                        src={slide.link}
                        alt={slide.name}
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
  );
}
