"use client"

import { useState, useEffect } from "react";
import { ShoppingBag, Menu, User, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TopBar from '@/components/landing page/Topbar';
const menuItems = [
  { name: "Profile", href: "/Profile", icon: User },
  { name: "Shop Now", href: "/all-products", icon: Package },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "#footer" },
];

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        <div
          className={`h-16 transition-all duration-300 ${
            scrollPosition > 50 ? "bg-white shadow-md" : "bg-transparent"
          }`}
        >
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-full flex items-center justify-between">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/logo.png"
                    alt="Zero Limit"
                    width={120}
                    height={40}
                    priority
                    className="h-8 w-auto"
                  />
                </Link>
              </div>
              <nav className="hidden md:flex items-center space-x-8 mr-12">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium ${
                      scrollPosition > 50
                        ? "text-gray-700 hover:text-gray-900"
                        : "text-gray-700 hover:text-gray-200"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`ml-4 ${
                    scrollPosition > 50 ? "text-gray-700" : "text-gray-700"
                  }`}
                  asChild
                >
                  <Link href="/Cart" className="">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="sr-only">Cart</span>
                  </Link>
                </Button>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`ml-2 md:hidden ${
                        scrollPosition > 50 ? "text-gray-700" : "text-gray-700"
                      }`}
                    >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-white">
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col space-y-4 mt-4">
                      {menuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                          onClick={closeSidebar}
                        >
                          {item.icon && <item.icon className="h-5 w-5" />}
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
      <TopBar scrollPosition={scrollPosition} />
    </>
  );
}
