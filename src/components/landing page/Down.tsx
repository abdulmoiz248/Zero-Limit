'use client'

import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function Component() {
  const router=useRouter();
  return (
    <div className="sm:hidden relative w-full max-w-5xl mx-auto mt-8 mb-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <Image 
          src="/images/down1.jpeg"          
          alt="Urban style hoodie from the Fearless Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 text-center text-white">
        <h2 className="text-lg font-bold mb-1">Fearless Collection</h2>
        <p className="text-sm text-gray-200 mb-2">Where comfort meets artistic expression</p>
        <Button
        onClick={()=>{
          router.push('/all-products');
        }}
         className="mt-2" variant="secondary">Shop Now</Button>
      </div>
    </div>
  )
}