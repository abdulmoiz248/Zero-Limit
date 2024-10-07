'use client'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si'; // Ensure this line is present


const Footer = () => {
  return (
    <footer className="py-6 bg-gray-100 text-gray-900">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-opacity-50">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
            <a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 md:justify-start">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-violet-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="flex-shrink-0 w-5 h-5 rounded-full text-gray-50">
                  <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                </svg>
              </div>
              <span className="self-center text-2xl font-semibold">Brand name</span>
            </a>
          </div>
          <div className="col-span-6 text-center md:text-left md:col-span-3">
            <p className="pb-1 text-lg font-medium">Category</p>
            <ul>
              <li>
                <a rel="noopener noreferrer" href="#" className="hover:text-violet-600">Link</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" className="hover:text-violet-600">Link</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" className="hover:text-violet-600">Link</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" className="hover:text-violet-600">Link</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" className="hover:text-violet-600">Link</a>
              </li>
            </ul>
          </div>
          <div className="col-span-6 text-center md:text-left md:col-span-3">
            <p className="pb-1 text-lg font-medium">Category</p>
            <ul>
              <li>
                <a rel="noopener noreferrer" href="#" className="hover:text-violet-600">Link</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" className="hover:text-violet-600">Link</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" className="hover:text-violet-600">Link</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" className="hover:text-violet-600">Link</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" className="hover:text-violet-600">Link</a>
              </li>
            </ul>
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
            <a rel="noopener noreferrer" href="#" title="Email" className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </a>
            <a rel="noopener noreferrer" href="#" title="Twitter" className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="currentColor" className="w-5 h-5">
                <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.621094 46.347656 44.007813 29.585938 44.007813 17.394531 C 44.007813 17.046875 44 16.710938 43.972656 16.378906 C 46.640625 14.566406 48.933594 11.4375 50 8.0625 C 49.078125 8.488281 48.082031 8.847656 47.035156 9.085938 C 48.082031 8.367188 49.007813 7.378906 49.496094 6.207031 C 48.28125 6.707031 47.027344 7.058594 45.722656 7.207031 C 46.851563 5.929688 48.460938 5.046875 50.0625 4.507813 C 49.078125 6.421875 47.890625 8.121094 46.640625 9.484375 C 48.964844 8.996094 50.25 10.4375 50.0625 10.4375 z" />
              </svg>
            </a>
            <a rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-gray-50">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a rel="noopener noreferrer" href="#" title="Instagram" className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-gray-50">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a rel="noopener noreferrer" href="#" title="LinkedIn" className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-gray-50">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a rel="noopener noreferrer" href="#" title="TikTok" className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-gray-50">
              <SiTiktok className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
