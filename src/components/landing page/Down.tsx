'use client'

import Image from 'next/image'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Card, CardContent } from "@/components/ui/card"

export default function HoodieShowcase() {
  const modals = [
    {
      title: "Stay Wild Collection",
    },
    {
      title: "Fearless Skull Crusher",
    }
  ]

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-8 sm:mt-16 lg:mt-24 mb-4 sm:mb-8 lg:mb-16"> {/* Adjusted margin-top and margin-bottom */}
      <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden rounded-lg">
        <Image 
          src="/images/down1.jpeg"          
          alt="Urban style hoodies featuring lion and skull designs"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>
      
      <div className="absolute inset-0 flex justify-between items-center p-4 sm:p-6 lg:p-8 top-1/4 sm:top-1/3 md:top-1/4">
        {modals.map((modal, index) => (
          <AnimatePresence key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="w-[140px] sm:w-[180px] md:w-[220px] transition-transform duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-black/50" 
            >
              <Card className="bg-black/40 backdrop-blur-sm border-white/10 text-white">
                <CardContent className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2">{modal.title}</h3>  
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
      
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center text-white">
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">Fearless  Collection</h2>
        <p className="text-sm sm:text-base text-gray-200">Where comfort meets artistic expression</p>
      </div>
    </div>
  )
}
