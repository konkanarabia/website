"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { LocaleSwitcher } from "@/components/locale-switcher";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesDropdownOpen, setIsMobileServicesDropdownOpen] =
    useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileServicesDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
      ],
    },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <div className="bg-[#0066a1] py-2 text-white hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-[11px] sm:text-[13px] flex items-center flex-wrap gap-y-2">
            <span className="flex items-center mr-4 sm:mr-6 whitespace-nowrap">
              <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2" /> 
              <span className="hidden xs:inline">+91-9370528517 | 8625807465 | +971-555995260 | 0557337618</span>
              <span className="xs:hidden">+91 9370528517</span>
            </span>
            <span className="flex items-center whitespace-nowrap">
              <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2" /> 
              <span className="hidden sm:inline">bookings@konkanarabiahospitalitygroup.com</span>
              <span className="sm:hidden text-[10px]">bookings@kahg.com</span>
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            <LocaleSwitcher className="mr-2" />
            <Link
              href="https://www.facebook.com/konkanarabiahospitalitygroup"
              className="hover:text-gray-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-facebook"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/konkanarabiaholidays"
              className="hover:text-gray-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-instagram"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <header
        className={`bg-white relative ${
          isScrolled ? "shadow-sm sticky top-0 z-50 py-0" : "py-1"
        } transition-all duration-300 border-b border-slate-50`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center relative">
          <Link href="/" className="flex items-center gap-1 sm:gap-2 group transition-all duration-300">
            <div className="relative flex-shrink-0">
              <Image
                src="/logo/KonkanArabia-logo.png"
                alt="KonkanArabia Logo"
                width={88}
                height={88}
                className="relative z-10 transition-transform duration-500 group-hover:scale-105 w-16 h-16 sm:w-20 sm:h-20 md:w-[88px] md:h-[88px] object-contain px-1"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center w-full">
                  <div className="h-[1px] flex-grow sm:flex-none sm:w-8 bg-[#0066a1]/30"></div>
                  <span className="px-2 text-[9px] sm:text-[10px] md:text-[11px] text-[#0066a1] font-serif italic font-bold tracking-wider whitespace-nowrap leading-none uppercase">
                    Hospitality is our passion & culture
                  </span>
                  <div className="h-[1px] flex-grow sm:flex-none sm:w-8 bg-[#0066a1]/30"></div>
                </div>
                <div className="flex items-center gap-0.5 leading-none mt-1 sm:mt-0.5">
                  <span className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-slate-900 tracking-tight">KonkanArabia</span>
                  <span className="text-[9px] sm:text-[10px] font-sans font-medium text-slate-400 self-start mt-1">®</span>
                </div>
              </div>
              <div className="flex flex-col mt-0.5">
                <div className="h-[1px] w-full bg-[#0066a1]/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-[#0066a1]"></div>
                </div>
                <span className="text-[7.5px] xxs:text-[8px] sm:text-[9px] md:text-[10px] font-sans font-bold text-slate-600 tracking-[0.05em] sm:tracking-[0.1em] uppercase mt-1 leading-none whitespace-nowrap">
                  &#123; Hospitality & Holiday Management Group &#125;
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center justify-end flex-1">
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-1 lg:space-x-4">
                {navItems.map((item) => (
                  <li key={item.name} className="relative">
                    {item.dropdown ? (
                      <div ref={dropdownRef}>
                        <button
                          onClick={toggleServicesDropdown}
                          className={`flex items-center text-[15px] font-medium px-3 py-2 rounded-lg transition-all ${
                            pathname.startsWith(item.href)
                              ? "text-[#0066a1] bg-slate-50"
                              : "text-slate-700 hover:text-[#0066a1] hover:bg-slate-50"
                          }`}
                        >
                          {item.name}
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transition-transform ${
                              isServicesDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isServicesDropdownOpen && (
                          <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-[100] border border-slate-100 overflow-hidden">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-[#0066a1] hover:text-white transition-colors"
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
                        className={`text-[15px] font-medium px-3 py-2 rounded-lg transition-all block ${
                          pathname === item.href
                            ? "text-[#0066a1] bg-slate-50"
                            : "text-slate-700 hover:text-[#0066a1] hover:bg-slate-50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <Link href="/enquiry" className="hidden lg:block">
              <Button
                className="bg-[#0066a1] hover:bg-[#00558a] text-white font-bold px-4 xl:px-6 py-4 xl:py-5 rounded-lg shadow-lg shadow-blue-900/10 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm xl:text-base"
              >
                Enquire Now
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden ml-2 sm:ml-4"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <nav className="bg-white px-4 pt-2 pb-4 shadow-inner border-t border-gray-100">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    {item.dropdown ? (
                      <div
                        ref={mobileDropdownRef}
                        className="border-b border-gray-100 pb-2"
                      >
                        <button
                          onClick={toggleMobileServicesDropdown}
                          className={`flex items-center w-full py-2 text-left transition-colors ${
                            pathname.startsWith(item.href)
                              ? "font-semibold text-primary"
                              : "text-gray-700"
                          }`}
                        >
                          {item.name}
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transition-transform ${
                              isMobileServicesDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
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
                        className={`block py-2 border-b border-gray-100 transition-colors ${
                          pathname === item.href
                            ? "font-semibold text-primary"
                            : "text-gray-700"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}                <li className="pt-2">
                  <Link href="/enquiry">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Enquire Now
                    </Button>
                  </Link>
                </li>
                <li className="pt-4 flex justify-center">
                  <LocaleSwitcher />
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
