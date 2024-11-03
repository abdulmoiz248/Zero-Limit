import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'
import { Review } from '@/Models/Review'

const ReviewItem = ({ review }: { review: Review }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">{review.username}</h3>
            <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
          </div>
        </div>
        <p className="mb-4">{review.body}</p>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill={i < review.rating ? 'currentColor' : 'none'}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export default function ReviewList({ initialReviews }: { initialReviews: Review[] }) {
  const [displayCount, setDisplayCount] = useState(2)

  if (!initialReviews || initialReviews.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-muted-foreground"
      >
        No reviews available for this product yet.
      </motion.div>
    )
  }

  return (
    <>
      <AnimatePresence>
        {initialReviews.slice(0, displayCount).map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </AnimatePresence>
      {displayCount < initialReviews.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              setDisplayCount(prevCount => Math.min(prevCount + 2, initialReviews.length));
            }}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Load More
          </button>
        </motion.div>
      )}
    </>
  )
}
