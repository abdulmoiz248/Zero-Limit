import React from 'react';

const DiscountSection: React.FC = () => {
  return (
    <div className="p-6 py-20 bg-black text-white mb-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-30"></div>
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
          <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl tracking-tight font-extrabold text-white">
            Up to
            <br className="sm:hidden" />
            <span className="text-primary text-6xl md:text-7xl"> 50% Off</span>
          </h2>
          <div className="space-x-2 text-center py-2 lg:py-0 mt-4 lg:mt-0">
            <span className="text-lg sm:text-xl text-white uppercase tracking-widest font-semibold">
              Clearance Sale
            </span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}

export default DiscountSection;
