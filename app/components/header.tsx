"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useI18n } from "@/lib/i18n-provider";

export default function Header() {
  const { t } = useI18n();
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
    { name: t('home'), href: "/" },
    { name: t('about'), href: "/about" },
    {
      name: t('services'),
      href: "/services",
      dropdown: true,
      subItems: [
        { name: t('holiday_packages'), href: "/destinations" },
        { name: t('vehicle_rental'), href: "/vehicles" },
        { name: t('visa_services'), href: "/visas" },
        { name: t('event_management'), href: "/events" },
        { name: t('hospitality_stays'), href: "/hospitality" },
        { name: t('dining_restaurants'), href: "/restaurants" },
        { name: t('franchise_opportunities'), href: "/franchise" },
      ],
    },
    { name: t('our_partners'), href: "/partners" },
    { name: t('europe_jv'), href: "/europe-joint-venture" },
    { name: t('franchise_offer'), href: "/franchise" },
    { name: t('contact'), href: "/contact" },
  ];

  return (
    <>
      <div className="bg-[#004e7c] py-2 text-white hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs">
          <div className="text-[11px] sm:text-[12px] flex items-center flex-wrap gap-y-2 font-medium">
            <span className="flex items-center mr-4 sm:mr-6 whitespace-nowrap text-white/90">
              <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2 text-amber-300" /> 
              <span className="hidden xs:inline">+91-9370528517 | 9326380922 | +971-555995260 | 0557337618</span>
              <span className="xs:hidden">+91 9370528517</span>
            </span>
            <span className="flex items-center whitespace-nowrap text-white/90">
              <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2 text-amber-300" /> 
              <span className="hidden sm:inline">bookings@konkanarabiahospitalitygroup.com</span>
              <span className="sm:hidden text-[10px]">bookings@kahg.com</span>
            </span>
          </div>
          <div className="flex space-x-3 items-center">
            <LocaleSwitcher className="mr-2" />
            <Link
              href="https://www.facebook.com/konkanarabiahospitalitygroup"
              className="hover:text-amber-300 transition-colors text-white/80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                className="bi bi-facebook"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/konkanarabiaholidays"
              className="hover:text-amber-300 transition-colors text-white/80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
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
        } transition-all duration-300 border-b border-slate-100`}
      >
        <div className="container mx-auto px-3 sm:px-4 flex justify-between items-center relative max-w-[1536px]">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group transition-all duration-300 flex-shrink-0 mr-2 xl:mr-4">
            <div className="relative flex-shrink-0">
                <Image
                  src="/logo/KonkanArabia-New-Logo.png"
                  alt="KonkanArabia Logo"
                  width={88}
                  height={88}
                  className="relative z-10 transition-transform duration-500 group-hover:scale-105 w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] xl:w-[82px] xl:h-[82px] object-contain px-1"
                  style={{ height: "auto" }}
                />
            </div>
            <div className="flex flex-col justify-center flex-shrink-0">
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center w-full min-w-0">
                  <div className="h-[1px] hidden xs:block xs:flex-none xs:w-3 sm:w-6 bg-[#00558a]/30"></div>
                  <span className="px-1 xs:px-1.5 text-[8px] xs:text-[9px] sm:text-[10px] md:text-[10.5px] text-[#00558a] font-serif italic font-bold tracking-wider whitespace-nowrap leading-none uppercase">
                    {t('slogan1')}
                  </span>
                  <div className="h-[1px] hidden xs:block xs:flex-none xs:w-3 sm:w-6 bg-[#00558a]/30"></div>
                </div>
                <div className="flex items-center gap-0.5 leading-none mt-1 sm:mt-0.5">
                  <span className="text-base xs:text-lg sm:text-xl md:text-2xl font-serif font-black text-slate-900 tracking-tight whitespace-nowrap">KonkanArabia</span>
                  <span className="text-[8px] sm:text-[9px] font-sans font-medium text-amber-600 self-start mt-0.5">®</span>
                </div>
              </div>
              <div className="flex flex-col mt-0.5 min-w-0">
                <div className="h-[1px] w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-[#00558a]"></div>
                </div>
                <span suppressHydrationWarning className="text-[7px] xxs:text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-sans font-bold text-slate-600 tracking-[0.02em] xs:tracking-[0.04em] sm:tracking-[0.06em] uppercase mt-0.5 leading-tight sm:leading-none whitespace-nowrap">
                  &#123; {t('slogan2')} &#125;
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center justify-end flex-shrink-0 min-w-0 gap-1.5 xl:gap-3">
            <nav className="hidden lg:block flex-shrink-0">
              <ul className="flex items-center gap-0.5 xl:gap-1 2xl:gap-2">
                {navItems.map((item) => (
                  <li key={item.name} className="relative flex-shrink-0">
                    {item.dropdown ? (
                      <div ref={dropdownRef}>
                        <button
                          onClick={toggleServicesDropdown}
                          className={`flex items-center text-[11.5px] xl:text-[13px] 2xl:text-[14.5px] font-medium px-1.5 xl:px-2.5 2xl:px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                            pathname.startsWith(item.href)
                              ? "text-[#00558a] bg-slate-50 font-bold border border-slate-200/80"
                              : "text-slate-700 hover:text-[#00558a] hover:bg-slate-50"
                          }`}
                        >
                          {item.name}
                          <ChevronDown
                            className={`ml-1 h-3 w-3 xl:h-3.5 xl:w-3.5 transition-transform ${
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
                                className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-[#00558a] hover:text-white font-medium transition-colors whitespace-nowrap"
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
                        className={`text-[11.5px] xl:text-[13px] 2xl:text-[14.5px] font-medium px-1.5 xl:px-2.5 2xl:px-3 py-1.5 rounded-lg transition-all block whitespace-nowrap ${
                          item.href === "/europe-joint-venture"
                            ? pathname === item.href
                              ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                              : "bg-amber-500/10 text-amber-800 hover:bg-amber-500/20 border border-amber-300/80 font-semibold"
                            : pathname === item.href
                            ? "text-[#00558a] bg-slate-50 font-bold border border-slate-200/80"
                            : "text-slate-700 hover:text-[#00558a] hover:bg-slate-50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <Link href="/enquiry" className="hidden lg:block flex-shrink-0 ml-1">
              <Button
                className="bg-[#00558a] hover:bg-[#00406c] text-white font-bold px-2.5 xl:px-3.5 py-2 rounded-lg shadow-md shadow-blue-900/10 transition-all hover:scale-[1.02] active:scale-[0.98] text-[11px] xl:text-xs 2xl:text-sm whitespace-nowrap"
              >
                {t('enquire_now')}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden ml-2 sm:ml-4 text-slate-800"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-900" />
              ) : (
                <Menu className="h-6 w-6 text-slate-900" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <nav className="bg-white px-4 pt-3 pb-6 shadow-2xl border-t border-slate-100">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    {item.dropdown ? (
                      <div
                        ref={mobileDropdownRef}
                        className="border-b border-slate-100 pb-2"
                      >
                        <button
                          onClick={toggleMobileServicesDropdown}
                          className={`flex items-center justify-between w-full py-2.5 text-left font-medium transition-colors ${
                            pathname.startsWith(item.href)
                              ? "font-semibold text-amber-800"
                              : "text-slate-700"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transition-transform ${
                              isMobileServicesDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isMobileServicesDropdownOpen && (
                          <div className="pl-4 mt-1 space-y-1.5 border-l-2 border-amber-400/40 my-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block py-2 text-sm text-slate-600 hover:text-amber-700 font-medium"
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
                        className={`block py-2.5 transition-all ${
                          item.href === "/europe-joint-venture"
                            ? "bg-amber-500/10 text-amber-800 font-bold border border-amber-300/80 rounded-xl px-3.5 py-2.5 my-1 flex items-center justify-between shadow-xs"
                            : pathname === item.href
                            ? "font-bold text-amber-800 border-b border-slate-100"
                            : "text-slate-700 border-b border-slate-100"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                        {item.href === "/europe-joint-venture" && (
                          <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
                <li className="pt-3">
                  <Link href="/enquiry" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 shadow-md border border-amber-400/50">
                      {t('enquire_now')}
                    </Button>
                  </Link>
                </li>
                <li className="pt-4 flex flex-col items-center gap-3 border-t border-slate-100 mt-3">
                  <LocaleSwitcher />
                  <div className="text-center text-xs text-slate-500 space-y-1 pt-1">
                    <p className="font-semibold text-slate-700">📞 +91-9370528517 | +971-555995260</p>
                    <p className="text-[11px] text-slate-400">bookings@konkanarabiahospitalitygroup.com</p>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
