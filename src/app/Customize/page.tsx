'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Trash2 } from 'lucide-react'

const designs = [
  { id: 1, name: 'Heart', emoji: '❤️' },
  { id: 2, name: 'Star', emoji: '⭐' },
  { id: 3, name: 'Smiley', emoji: '😊' },
  { id: 4, name: 'Flower', emoji: '🌸' },
]

interface Design {
  id: number
  x: number
  y: number
  emoji: string
}

export default function JacketCustomizer() {
  const [placedDesigns, setPlacedDesigns] = useState<Design[]>([])
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null)
  const [size, setSize] = useState('Medium')
  const [color, setColor] = useState('Black')
  const { toast } = useToast()
  const jacketRef = useRef<HTMLDivElement>(null)

  const handleDesignSelect = (emoji: string) => {
    setSelectedDesign(emoji)
  }

  const handleJacketClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedDesign && jacketRef.current) {
      const jacketRect = jacketRef.current.getBoundingClientRect()
      const x = event.clientX - jacketRect.left
      const y = event.clientY - jacketRect.top

      setPlacedDesigns([...placedDesigns, { id: Date.now(), x, y, emoji: selectedDesign }])
      setSelectedDesign(null)
    }
  }

  const removeDesign = (id: number) => {
    setPlacedDesigns(placedDesigns.filter(design => design.id !== id))
  }

  const handleOrder = () => {
    toast({
      title: "Order Placed!",
      description: `Your customized ${color} ${size} jacket with ${placedDesigns.length} designs has been ordered.`,
      duration: 5000,
    })
  }

  const totalPrice = 59.99 + placedDesigns.length * 5

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Customize Your Jacket</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div 
                ref={jacketRef} 
                className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 cursor-crosshair"
                onClick={handleJacketClick}
              >
                <img
                  src="/images/download.jfif"  alt="Jacket"
                  className="w-full h-full  object-cover"
                />
                {placedDesigns.map((design) => (
                  <motion.div
                    key={design.id}
                    className="absolute text-4xl cursor-move"
                    style={{ left: design.x, top: design.y }}
                    drag
                    dragMomentum={false}
                    onDragEnd={(event, info) => {
                      const newX = design.x + info.offset.x
                      const newY = design.y + info.offset.y
                      setPlacedDesigns(placedDesigns.map(d => 
                        d.id === design.id ? { ...d, x: newX, y: newY } : d
                      ))
                    }}
                  >
                    {design.emoji}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeDesign(design.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Available Designs</h2>
                <div className="flex flex-wrap gap-4">
                  {designs.map((design) => (
                    <motion.div
                      key={design.id}
                      className={`text-4xl cursor-pointer ${selectedDesign === design.emoji ? 'border-2 border-primary rounded-md' : ''}`}
                      onClick={() => handleDesignSelect(design.emoji)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {design.emoji}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Customization Options</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="size">Size</Label>
                    <select 
                      id="size" 
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                      <option>X-Large</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <select 
                      id="color" 
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option>Black</option>
                      <option>Navy</option>
                      <option>Gray</option>
                      <option>Red</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                <p>Total Designs: {placedDesigns.length}</p>
                <p>Price: ${totalPrice.toFixed(2)}</p>
              </div>
              
              <Button onClick={handleOrder} className="w-full">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
      {selectedDesign && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            className="text-6xl opacity-50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {selectedDesign}
          </motion.div>
        </div>
      )}
    </div>
  )
}