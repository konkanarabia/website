import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white break-words">
              KonkanArabia Hospitality & Holiday Mgmt. Pvt. Ltd.
            </h3>
            <p className="text-gray-300 text-base md:text-lg">Discover the world with us</p>
            <div className="flex mt-6 space-x-5">
              <Link
                href="https://www.facebook.com/konkanarabiahospitalitygroup"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="https://www.instagram.com/konkanarabiaholidays"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Instagram size={24} />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg md:text-xl font-semibold mb-4 text-white pb-2 border-b border-gray-700">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">→</span> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">→</span> Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">→</span> About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">→</span> Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg md:text-xl font-semibold mb-4 text-white pb-2 border-b border-gray-700">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="text-gray-300 flex flex-col sm:flex-row sm:items-start">
                <span className="font-semibold mr-2 whitespace-nowrap">Email:</span>
                <div className="flex flex-col">
                  <span className="break-all text-sm md:text-base">bookings@konkanarabiahospitalitygroup.com</span>
                  <span className="break-all text-sm md:text-base">konkanarabiatourism@gmail.com</span>
                </div>
              </div>
              <div className="text-gray-300 flex flex-col sm:flex-row sm:items-start">
                <span className="font-semibold mr-2 whitespace-nowrap">Phone:</span>
                <div className="flex flex-col">
                  <span>India: +91-9370528517 | 8625807465</span>
                  <span>UAE: +971-555995260 | 0557337618</span>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-800">
                <p className="text-gray-300 font-semibold mb-1">
                  India: KonkanArabia Hospitality & Holiday Mgmt. Pvt. Ltd.
                </p>
                <p className="text-gray-400 leading-relaxed break-words text-sm md:text-base">
                  Mumbai, India
                </p>
              </div>
              <div className="pt-3 border-t border-gray-800">
                <p className="text-gray-300 font-semibold mb-1">Dubai: KonkanArabia Tourism LLC</p>
                <p className="text-gray-400 leading-relaxed break-words text-sm md:text-base">
                  Binshama 2, Al Barsha 1, Opp. Armada Residence, Dubai, UAE.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm md:text-base break-words" suppressHydrationWarning={true}>
            &copy; {new Date().getFullYear()} KonkanArabia Hospitality & Holiday
            Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
