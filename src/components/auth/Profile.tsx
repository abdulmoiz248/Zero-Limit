"use client";
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation';

export default function CustomerDashboard() {
  const [customer, setCustomer] = useState<{ fullName: string; email: string; avatar: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCustomer = localStorage.getItem('customerData');
      if (storedCustomer) setCustomer(JSON.parse(storedCustomer));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customerData');
    Cookies.remove('customer');
    router.push('/Login');
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-center text-[#1b03a3]">Customer Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 p-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.5 }}>
            {customer ? (
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">{customer.fullName}</h2>
                <p className="text-sm text-gray-600">{customer.email}</p>
              </div>
            ) : (
              <p className="text-gray-500">No customer data available.</p>
            )}
          </motion.div>

          <Button
            className="w-full bg-[#1b03a3] hover:bg-[#1b03a3]/90 text-white transition duration-300"
            onClick={() => router.push('/order')}
          >
            View Orders
          </Button>
        </CardContent>

        <Separator className="my-4" />
        <CardFooter className="flex justify-end p-4 bg-gray-50">
          <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
            <LogOut className="h-4 w-4 text-[#1b03a3]" />
            <span className="text-[#1b03a3]">Logout</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
