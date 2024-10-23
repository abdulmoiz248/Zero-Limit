import { useEffect, useState } from 'react'
import { X, CreditCard, CheckCircle, Save } from 'lucide-react'
import { Order } from '@/Models/Order'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import axios from 'axios'
import { Product } from '@/Models/Product'

interface OrderDetailsModalProps {
  order: Order
  onClose: () => void
  onStatusChange: (orderId: string, newStatus: Order['status']) => void
}

export default function OrderDetailsModal({ order, onClose, onStatusChange }: OrderDetailsModalProps) {
  const [status, setStatus] = useState<Order['status']>(order.status)
  const [isStatusChanged, setIsStatusChanged] = useState(false)
  const [products,setProducts] = useState<Product[]>([]);


  useEffect(()=>{

    const fetch = async() =>{
      try {
        const res=await axios.post('/api/order-products',{products:order.products});
        if(res.data.success){
          setProducts(res.data.products);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetch()
  },[])

  
const productCount=(id:string)=>{
  let count=0;
  products.forEach((product:Product) => {
    if(product._id===id){
      count++;
    }
  });
  return count;

}


  const handleStatusChange = (newStatus: Order['status']) => {
    setStatus(newStatus)
    setIsStatusChanged(true)
  }

  const handleSaveStatus = () => {
    onStatusChange(order._id as string, status)
    setIsStatusChanged(false)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-white p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 pb-2 bg-white border-b">
          <DialogTitle className="text-2xl font-bold">Order Details</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>
        <div className="overflow-y-auto flex-grow px-6 py-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Order #{order._id as string}</h3>
                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <Badge variant={status === 'Pending' ? 'secondary' : 'outline'} className="text-sm">
                {status}
              </Badge>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Customer Details</h4>
                  <p>{order.name}</p>
                  <p>{order.email}</p>
                  <p>{order.phone}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Shipping Address</h4>
                  <p>{order.address}</p>
                  <p>{order.city}, {order.zipCode}</p>
                  <p>{order.country}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Order Status</h4>
              <div className="flex items-center space-x-2">
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full bg-white border">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                
                  </SelectContent>
                </Select>
                {isStatusChanged && (
                  <Button onClick={handleSaveStatus} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Payment Information</h4>
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
              <h4 className="font-semibold">Order Items</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products && products.map((product:Product, index:number) => (
                    <TableRow key={index}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="text-right">{productCount(product._id as string)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

