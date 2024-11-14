'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, User } from 'lucide-react'
import { Package   } from 'lucide-react';
import Image from 'next/image'

const menuItems = [
  { name: 'Profile', href: '/Profile' },
  { name: 'Shop Now', href: '/all-products' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '#footer' },
]

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed w-full z-50 transition-all duration-300 ease-in-out">
      <div className={`relative ${scrollPosition > 50 ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
         
          <div 
  className="flex justify-start lg:w-0 lg:flex-1" 
  
>
  <a href="/" className="flex items-center">
    <Image 
      src="/images/logo.png" 
      alt="logo" 
      width={200} 
      height={200} 
      priority 
      style={{ width: '200px'}}
    />
  </a>
</div>

            {/* Mobile Icons */}
            <div className="flex items-center  md:hidden space-x-4">
              
              <motion.a
                href="/Profile"
                className="whitespace-nowrap  inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="h-6 w-6 text-gray-800" aria-hidden="true" />
                <span className="sr-only">Profile</span>
              </motion.a>

              <motion.a
                href="/all-products"
                className="whitespace-nowrap  inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Package   className="h-6 w-6 text-gray-800" aria-hidden="true" />
                <span className="sr-only">Shop Now</span>
              </motion.a>

              <motion.a
                href="/Cart"
                className="whitespace-nowrap inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="h-6 w-6 text-gray-800" aria-hidden="true" />
                <span className="sr-only">Cart</span>
              </motion.a>
              
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-10">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Desktop Cart */}
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <motion.a
                href="/Cart"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="h-5 w-5 mr-2" aria-hidden="true" />
                Cart
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
