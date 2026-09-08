import Link from "next/link";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./social-icons";

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-800 py-16 border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-serif font-bold mb-4 text-slate-900 break-words">
              KonkanArabia Hospitality & Holiday Mgmt. Pvt. Ltd.
            </h3>
            <p className="text-slate-600 text-base md:text-lg font-medium">Discover the world with us</p>
            <div className="flex mt-6 space-x-4 items-center">
              <Link
                href="https://www.facebook.com/konkanarabiahospitalitygroup"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform drop-shadow-xs flex items-center"
                title="Facebook"
              >
                <FacebookIcon size={28} className="w-7 h-7" />
              </Link>
              <Link
                href="https://www.instagram.com/konkanarabiaholidays"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform drop-shadow-xs flex items-center"
                title="Instagram"
              >
                <InstagramIcon size={28} className="w-7 h-7" />
              </Link>
              <Link
                href="https://www.youtube.com/@KonkanArabiaholiday"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform drop-shadow-xs flex items-center"
                title="YouTube"
              >
                <YoutubeIcon size={28} className="w-7 h-7" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg md:text-xl font-bold mb-4 text-slate-900 pb-2 border-b border-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-slate-600 hover:text-amber-600 font-medium transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-amber-500">→</span> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-slate-600 hover:text-amber-600 font-medium transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-amber-500">→</span> Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-amber-600 font-medium transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-amber-500">→</span> About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-slate-600 hover:text-amber-600 font-medium transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-amber-500">→</span> Our Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/europe-joint-venture"
                  className="text-slate-600 hover:text-amber-600 font-medium transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-amber-500">→</span> Our Europe Joint Venture
                </Link>
              </li>
              <li>
                <Link
                  href="/franchise"
                  className="text-slate-600 hover:text-amber-600 font-medium transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-amber-500">→</span> Franchise Opportunities
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-amber-600 font-medium transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-amber-500">→</span> Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg md:text-xl font-bold mb-4 text-slate-900 pb-2 border-b border-slate-200">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="text-slate-600 flex flex-col sm:flex-row sm:items-start">
                <span className="font-bold text-slate-800 mr-2 whitespace-nowrap">Email:</span>
                <div className="flex flex-col">
                  <span className="break-all text-sm md:text-base font-medium">bookings@konkanarabiahospitalitygroup.com</span>
                  <span className="break-all text-sm md:text-base font-medium">konkanarabiatourism@gmail.com</span>
                </div>
              </div>
              <div className="text-slate-600 flex flex-col sm:flex-row sm:items-start">
                <span className="font-bold text-slate-800 mr-2 whitespace-nowrap">Phone:</span>
                <div className="flex flex-col font-medium">
                  <span>India: +91-9370528517 | 9326380922</span>
                  <span>UAE: +971-555995260 | 0557337618</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <p className="text-slate-800 font-bold mb-1">
                  India: KonkanArabia Hospitality & Holiday Mgmt. Pvt. Ltd.
                </p>
                <p className="text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
                  Company Registered & Corporate office:
                </p>
                <p className="text-slate-600 leading-relaxed break-words text-sm md:text-base">
                  Office No:S-144, 2nd Floor, Haware Fantasia Business Park, Sector 30A, Behind Inorbit Mall, Near Railway Station, Vashi, Navi Mumbai 400703
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <p className="text-slate-800 font-bold mb-1">Dubai: KonkanArabia Tourism LLC</p>
                <p className="text-slate-600 leading-relaxed break-words text-sm md:text-base">
                  Binshama 2, Al Barsha 1, Opp. Armada Residence, Dubai, UAE.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-500 text-sm md:text-base font-medium break-words" suppressHydrationWarning={true}>
            &copy; {new Date().getFullYear()} KonkanArabia Hospitality & Holiday
            Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
