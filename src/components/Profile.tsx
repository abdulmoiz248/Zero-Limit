'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Package, Settings, LogOut } from 'lucide-react'

export default function Profile() {
  const [user, setUser] = useState({
    name: 'Blice Johnson',
    email: 'alice@example.com',
    avatar: '/placeholder.svg?height=100&width=100',
  })

  const [orders, setOrders] = useState([
    { id: '1234', date: '2023-05-01', status: 'Delivered', total: '$125.00' },
    { id: '5678', date: '2023-06-15', status: 'Shipped', total: '$85.50' },
    { id: '9012', date: '2023-07-03', status: 'Processing', total: '$210.75' },
    { id: '3456', date: '2023-08-20', status: 'Delivered', total: '$150.25' },
    { id: '7890', date: '2023-09-10', status: 'Shipped', total: '$95.00' },
    { id: '2345', date: '2023-10-05', status: 'Processing', total: '$180.50' },
  ])

  const [displayedOrders, setDisplayedOrders] = useState(3)

  const handleViewAllOrders = () => {
    setDisplayedOrders(orders.length)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </CardContent>
        </Card>
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your recent orders and their status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, displayedOrders).map((order) => (
                      <div key={order.id} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.total}</p>
                          <p className="text-sm text-muted-foreground">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  {displayedOrders < orders.length && (
                    <Button variant="outline" className="w-full" onClick={handleViewAllOrders}>
                      <Package className="mr-2 h-4 w-4" />
                      View All Orders
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input id="password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <Button variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  )
}