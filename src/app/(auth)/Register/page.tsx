'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
})

type FormData = z.infer<typeof formSchema>

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setApiError(null)

    try {
      // Verify email
      const emailResponse = await axios.post('/api/auth/verifyEmail', { email: data.email })
      
      if (!emailResponse.data.success) {


const emailResponse1 = await axios.post('/api/auth/verifyEmail', { email: data.email })

      if (!emailResponse1.data.success){
        setError('email', { type: 'manual', message: 'Email already exists' })
        setIsLoading(false)
        return}
      }

      // Register user
      const registerResponse = await axios.post('/api/auth/register', {
        email: data.email,
        name: data.name,
        password: data.password
      })

      if (registerResponse.data.success) {
        setIsSuccess(true)
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push('/Login')
        }, 3000)
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error);
      setApiError('Email Already Registered')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-14">
      <Card className="w-full max-w-md mx-auto bg-white text-black">
        <CardHeader className="border-b border-[#1b03a3]">
          <CardTitle className="text-2xl font-bold text-[#1b03a3]">Register</CardTitle>
          <CardDescription className="text-gray-600">Create a new account</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-black">Name</Label>
              <Input id="name" {...register('name')} className="border-[#1b03a3] focus:ring-[#1b03a3]" />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-500"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">Email</Label>
              <Input id="email" type="email" {...register('email')} className="border-[#1b03a3] focus:ring-[#1b03a3]" />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-500"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">Password</Label>
              <Input id="password" type="password" {...register('password')} className="border-[#1b03a3] focus:ring-[#1b03a3]" />
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-500"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {apiError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center space-x-2 text-red-500"
                >
                  <AlertCircle size={16} />
                  <p className="text-sm">{apiError}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <Button 
              type="submit" 
              className="w-full bg-[#1b03a3] hover:bg-[#2d14b5] text-white transition-colors duration-200" 
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-[#1b03a3] text-2xl font-bold">Registration Successful!</DialogTitle>
            <DialogDescription className="text-gray-600">
              Your account has been created. You will be redirected to the login page shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <CheckCircle2 className="text-[#1b03a3]" size={48} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
