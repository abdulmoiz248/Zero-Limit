import React from "react";
import Card from "./ZeroCard"; // Assuming the Card component is in the same directory
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router=useRouter();
  return (
    <div className="min-h-screen  flex flex-col md:flex-row md:pt-0 mt-0  ">
      {/* Left Section */}
     
      <div
  style={{ backgroundImage: 'url(/images/front.jpeg)' }}
  className="md:w-1/2 w-full bg-cover bg-center text-black p-8 md:p-12 flex flex-col justify-center items-center md:items-start flex-grow"
  onClick={()=>router.push('/all-products')}
>
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
