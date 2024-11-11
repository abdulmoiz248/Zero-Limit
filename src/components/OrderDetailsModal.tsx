'use client'

import { useEffect, useState } from 'react'
import { X, CreditCard, CheckCircle, Save, AlertCircle } from 'lucide-react'
import { Order } from '@/Models/Order'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { Product } from '@/Models/Product'


interface OrderDetailsModalProps {
  order: Order
  onClose: () => void
  onStatusChange: (orderId: string, newStatus: Order['status'], shippingId?: string) => void
}

export default function OrderDetailsModal({ order, onClose, onStatusChange }: OrderDetailsModalProps) {
  const [status, setStatus] = useState<Order['status']>(order.status)
  const [isStatusChanged, setIsStatusChanged] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [shippingId, setShippingId] = useState('')

  const isUnchangeable = order.status === 'Cancelled' || order.status === 'Delivered'

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.post('/api/order-products', {
          products: order.products.map((item) => ({
            productId: item.productId,  // Only send productId
          }))
        })
        if (res.data.success) {
          setProducts(res.data.products)
          console.log(res.data.products);
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [order.products])

  const handleStatusChange = (newStatus: Order['status']) => {
    if (!isUnchangeable) {
      setStatus(newStatus)
      setIsStatusChanged(true)
      if (newStatus !== 'Shipped') {
        setShippingId('')
      }
    }
  }

  const handleSaveStatus = () => {
    if (isUnchangeable) return

    if (status === 'Shipped' && !shippingId) {
      alert('Please enter a shipping ID')
      return
    }
    onStatusChange(order._id as string, status, shippingId)
    setIsStatusChanged(false)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-white p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 pb-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <DialogTitle className="text-2xl font-bold">Order Details</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4 text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>
        <div className="overflow-y-auto flex-grow px-6 py-4">
          {isUnchangeable && (
            <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              This order has been {order.status.toLowerCase()} and cannot be edited.
            </div>
          )}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Order #{order._id as string}</h3>
                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <Badge 
                variant={
                  status === 'Pending' ? 'secondary' : 
                  status === 'Shipped' ? 'default' : 
                  status === 'Delivered' ? 'outline' :
                  status === 'Cancelled' ? 'destructive' : 'outline'
                } 
                className="text-sm"
              >
                {status}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-blue-600">Customer Details</h4>
                <p>{order.name}</p>
                <p>{order.email}</p>
                <p>{order.phone}</p>
              </div>
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-blue-600">Shipping Address</h4>
                <p>{order.address}</p>
                <p>{order.city}, {order.zipCode}</p>
                <p>{order.country}</p>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-blue-600">Order Status</h4>
              <div className="flex items-center space-x-2">
                <Select value={status} onValueChange={handleStatusChange} disabled={isUnchangeable}>
                  <SelectTrigger className="w-full bg-white border">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                {isStatusChanged && !isUnchangeable && (
                  <Button onClick={handleSaveStatus} size="sm" className="bg-green-500 hover:bg-green-600">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                )}
              </div>
              {status === 'Shipped' && !isUnchangeable && order.status !== 'Shipped' && (
                <div className="mt-2">
                  <Input
                    type="text"
                    placeholder="Enter Shipping ID"
                    value={shippingId}
                    onChange={(e) => setShippingId(e.target.value)}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-blue-600">Payment Information</h4>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-gray-500" />
                <span>{order.paymentStatus}</span>
              </div>
            </div>

            <div className="space-y-2">
  <h4 className="font-semibold text-blue-600">Order Items</h4>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Product</TableHead>
        <TableHead className="text-right">Quantity</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {products && products.map((product: Product) => {
        // Iterate over each size in the product
        return Object.keys(product.size).map((sizeKey) => {
          // Calculate how many times this size appears in the order
          const sizeOccurrences = order.products.reduce((total, orderProduct) => {
            // Check if the order product has the same productId and size
            if (orderProduct.productId === product._id && orderProduct.size === sizeKey) {
              total += 1;  // Increment by 1 for each occurrence of this size
            }
            return total;
          }, 0);

          return (
            <TableRow key={`${product._id}-${sizeKey}`}>
              <TableCell>{product.name} | {sizeKey}</TableCell>
              <TableCell className="text-right">{sizeOccurrences}</TableCell>
            </TableRow>
          );
        });
      })}
    </TableBody>
  </Table>
</div>


            <div className="flex justify-between items-center font-semibold text-lg bg-blue-50 p-4 rounded-lg">
              <span>Total</span>
              <span>Rs.{order.total}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
