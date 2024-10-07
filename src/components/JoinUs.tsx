'use client'
import axios from 'axios';
import React, { useState } from 'react';
import Alert from '@/components/Alert'
const JoinUs = () => {
    let [email,setEmail]=useState('');
  

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

  const submit = async () => {
   
    if (email === '') {
      return;
    }
    try {
     
       let res = await axios.post('api/subscribe', { email });
       if(res.data.success)
          setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };
    
    return (
      <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg flex flex-col items-center mx-auto max-w-md">
      <Alert
        title="Subscription Successful"
        description="You have successfully subscribed to our newsletter. We will keep you updated with the latest news and offers."
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <h2 className="text-3xl font-bold mb-4 text-center">Join Us!</h2>
      <p className="text-lg mb-6 text-center">
        Be part of our amazing community and stay updated with the latest news,
        offers, and events.
      </p>
      <form className="w-full">
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-4 mb-4 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
          type="submit"
          className="w-full bg-white text-blue-500 font-semibold py-3 rounded-lg hover:bg-blue-200 transition ease-in-out duration-300"
        >
          Join Now
        </button>
      </form>
    </div>
  );
};

export default JoinUs;
