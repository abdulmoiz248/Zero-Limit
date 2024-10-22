"use client"
import { useState,useEffect } from "react"
import { Minus, Plus, Trash2, ShoppingBag, Sparkles, AlertCircle, Router } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/hooks/use-toast"
import { CartItem } from "@/interfaces/interfaces"
import  Cookies  from "js-cookie"
import { getCart } from "@/helper/cart"
import { useRouter } from "next/navigation"



export default function Component() {
  let router=useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCustomer, setIsCustomer] = useState(false);

 
    useEffect(() => {
 
      
    const customerCookie = !!Cookies.get('customer');
    setIsCustomer(customerCookie);

    const cart = getCart();
    const cartItems = Object.values(cart).map(item => item as CartItem);
    setCartItems(cartItems);

  }, []);
  const handleCheckout = () => {
    if (isCustomer) {
      router.push('/Checkout');
    } else {
      router.push('/Login?redirect=Checkout');
    }
  };


  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.product._id === id) {
          if (newQuantity > item.product.quantity) {
            toast({
              title: "Quantity Limit Reached",
              description: `Only ${item.product.quantity} ${item.product.name}(s) available.`,
              variant: "destructive",
            })
            return item
          }
          return { ...item, quantity: Math.max(0, newQuantity) }
        }
        return item
      })
    )
  }
  

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.product.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold mb-12 text-center">Your Cart</h1>
        <AnimatePresence mode="wait">
          {cartItems.length > 0 ? (
            <motion.div
              key="full-cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-12"
            >
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.product._id as string}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-6 bg-gray-50 rounded-lg shadow-sm"
                >
                  <img src={item.product.link[0]} alt={item.product.name} className="w-40 h-40 object-cover rounded-md" />
                  <div className="flex-grow space-y-2">
                    <h2 className="text-2xl font-bold">{item.product.name}</h2>
                    <p className="text-xl font-semibold">${item.product.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product._id as string, item.quantity - 1)}
                        className="rounded-full"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
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
                        onClick={() => updateQuantity(item.product._id as string, item.quantity + 1)}
                        className="rounded-full"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {item.quantity === item.product.quantity && (
                      <p className="text-sm text-yellow-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Max quantity reached! You cannot add more Products
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.product._id as string)} className="self-start md:self-center">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 text-right"
              >
                <p className="text-2xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
                <Button onClick={()=>{
                  localStorage.setItem('cart', JSON.stringify(cartItems));
                 handleCheckout()
                }}
                className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 text-lg font-bold py-6 px-12 rounded-full">
                  Proceed to Checkout
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-16"
            >
              <div className="relative inline-block">
                <ShoppingBag className="w-32 h-32 text-gray-300" />
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
              <h2 className="text-3xl font-bold mt-8 mb-4">Your cart is empty</h2>
              <p className="text-xl text-gray-600 mb-8">But it doesn't have to be. Let's add some fearless style to your life!</p>
              <Button onClick={()=>{
            router.push('/')
          }}
              className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 text-lg font-bold py-6 px-12 rounded-full">
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
          <Button onClick={()=>{
            router.push('/')
          }}
          variant="link" className="text-black hover:text-gray-600 transition-colors duration-300">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    </div>
  )
}