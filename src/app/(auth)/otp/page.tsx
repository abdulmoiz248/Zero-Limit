'use client';
import Cookies from 'js-cookie';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Mail } from "lucide-react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Component() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(''); // State for error messages
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter(); // Hook for navigation

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
        router.push('/Login');
      } else {
       
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 to-yellow-400 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-black p-8 rounded-lg shadow-lg border-2 border-yellow-500">
          <div className="flex items-center justify-center mb-8">
            <motion.img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logosvg-jLOvxLlazaoj0DWiY9c6cw5DY1dU7T.svg" 
              alt="Limit Zero Logo" 
              className="w-16 h-16"
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            />
            <h1 className="text-4xl font-bold text-white ml-4">Limit Zero</h1>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Enter OTP</h2>
          <p className="text-yellow-400 mb-8 text-center">
            We've sent a one-time password to your email. Enter it below to verify your identity.
          </p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Error message display */}
          <div className="flex justify-center space-x-4 mb-8">
            {otp.map((data, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                ref={el => inputRefs.current[index] = el as any}
                className="w-12 h-12 text-center text-2xl font-bold bg-yellow-900 border-2 border-yellow-500 text-white focus:border-orange-500 focus:ring-orange-500"
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
            <Button onClick={handleSubmit} // Call the handleSubmit function
             className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 rounded-md transition duration-300 ease-in-out">
              Verify OTP
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          <div className="flex items-center justify-center mt-6 text-yellow-400">
            <Mail className="mr-2 h-5 w-5" />
            <p>OTP sent to your email</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
