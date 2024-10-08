import { useState } from 'react'
import { Star, Send } from 'lucide-react'

export default function ReviewSection() {

  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-white text-center mb-8 tracking-wide animate-fade-in">
          What Our Customers Say
        </h2>

        <div className="bg-gray-900 rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 animate-slide-up">
          {/* Form Title */}
          <h3 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
            Share Your Experience
          </h3>

          {/* Form Fields */}
          <form className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 group-hover:text-white transition-all duration-300">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="mt-1 block w-3/4 mx-auto rounded-md bg-gray-800 text-gray-300 border-none shadow-md group-hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                required 
              />
            </div>

            {/* Rating Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-400 mb-2 text-center">Your Rating</label>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 cursor-pointer transition-all duration-300 ${
                      star <= (hoverRating || userRating) ? 'text-yellow-400 scale-125' : 'text-gray-500'
                    }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setUserRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Review Field */}
            <div className="relative group">
              <label htmlFor="review" className="block text-sm font-medium text-gray-400 group-hover:text-white transition-all duration-300">
                Your Review
              </label>
              <textarea 
                id="review" 
                name="review" 
                rows={4} 
                className="mt-1 block w-3/4 mx-auto rounded-md bg-gray-800 text-gray-300 border-none shadow-md group-hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                required 
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-center">
              <button 
                type="submit" 
                className="inline-flex items-center px-5 py-2 text-base font-semibold rounded-full shadow-md text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Submit Review
                <Send className="ml-2 -mr-1 h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
