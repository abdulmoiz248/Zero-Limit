'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-[#1b03a3] rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Compass className="text-white w-12 h-12" />
          </motion.div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">404 - Not Found</h1>
          <p className="text-center text-gray-600 mb-6">
            Sorry, fearless explorer! You&apos;ve ventured beyond our known universe.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="block w-full bg-[#1b03a3] hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-300 ease-in-out">
              <ArrowLeft className="inline-block mr-2 h-5 w-5" />
              Return to Home Base
            </Link>
          </motion.div>
        </div>
        <div className="bg-indigo-100 p-4">
          <p className="text-sm text-indigo-800 text-center">
          &quot;The only true voyage of discovery would be not to visit strange lands but to possess other eyes.&quot; - Marcel Proust
          </p>
        </div>
      </motion.div>
    </div>
  )
}