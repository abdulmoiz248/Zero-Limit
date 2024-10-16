"use client"
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, LogOut, Router } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function CustomerDashboard() {
  const [customer, setCustomer] = useState<{ fullName: string; email: string; avatar: string } | null>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCustomer = localStorage.getItem('customerData')
      if (storedCustomer) {
        setCustomer(JSON.parse(storedCustomer))
      }
    }
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    setError(null)

    try {
      if(customer) {
        let res = await axios.get(`/api/order/${customer.email}`)
        if(res.data.success){
          setOrders(res.data.orders)
        }
      }
    } catch (err) {
      setError('No orders found')
    } finally {
      setLoading(false)
    }
  }


  let router=useRouter();
  
  const handleLogout = () => {
    localStorage.removeItem('customerData');
    Cookies.remove('customer');
    router.push('/Login')    
    setCustomer(null)
    setOrders([])
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-center">Customer Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className="space-y-6 flex flex-col items-center"
            >
              {customer ? (
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={customer.avatar || '/placeholder.svg?height=96&width=96'} alt={customer.fullName} />
                    <AvatarFallback>{customer.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-semibold">{customer.fullName}</h2>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No customer data available.</p>
              )}

              <Button onClick={fetchOrders} disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                {loading ? 'Fetching Orders...' : 'Fetch Orders'}
              </Button>

              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}

              {error && <p className="text-red-500 text-center">{error}</p>}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col h-full"
            >
              <h3 className="text-xl font-semibold mb-4 text-center md:text-left">Recent Orders</h3>
              <ScrollArea className="flex-grow rounded-md border">
                <AnimatePresence>
                  {orders.length > 0 ? (
                    <ul className="space-y-3 p-4">
                      {orders.map((order, index) => (
                        <motion.li
                          key={order._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card>
                            <CardContent className="flex justify-between items-center py-4">
                              <div className="flex items-center space-x-4">
                                <Package className="h-6 w-6 text-primary" />
                                <div>
                                  <p className="font-medium">Rs {order.total}</p>
                                  <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'Pending' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </CardContent>
                          </Card>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted-foreground p-4">No orders found.</p>
                  )}
                </AnimatePresence>
              </ScrollArea>
            </motion.div>
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}