"use client"
import axios from 'axios';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Alert from '@/components/Alert';
import { z } from 'zod';

// Define the types for component state
interface JoinUsState {
  email: string;
  isModalOpen: boolean;
  errorMessage: string;
}

const JoinUs: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const closeModal = () => setModalOpen(false);
  
  
  const emailSchema = z.object({
    email: z.string().email("Invalid email format"),
  });
  
  const submit = async () => {
    const validationResult = emailSchema.safeParse({ email });

    // Check for empty email or validation failure
    if (email === '' || !validationResult.success) {
      setErrorMessage(validationResult.error.errors[0].message );
      return;
    }
    
    try {
      const res = await axios.post('/api/subscribe', { email });
      if (res.data.success) {
        setModalOpen(true);
      } else {
        alert("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while subscribing. Please try again.");
    }
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <motion.div 
      className="bg-black w-full p-20 text-white rounded-lg shadow-lg flex flex-col items-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Alert
        title="Subscription Successful"
        description="You have successfully subscribed to our newsletter. We will keep you updated with the latest news and offers."
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <h2 className="text-3xl font-bold mb-4 text-center">Join Us!</h2>
      <p className="text-lg mb-6 text-center">
        Be part of our amazing community and stay updated with the latest news,
        <br /> offers, and events.
      </p>
      <form>
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 mb-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage(''); // Clear error message on input change
          }}
          required
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error */}
        <button
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition ease-in-out duration-300"
        >
          Join Now
        </button>
      </form>
    </motion.div>
  );
};

export default JoinUs;
