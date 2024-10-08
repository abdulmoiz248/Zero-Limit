import { cn } from "@/lib/utils"
import Marquee from "@/components/ui/marquee"

const reviews = [
  {
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
  },
  {
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
  },
  {
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

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
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">What Our Users Say</h2>
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