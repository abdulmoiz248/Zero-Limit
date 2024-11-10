'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { Review } from '@/Models/Review'


export default function ProductReviews({ reviews }:{reviews:Review[] } ) {
  const [visibleReviews, setVisibleReviews] = useState(7)

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => Math.min(prev + 7, reviews.length))
  }

  if(reviews.length ==0){
    return (
      <div className="text-center text-gray-600">
        No reviews found for this product.
      </div>
    )
  }

  return (
    <div className="bg-white shadow-xl  rounded-lg overflow-hidden">
      <div className="p-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h3>
        <div className="space-y-6">
          <AnimatePresence>
            {reviews.slice(0, visibleReviews).map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-gray-900">{review.username}</h4>
                  <div className="flex items-center bg-white px-3 py-1 rounded-full shadow">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-3 italic">&quot;{review.body}&quot;</p>
                <p className="text-sm text-gray-500">
                {review.date instanceof Date ? review.date.toLocaleDateString() : review.date}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {visibleReviews < reviews.length && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadMoreReviews}
            className="mt-8 w-full bg-[#3498db] text-white px-6 py-3 rounded-md font-semibold text-lg flex items-center justify-center"
          >
            Load More Reviews
          </motion.button>
        )}
      </div>
    </div>
  )
}