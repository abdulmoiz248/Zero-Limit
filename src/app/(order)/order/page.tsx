"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, Package, Calendar, DollarSign, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'
import LionLoader from '@/components/LionLoader'
import { Order } from '@/Models/Order'
import { Product } from '@/Models/Product'
import { countItems, removeDuplicateProducts } from '@/helper/order'
import { useRouter } from 'next/navigation'

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [unfilteredProducts, setUnfilteredProducts] = useState<string[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let email = ''
        if (typeof window !== 'undefined') {
          const storedCustomer = localStorage.getItem('customerData')
          if (storedCustomer) {
            const customer = JSON.parse(storedCustomer)
            email = customer.email
          }
        }
        const { data } = await axios.get(`/api/order/${email}`)
        if (data.success) {
          setOrders(data.orders.slice().reverse());
        } else {
          setError('Failed to fetch orders.')
        }
      } catch {
        setError('An error occurred while fetching orders.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleOpenModal = async (order: Order) => {
    try {
      setSelectedOrder(order)
      
      const res = await axios.post(`/api/order-products`, { products: order.products })
      setUnfilteredProducts(order.products)
      if (res.data.success) {
        const products = res.data.products
        setSelectedProducts(removeDuplicateProducts(products))
        setIsModalOpen(true)
      }
    } catch (error) {
      console.error('Failed to fetch products for the order:', error)
    }
  }

  const handleCloseModal = () => setIsModalOpen(false)

  const handleCancelOrder = async () => {
    if (!selectedOrder) return
    try {
      await axios.post(`/api/order/cancel`, { id: selectedOrder._id })
      const updatedOrders = orders.map((order) =>
        order._id === selectedOrder._id ? { ...order, status: 'Cancelled' } : order
      )
      setOrders(updatedOrders as Order[])
      setSelectedOrder({ ...selectedOrder, status: 'Cancelled' } as Order)
    } catch {
      console.error('Failed to cancel order.')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Shipped':
        return 'bg-blue-100 text-blue-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b03a3]/5 to-white pt-20">
      <div className="container mx-auto p-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-12 text-center text-[#1b03a3]"
        >
          Your Orders
        </motion.h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LionLoader />
          </div>
        ) : error ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center text-lg"
          >
            {error}
          </motion.p>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-500 text-xl"
          >
            <ShoppingBag className="w-24 h-24 mx-auto mb-4 text-[#1b03a3]" />
            <p>No orders found. Start shopping to see your orders here!</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {orders.map((order, index) => (
              <motion.div
                key={order._id as string}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 bg-white border-2 border-[#1b03a3]/10 hover:border-[#1b03a3] rounded-xl overflow-hidden">
                  <CardHeader className="bg-[#1b03a3]/5">
                    <CardTitle className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-[#1b03a3]">Order #{index + 1}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-[#1b03a3]" />
                        <span className="font-medium text-gray-800">Total: Rs.{order.total.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-[#1b03a3]" />
                        <span className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleOpenModal(order)}
                      className="w-full mt-6 bg-[#1b03a3] hover:bg-[#1b03a3]/90 text-white transition-colors duration-300"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          {isModalOpen && selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-[#1b03a3] p-6 text-white">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-white hover:bg-white/20"
                    onClick={handleCloseModal}
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                  <h2 className="text-3xl font-bold">Order Details</h2>
                  <p className="text-white/80 mt-2">Order #{selectedOrder._id as string}</p>
                </div>
                <ScrollArea className="h-[calc(100vh-250px)] p-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                      <span className="font-semibold text-lg text-gray-700">Total:</span>
                      <span className="text-2xl font-bold text-[#1b03a3]">Rs.{selectedOrder.total.toFixed(2)}</span>
                    </div>
                    <Separator className="bg-gray-200" />
                    <h3 className="font-semibold text-xl text-gray-800">Products</h3>
                    <ul className="space-y-4">
                      {selectedProducts.map((product: Product) => {
                        const quantity = countItems(product._id as string, unfilteredProducts)
                        return (
                          <motion.li
                            key={product._id as string}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="group flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-[#1b03a3]/5 transition-colors duration-300 cursor-pointer"
                            onClick={() => router.push(`/Product/${product._id}`)}
                          >
                            <div className="flex items-center">
                              <Package className="w-5 h-5 mr-3 text-[#1b03a3]" />
                              <span className="text-gray-700 group-hover:text-[#1b03a3] transition-colors duration-300">{product.name}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-600 mr-2">x {quantity}</span>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1b03a3] transition-colors duration-300" />
                            </div>
                          </motion.li>
                        )
                      })}
                    </ul>
                    <Separator className="bg-gray-200" />
                    {selectedOrder.status === 'Pending' && (
                      <Button
                        variant="destructive"
                        onClick={handleCancelOrder}
                        className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white transition-colors duration-300"
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </ScrollArea>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}