'use client';

import Cookies from 'js-cookie';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Mail, X, CheckCircle } from "lucide-react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Component() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (element: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(event.target.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === element ? event.target.value : d))]);

    if (event.target.nextSibling && event.target.value !== '') {
      (event.target.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join(''); 
    try {
      const email = Cookies.get('OTP');
      const response = await axios.post('/api/auth/verify-otp', { otp: otpString, email });
      console.log('OTP verified:', response.data);

      if (response.data.success) {
        Cookies.remove('OTP');
        setShowModal(true);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Invalid OTP. Please try again.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    router.push('/Login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-black mt-4 p-8 rounded-lg shadow-lg border-2 border-yellow-500">
        
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Enter OTP</h2>
          <p className="text-white mb-8 text-center">
            We&apos;ve sent a one-time password to your email. Enter it below to verify your identity.
          </p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="flex justify-center space-x-4 mb-8">
            {otp.map((data, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el;
                  }
                }}
                
                className="w-12 h-12 text-center text-2xl font-bold bg-white border-2 border-yellow-500 text-black focus:border-orange-500 focus:ring-orange-500"
                value={data}
                onChange={e => handleChange(index, e)}
                onKeyDown={e => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={handleSubmit}
             className="w-full bg-white text-black hover:text-white font-bold py-3 rounded-md transition duration-300 ease-in-out">
              Verify OTP
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          <div className="flex items-center justify-center mt-6 text-white">
            <Mail className="mr-2 h-5 w-5" />
            <p>OTP sent to your email</p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            >
              <div className="flex justify-end">
                <Button onClick={closeModal} variant="ghost" size="icon">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-4">Verification Successful!</h2>
                <p className="mb-6">Your account has been verified. Please log in to continue.</p>
                <Button onClick={closeModal} className="bg-black hover:from-yellow-600 hover:to-orange-600 text-white hover:text-black font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out">
                  Go to Login
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}