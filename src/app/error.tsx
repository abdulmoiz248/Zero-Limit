'use client'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCcw } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
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
            <AlertTriangle className="text-white w-12 h-12" />
          </motion.div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Oops! An Error Occurred</h1>
          <p className="text-center text-gray-600 mb-6">
            Don&apos;t worry, fearless one! Even in the face of errors, we remain limitless.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="block w-full bg-[#1b03a3] hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-300 ease-in-out"
          >
            <RefreshCcw className="inline-block mr-2 h-5 w-5" />
            Try Again
          </motion.button>
        </div>
        <div className="bg-red-100 p-4">
          <p className="text-sm text-red-800 text-center">
          &quot;The greatest glory in living lies not in never falling, but in rising every time we fall.&quot; - Nelson Mandela
          </p>
        </div>
      </motion.div>
    </div>
  )
}