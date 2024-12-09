
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";

import "./globals.css";

import Header from "@/components/landing page/Header";
import Footer from '@/components/landing page/Footer'
import MetaPixel from '@/components/MetaPixel';



export const metadata: Metadata = {
  title: "Zero Limit - Unleash Your Fearless Style",
  description:
    "Explore bold and boundary-breaking clothing that redefines fashion. Be part of a community that wears rebellion as a badge of honor.",
  keywords:
    "Zero Limit, fearless fashion, bold clothing, streetwear, luxury apparel, Zero Limit streetwear, high-quality urban fashion",
  robots: "index, follow",
  openGraph: {
    title: "Zero Limit - Unleash Your Fearless Style",
    description: "Explore bold and boundary-breaking clothing that redefines fashion.",
    url: "https://www.zerolimitapparel.com",
    images: [
      {
        url: "https://www.zerolimitapparel.com/images/Lion.JPG",  // Adjust to the actual filename in public folder
        width: 1200,
        height: 630,
        alt: "Zero Limit Clothing",
      },
    ],
    siteName: "Zero Limit",
  },
 
};




export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Analytics/>
        <SpeedInsights />
        <MetaPixel pixelId="1076737537104848" />
        
        <Header></Header>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
