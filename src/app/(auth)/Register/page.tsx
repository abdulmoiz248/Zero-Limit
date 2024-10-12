'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import  Cookies from 'js-cookie';
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
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  // Validation function
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
          const { success } = response.data;
          if (success) {
            setShowNameField(true);
          } else {
            setErrors(prev => ({ ...prev, email: 'Email already exists' }));
            setShowNameField(false);
          }
        } catch (error) {
          setErrors(prev => ({ ...prev, email: 'Email already exists' }));
          setShowNameField(false);
        }
      } else {
        setShowNameField(false);
      }
    };

    if (touched.email) {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      const timer = setTimeout(() => {
        checkEmail();
      }, 1000);
      setDebounceTimeout(timer as any);
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [email, touched.email]);

  useEffect(() => {
    if (showNameField && validateField(name, nameSchema, 'name')) {
      setShowPasswordField(true);
    } else {
      setShowPasswordField(false);
    }
  }, [name, showNameField]);

  useEffect(() => {
    if (showPasswordField && validateField(password, passwordSchema, 'password')) {
      setShowRegisterButton(true);
    } else {
      setShowRegisterButton(false);
    }
  }, [password, showPasswordField]);

let router=useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double submission
    if (validateField(email, emailSchema, 'email') && 
        validateField(name, nameSchema, 'name') && 
        validateField(password, passwordSchema, 'password')) {
      setLoading(true);
      try {
        const response = await axios.post('/api/auth/register', { email, name, password });
         
        if (response.data.success) {
          Cookies.set('OTP',email);
           router.push(`/otp`);     
          console.log("Registration successful!");
        } else {
        
          console.error(response.data.message);
           
        }
      } catch (error) {
        setErrors(prev => ({ ...prev, email: 'Registeratio Failed' }))
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create your account step by step.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
            </div>

            {/* Name Field */}
            {showNameField && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
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
              </div>
            )}

            {/* Password Field */}
            {showPasswordField && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
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
              </div>
            )}

            {/* Register Button */}
            {loading ? (
              <div className="text-white py-2 rounded-lg transition duration-300 flex justify-center items-center">
                Loading...
              </div>
            ) : (
              showRegisterButton && (
                <Button type="submit" className="w-full">
                  Register
                </Button>
              )
            )}
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already registered?{' '}
              <a href="/Login" className="text-blue-500 hover:underline">
                Log In
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
