"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Our Services", href: "/services" },
    // { name: 'Hotels', href: '/hotels' },
    // { name: 'Events', href: '/events' },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-lg md:text-xl lg:text-2xl font-bold text-primary max-w-[150px] md:max-w-none truncate"
        >
          KonkanArabia Hospitality & Holiday Group
        </Link>
        {/* Navigation moved to right side */}
        <div className="flex items-center justify-end flex-1">
          <nav className="hidden md:block ml-auto">
            <ul className="flex space-x-4 lg:space-x-6 items-center">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm lg:text-base text-gray-600 hover:text-primary transition-colors ${
                      pathname === item.href ? "font-semibold text-primary" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-4"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav className="bg-white px-4 pt-2 pb-4 shadow-lg">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block py-2 text-gray-600 hover:text-primary transition-colors ${
                      pathname === item.href ? "font-semibold text-primary" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {/* <li>
                <Link href="/enquiry" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full mt-2 bg-secondary hover:bg-secondary/90">Book Now</Button>
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
