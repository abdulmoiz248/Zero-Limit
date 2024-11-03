"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, Trash2, ShoppingBag, Sparkles, Truck, LogIn, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import Cookies from "js-cookie"
import { addToCart, getCart, removeFromCart } from "@/helper/cart"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Product } from "@/Models/Product"
import { CartItem } from "@/interfaces/interfaces"

export default function Component() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCustomer, setIsCustomer] = useState(false);

  const updateCart = () => {
    const cart = getCart();
    const cartItems = Object.values(cart).map(item => item as CartItem);
    setCartItems(cartItems);
  }

  useEffect(() => {
    const customerCookie = !!Cookies.get('customer');
    setIsCustomer(customerCookie);
    updateCart();
  }, []);

  const handleCheckout = () => {
    if (isCustomer) {
      router.push('/Checkout');
    } else {
      router.push('/Login');
    }
  };
  
  function updateQuantity(productId: string, newQuantity: number): void {
    const cart = getCart();
    const item: CartItem = cart[productId];
    
    if (!item) {
      return;
    }
    addToCart(item.product as Product, newQuantity);
    updateCart();
  }

  const removeItem = (id: string) => {
    removeFromCart(id);
    updateCart()
  }

  const calculateItemTotal = (item: CartItem) => {
    const basePrice = item.product.price * item.quantity;
    if (item.product.discountPercent && item.product.discountPercent > 0) {
      const discountAmount = (basePrice * item.product.discountPercent) / 100;
      return basePrice - discountAmount;
    }
    return basePrice;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  const deliveryFee = 100
  const total = subtotal + deliveryFee

  return (
    <div className="min-h-screen bg-gradient-to-br pt-10 from-white to-gray-100 text-black font-sans">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold mb-12 text-center text-[#00000]"
        >
          Your Fearless Cart
        </motion.h1>
        <AnimatePresence mode="wait">
          {cartItems.length > 0 ? (
            <motion.div
              key="full-cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-8 max-w-3xl mx-auto"
            >
              {cartItems.map((item, index) => (
                <motion.div
                   
                  key={item.product._id as string}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div onClick={()=>{
                    router.push(`/Product/${item.product._id}`)
                  }}
                   className="relative w-24 h-24 overflow-hidden rounded-md">
                    <Image src={item.product.link[0]} alt={item.product.name} layout="fill" objectFit="cover" className="transition-transform duration-300 hover:scale-110" />
                  </div>
                  <div className="flex-grow space-y-2">
                    <h2 onClick={()=>{
                    router.push(`/Product/${item.product._id}`)
                  }}  className="text-xl font-bold text-[#1b03a3]">{item.product.name}</h2>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-semibold">Rs.{item.product.price.toFixed(2)}</p>
                      {item.product.discountPercent && item.product.discountPercent > 0 && (
                        <span className="text-sm text-green-600 font-semibold">
                          ({item.product.discountPercent}% off)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product._id as string,  - 1)}
                        className="rounded-full bg-[#1b03a3] text-white hover:bg-[#1b03a3]/80"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        readOnly
                        type="number"
                        min="0"
                        max={item.product.quantity}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product._id as string, parseInt(e.target.value))}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product._id as string,  1)}
                        className="rounded-full bg-[#1b03a3] text-white hover:bg-[#1b03a3]/80"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">Rs.{calculateItemTotal(item)}</p>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.product._id as string)} className="text-[#1b03a3] hover:text-[#1b03a3]/80">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-white rounded-lg shadow-md"
              >
                <div className="space-y-2 mb-4">
                  <p className="text-xl flex justify-between"><span>Subtotal:</span> <span>Rs.{subtotal.toFixed(2)}</span></p>
                  <p className="text-xl flex justify-between items-center">
                    <span className="flex items-center"><Truck className="mr-2 h-5 w-5 text-[#1b03a3]" /> Delivery Fee:</span>
                    <span>Rs.{deliveryFee.toFixed(2)}</span>
                  </p>
                  <p className="text-2xl font-bold flex justify-between"><span>Total:</span> <span>Rs.{total.toFixed(2)}</span></p>
                </div>
                {isCustomer ? (
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-[#1b03a3] text-white hover:bg-[#1b03a3]/80 transition-colors duration-300 text-lg font-bold py-4 rounded-full"
                  >
                    <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Button 
                      onClick={() => 
                      {  Cookies.set('redirect','true')
                        router.push('/Login')}
                      }
                      className="w-full bg-[#1b03a3] text-white hover:bg-[#1b03a3]/80 transition-colors duration-300 text-lg font-bold py-4 rounded-full"
                    >
                      <LogIn className="mr-2 h-5 w-5" /> Login to Checkout
                    </Button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-16 max-w-md mx-auto"
            >
              <div className="relative inline-block">
                <ShoppingBag className="w-32 h-32 text-[#1b03a3]" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute top-0 right-0"
                >
                  <Sparkles className="w-12 h-12 text-yellow-400" />
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold mt-8 mb-4 text-[#1b03a3]">Your cart is empty</h2>
              <p className="text-xl text-gray-600 mb-8">But it doesn&apos;t have to be. Let&apos;s add some fearless style to your life!</p>
              <Button 
                onClick={() => router.push('/all-products')}
                className="bg-[#1b03a3] text-white hover:bg-[#1b03a3]/80 transition-colors duration-300 text-lg font-bold py-4 px-8 rounded-full"
              >
                Start Shopping
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button 
            onClick={() => router.push('/all-products')}
            variant="link" 
            className="text-[#1b03a3] hover:text-[#1b03a3]/80 transition-colors duration-300"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    </div>
  )
}