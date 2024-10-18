"use client"
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation'

export default function CustomerDashboard() {
  const [customer, setCustomer] = useState<{ fullName: string; email: string; avatar: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCustomer = localStorage.getItem('customerData')
      if (storedCustomer) setCustomer(JSON.parse(storedCustomer))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('customerData')
    Cookies.remove('customer')
    router.push('/Login')
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
        <CardContent className="flex flex-col items-center space-y-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.5 }}>
            {customer ? (
              <div className="text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={customer.avatar || '/placeholder.svg'} alt={customer.fullName} />
                  <AvatarFallback>{customer.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-semibold">{customer.fullName}</h2>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">No customer data available.</p>
            )}
          </motion.div>

          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => router.push('/order')}
          >
            View Orders
          </Button>
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
