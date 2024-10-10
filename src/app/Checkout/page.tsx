'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Lock, Truck, DollarSign, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export default function LuxuryCheckoutPage() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('online')
  const [formData, setFormData] = useState<FormData>({
    firstName: '', lastName: '', address: '', city: '', zipCode: '', country: '',
    cardName: '', cardNumber: '', expiry: '', cvv: ''
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const nextStep = () => {
    if (step === 1 && validateShippingInfo()) {
      setStep(2)
    } else if (step === 2 && validatePaymentInfo()) {
      setStep(3)
    }
  }

  const prevStep = () => setStep(step - 1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateShippingInfo = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required'
    if (!formData.country) newErrors.country = 'Country is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePaymentInfo = () => {
    if (paymentMethod === 'cod') return true
    const newErrors: Partial<FormData> = {}
    if (!formData.cardName) newErrors.cardName = 'Name on card is required'
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required'
    if (!formData.expiry) newErrors.expiry = 'Expiry date is required'
    if (!formData.cvv) newErrors.cvv = 'CVV is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const simulatePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Payment Successful",
        description: "Your order has been placed successfully!",
        duration: 5000,
      })
    }, 2000)
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
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {i}
                  </div>
                  {i < 3 && (
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
              <span className="text-sm font-medium">Review</span>
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
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
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
                <div className="col-span-2">
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
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2 space-y-2">
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
                {paymentMethod === 'online' && (
                  <>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input 
                        id="cardName" 
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                      />
                      {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                        />
                        {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </>
                )}
                {paymentMethod === 'cod' && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      You have selected Cash on Delivery. Please have the exact amount ready when your order arrives.
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Review Order</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Items</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Wireless Earbuds</span>
                      <span>$179.99</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Luxury Smartwatch</span>
                      <span>$299.99</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Premium Bluetooth Speaker (x2)</span>
                      <span>$319.98</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Shipping</h3>
                  <RadioGroup defaultValue="standard">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard Shipping (Free)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express">Express Shipping ($15.00)</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p>{paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Total</h3>
                  <div className="flex justify-between text-lg font-semibold">
                    
                    <span>Total Amount</span>
                    <span>$799.96</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={prevStep}>Back</Button>
                <Button onClick={simulatePayment} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <span className="mr-2">Processing</span>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <CheckCircle className="h-5 w-5" />
                      </motion.span>
                    </>
                  ) : (
                    'Place Order'
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                <p>Secure checkout</p>
              </div>
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                <p>Free shipping on orders over $500</p>
              </div>
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                <p>Multiple payment options</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}