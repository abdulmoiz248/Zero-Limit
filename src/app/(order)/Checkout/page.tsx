'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard,  DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
//import { getCart } from '@/helper/cart'
// import { CartItem } from '@/interfaces/interfaces';
// import { calDiscount } from '@/helper/order'
import { useRouter } from 'next/navigation'
// import axios from 'axios'
// import Cookies from 'js-cookie'
// import { toast } from 'react-hot-toast'


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
  const [showContactPrompt, setShowContactPrompt] = useState(false)
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)

 

  const simulatePayment = async () => {
    // setIsProcessing(true)
    // setError(null)
    // try {
    //   const cart: CartItem{}  = getCart() ;
    //   if (!cart || cart.length === 0) {
    //     throw new Error('Your cart is empty')
    //   }

    //   let total: number = 0;
    //   const cartItems = Object.values(cart).map((item) => {
    //     total += calDiscount(item.product.price, item.product.discountPercent) * item.quantity;
    //     return item as CartItem
    //   });

    //   const res = await axios.post('/api/order', { formData, cartItems, paymentMethod, total })
      
    //   if (res.data.success) {
    //     Cookies.set('order', res.data.id)
    //     localStorage.removeItem('cart');
    //     toast.success('Order placed successfully!')
    //     router.push('/verify-order')
    //   } else {
    //     throw new Error(res.data.message || 'Failed to place order')
    //   }
    // } catch (error) {
    //   console.error('Order submission failed:', error)
    //   setError('An unexpected error occurred. Please try again.')
    //   toast.error( 'Failed to place order. Please try again.')
    // } finally {
    //   setIsProcessing(false)
    // }
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
    // Retrieve and parse customer data from localStorage
    const customerData = localStorage.getItem('customerData');
    if (customerData) {
      const customer = JSON.parse(customerData);
      setFormData(prev => ({ ...prev, email: customer.email }));
    }

    // Check if the cart exists in localStorage
    const cart = localStorage.getItem('cart');
    if (!cart) {
      router.push('/Cart');
    }
  }, []);

  const validatePaymentInfo = () => {
    return true // No additional validation needed as phone is now in step 1
  }

  // const simulatePayment = async () => {
  //   setIsProcessing(true)
  //   try {
  //     const cart:CartItem[] = getCart();
  //     let total: number = 0;
  //     const cartItems = Object.values(cart).map((item) => {
  //       total += calDiscount(item.product.price,item.product.discountPercent) * item.quantity;

  //     return  item as CartItem
  //     });
  //     const res = await axios.post('/api/order', { formData, cartItems, paymentMethod,total})
  //     if (res.data.success) {
  //       Cookies.set('order', res.data.id)
  //       localStorage.removeItem('cart');
  //       router.push('/verify-order')
  //     }
  //   } catch (error: any) {
  //     console.error('Order submission failed:', error.message)
  //   } finally {
  //     setIsProcessing(false)
  //   }
  // }

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
    setShowContactPrompt(value === 'online')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-8 sm:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Secure Checkout</h1>

          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {i}
                  </div>
                  {i < 2 && (
                    <div className={`h-1 w-full ${
                      step > i ? 'bg-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-medium">Shipping</span>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="JohnDoe@gmail.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Luxury Lane"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input 
                    id="zipCode" 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                  />
                  {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter your country"
                  />
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="123-456-7890"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={nextStep}>Continue to Payment</Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Select Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Online Payment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {showContactPrompt && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-primary"
                  >
                    Our team will contact you shortly to process your online payment.
                  </motion.p>
                )}

                <div className="mt-6 flex justify-between">
                {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
                  <Button variant="outline" onClick={prevStep}>Back to Shipping</Button>
                  <Button onClick={nextStep} disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Confirm Order'}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}