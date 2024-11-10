'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import ReviewList from './ReviewList'
import { Review } from '@/Models/Review'

export default function Reviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/reviews/${productId}`)
        if (res.data.success) {
          setReviews(res.data.reviews)
        } else {
          setError('No Reviews Available')
        }
      } catch (err) {
        console.log(err);
        setError('No Reviews Available')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [productId])

  return (
    <div className="relative max-w-4xl mt-3 mx-auto p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Customer Reviews</h2>
      </motion.div>

      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-600"
          >
            Loading reviews...
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-red-500"
          >
            {error}
          </motion.div>
        ) : (
          <ReviewList initialReviews={reviews} />
        )}
      </AnimatePresence>

      {/* Side blur effects */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  )
}