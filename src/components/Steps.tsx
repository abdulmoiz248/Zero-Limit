'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, CreditCard, Package, Check } from 'lucide-react'

const steps = [
  { id: 1, title: 'Add to Cart', icon: ShoppingCart },
  { id: 2, title: 'Checkout', icon: CreditCard },
  { id: 3, title: 'Delivered', icon: Package },
]

export default function Steps() {
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep % 3) + 1)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Simple Checkout Process
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center w-full md:w-1/3"
          >
            <motion.div
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                step.id === currentStep
                  ? 'bg-blue-500 text-white'
                  : step.id < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
              animate={{
                scale: step.id === currentStep ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: step.id === currentStep ? Infinity : 0,
                repeatType: 'reverse',
              }}
            >
              {step.id < currentStep ? (
                <Check className="w-10 h-10" />
              ) : (
                <step.icon className="w-10 h-10" />
              )}
            </motion.div>
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              {step.title}
            </h3>
            {step.id < 3 && (
              <motion.div
                className="w-full h-1 bg-gray-200 mt-4 hidden md:block"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: currentStep > step.id ? 1 : 0,
                  backgroundColor:
                    currentStep > step.id ? '#48BB78' : '#E2E8F0',
                }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

