import { useEffect } from 'react'

declare global {
  interface Window {
    fbq: any
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
  | 'ViewContent'

export const useMetaPixel = () => {
  const trackEvent = (event: StandardEvent, params?: object) => {
    if (window.fbq) {
      window.fbq('track', event, params)
    }
  }

  useEffect(() => {
    // This effect ensures that fbq is available
  }, [])

  return {
    addPaymentInfo: (params?: object) => trackEvent('AddPaymentInfo', params),
    addToCart: (params?: object) => trackEvent('AddToCart', params),
    addToWishlist: (params?: object) => trackEvent('AddToWishlist', params),
    completeRegistration: (params?: object) => trackEvent('CompleteRegistration', params),
    contact: (params?: object) => trackEvent('Contact', params),
    customizeProduct: (params?: object) => trackEvent('CustomizeProduct', params),
    donate: (params?: object) => trackEvent('Donate', params),
    findLocation: (params?: object) => trackEvent('FindLocation', params),
    initiateCheckout: (params?: object) => trackEvent('InitiateCheckout', params),
    lead: (params?: object) => trackEvent('Lead', params),
    purchase: (params?: object) => trackEvent('Purchase', params),
    schedule: (params?: object) => trackEvent('Schedule', params),
    search: (params?: object) => trackEvent('Search', params),
    startTrial: (params?: object) => trackEvent('StartTrial', params),
    submitApplication: (params?: object) => trackEvent('SubmitApplication', params),
    subscribe: (params?: object) => trackEvent('Subscribe', params),
    viewContent: (params?: object) => trackEvent('ViewContent', params),
  }
}

