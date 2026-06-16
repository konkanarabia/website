'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Map, Inbox, MessageSquare, ExternalLink, LogOut, Car, Plane, HeartHandshake, Hotel, Utensils, Globe } from 'lucide-react';
import { logout } from '@/app/actions/auth';

type AdminSidebarNavProps = {
  setMobileMenuOpen: (open: boolean) => void;
};

export default function AdminSidebarNav({ setMobileMenuOpen }: AdminSidebarNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const onAdminHome = pathname === '/admin';
  const destinationsActive = onAdminHome && 
    tab !== 'enquiries' && 
    tab !== 'reviews' && 
    tab !== 'vehicles' && 
    tab !== 'visas' && 
    tab !== 'events' &&
    tab !== 'hospitality' &&
    tab !== 'restaurants';
  const enquiriesActive = onAdminHome && tab === 'enquiries';
  const reviewsActive = onAdminHome && tab === 'reviews';

  const navClass = (active: boolean) =>
    `flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
      active ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-50'
    }`;

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link href="/admin" onClick={closeMobile} className={navClass(destinationsActive)}>
          <Map className="w-5 h-5 mr-3 shrink-0" />
          Destinations
        </Link>
        <Link href="/admin?tab=vehicles" onClick={closeMobile} className={navClass(pathname === '/admin' && searchParams.get('tab') === 'vehicles')}>
          <Car className="w-5 h-5 mr-3 shrink-0" />
          Vehicle Rentals
        </Link>
        <Link href="/admin?tab=visas" onClick={closeMobile} className={navClass(pathname === '/admin' && searchParams.get('tab') === 'visas')}>
          <Plane className="w-5 h-5 mr-3 shrink-0" />
          Visa Processing
        </Link>
        <Link href="/admin?tab=events" onClick={closeMobile} className={navClass(pathname === '/admin' && searchParams.get('tab') === 'events')}>
          <HeartHandshake className="w-5 h-5 mr-3 shrink-0" />
          Event Management
        </Link>
        <Link href="/admin?tab=hospitality" onClick={closeMobile} className={navClass(pathname === '/admin' && searchParams.get('tab') === 'hospitality')}>
          <Hotel className="w-5 h-5 mr-3 shrink-0" />
          Hospitality & Stays
        </Link>
        <Link href="/admin?tab=restaurants" onClick={closeMobile} className={navClass(pathname === '/admin' && searchParams.get('tab') === 'restaurants')}>
          <Utensils className="w-5 h-5 mr-3 shrink-0" />
          Dining & Restaurants
        </Link>
        <Link href="/admin?tab=enquiries" onClick={closeMobile} className={navClass(enquiriesActive)}>
          <Inbox className="w-5 h-5 mr-3 shrink-0" />
          Enquiries
        </Link>
        <Link href="/admin?tab=reviews" onClick={closeMobile} className={navClass(reviewsActive)}>
          <MessageSquare className="w-5 h-5 mr-3 shrink-0" />
          Reviews
        </Link>
        <Link href="/admin/translations" onClick={closeMobile} className={navClass(pathname === '/admin/translations')}>
          <Globe className="w-5 h-5 mr-3 shrink-0" />
          Translation Cache
        </Link>
        <div className="pt-4 mt-4 border-t border-gray-100">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className="flex items-center px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-5 h-5 mr-3 shrink-0" />
            View main site
          </Link>
        </div>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          type="button"
          onClick={async () => {
            await logout();
          }}
          className="flex items-center w-full px-4 py-3 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3 shrink-0" />
          Logout
        </button>
      </div>
    </>
  );
}
