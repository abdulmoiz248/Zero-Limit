'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Categories } from '@/Models/Categories'
import { Product } from '@/Models/Product'
import ProductCard from '@/components/ProductCard'
import { motion } from 'framer-motion'
import LionLoader from '@/components/LionLoader'
import { Sparkles, Package } from 'lucide-react'

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<Categories | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/getCategories/${params.id}`)
        if (response.data.success) {
          setCategory(response.data.category)
          setProducts(response.data.products)
        } else {
          setError("Failed to load category data.")
        }
      } catch (error) {
        console.log(error)
        setError("An error occurred while fetching data.")
      } finally {
        setLoading(false)
      }
    }

   
      fetchData()
    

  }, [params.id])

  if (loading) return <LionLoader />
  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <Package className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    </motion.div>
  )
  if (!category) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <Package className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Category Not Found</h2>
        <p className="text-gray-600">We couldn&apos;t find the category you&apos;re looking for.</p>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-10"
    >
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#1b03a3]">
            {category.name}
          </h1>
          <div className="flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
            <p className="text-lg text-gray-600">Explore our amazing products</p>
          </div>
        </motion.div>
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-gray-600 bg-white p-8 rounded-lg shadow-lg"
          >
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl">No products available in this category.</p>
            <p className="mt-2">Check back soon for new arrivals!</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {products.map((product: Product, index) => (
              <motion.div
                key={product._id as string}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}