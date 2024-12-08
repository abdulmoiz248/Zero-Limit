'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, DollarSign, Truck, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { getCart } from '@/helper/cart'
import {  AnimatePresence } from 'framer-motion'
import {  CheckCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CartItem } from '@/interfaces/interfaces'

interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
}

export default function LuxuryCheckoutPage() {

 
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('online')
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', address: '', city: '', zipCode: '', country: '', phone: ''
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [showContactPrompt, setShowContactPrompt] = useState(true)
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cart,setCart]=useState(false);
  const simulatePayment = async () => {
    setIsProcessing(true)

    try {
      
      const cart = getCart();
      const cartItems: CartItem[] = Object.values(cart);
      let total=0;
      cartItems.forEach((cartItem:CartItem)=>{
        total+= (cartItem.product.price - (cartItem.product.price * cartItem.product.discountPercent / 100)) *cartItem.quantity;
      })
    
      const dis=Number(localStorage.getItem('couponCode')) || 0;  
      const res=await axios.post('/api/order',{total:total-dis,formData, cart, paymentMethod})


      if(res.data.success){
        localStorage.removeItem('cart');
        localStorage.removeItem('couponCode')
      //  await axios.post('/api/sendmsg');
        setShowContactPrompt(false);
        setShowSuccessModal(true)
     
      }else{
        const res1=await axios.post('/api/order',{total:total-dis,formData, cart, paymentMethod})
        if(res1.data.success){
          localStorage.removeItem('cart');
        //  await axios.post('/api/sendmsg');
          setShowContactPrompt(false);
          setShowSuccessModal(true)
       
        }else{
          setError(res.data.message);
        }
        setError(res.data.message);
      }
        
    } catch (error: unknown) {
      let errorMessage = "Network Error please try again";  // Default message
  
      // Type guard to check for expected error structure
      if (typeof error === "object" && error !== null && "error" in error) {
          const nestedError = (error as { error: { message: string } }).error;
          errorMessage = nestedError.message || errorMessage;
      }
  
      // Display the error to the user in a friendly way
      setError(errorMessage);
  
      // Log the detailed error for debugging/monitoring
      console.error("Error caught:", error); // Use a logging service here for production (e.g., Sentry)
  }finally{
      setIsProcessing(false)
    }
   
  }

  const nextStep = () => {
    if (step === 1 && validateShippingInfo()) {
      setStep(2)
    } else if (step === 2 && validatePaymentInfo()) {
      simulatePayment()
    }
  }

  const prevStep = () => setStep(step - 1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateShippingInfo = () => {
    setError(null);
    setIsProcessing(false);
    const newErrors: Partial<FormData> = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
   

    const cart=getCart();
    
    if(Object.entries(cart).length === 0){
      setCart(true);
    }

    
  }, []);

  const validatePaymentInfo = () => {
    return true;
  }

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
    setShowContactPrompt(value === 'online')
  }

  if(cart){
    router.push('/')
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white mt-10 shadow-2xl rounded-3xl overflow-hidden"
      >
        <div className="px-6 py-8 sm:px-10 sm:py-12">
          <h1 className="text-4xl font-extrabold text-[#1b03a3] mb-8 text-center">Secure Checkout</h1>

          <div className="mb-12">
  <div className="flex items-center">
    {[1, 2].map((i) => (
      <div key={i} className={`flex items-center ${i === 2 ? 'ml-auto' : ''}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold ${
          step >= i ? 'bg-[#1b03a3] text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          {i}
        </div>
        {i < 2 && (
          <div className={`h-1 flex-1 mx-2 ${
            step > i ? 'bg-[#1b03a3]' : 'bg-gray-200'
          }`} />
        )}
      </div>
    ))}
  </div>
  <div className="flex justify-between mt-2">
    <span className="text-sm font-medium flex items-center"><Truck className="mr-1 w-4 h-4" /> Shipping</span>
    <span className="text-sm font-medium flex items-center"><CreditCard className="mr-1 w-4 h-4" /> Payment</span>
  </div>
</div>
     

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold mb-6 text-[#1b03a3]">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
                  <Input 
                  
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="mt-1"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                  <Input 
                  
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="mt-1"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address</Label>
                  <Input 
                    id="address" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Luxury Lane"
                    className="mt-1"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                  <Input 
                    id="city" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className="mt-1"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">ZIP Code</Label>
                  <Input 
                    id="zipCode" 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className="mt-1"
                  />
                  {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                </div>
                <div>
                  <Label htmlFor="country" className="text-sm font-medium text-gray-700">Country</Label>
                  <Input 
                    id="country" 
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="United States"
                    className="mt-1"
                  />
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                    className="mt-1"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={nextStep} className="bg-[#1b03a3] hover:bg-[#3b03a3] text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                  Continue to Payment
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold mb-6 text-[#1b03a3]">Payment Details</h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium text-gray-700">Select Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="mt-4 space-y-4">
                    <Label htmlFor='online' className="flex items-center space-x-3 bg-white p-4 rounded-lg border border-gray-200 transition duration-300 ease-in-out hover:border-[#1b03a3] cursor-pointer">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="flex items-center cursor-pointer flex-1">
                        <CreditCard className="w-5 h-5 mr-2 text-[#1b03a3]" />
                        Online Payment
                      </Label>
                    </Label>
                    <Label htmlFor='cod'  className="flex items-center space-x-3 bg-white p-4 rounded-lg border border-gray-200 transition duration-300 ease-in-out hover:border-[#1b03a3] cursor-pointer">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center cursor-pointer flex-1">
                        <DollarSign className="w-5 h-5 mr-2 text-[#1b03a3]" />
                        Cash on Delivery
                      </Label>
                    </Label>
                  </RadioGroup>
                </div>

                {showContactPrompt && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#1b03a3] bg-blue-50 p-4 rounded-lg flex items-center"
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Our team will contact you shortly to process your secure online payment.
                  </motion.p>
                )}

                {error && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={prevStep} className="font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                    Back to Shipping
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    disabled={isProcessing}
                    className="bg-[#1b03a3] hover:bg-[#3b03a3] text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Confirm Order'}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>


      <AnimatePresence>
        {showSuccessModal && (
          <Dialog open={showSuccessModal} onOpenChange={()=>{
            setShowSuccessModal(false);
            router.push('/');
          }}>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="flex items-center justify-center mb-4"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2}}
                    className="text-2xl font-bold text-center text-[#1b03a3]"
                  >
                    Order Placed Successfully!
                  </motion.h2>
                </DialogTitle>
                <DialogDescription>
                  <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3}}
                    className="text-center text-gray-600 mt-2"
                  >
                    Thank you for your order, Fearless!
                  </motion.p>
                  <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.4}}
                    className="text-center text-gray-600 mt-2"
                  >
                    Your order has been received and is being processed.
                  </motion.p>
                </DialogDescription>
              </DialogHeader>
              <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.5}}
                className="mt-6 flex justify-center"
              >
                <Button
                  onClick={() => router.push('/')}
                  className="bg-[#1b03a3] hover:bg-[#3b03a3] text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Back to Home
                </Button>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    
    </div>
  )
}