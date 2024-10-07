'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'

export default function CatCarousel() {
  const [selectedImage, setSelectedImage] = useState(0)
  const carouselRef = useRef(null)

  const images = [
    '/images/jeans.jfif',
    '/images/jeans.jfif',
    '/images/jeans.jfif',
    '/images/jeans.jfif',
    '/images/jeans.jfif',
    '/images/jeans.jfif',
    '/images/jeans.jfif',

  ]

  const headings = [
    'Heading 1',
    'Heading 2',
    'Heading 3',
    'Heading 4',
    'Heading 5',
    'Heading 27',
    'Heading 8',
    'Heading 26',
  ]

  // useEffect(()=>{
  //   let fetchData=async()=>{
  //     try {
  //       let res=await axios.get('api/getCategories') ;
  //       if(res.data.success){
  //         images=res.data.categories.map(category => category.link);
  //         headings=res.data.categories.map(category => category.name);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchData();
  // },[])


  const handleNext = () => {
    setSelectedImage((prevImage) => (prevImage + 1) % images.length)
  }

  useEffect(() => {
    if (carouselRef.current) {
      const scrollPosition = selectedImage * (112 + 16) // image width + gap
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' })
    }
  }, [selectedImage])

  return (
    <div
      className="relative flex h-screen flex-col items-center justify-between bg-purple-400 bg-contain bg-center bg-no-repeat transition-all duration-1000 ease-in-out md:flex-row bg-blur"
      style={{ backgroundImage: `url(${images[selectedImage]})`, backgroundSize: 'contain' }}
    >
    
      <div className="flex-1 p-8 text-center md:text-left">
        <h1 className="text-3xl font-bold text-white transition-opacity duration-700 ease-in-out md:text-5xl lg:text-6xl">
          {headings[selectedImage]}
        </h1>
      </div>

      {/* Right Side - Image Scroller and Button */}
      <div className="flex flex-1 flex-col items-center justify-center space-y-6 p-8 md:items-end">
        <div className="w-full max-w-[368px] overflow-hidden">
          <div
            ref={carouselRef}
            className="flex space-x-4"
            aria-label="Image carousel"
          >
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-20 w-28 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg transition-opacity duration-500 ease-in-out ${
                  index === selectedImage ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <Image
                  src={image}
                  alt={`carousel-img-${index + 1}`}
                  width={112}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          className="rounded-lg bg-white px-6 py-3 font-semibold text-gray-800 shadow-lg transition duration-300 ease-in-out hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}