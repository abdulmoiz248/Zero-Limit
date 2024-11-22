'use client';

import { useState } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';




const Footer = () => {
  const [modalContent, setModalContent] = useState<string | null>(null);

  const socialIcons = [
    { Icon: FaFacebook, title: 'Facebook' ,link:'https://www.facebook.com/profile.php?id=61566883464221&mibextid=LQQJ4d'},
    { Icon: FaInstagram, title: 'Instagram',link:'https://www.instagram.com/zerolimit.apparel/profilecard/?igsh=NHNvdnY4bGxveW1w' },
    { Icon: SiTiktok, title: 'TikTok',link:'https://www.tiktok.com/@zer0limit.apparel?_t=8rCPplMQmYS&_r=1' },
  ];

  const modalContents = {
    'Size Chart': (
      <div>
        <h2 className="text-2xl font-bold   mb-4">Size Chart</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Size</th>
              <th className="border border-gray-300 p-2">Chest (inches)</th>
              <th className="border border-gray-300 p-2">Waist (inches)</th>
              <th className="border border-gray-300 p-2">Hip (inches)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">S</td>
              <td className="border border-gray-300 p-2">34-36</td>
              <td className="border border-gray-300 p-2">28-30</td>
              <td className="border border-gray-300 p-2">34-36</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">M</td>
              <td className="border border-gray-300 p-2">38-40</td>
              <td className="border border-gray-300 p-2">32-34</td>
              <td className="border border-gray-300 p-2">38-40</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">L</td>
              <td className="border border-gray-300 p-2">42-44</td>
              <td className="border border-gray-300 p-2">36-38</td>
              <td className="border border-gray-300 p-2">42-44</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">XL</td>
              <td className="border border-gray-300 p-2">46-48</td>
              <td className="border border-gray-300 p-2">40-42</td>
              <td className="border border-gray-300 p-2">46-48</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    'Privacy Policy': (
      <div>
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p className="mb-4">
          At Zero Limit , we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
        </p>
        <h3 className="text-xl font-semibold mb-2">Information We Collect</h3>
        <p className="mb-4">
          We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our customer service.
        </p>
        <h3 className="text-xl font-semibold mb-2">How We Use Your Information</h3>
        <p className="mb-4">
          We use your information to process your orders, provide customer service, and improve our products and services.
        </p>
        <h3 className="text-xl font-semibold mb-2">Information Sharing and Disclosure</h3>
        <p>
          We do not sell or rent your personal information to third parties. We may share your information with service providers who help us operate our business.
        </p>
      </div>
    ),
    'Terms of Service': (
      <div>
        <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
        <p className="mb-4">
          By using the Zero Limit  website and services, you agree to comply with and be bound by the following terms and conditions of use.
        </p>
        <h3 className="text-xl font-semibold mb-2">1. Agreement to Terms</h3>
        <p className="mb-4">
          By accessing our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>
        <h3 className="text-xl font-semibold mb-2">2. Use License</h3>
        <p className="mb-4">
          Permission is granted to temporarily download one copy of the materials on  Zero Limit website for personal, non-commercial transitory viewing only.
        </p>
        <h3 className="text-xl font-semibold mb-2">3. Disclaimer</h3>
        <p>
          The materials on Zero Limit  website are provided on an &apos;as is&apos; basis.Zero Limit  makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
        </p>
        <h3 className="text-xl font-semibold mb-2">4. Return Policy</h3>
        <p>
         Return should be within day of delievery and tag broken will not be accepted
           </p>
      </div>
    ),
  };

  const openModal = (content: string) => {
    setModalContent(content);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalContent(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <footer id="footer" className="py-12 bg-gradient-to-b  from-white to-gray-100">
      <div className="container px-6 mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center md:ml-10 md:items-start"
          >
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center space-x-3"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#1b03a3] to-[#3b23c3]">
               <Image alt="logo" src='/images/Lion.JPG' width={100} height={100}/>
              </div>
              <span className="self-center text-2xl font-bold  text-black">
              Zero Limit 
              </span>
            </a>
            <p className="mt-4 text-sm text-gray-600">
            Beyond boundaries, Wear your freedom
            </p>
          </motion.div>

      

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center md:ml-[100%] md:items-start"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, title,link }) => (
                <motion.a
                  key={title}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  rel="noopener noreferrer"
                  href={link}
                  title={title}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#1b03a3] to-[#3b23c3] text-white hover:shadow-lg transition-shadow duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-8 mt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              ©2024 Zero Limit . All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center space-x-4">
              <button
                onClick={() => openModal('Size Chart')}
                className="text-sm text-gray-600 hover:text-[#1b03a3] transition-colors duration-300"
              >
                Size Chart
              </button>
              <button
                onClick={() => openModal('Privacy Policy')}
                className="text-sm text-gray-600 hover:text-[#1b03a3] transition-colors duration-300"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => openModal('Terms of Service')}
                className="text-sm text-gray-600 hover:text-[#1b03a3] transition-colors duration-300"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {modalContents[modalContent as keyof typeof modalContents]}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;