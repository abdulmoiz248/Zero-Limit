"use client"
import axios from 'axios';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Alert from '@/components/Alert';

const JoinUs = () => {
  const [email, setEmail] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

 // const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const submit = async () => {
    if (email === '') {
      return;
    }
    try {
      const res = await axios.post('api/subscribe', { email });
      if (res.data.success) setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <motion.div 
      className="bg-black w-full p-20 text-white  rounded-lg shadow-lg flex flex-col items-center"
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
       <br/> offers, and events.
      </p>
      <form>
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 mb-4 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
