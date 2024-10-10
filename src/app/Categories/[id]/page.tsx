'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { notFound } from "next/navigation"
import { ShoppingCart } from "lucide-react"

// Sample category data
const categories = {
  "1": {
    name: "Electronics",
    products: [
      { id: 1, name: "Smartphone", price: 699, image: "/placeholder.svg?height=200&width=200" },
      { id: 2, name: "Laptop", price: 1299, image: "/placeholder.svg?height=200&width=200" },
      { id: 3, name: "Headphones", price: 199, image: "/placeholder.svg?height=200&width=200" },
      { id: 4, name: "Smartwatch", price: 299, image: "/placeholder.svg?height=200&width=200" },
    ],
  },
  "2": {
    name: "Clothing",
    products: [
      { id: 5, name: "T-Shirt", price: 29, image: "/placeholder.svg?height=200&width=200" },
      { id: 6, name: "Jeans", price: 79, image: "/placeholder.svg?height=200&width=200" },
      { id: 7, name: "Sneakers", price: 99, image: "/placeholder.svg?height=200&width=200" },
      { id: 8, name: "Jacket", price: 129, image: "/placeholder.svg?height=200&width=200" },
    ],
  },
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = categories[params.id]

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#3498db]"
        >
          {category.name}
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {category.products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 bg-[#3498db] text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
                  ${product.price}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mb-4 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <button className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}