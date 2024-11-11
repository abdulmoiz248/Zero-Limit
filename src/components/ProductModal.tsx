'use client'

import { FormEvent, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Product } from '@/Models/Product'

import { Ruler, ShoppingCart } from 'lucide-react'
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
 
;
useEffect(() => {
  if (isOpen) {
    const availableSizes = Object.entries(Product.size)
      .filter(([, quantity]) => quantity > 0)
      .map(([size]) => size);
    setSizes(availableSizes);
  }
}, [isOpen, Product.size]);


const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  const cartProduct = {
    ...Product,
    size: { [size]: Product.size[size] as number  },  // Set the size quantity from the selected size
  };

  addToCart(cartProduct as Product, 1);
  setIsOpen(false);
};


  const sizeChartData = [
    { size: 'S', chest: '36-38', waist: '30-32', hips: '37-39' },
    { size: 'M', chest: '39-41', waist: '33-35', hips: '40-42' },
    { size: 'L', chest: '42-44', waist: '36-38', hips: '43-45' },
    { size: 'XL', chest: '45-47', waist: '39-41', hips: '46-48' },
  ]

  return (
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
                    <Select value={size} onValueChange={setSize} required>
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
  )
}
