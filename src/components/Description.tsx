'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Component({ description = "This is a sample product description that is long enough to demonstrate the 'Show More' functionality. It continues with more text to ensure it exceeds our character limit." }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const characterLimit = 100

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const truncatedDescription = description.slice(0, characterLimit)
  const shouldShowMore = description.length > characterLimit

  return (
    <div className="max-w-2xl mx-auto p-4">
      <motion.div layout className="space-y-2">
        <p className="text-gray-700">
          {isExpanded ? description : truncatedDescription}
          {!isExpanded && shouldShowMore && '...'}
        </p>
        {shouldShowMore && (
          <Button
            onClick={toggleExpand}
            variant="ghost"
            className="flex items-center text-primary hover:text-primary-dark"
          >
            {isExpanded ? (
              <>
                Show Less
                <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Show More
                <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </motion.div>
    </div>
  )
}