'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div 
        className="w-full max-w-md p-8 space-y-6 rounded-md shadow-lg bg-white dark:bg-gray-800"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">
          Login to your account
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <a href="Register" rel="noopener noreferrer" className="font-medium text-violet-600 hover:underline">
            Sign up here
          </a>
        </p>

        <form action="" className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-700 dark:text-gray-200">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full px-4 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <button
            type="button"
            className="w-full px-4 py-3 font-semibold text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1"
          >
            Sign in
          </button>
        </form>
      </motion.div>
    </div>
  )
}
