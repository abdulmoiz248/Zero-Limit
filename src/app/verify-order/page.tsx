'use client'

import Cookies from 'js-cookie'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Router, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import axios from 'axios'
import { useRouter } from 'next/navigation'


export default function VerifyOTP() {
  let router=useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {

    inputRefs.current = inputRefs.current.slice(0, 6)
  }, [])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLElement).focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError('')
   
    try {
      let orderId=Cookies.get('order');
      let res=await axios.post('/api/verifyOtpOrder',{otp,orderId});
  
      if(res.data.success){
        Cookies.remove('order');
         setIsModalOpen(true);   
      }else{
        setError('Invalid OTP');
       
      }
    } catch (error) {
       setError('Invalid OTP');
    }finally{
      setIsVerifying(false);
    }
    

  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify Your Order</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the 6-digit OTP sent to your registered mobile number
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                One-Time Password
              </Label>
              <div className="mt-1 flex justify-center space-x-2">
                {otp.map((data, index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el as any)}
                    className="block w-10 h-12 text-2xl text-center"
                    required
                  />
                ))}
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4"
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order Confirmed!</DialogTitle>
                <DialogDescription>
                  Your order has been successfully verified and confirmed.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </motion.div>
              </div>
              <div className="mt-4">
                <p className="text-center text-sm text-gray-500">
                  Thank you for your purchase. You will receive an email with your order details shortly.
                </p>
              </div>
              <div className="mt-6">
                <Button onClick={() => 
                 { 
                  setIsModalOpen(false)
                  router.push('/')
                 }
                  } className="w-full">
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}