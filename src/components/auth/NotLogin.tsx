'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function NotLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-lg"
      >
        <div className="bg-black p-10 rounded-2xl shadow-2xl border-4 border-[#1b03a3]">
        
        <motion.h1
  className="text-4xl font-extrabold text-white text-center mb-4 tracking-wider"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
  role="heading" 
  aria-level={1}
>
  Oops! Fearless, you aren&apos;t logged in
</motion.h1>
          <motion.p
            className="text-[#1b03a3] text-lg text-center mb-8 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Please log in or register to access your account.
          </motion.p>

          {/* Action Buttons */}
          <div className="space-y-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/Login"
                className="flex items-center justify-center w-full bg-[#1b03a3] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#0e017d] transition duration-300"
              >
                Login
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/Register"
                className="flex items-center justify-center w-full bg-white text-black font-semibold py-3 px-6 rounded-lg border-2 border-[#1b03a3] hover:bg-gray-100 transition duration-300"
              >
                Register
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
