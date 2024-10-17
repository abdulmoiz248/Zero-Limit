'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface AlertProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void; // Function to close the modal
}

const Alert: React.FC<AlertProps> = ({ title, description, isOpen, onClose }) => {
  if (!isOpen) return null; 

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md"> {/* Blur the rest of the screen */}
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }} // Animation duration
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="w-6 h-6"
          >
            <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
        <p className="mb-4 text-gray-600">{description}</p>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition ease-in-out duration-300"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default Alert;
