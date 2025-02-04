// app/components/MetaPixel.tsx
'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

interface MetaPixelProps {
  pixelId: string;
}

const MetaPixel = ({ pixelId }: MetaPixelProps) => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname ) {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
      }
    }
  }, [pathname]);

  return (
    <>
      {/* Meta Pixel Base Code */}
      <Script id="meta-pixel-script" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      {/* Meta Pixel Noscript Code */}
      <noscript>
        <Image
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

export default MetaPixel;