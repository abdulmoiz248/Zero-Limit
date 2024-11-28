import { useEffect } from 'react';

declare global {
  interface Window {
    fbq?: (event: string, action: string, params?: Record<string, unknown>) => void;
  }
}

type StandardEvent =
  | 'AddPaymentInfo'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'CompleteRegistration'
  | 'Contact'
  | 'CustomizeProduct'
  | 'Donate'
  | 'FindLocation'
  | 'InitiateCheckout'
  | 'Lead'
  | 'Purchase'
  | 'Schedule'
  | 'Search'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe'
  | 'ViewContent';

export const useMetaPixel = () => {
  const trackEvent = (event: StandardEvent, params?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', event, params);
    } else {
      console.warn(`Facebook Pixel is not initialized. Event '${event}' was not tracked.`);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
      console.warn('Facebook Pixel is not available.');
    }
  }, []);

  return {
    addPaymentInfo: (params?: Record<string, unknown>) => trackEvent('AddPaymentInfo', params),
    addToCart: (params?: Record<string, unknown>) => trackEvent('AddToCart', params),
    addToWishlist: (params?: Record<string, unknown>) => trackEvent('AddToWishlist', params),
    completeRegistration: (params?: Record<string, unknown>) => trackEvent('CompleteRegistration', params),
    contact: (params?: Record<string, unknown>) => trackEvent('Contact', params),
    customizeProduct: (params?: Record<string, unknown>) => trackEvent('CustomizeProduct', params),
    donate: (params?: Record<string, unknown>) => trackEvent('Donate', params),
    findLocation: (params?: Record<string, unknown>) => trackEvent('FindLocation', params),
    initiateCheckout: (params?: Record<string, unknown>) => trackEvent('InitiateCheckout', params),
    lead: (params?: Record<string, unknown>) => trackEvent('Lead', params),
    purchase: (params?: Record<string, unknown>) => trackEvent('Purchase', params),
    schedule: (params?: Record<string, unknown>) => trackEvent('Schedule', params),
    search: (params?: Record<string, unknown>) => trackEvent('Search', params),
    startTrial: (params?: Record<string, unknown>) => trackEvent('StartTrial', params),
    submitApplication: (params?: Record<string, unknown>) => trackEvent('SubmitApplication', params),
    subscribe: (params?: Record<string, unknown>) => trackEvent('Subscribe', params),
    viewContent: (params?: Record<string, unknown>) => trackEvent('ViewContent', params),
  };
};
