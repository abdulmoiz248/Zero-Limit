'use client'; // Ensure this is client-side

import { useEffect } from 'react';

const OneSignalClient = () => {
  useEffect(() => {
    // Check if OneSignal is already initialized
    if (typeof window !== 'undefined' && window.OneSignal && !window.OneSignal.isInitialized) {
      // Dynamically load OneSignal SDK if not already loaded
      const script = document.createElement('script');
      script.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
      script.async = true;
      script.onload = () => {
        if (window.OneSignal) {
          // Initialize OneSignal SDK
          window.OneSignal.init({
            appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
            safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID || undefined,
            notifyButton: {
              enable: true, // Optional: Enable notification button on the page
            },
            allowLocalhostAsSecureOrigin: true, // Allow localhost for local development
          });

          // Mark the OneSignal SDK as initialized
          window.OneSignal.isInitialized = true;

          // Optionally, show the prompt after initialization
          window.OneSignal.showSlidedownPrompt();
        }
      };
      document.head.appendChild(script);

      // Cleanup: remove script when component is unmounted
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []); // Empty dependency array to run this effect only once on mount

  return null; // This component doesn't render anything to the DOM
};

export default OneSignalClient;
