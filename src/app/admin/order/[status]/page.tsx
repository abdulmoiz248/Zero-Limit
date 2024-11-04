'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import {  Search, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Order } from '@/Models/Order'
import OrderDetailsModal from '@/components/OrderDetailsModal'

export default function OrdersPage() {
  const params = useParams()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const status = params.status === 'pending' ? 'pending' : 'all'
        const res = await axios.get(`/api/admin/orders?status=${status}`)
        if (res.data.success) {
          setOrders(res.data.orders)
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [params.status])

  const filteredOrders = orders.filter(order => 
    order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order._id as string).toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
  }

  const handleCloseModal = () => {
    setSelectedOrder(null)
  }

  const handleStatusChange = async (orderId: string, newStatus: Order['status'],shippingId?:string) => {
    try {
      const res = await axios.post(`/api/admin/orders/${orderId}`, { status: newStatus,email:selectedOrder?.email,shippingId:shippingId })
      if (res.data.success) {
        const tempOrders=orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        )
        setOrders(tempOrders as Order[]);
        //fix
        if (selectedOrder && selectedOrder._id === orderId) {
          const updatedSelectedOrder: Order = {
            ...selectedOrder.toObject(), // Convert to a plain object
            status: newStatus,
          };
          setSelectedOrder(updatedSelectedOrder);
        }
      }
    } catch (error) {
      console.error('Failed to update order status:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto mt-20">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {params.status === 'pending' ? 'Pending Orders' : 'All Orders'}
          </h1>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by email or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading orders...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-4">No orders found.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer Email</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order._id as string}>
                        <TableCell className="font-medium">{order._id as string}</TableCell>
                        <TableCell>{order.email}</TableCell>
                        <TableCell>Rs.{order.total}</TableCell>
                        <TableCell>
                          <Badge variant={order.status === 'Pending' ? 'secondary' : 'outline' }>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleOrderClick(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={handleCloseModal}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  )
}