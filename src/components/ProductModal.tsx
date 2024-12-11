'use client'

import { useState, FormEvent, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, Toaster } from 'react-hot-toast'
import { ShoppingCart, X, Ruler } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Product } from '@/Models/Product'
import { addToCart } from '@/helper/cart'
type ProductModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  Product: Product
}

export default function ProductModal({ isOpen, setIsOpen, Product }: ProductModalProps) {
  const [size, setSize] = useState('')
  const [sizes, setSizes] = useState<string[]>([])
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [error, setError] = useState('')
 
  useEffect(() => {
    if (isOpen) {
      const availableSizes = Object.entries(Product.size)
        .filter(([, quantity]) => quantity > 0)
        .map(([size]) => size);
      setSizes(availableSizes);
      setSize('');
      setError('');
    }
  }, [isOpen, Product]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!size) {
      setError('Please select a size before adding to cart');
      return;
    }
    const cartProduct = {
      ...Product,
      size: { [size]: Product.size[size] as number },
    };
  
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Add to Cart', {name:Product.name as string});
     
 
    }
    
    addToCart(cartProduct as Product, 1);


    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5"
      >
        
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 15 }}
              >
                <ShoppingCart className="h-10 w-10 text-green-500" />
              </motion.div>
            </div>
            <div className="ml-3 flex-1">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm font-medium text-gray-900"
              >
                {Product.name} added to cart!
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-1 text-sm text-gray-500"
              >
                Size: {size} | Check your shopping cart for the item.
              </motion.p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>
    ), {
      position: "bottom-center",
      duration: 3000,
    });
    setTimeout(() => {
      setIsOpen(false);
    }, 1500)
  };

  const sizeChartData = [
    { size: 'S', chest: '36-38', waist: '30-32', hips: '37-39' },
    { size: 'M', chest: '39-41', waist: '33-35', hips: '40-42' },
    { size: 'L', chest: '42-44', waist: '36-38', hips: '43-45' },
    { size: 'XL', chest: '45-47', waist: '39-41', hips: '46-48' },
  ]

  return (
    <>
    
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-white sm:max-w-[600px] overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-[#1b03a3]">{Product.name}</DialogTitle>
                  <DialogDescription className="text-lg">
                    Select your size and add to cart
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="mt-6">
                  <div className="grid gap-6">
                    <motion.div
                      className="grid grid-cols-4 items-center gap-4"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="size" className="text-right font-semibold">
                        Size
                      </Label>
                      <Select value={size} onValueChange={(value) => { setSize(value); setError(''); }} required>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {sizes.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-sm"
                      >
                        {error}
                      </motion.p>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowSizeChart(!showSizeChart)}
                        className="w-full text-[#1b03a3] border-[#1b03a3] hover:bg-[#1b03a3] hover:text-white transition-colors"
                      >
                        <Ruler className="mr-2 h-4 w-4" /> Size Chart
                      </Button>
                    </motion.div>

                    <AnimatePresence>
                      {showSizeChart && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-[#1b03a3] text-white">
                                <th className="p-2">Size</th>
                                <th className="p-2">Chest</th>
                                <th className="p-2">Waist</th>
                                <th className="p-2">Hips</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sizeChartData.map((row, index) => (
                                <tr key={row.size} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                  <td className="p-2 text-center">{row.size}</td>
                                  <td className="p-2 text-center">{row.chest}</td>
                                  <td className="p-2 text-center">{row.waist}</td>
                                  <td className="p-2 text-center">{row.hips}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <DialogFooter className="mt-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="w-full"
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-[#1b03a3] hover:bg-[#2d14b5] text-white transition-colors"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    </motion.div>
                  </DialogFooter>
                </form>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
      <Toaster position="top-center" />
    </>
  )
}