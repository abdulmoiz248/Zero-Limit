import { cn } from "@/lib/utils"
import Marquee from "@/components/ui/marquee"
import { Review } from "@/Models/Review"
import { useEffect, useState } from "react"
import axios from "axios"

const ReviewCard = ({ username, body }: { username: string; body: string }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
        "border-primary/10 bg-primary/5 hover:bg-primary/10",
        "transition-colors duration-300 ease-in-out"
      )}
    >
      <p className="text-xs font-medium text-primary/60 mb-2">{username}</p>
      <blockquote className="text-sm text-primary/80">{body}</blockquote>
    </figure>
  )
}

export default function MarqueeDemo() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews`)
        if (res.data.success) {
          setReviews(res.data.reviews)
        } else {
          console.log("Failed to load reviews data.")
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchReviews()
  }, [])

  // Split the reviews into two rows for the marquee effect
  const firstRow = reviews.slice(0, reviews.length / 2)
  const secondRow = reviews.slice(reviews.length / 2)

  if(reviews.length<10) return <></>
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary py-8">What Our Users Say</h2>
      <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background shadow-xl">
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s] mt-4">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  )
}
