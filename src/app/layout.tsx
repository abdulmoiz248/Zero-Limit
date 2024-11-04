import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";

import "./globals.css";

import Header from "@/components/landing page/Header";
import Footer from '@/components/landing page/Footer'


export const metadata: Metadata = {
  title: "Limit Zero - Unleash Your Fearless Style",
  description:
    "Explore bold and boundary-breaking clothing that redefines fashion. Be part of a community that wears rebellion as a badge of honor.",
  keywords:
    "Limit Zero, fearless fashion, bold clothing, streetwear, luxury apparel",
  robots: "index, follow",

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
        <Header></Header>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
