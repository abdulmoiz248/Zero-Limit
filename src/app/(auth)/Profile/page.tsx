'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Cookies from 'js-cookie'
import { Label } from "@/components/ui/label"

export default function FearlessProfilePage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateEmail(email)) {
      const customerData = { email };
      localStorage.setItem('customerData', JSON.stringify(customerData));
      Cookies.set('customerData','true');
      router.push('/order')
    } else {
      setError('Enter a valid email to proceed. Be fearless!')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen  text-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8"
      >
        <motion.h1
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-[#1b03a3]"
        >
          Embrace the Challenge
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-semibold">
              Your Fearless Email
            </Label>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Input
                id="email"
                type="email"
                placeholder="fearless@zerolimit.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                  className="w-full p-4 border-2 border-purple-500 rounded-md focus:outline-none focus:border-[#1b03a3] transition-colors"
              />
            </motion.div>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="submit"
              className="w-full p-4 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-[#1b03a3] rounded-md hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              Dive into the Unknown
            </Button>
          </motion.div>
        </form>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400"
        >
          Courage is just one click away. Are you ready?
        </motion.p>
      </motion.div>
    </div>
  )
}