'use client'
import React from 'react';
import { LiaLuggageCartSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import Logo from '@/components/Logo';
import { useRouter } from 'next/navigation';

export default function Header() {
  let router=useRouter();
  return (
    <>
      {/* Main Header */}
      <header className=" bg-[#576778]">
        <div className="container flex flex-col md:flex-row items-center justify-center md:justify-between mx-auto">
          {/* Left Spacer (Empty div for centering the logo) */}
          <div className="hidden md:block flex-1" />

          {/* Logo - Centered */}
          <a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-2">
            <Logo />
          </a>

          {/* Icons for Desktop (Hidden on small screens) */}
          <ul className="hidden md:flex flex-1 justify-end space-x-6 items-center mr-10">
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center transition-colors duration-300 hover:text-white"
              >
                <CgProfile size={30}  onClick={  ()=>{
              router.push('/Profile');
            }} color='#000000' />
              </a>
            </li>
            <li className="flex">
              <a rel="noopener noreferrer" href="/Cart" className="flex items-center hover:text-white">
                <LiaLuggageCartSolid size={30} color='#000000' onClick={  ()=>{
              router.push('/Cart');
            }} />
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* Ribbon Bar for Mobile (Only visible on small screens) */}
      <div className="md:hidden p-3 bg-[#F5EEDC] flex justify-around">
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex items-center hover:text-white"
        >
          <CgProfile  onClick={  ()=>{
              router.push('/Cart');
            }}  size={30} color='#000000' />
        </a>
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex items-center hover:text-white"
        >
          <LiaLuggageCartSolid size={30} color='#000000' onClick={
            ()=>{
              router.push('/Cart');
            }
          } />
        </a>
      </div>
    </>
  );
}
