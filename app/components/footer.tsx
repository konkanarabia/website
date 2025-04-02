import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4 text-white">
              KonkanArabia Hospitality & Holiday Group
            </h3>
            <p className="text-gray-300 text-lg">Discover the world with us</p>
            <div className="flex mt-6 space-x-5">
              <Link
                href="https://www.facebook.com/konkanarabiahospitalitygroup"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Facebook size={28} />
              </Link>
              <Link
                href="https://www.instagram.com/konkanarabiaholidays"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Instagram size={28} />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4 text-white pb-2 border-b border-gray-700">
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
                  <span className="mr-2">→</span> Destinations
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
            <h4 className="text-xl font-semibold mb-4 text-white pb-2 border-b border-gray-700">
              Contact Us
            </h4>
            <div className="space-y-3">
              <p className="text-gray-300 flex items-start">
                <span className="font-semibold mr-2">Email:</span>
                <span>info@konkanarabiahospitalitygroup.com</span>
              </p>
              <p className="text-gray-300 flex items-start">
                <span className="font-semibold mr-2">Phone:</span>
                <span>+971-58 993 7446</span>
              </p>
              <div className="pt-3 border-t border-gray-800">
                <p className="text-gray-300 font-semibold mb-1">UAE Office:</p>
                <p className="text-gray-400 leading-relaxed">
                  Binshama 2, Al Barsha 1, Opp. Armada Residence, Dubai, UAE.
                </p>
              </div>
              <div className="pt-3 border-t border-gray-800">
                <p className="text-gray-300 font-semibold mb-1">
                  India Office:
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Off. No. 14, Almita A1 Building, H.No.2/175, Calangute Beach
                  Rd, Naika Waddo, Calangute, Goa, 403516, India
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} KonkanArabia Hospitality & Holiday
            Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
