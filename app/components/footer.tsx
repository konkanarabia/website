import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              KonkanArabia Hospitality & Holiday Group
            </h3>
            <p className="text-gray-400">Discover the world with us</p>
            <div className="flex mt-4 space-x-4">
              <Link
                href="https://www.facebook.com/konkanarabiahospitalitygroup"
                className="text-gray-400 hover:text-white"
              >
                <Facebook size={24} />
              </Link>
              {/* <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter size={24} />
              </Link> */}
              <Link
                href="https://www.instagram.com/konkanarabiaholidays"
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={24} />
              </Link>
              {/* <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={24} />
              </Link> */}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-gray-400 hover:text-white"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">
              Email: info@konkanarabiahospitalitygroup.com
            </p>
            <p className="text-gray-400">Phone: +971-58 993 7446</p>
            <p className="text-gray-400">
              Address: Binshama 2, Al Barsha 1, Opp. Armada Residence, Dubai,
              UAE.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; 2023 KonkanArabia Hospitality & Holiday Group. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
