'use client';
import React, { useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message,setMessage]=useState('All fields are required');
  
  const router=useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     if(email == '' || password == ''){
      return;
     }

  try {
      const res=await axios.post('/api/admin/login',{email,password});
     
      if(res.data.success){
      
        router.push('/admin/dashboard');
      
      }else{
        setMessage("Invalid Email or Password");
      }
  } catch (error) {
      console.log(error);
      setMessage("Invalid Email or Password");
  }
  };

  return (
    <div className="mt-4 mb-5 flex flex-col w-full sm:w-2/3 md:w-1/2 xl:w-2/5 mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-xl">
      <div className="flex mt-14   flex-col justify-center items-center gap-3 pb-4">
     
        <h1 className="text-3xl font-bold text-[#1b03a3]">Zero Limit</h1>
      </div>
      <div className="text-sm text-gray-500 pb-8 text-center">Login to your account on Your Company.</div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="pb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">Email</label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={email}
              onChange={handleEmailChange}
              className="pl-12 bg-gray-50 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-gray-400 focus:outline-none w-full py-3 px-4" 
              placeholder="name@company.com" 
            />
          </div>
        </div>
        <div className="pb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">Password</label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M12 8v8"></path>
                <path d="m8.5 14 7-4"></path>
                <path d="m8.5 10 7 4"></path>
              </svg>
            </span>
            <input 
              type="password" 
              name="password" 
              id="password" 
              value={password}
              onChange={handlePasswordChange}
              className="pl-12 bg-gray-50 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-gray-400 focus:outline-none w-full py-3 px-4" 
              placeholder="••••••••••" 
              autoComplete="new-password"
            />
          </div>
          <h4>{message}</h4>
        </div>
        <button type="submit" className="w-full bg-[#1b03a3] text-white font-medium rounded-lg py-2.5 focus:outline-none focus:ring-4 focus:ring-indigo-300">Login</button>
      </form>
    </div>
  );
}
