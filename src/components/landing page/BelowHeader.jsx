import React from "react";
import Card from "./ZeroCard"; // Assuming the Card component is in the same directory
import { useRouter } from "next/navigation";
import Image from "next/image";

const HomePage = () => {
  const router=useRouter();
  return (
    <div className="min-h-screen  flex flex-col md:flex-row md:pt-0 mt-0  ">
      {/* Left Section */}
     
      <div
      onClick={()=>router.push('/all-products')}
      className="md:w-1/2 w-full h-[50vh] md:h-screen relative">
          <Image
            src="/images/car.jpeg"
            alt="Car"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>



      {/* Right Section */}
      <div 
       className="md:w-1/2 w-full  flex items-center justify-center p-8  bg-[#000000] flex-grow">
        <Card />
      </div>
    </div>
  );
};

export default HomePage;
