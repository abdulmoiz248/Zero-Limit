"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import axios from 'axios'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'

const emailSchema = z.object({
  email: z.string().email("Invalid email format"),
})

export default function JoinUs() {
  const [email, setEmail] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const closeModal = () => setModalOpen(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    const validationResult = emailSchema.safeParse({ email })

    if (!validationResult.success) {
      setErrorMessage(validationResult.error.errors[0].message)
      setIsLoading(false)
      return
    }

    try {
      const res = await axios.post('/api/subscribe', { email })
      if (res.data.success) {
        setModalOpen(true)
        setEmail('')
      } else {
        setErrorMessage("Subscription failed. Please try again.")
      }
    } catch (error) {
      console.error(error)
      setErrorMessage("An error occurred while subscribing. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold mb-6 text-center text-white">Join Our Community</h2>
          <p className="text-lg mb-8 text-center text-gray-300">
           Be a member of our Fearless community and break the limits with us!
          </p>
          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErrorMessage('')
                }}
                className="w-full p-4 pr-12 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
              <motion.span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {errorMessage ? <AlertCircle className="text-red-500" /> : email && <CheckCircle2 className="text-green-500" />}
              </motion.span>
            </div>
            {errorMessage && (
              <motion.p 
                className="text-red-500 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errorMessage}
              </motion.p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-500 transition ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Joining...' : 'Join Now'}
            </button>
          </form>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-md w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold mb-4">Subscription Successful</h3>
              <p className="text-gray-600">
                You have successfully subscribed to our newsletter. We will keep you updated with the latest news and offers.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}