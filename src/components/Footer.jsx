'use client';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si'; 
import { AiOutlineWhatsApp } from 'react-icons/ai'; 

const Footer = () => {
  return (
    <footer  id="footer" className="py-6 bg-white">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-opacity-50">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex justify-center space-x-3 md:justify-start"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-violet-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="flex-shrink-0 w-5 h-5 rounded-full text-gray-50"
                >
                  <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                </svg>
              </div>
              <span className="self-center text-2xl font-semibold">Brand Name</span>
            </a>
          </div>
        </div>

        <div className="grid justify-center pt-6 lg:justify-between">
          <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
            <span>©2024 All rights reserved</span>
            <a rel="noopener noreferrer" href="#">
              <span>Privacy policy</span>
            </a>
            <a rel="noopener noreferrer" href="#">
              <span>Terms of service</span>
            </a>
          </div>

          <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
            <a
              rel="noopener noreferrer"
              href="#"
              title="WhatsApp"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-gray-50"
            >
              <AiOutlineWhatsApp className="w-5 h-5" />
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              title="Email"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              title="Facebook"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-gray-50"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              title="Instagram"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-gray-50"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              title="TikTok"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-gray-50"
            >
              <SiTiktok className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
