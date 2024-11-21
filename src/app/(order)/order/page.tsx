'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, Calendar, DollarSign, ShoppingBag, ArrowRight, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'
import LionLoader from '@/components/LionLoader'
import { Order } from '@/Models/Order'
import { Product } from '@/Models/Product'
import { countItems, removeDuplicateProducts } from '@/helper/order'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [unfilteredProducts, setUnfilteredProducts] = useState<string[]>([])
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

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
          setOrders(data.orders.slice().reverse())
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
      
      const res = await axios.post('/api/order-products', {
        products: order.products.map((item) => ({
          productId: item.productId,
        }))
      })
      const products: string[] = order.products.map((item) => item.productId);

      setUnfilteredProducts(products);
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

 

  const confirmCancelOrder = async () => {
    if (!selectedOrder) return
    try {
      await axios.post(`/api/order/cancel`, { id: selectedOrder._id })
      const updatedOrders = orders.map((order) =>
        order._id === selectedOrder._id ? { ...order, status: 'Cancelled' } : order
      )
      setOrders(updatedOrders as Order[])
      setSelectedOrder({ ...selectedOrder, status: 'Cancelled' } as Order)
      setIsConfirmationModalOpen(false)
    } catch {
      console.error('Failed to cancel order.')
    }
  }

  const ConfirmationModal = () => (
    <Dialog open={isConfirmationModalOpen} onOpenChange={setIsConfirmationModalOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 pb-2 bg-red-600 text-white">
          <DialogTitle className="text-2xl font-bold flex items-center">
            <AlertTriangle className="mr-2" /> Confirm Cancellation
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <p className="text-gray-700 mb-4">Are you sure you want to cancel this order? This action cannot be undone.</p>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setIsConfirmationModalOpen(false)}>
              No, Keep Order
            </Button>
            <Button variant="destructive" onClick={confirmCancelOrder}>
              Yes, Cancel Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

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
            <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-white p-0 overflow-hidden flex flex-col">
                <DialogHeader className="p-6 pb-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <DialogTitle className="text-2xl font-bold">Order Details</DialogTitle>
                  <Button variant="ghost" size="icon" onClick={handleCloseModal} className="absolute right-4 top-4 text-white hover:bg-white/20">
                    <X className="h-5 w-5" />
                  </Button>
                </DialogHeader>
                <div className="overflow-y-auto flex-grow px-6 py-4">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Order #{selectedOrder._id as string}</h3>
                        <p className="text-sm text-gray-500">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                      </div>
                      <Badge variant={selectedOrder.status === 'Pending' ? 'secondary' : selectedOrder.status === 'Shipped' ? 'default' : selectedOrder.status === 'Delivered' ? 'outline' : 'destructive'} className="text-sm">
                        {selectedOrder.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-blue-600">Products</h4>
                      <ul className="space-y-4">
                        {selectedProducts.map((product: Product) => {
                          const quantity = countItems(product._id as string, unfilteredProducts)
                          return (
                            <li key={product._id as string} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Image src={product.link[0]} alt={product.name} width={12} height={12} className="w-12 h-12 object-cover rounded-lg mr-4" />
                                <span className="font-medium">{product.name}</span>
                              </div>
                              <span className="text-sm text-gray-600">{quantity} </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                
              
                <div className="flex justify-between items-center p-6 bg-gray-100">
                  <Button onClick={() => router.push('/')} variant="link" className="text-[#1b03a3] hover:bg-[#1b03a3]/10">
                    Continue Shopping <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>

        <ConfirmationModal />
      </div>
    </div>
  )
}