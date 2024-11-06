"use client" 

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import useOneSignal from '@/hooks/usOneSignal';
import { 
  PlusCircle, 
  Tag, 
  Star, 
  Trash2, 
  Package, 
  
  LogOut,
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AddCategory from '@/components/admin/AddCat'
import AddProductModal from '@/components/admin/AddProductModal'
import AddDiscountModal from '@/components/admin/AddDiscountModal'
import FeatureProductModal from '@/components/admin/FeatureModal'
import DeleteProductModal from '@/components/admin/DeleteModal'
import { Order } from '@/Models/Order'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)


interface topProducts{
   name:string;
   revenue:string | number;
   sales:string | number;
}

export default function Dashboard() {
  useOneSignal();
  const router = useRouter()
  let ordernumber=0;
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false)
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [summary,setSummary]=useState({
    revenue:{value:0,trend:0},
    customers:{value:0,trend:0},
    products:{value:0,trend:0},
    orders:{value:0,trend:0},
  })
  const [topProducts,setTopProducts] = useState<topProducts[]>([]);
  const [salesData, setSalesData] = useState(null); 
 const [topOrders,setTopOrders] = useState([]);
  useEffect(()=>{
    const fetchSalesData = async () => {
      try {
        const res = await axios.get('/api/admin/sales')
        if (res.data.success) {
          setSalesData(res.data.sales)
          setSummary(res.data.summary)
         
          setTopOrders(res.data.topOrders)
          setTopProducts(res.data.topProducts)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchSalesData()

  },[])

  const handleOpenModal = (modalSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsCategoryModalOpen(false)
    setIsProductModalOpen(false)
    setIsDiscountModalOpen(false)
    setIsFeatureModalOpen(false)
    setIsDeleteModalOpen(false)
    modalSetter(true)
  }

  const handleCloseModal = () => {
    setIsCategoryModalOpen(false)
    setIsProductModalOpen(false)
    setIsDiscountModalOpen(false)
    setIsFeatureModalOpen(false)
    setIsDeleteModalOpen(false)
  }

  const addCategory = async (formData: unknown) => {
    try {
      const res = await axios.post('/api/admin/category', formData)
      if (res.data.success) {
        console.log('Category added successfully')
      }
    } catch (error) {
      console.error(error)
    } finally {
      handleCloseModal()
    }
  }

  const addProduct = async (formData: unknown) => {
    try {
      const res = await axios.post('/api/admin/product', formData)
      if (res.data.success) {
        console.log('Product added successfully')
      }
    } catch (error) {
      console.error(error)
    } finally {
      handleCloseModal()
    }
  }

  const addDiscount = async (data: unknown) => {
    try {
      const res = await axios.post('/api/admin/discount', data)
      if (res.data.success) {
        console.log('Discount added successfully')
      }
    } catch (error) {
      console.error(error)
    } finally {
      handleCloseModal()
    }
  }

  const addFeature = async (data: unknown) => {
    try {
      const res = await axios.post('/api/admin/feature-product', data)
      if (res.data.success) {
        console.log('Product featured successfully')
      }
    } catch (error) {
      console.error(error)
    } finally {
      handleCloseModal()
    }
  }

  const deleteProduct = async (data: { productId: string }) => {
    try {
      const res = await axios.delete(`/api/admin/product/${data.productId}`)
      if (res.data.success) {
        console.log('Product deleted successfully')
      }
    } catch (error) {
      console.error(error)
    } finally {
      handleCloseModal()
    }
  }

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/admin/logout")
      if (res.data.success) {
        console.log("Logged out successfully")
        router.push("/")
      }
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mt-20 mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">E-commerce Dashboard</h1>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Revenue" value={summary.revenue.value} icon={<DollarSign />} trend={summary.revenue.trend} />
          <StatCard title="Orders" value={summary.orders.value} icon={<ShoppingCart />} trend={summary.orders.trend} />
          <StatCard title="Customers" value={summary.customers.value} icon={<Users />} trend={summary.customers.trend} />
          <StatCard title="Product Sales" value={summary.products.value} icon={<Package />} trend={summary.products.trend} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
               {salesData && <Bar data={salesData} options={{ responsive: true }} />}
            </CardContent>
          </Card>
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Add a Category", icon: PlusCircle, handler: () => handleOpenModal(setIsCategoryModalOpen) },
            { title: "Add a Product", icon: Package, handler: () => handleOpenModal(setIsProductModalOpen) },
            { title: "Add Discount", icon: Tag, handler: () => handleOpenModal(setIsDiscountModalOpen) },
            { title: "Feature a Product", icon: Star, handler: () => handleOpenModal(setIsFeatureModalOpen) },
            { title: "Delete a Product", icon: Trash2, handler: () => handleOpenModal(setIsDeleteModalOpen) },
            { title: "View Pending Orders", icon: ShoppingCart, handler: () => router.push('/admin/order/pending')},
           { title: "View All Orders", icon: Package, handler: () => router.push('/admin/order/all') },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    onClick={item.handler}
                  >
                    {item.title}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topOrders && 
                  topOrders.map((order:Order) => (
                    <TableRow key={order._id as string}>
                      <TableCell>{ordernumber++}</TableCell>
                      <TableCell>{order.email}</TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {topProducts && topProducts.map(product => (
                    <TableRow key={product.name}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>${product.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <AddCategory
          isOpen={isCategoryModalOpen}
          onClose={handleCloseModal}
          onSubmit={addCategory}
        />
        <AddProductModal
          isOpen={isProductModalOpen}
          onClose={handleCloseModal}
          onSubmit={addProduct}
        />
        <AddDiscountModal
          isOpen={isDiscountModalOpen}
          onClose={handleCloseModal}
          onSubmit={addDiscount}
        />
        <FeatureProductModal
          isOpen={isFeatureModalOpen}
          onClose={handleCloseModal}
          onSubmit={addFeature}
        />
        <DeleteProductModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseModal}
          onSubmit={deleteProduct}
        />
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend: number
}

function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {trend > 0 ? (
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" /> {trend}% from last month
              </span>
            ) : trend < 0 ? (
              <span className="text-red-600 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1" /> {Math.abs(trend)}% from last month
              </span>
            ) : (
              <span className="text-gray-600">No change from last month</span>
            )}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}