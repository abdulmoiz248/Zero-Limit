'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ZeroCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative w-[300px] h-[200px] bg-black flex items-center justify-center rounded-lg overflow-hidden transition-all duration-500 ease-in-out hover:rounded-none hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 border-2 border-white opacity-0 rotate-[10deg] transition-all duration-500 ease-in-out ${isHovered ? 'opacity-100 inset-[15px] rotate-0' : ''}`} />
      
      <div className="transition-all duration-500 ease-in-out">
        <div className={`relative h-[35px] overflow-hidden transition-all duration-1000 ease-in-out ${isHovered ? 'w-[180px]' : 'w-[33px]'}`}>
          <div className="absolute left-0 h-[33px] w-[33px]">
            <Image
              src="/images/logo.jpg"
              alt="Limit Zero Logo"
              width={33}
              height={33}
              className="object-cover"
            />
          </div>
          <div className="absolute left-[33px] h-[33px]">
            <svg viewBox="0 0 180 33" className="h-full">
              <text x="0" y="25" className="text-[24px] font-bold fill-white">LIMIT ZERO</text>
            </svg>
          </div>
          <div className={`absolute right-0 h-full w-full opacity-0 ${isHovered ? 'animate-trail' : ''}`} />
        </div>
        <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-[30px] text-white text-xs opacity-0 transition-all duration-500 ease-in-out delay-500 ${isHovered ? 'opacity-100 tracking-[9.5px]' : ''}`}>
          clothing
        </span>
      </div>
      
      <span className={`absolute left-1/2 bottom-[13px] -translate-x-1/2 text-[6px] uppercase px-[5px] pl-2 text-white bg-black opacity-0 transition-all duration-500 ease-in-out ${isHovered ? 'opacity-100 tracking-[3px]' : 'tracking-[7px]'}`}>
        no limits
      </span>
    </div>
  )
}