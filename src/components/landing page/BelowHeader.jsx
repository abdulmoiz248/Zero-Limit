import React from "react";
import Card from "./ZeroCard"; // Assuming the Card component is in the same directory
import TypingAnimation from "@/components/ui/typing-animation";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row md:pt-0 pt-14">
      {/* Left Section */}
      <div
        className="md:w-1/2 w-full bg-white text-black p-8 md:p-12 flex flex-col justify-center items-center md:items-start flex-grow"
      >
        <TypingAnimation 
          text="Welcome to Zero Limit" 
          className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-black-800 text-center md:text-left" 
        />
        <p className="text-lg text-gray-500 text-center md:text-left">
          Discover our unique collection of clothing that blends creativity with comfort.
        </p>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full bg-black flex items-center justify-center p-8 flex-grow">
        <Card />
      </div>
    </div>
  );
};

export default HomePage;
