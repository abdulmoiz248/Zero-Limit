import React from 'react'
import { LiaLuggageCartSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import Logo from '@/components/Logo'

export default function Header() {
  return (
    <header className="p-4 bg-[#051641] ">
	<div className="container flex justify-center h-16 mx-auto md:justify-between items-center">
		<a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2 lg:ml-[38%]">
	   <Logo/>

		</a>
		<ul className="items-stretch hidden space-x-3 md:flex mr-20 ml-auto">
        <li className="flex">
  <a
    rel="noopener noreferrer"
    href="#"
    className="flex items-center px-4 -mb-1 transition-colors duration-300 hover:text-blue-500"
  >
    <CgProfile size={30} className="text-white hover:text-blue-500" />
  </a>
</li>
			
			<li className="flex">
				<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1  ">
                <LiaLuggageCartSolid  size={30} color='white'/>
                </a>
			</li>
			
		</ul>
		
	</div>
</header>
  )
}
