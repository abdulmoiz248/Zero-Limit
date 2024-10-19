"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, Package, Calendar, DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'
import LionLoader from '@/components/LionLoader'
import { Order } from '@/Models/Order'
import { Product } from '@/Models/Product'
import { calDiscount } from '@/helper/order'

export default function OrderPage() {

  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  

  const productCounts = (product: Product)=>{

    let qunatity=0;
    selectedProducts.forEach((oProduct:Product) => {
      if(oProduct._id===product._id){
        qunatity++;
      }
    });


    setSelectedProducts(selectedProducts.filter(products =>products._id!==product._id));
    return qunatity;
  }
  

  

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
          setOrders(data.orders)
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
      console.log(order.products);
      if (res.data.success) {
      //  setSelectedProducts(null)
        setSelectedProducts(res.data.products)
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

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Orders</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LionLoader />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
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
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Order #{index + 1}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                      <span className="font-medium">Total: ${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                      <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleOpenModal(order)}
                    className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </Button>
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total:</span>
                    <span className="text-2xl font-bold text-green-600">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <h3 className="font-semibold text-lg">Products</h3>
                  <ul className="space-y-3">
  
   {selectedProducts.map((product: Product) => (
                      <motion.li
                        key={product._id as string}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                      >
                        <div className="flex items-center">
                          <Package className="w-5 h-5 mr-2 text-primary" />
                          <span>{product.name} x {product.quantity}</span>
                        </div>
                        <span className="font-medium">${(calDiscount(product.price,product.discountPercent) * product.quantity).toFixed(2)}</span>
                      </motion.li>
                    ))}
                 
                 </ul>

                  <Separator />
                  {selectedOrder.status === 'Pending' && (
                    <Button
                      variant="destructive"
                      onClick={handleCancelOrder}
                      className="w-full mt-6"
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
  )
}