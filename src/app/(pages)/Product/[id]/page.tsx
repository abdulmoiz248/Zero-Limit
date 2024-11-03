'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Minus, ChevronDown, ChevronUp, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock product data
const product = {
  name: "Luxe Leather Tote",
  description: "Elevate your everyday style with our Luxe Leather Tote. Crafted from premium, full-grain leather, this spacious bag combines functionality with sophisticated design.",
  price: 299.99,
  images: [
    "/placeholder.svg?height=600&width=600&text=Image+1",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
    "/placeholder.svg?height=600&width=600&text=Image+5",
  ],
  sizes: ["Small", "Medium", "Large"],
  types: ["Classic", "Vintage", "Modern"],
  details: {
    description: "Our Luxe Leather Tote is the perfect blend of style and functionality. The spacious interior easily accommodates your daily essentials, while the sturdy handles and detachable shoulder strap offer versatile carrying options.",
    productInfo: "Made from full-grain leather\nInterior zip pocket and two slip pockets\nMagnetic closure\nDimensions: 14\"W x 11\"H x 5\"D",
    shipping: "Free shipping on orders over $150\nEstimated delivery: 3-5 business days",
    modelSize: "Model is 5'9\" and wearing size Medium",
    notes: "Colors may vary slightly due to differences in screen displays\nLeather will develop a beautiful patina over time"
  },
  reviews: [
    { id: 1, author: "Emily S.", rating: 5, comment: "Absolutely love this bag! The quality is outstanding and it's so versatile." },
    { id: 2, author: "Michael T.", rating: 4, comment: "Great bag, but a bit pricey. Still, the craftsmanship is excellent." },
    { id: 3, author: "Sarah L.", rating: 5, comment: "This tote is perfect for work. Fits my laptop and all my essentials easily." },
  ]
}

export default function Component() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const fullscreenRef = useRef<HTMLDivElement>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleImageClick = () => {
    setIsFullscreen(true)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fullscreenRef.current && !fullscreenRef.current.contains(event.target as Node)) {
        setIsFullscreen(false)
      }
    }

    if (isFullscreen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFullscreen])

  return (
    <div className="min-h-screen bg-white p-8">
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <Card className="max-w-7xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Vertical scrollable image column */}
            <div className="w-full lg:w-24 lg:h-[600px] flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden hide-scrollbar">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 cursor-pointer ${
                    index === currentImageIndex ? 'border-2 border-primary' : 'border border-gray-200'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main product image */}
            <div className="flex-grow cursor-pointer" onClick={handleImageClick}>
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-auto"
              />
            </div>

            {/* Product details */}
            <div className="lg:w-1/3 space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
              
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <Select>
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size.toLowerCase()}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.types.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-500"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-center w-12">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-500"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-primary text-white hover:bg-primary/90">Add to Cart</Button>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">Buy Now</Button>

              {/* Expandable sections */}
              {Object.entries(product.details).map(([key, value]) => (
                <div key={key} className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => toggleSection(key)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <span className="text-lg font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    {expandedSection === key ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedSection === key && (
                    <div className="mt-2 text-gray-600 whitespace-pre-line">
                      {value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{review.author}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen image viewer */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div ref={fullscreenRef} className="max-w-4xl max-h-full overflow-auto hide-scrollbar">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              width={1200}
              height={1200}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  )
}