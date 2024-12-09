'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What our top customers are saying
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <ReviewCard
            quote="Havent worn something this aethetic in a long time. The expression has a perfect blend of subtlety and aggression."
            author="Muzammil"
           
          />
          <ReviewCard
            quote="hey received my order today, the quality, packaging everything top☝🏼
thank you for such amazing service.
IA will order again🫶🏼"
            author="Aliya Zahra"
         
          />
        </div>
      </div>
    </section>
  )
}

const ReviewCard: React.FC<{ quote: string; author: string; }> = ({ quote, author }) => (
  <motion.div 
    className="flex flex-col items-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative text-center mb-8 p-8 bg-white bg-opacity-5 rounded-lg shadow-lg">
      <QuoteIcon className="absolute top-4 left-4 transform -translate-x-1/2 -translate-y-1/2" />
      <p className="text-lg italic text-gray-300">{quote}</p>
      <QuoteIcon className="absolute bottom-4 right-4 transform translate-x-1/2 translate-y-1/2 rotate-180" />
    </div>
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <span className="w-16 h-1 bg-[#1b03a3] mb-4"></span>
      <p className="text-[#1b03a3] font-semibold text-lg">{author}</p>
   
    </motion.div>
  </motion.div>
)

const QuoteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 text-[#1b03a3] opacity-50 ${className}`}
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

export default CustomerReviews

