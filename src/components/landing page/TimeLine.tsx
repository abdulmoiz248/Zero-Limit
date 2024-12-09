'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Shirt, Scissors, CheckCircle, Package, Truck } from 'lucide-react';

const TimelineStep = ({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <motion.div
      className="relative flex items-start mb-8 last:mb-0 pl-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      {/* Icon Circle */}
      <div className="absolute left-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#1b03a3] text-white">
        {icon}
      </div>
      {/* Step Content */}
      <div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const ManufacturingTimeline = () => {
  const steps = [
    {
      icon: <Pencil size={24} />,
      title: 'Concept & Design',
      description: 'Brainstorming and sketching unique, bold designs aligned with our brand ethos.',
    },
    {
      icon: <Shirt size={24} />,
      title: 'Material Selection',
      description:
        'Sourcing high-quality, eco-friendly fabrics like our signature 300 GSM material for optimal comfort and durability.',
    },
    {
      icon: <Scissors size={24} />,
      title: 'Cutting & Sewing',
      description: 'Precision craftsmanship to ensure every garment meets our premium standards.',
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Quality Check',
      description: 'Rigorous inspection of every product to guarantee flawless stitching, fit, and finish.',
    },
    {
      icon: <Package size={24} />,
      title: 'Packaging',
      description: 'Eco-friendly packaging that aligns with our commitment to sustainability.',
    },
    {
      icon: <Truck size={24} />,
      title: 'Shipping & Delivery',
      description: 'Timely delivery to bring our fearless designs to customers worldwide.',
    },
  ];

  return (
    <div className="max-w-4xl my-10 mx-auto p-8 bg-white rounded-lg shadow-lg">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center text-[#1b03a3]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Premium Manufacturing Process
      </motion.h2>
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200"></div>
        {steps.map((step, index) => (
          <TimelineStep key={index} {...step} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ManufacturingTimeline;
