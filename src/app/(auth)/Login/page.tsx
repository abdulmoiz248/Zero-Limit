'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ChevronRight, Mail, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if(response.data.success)
     {
      
      localStorage.setItem('customerData',JSON.stringify(response.data.customerData));
      router.push('/'); 
       

     }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-10 p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-black p-8 shadow-lg border-2 rounded">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Login to Limit Zero
          </h2>
          <p className="text-sm text-center text-white mb-6">
            Don&apos;t have an account?{' '}
            <Link href="/Register" className="font-medium  hover:text-yellow-500 transition-colors">
              Sign up here
            </Link>
          </p>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className=" text-black p-3 rounded-md mb-4 flex items-center"
              >
                <AlertCircle className="mr-2" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm text-white">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="leroy@jenkins.com"
                  className="w-full px-4 py-2 pl-10 bg-white border-2 border-yellow-500 rounded-md text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-black-500" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-sm text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-4 py-2 pl-10 bg-white border-2 border-yellow-500 rounded-md text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-black" />
              </div>
            </div>

            <motion.button
              type="submit" 
              className="w-full px-4 py-3 font-bold text-black bg-white  rounded-md  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
              <ChevronRight className="inline-block ml-2" />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}