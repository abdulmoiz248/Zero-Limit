'use client';

import { useState, useEffect, FormEvent } from 'react';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

const emailSchema = z.string().email('Invalid email address');
const nameSchema = z.string().min(6, 'Name must be at least 6 characters');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showNameField, setShowNameField] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showRegisterButton, setShowRegisterButton] = useState(false);
  const [errors, setErrors] = useState({ email: '', name: '', password: '' });
  const [touched, setTouched] = useState({ email: false, name: false, password: false });
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timer | number>();

  const router = useRouter();

  const validateField = (value: string, schema: z.ZodSchema, field: keyof typeof errors) => {
    try {
      schema.parse(value);
      setErrors(prev => ({ ...prev, [field]: '' }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  useEffect(() => {
    const checkEmail = async () => {
      if (validateField(email, emailSchema, 'email')) {
        try {
          const response = await axios.post('/api/auth/verifyEmail', { email });
          setShowNameField(response.data.success);
        } catch {
          setErrors(prev => ({ ...prev, email: 'Email already exists' }));
          setShowNameField(false);
        }
      }
    };

    if (touched.email) {
      if (debounceTimeout) clearTimeout(debounceTimeout as number);
      const timer = setTimeout(checkEmail, 500);
      setDebounceTimeout(timer);
      return () => clearTimeout(timer);
    }
  }, [email, touched.email]);

  useEffect(() => {
    setShowPasswordField(validateField(name, nameSchema, 'name'));
  }, [name]);

  useEffect(() => {
    setShowRegisterButton(validateField(password, passwordSchema, 'password'));
  }, [password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (
      validateField(email, emailSchema, 'email') &&
      validateField(name, nameSchema, 'name') &&
      validateField(password, passwordSchema, 'password')
    ) {
      setLoading(true);
      try {
        const response = await axios.post('/api/auth/register', { email, name, password });
        if (response.data.success) {
          Cookies.set('OTP', email);
          router.push(`/otp`);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Registration error:', error);
        setErrors(prev => ({ ...prev, email: 'Registration failed' }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Card className="w-full max-w-md border-2 border-[#1b03a3] rounded-lg shadow-lg bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#1b03a3]">Register</CardTitle>
            <CardDescription className="text-gray-600">
              Hey Fearless! Create your account step by step.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-black">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                />
                {touched.email && errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </motion.div>

              {showNameField && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="text-black">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                  />
                  {touched.name && errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </motion.div>
              )}

              {showPasswordField && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-black">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                  />
                  {touched.password && errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </motion.div>
              )}

              {loading ? (
                <div className="text-center text-gray-500">Registering...</div>
              ) : (
                showRegisterButton && (
                  <Button 
                  type="submit" 
                  className="w-full bg-[#1b03a3] text-white hover:text-[#1b03a3] hover:border-[#1b03a3] hover:border-2 transition-all"
                >
                  Register
                </Button>
                
                )
              )}
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already registered?{' '}
                <a href="/Login" className="text-[#1b03a3] hover:underline">
                  Log In
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
