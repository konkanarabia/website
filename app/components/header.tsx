"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useI18n } from "@/lib/i18n-provider";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./social-icons";

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
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform flex items-center justify-center"
              title="Facebook"
            >
              <FacebookIcon className="w-4 h-4 shadow-sm" />
            </Link>
            <Link
              href="https://www.instagram.com/konkanarabiaholidays"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform flex items-center justify-center"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4 shadow-sm" />
            </Link>
            <Link
              href="https://www.youtube.com/@KonkanArabiaholiday"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform flex items-center justify-center"
              title="YouTube"
            >
              <YoutubeIcon className="w-4 h-4 shadow-sm" />
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
                  <div className="flex items-center gap-4 pt-1">
                    <Link
                      href="https://www.facebook.com/konkanarabiahospitalitygroup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                      title="Facebook"
                    >
                      <FacebookIcon className="w-5 h-5" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/konkanarabiaholidays"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                      title="Instagram"
                    >
                      <InstagramIcon className="w-5 h-5" />
                    </Link>
                    <Link
                      href="https://www.youtube.com/@KonkanArabiaholiday"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                      title="YouTube"
                    >
                      <YoutubeIcon className="w-5 h-5" />
                    </Link>
                  </div>
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
