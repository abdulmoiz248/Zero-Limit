'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Slider from 'react-slick'

const OfferSection = () => {
  const offers = [
    "Bold and Fearless Designs",
    "Fast and Reliable Shipping",
    "Exceptional Customer Service",
    "300+ GSM Products",
    "High Thread Count",
    "Competitive Pricing"
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <section className="px-4 border-b-2  py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 text-black">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold leading-tight text-black mb-4">
          What Zero Limit Offers
        </h2>
        <p className="text-xl text-black opacity-80">
          Elevate your experience with Zero Limit’s premium products and services.
        </p>
      </div>
      
      {/* Mobile view carousel */}
      <div className="block sm:hidden">
        <Slider {...settings}>
          {offers.map((offer, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transition-transform transform hover:scale-105 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-white text-indigo-600 rounded-full">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-black">{offer}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Slider>
      </div>

      {/* Desktop and tablet view grid */}
      <motion.div 
        className="hidden sm:grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {offers.map((offer, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full transition-transform transform hover:scale-105 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-white text-indigo-600 rounded-full">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-black">{offer}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default OfferSection
