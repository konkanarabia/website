"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesDropdownOpen, setIsMobileServicesDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const toggleMobileServicesDropdown = () => {
    setIsMobileServicesDropdownOpen(!isMobileServicesDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { 
      name: "Our Services", 
      href: "/services",
      dropdown: true,
      subItems: [
        { name: "Holiday Packages", href: "/destinations" },
        { name: "Vehicle Rental", href: "/services/1" },
        { name: "Visa Services", href: "/services/3" },
        { name: "Event Management", href: "/services/2" },
      ]
    },
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
                <li key={item.name} className="relative">
                  {item.dropdown ? (
                    <div ref={dropdownRef}>
                      <button
                        onClick={toggleServicesDropdown}
                        className={`flex items-center text-sm lg:text-base text-gray-600 hover:text-primary transition-colors ${
                          pathname.startsWith(item.href) ? "font-semibold text-primary" : ""
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isServicesDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsServicesDropdownOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-sm lg:text-base text-gray-600 hover:text-primary transition-colors ${
                        pathname === item.href ? "font-semibold text-primary" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
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
                  {item.dropdown ? (
                    <div ref={mobileDropdownRef}>
                      <button
                        onClick={toggleMobileServicesDropdown}
                        className={`flex items-center w-full py-2 text-left text-gray-600 hover:text-primary transition-colors ${
                          pathname.startsWith(item.href) ? "font-semibold text-primary" : ""
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isMobileServicesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isMobileServicesDropdownOpen && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block py-1.5 text-sm text-gray-600 hover:text-primary"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-2 text-gray-600 hover:text-primary transition-colors ${
                        pathname === item.href ? "font-semibold text-primary" : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
