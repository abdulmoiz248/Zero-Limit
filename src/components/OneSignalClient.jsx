// components/OneSignalClient.js
'use client'; // Indicate this component should run on the client side
import { useEffect } from 'react';

const OneSignalClient = () => {
  useEffect(() => {
    // Dynamically load OneSignal SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
    script.async = true;
    script.onload = () => {
      if (typeof window !== 'undefined' && window.OneSignal) {
        window.OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
          safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID || undefined,
        });
        window.OneSignal.showSlidedownPrompt(); // Show the prompt
      }
    };
    document.head.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything to the DOM
};

export default OneSignalClient;
