'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ChevronRight, Mail, Lock, AlertCircle, Loader } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading to true on submit

    if(password.length <6){
      setError('Incorrect password');
      setLoading(false); 
      return
    }
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('customerData', JSON.stringify(response.data.customerData));
        router.push('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);  
      setError('Incorrect email or password. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-10 p-4 ">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white p-8 shadow-lg border-2 border-[#1b03a3] rounded-xl">
          <h2 className="text-3xl font-extrabold text-center text-[#1b03a3] mb-6">
            Login to Limit Zero
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Don&apos;t have an account?{' '}
            <Link href="/Register" className="font-medium text-[#1b03a3] hover:text-yellow-500 transition-colors">
              Sign up here
            </Link>
          </p>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-100 text-red-700 p-3 rounded-md mb-4 flex items-center"
              >
                <AlertCircle className="mr-2 h-5 w-5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm text-gray-800">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="fearless@zeroLimit.com"
                  className="w-full px-4 py-2 pl-10 bg-gray-100 border-2 border-[#1b03a3] rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1b03a3] transition"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-sm text-gray-800">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-4 py-2 pl-10 bg-gray-100 border-2 border-[#1b03a3] rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1b03a3] transition"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <motion.button
              type="submit" 
              className={`w-full px-4 py-3 font-bold text-white bg-[#1b03a3] rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1b03a3] focus:ring-offset-2 focus:ring-offset-white ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1b03a3]/90'}`}
              whileHover={!loading ? { scale: 1.05 } : {}}
              whileTap={!loading ? { scale: 0.95 } : {}}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <>
                  <Loader className="inline-block mr-2 animate-spin h-5 w-5" />
                  Loading...
                </>
              ) : (
                <>
                  Sign in
                  <ChevronRight className="inline-block ml-2" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
