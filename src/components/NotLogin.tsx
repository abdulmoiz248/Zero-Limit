'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function NotLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 to-yellow-400 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-black p-8 rounded-lg shadow-lg border-2 border-yellow-500">
         
          <motion.h1 
            className="text-3xl font-bold text-white mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            You are not logged in
          </motion.h1>
          <motion.p 
            className="text-yellow-400 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Please log in or register to access your account.
          </motion.p>
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/Login" className="block w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out text-center">
                Login
                <ChevronRight className="inline-block ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/Register" className="block w-full bg-black hover:bg-gray-900 text-yellow-500 font-bold py-3 px-4 rounded-md border-2 border-yellow-500 transition duration-300 ease-in-out text-center">
                Register
                <ChevronRight className="inline-block ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}