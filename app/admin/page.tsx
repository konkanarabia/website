import { getPaginatedDestinations } from '@/app/actions/destinations';
import { getAnalytics } from '@/app/actions/analytics';
import { getPaginatedVehicles } from '@/app/actions/vehicles';
import { getPaginatedVisas } from '@/app/actions/visas';
import { getPaginatedEvents } from '@/app/actions/events';
import { getPaginatedHospitality } from '@/app/actions/hospitality';
import { getPaginatedRestaurants } from '@/app/actions/restaurants';
import { getEnquiryCount, getPaginatedEnquiries } from '@/app/actions/enquiries';
import { getReviewCount, getPaginatedReviews } from '@/app/actions/reviews';
import Link from 'next/link';

import {
  Edit,
  Image as ImageIcon,
  Globe2,
  Calendar,
  Eye,
  MessageSquare,
  Inbox,
  Map,
  Car,
  Plane,
  HeartHandshake,
  Utensils,
  Hotel,
  Globe,
  Sparkles,
} from 'lucide-react';
import DeleteButton from './DeleteButton';
import EnquiryRow from './EnquiryRow';
import ReviewRow from './ReviewRow';
import VehicleDeleteButton from './VehicleDeleteButton';
import VisaDeleteButton from './VisaDeleteButton';
import EventDeleteButton from './EventDeleteButton';
import HospitalityDeleteButton from './HospitalityDeleteButton';
import RestaurantDeleteButton from './RestaurantDeleteButton';

export const dynamic = 'force-dynamic';

function getServiceIcon(iconName: string) {
  switch(iconName) {
    case 'Car': return <Car className="w-6 h-6" />;
    case 'Plane': return <Plane className="w-6 h-6" />;
    case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
    case 'Utensils': return <Utensils className="w-6 h-6" />;
    case 'Globe': return <Globe className="w-6 h-6" />;
    default: return <Sparkles className="w-6 h-6" />;
  }
}


type AdminTab = 'destinations' | 'enquiries' | 'reviews' | 'vehicles' | 'visas' | 'events' | 'hospitality' | 'restaurants';

function adminHref(tab: AdminTab, page?: number) {
  const q = new URLSearchParams();
  q.set('tab', tab);
  if (page && page > 1) {
    q.set('page', String(page));
  }
  return `/admin?${q.toString()}`;
}

export default async function AdminDashboard(props: {
  searchParams: Promise<{ page?: string; tab?: string }>;
}) {
  const params = await props.searchParams;
  const pageRaw = params.page ? parseInt(params.page, 10) : 1;
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const tabParam = params.tab;
  const tab: AdminTab =
    tabParam === 'enquiries' || 
    tabParam === 'reviews' || 
    tabParam === 'vehicles' || 
    tabParam === 'visas' || 
    tabParam === 'events' ||
    tabParam === 'hospitality' ||
    tabParam === 'restaurants' ? tabParam as AdminTab : 'destinations';

  const destPage = tab === 'destinations' ? page : 1;
  const encPage = tab === 'enquiries' ? page : 1;
  const revPage = tab === 'reviews' ? page : 1;
  const vehPage = tab === 'vehicles' ? page : 1;
  const visaPage = tab === 'visas' ? page : 1;
  const eventPage = tab === 'events' ? page : 1;
  const hospPage = tab === 'hospitality' ? page : 1;
  const resPage = tab === 'restaurants' ? page : 1;

  const [
    { data: destinations, totalPages, currentPage, totalCount },
    analytics,
    enquiryCount,
    reviewCount,
    enquiriesResult,
    reviewsResult,
    vehiclesResult,
    visasResult,
    eventsResult,
    hospitalityResult,
    restaurantsResult,
  ] = await Promise.all([
    getPaginatedDestinations(destPage, 10),
    getAnalytics(),
    getEnquiryCount(),
    getReviewCount(),
    tab === 'enquiries' ? getPaginatedEnquiries(encPage, 10) : Promise.resolve({ data: [], totalPages: 0, currentPage: 1, totalCount: 0 }),
    tab === 'reviews' ? getPaginatedReviews(revPage, 10) : Promise.resolve({ data: [], totalPages: 0, currentPage: 1, totalCount: 0 }),
    tab === 'vehicles' ? getPaginatedVehicles(vehPage, 10) : Promise.resolve({ data: [], totalPages: 0, currentPage: 1, totalCount: 0 }),
    tab === 'visas' ? getPaginatedVisas(visaPage, 10) : Promise.resolve({ data: [], totalPages: 0, currentPage: 1, totalCount: 0 }),
    tab === 'events' ? getPaginatedEvents(eventPage, 10) : Promise.resolve({ data: [], totalPages: 0, currentPage: 1, totalCount: 0 }),
    tab === 'hospitality' ? getPaginatedHospitality(hospPage, 10) : Promise.resolve({ data: [], totalPages: 0, currentPage: 1, totalCount: 0 }),
    tab === 'restaurants' ? getPaginatedRestaurants(resPage, 10) : Promise.resolve({ data: [], totalPages: 0, currentPage: 1, totalCount: 0 }),
  ]);

  const enquiries = enquiriesResult.data;
  const encTotalPages = enquiriesResult.totalPages;
  const encCurrentPage = enquiriesResult.currentPage;

  const reviews = reviewsResult.data;
  const revTotalPages = reviewsResult.totalPages;
  const revCurrentPage = reviewsResult.currentPage;

  const vehicles = vehiclesResult.data;
  const vehTotalPages = vehiclesResult.totalPages;
  const vehCurrentPage = vehiclesResult.currentPage;

  const visas = visasResult.data;
  const visaTotalPages = visasResult.totalPages;
  const visaCurrentPage = visasResult.currentPage;

  const events = eventsResult.data;
  const eventTotalPages = eventsResult.totalPages;
  const eventCurrentPage = eventsResult.currentPage;

  const hospitality = hospitalityResult.data;
  const hospTotalPages = hospitalityResult.totalPages;
  const hospCurrentPage = hospitalityResult.currentPage;

  const restaurants = restaurantsResult.data;
  const resTotalPages = restaurantsResult.totalPages;
  const resCurrentPage = restaurantsResult.currentPage;

  const tabClass = (t: AdminTab) =>
    `inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
      tab === t
        ? 'bg-blue-600 text-white shadow-sm'
        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your website content and view insights.</p>
        </div>
        <Link
          href="/admin/destinations/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm flex items-center justify-center shrink-0"
        >
          <span className="mr-2">+</span> Add destination
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
          <div className="bg-blue-100 p-4 rounded-full mr-5">
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Unique Visitors</p>
            <h2 className="text-3xl font-black text-gray-800">{analytics.totalVisits}</h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
          <div className="bg-green-100 p-4 rounded-full mr-5">
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Visitors Today</p>
            <h2 className="text-3xl font-black text-gray-800">{analytics.todayVisits}</h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
          <div className="bg-purple-100 p-4 rounded-full mr-5">
            <Globe2 className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Active Destinations</p>
            <h2 className="text-3xl font-black text-gray-800">{totalCount}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Top Visited Pages</p>
          <div className="space-y-1">
            {analytics.topPaths.length > 0 ? (
              analytics.topPaths.slice(0, 3).map((pathInfo: { _id: string; count: number }, i: number) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-blue-600 truncate max-w-[120px] font-medium" title={pathInfo._id}>
                    {pathInfo._id || '/'}
                  </span>
                  <span className="font-bold border-l border-gray-200 pl-2">{pathInfo.count}</span>
                </div>
              ))
            ) : (
              <span className="text-sm text-gray-400">No data yet</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        <Link
          href={adminHref('destinations', tab === 'destinations' && destPage > 1 ? destPage : undefined)}
          className={tabClass('destinations')}
        >
          <Map className="h-4 w-4 shrink-0" />
          Destinations
        </Link>
        <Link
          href={adminHref('vehicles', tab === 'vehicles' && vehPage > 1 ? vehPage : undefined)}
          className={tabClass('vehicles')}
        >
          <Car className="h-4 w-4 shrink-0" />
          Vehicles
        </Link>
        <Link
          href={adminHref('visas', tab === 'visas' && visaPage > 1 ? visaPage : undefined)}
          className={tabClass('visas')}
        >
          <Plane className="h-4 w-4 shrink-0" />
          Visas
        </Link>
        <Link
          href={adminHref('events', tab === 'events' && eventPage > 1 ? eventPage : undefined)}
          className={tabClass('events')}
        >
          <HeartHandshake className="h-4 w-4 shrink-0" />
          Events
        </Link>
        <Link
          href={adminHref('hospitality', tab === 'hospitality' && hospPage > 1 ? hospPage : undefined)}
          className={tabClass('hospitality')}
        >
          <Hotel className="h-4 w-4 shrink-0" />
          Stays
        </Link>
        <Link
          href={adminHref('restaurants', tab === 'restaurants' && resPage > 1 ? resPage : undefined)}
          className={tabClass('restaurants')}
        >
          <Utensils className="h-4 w-4 shrink-0" />
          Dining
        </Link>
        <Link
          href={adminHref('enquiries', tab === 'enquiries' && encPage > 1 ? encPage : undefined)}
          className={tabClass('enquiries')}
        >
          <Inbox className="h-4 w-4 shrink-0" />
          Enquiries
          {enquiryCount > 0 && (
            <span
              className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                tab === 'enquiries' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'
              }`}
            >
              {enquiryCount}
            </span>
          )}
        </Link>
        <Link
          href={adminHref('reviews', tab === 'reviews' && revPage > 1 ? revPage : undefined)}
          className={tabClass('reviews')}
        >
          <MessageSquare className="h-4 w-4 shrink-0" />
          Reviews
          {reviewCount > 0 && (
            <span
              className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                tab === 'reviews' ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-700'
              }`}
            >
              {reviewCount}
            </span>
          )}
        </Link>
      </div>

      {tab === 'destinations' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800">Destination master data</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cover</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Duration</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Best time</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {destinations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                      <Globe2 className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                      <p className="text-lg font-medium text-gray-900">No destinations found</p>
                      <p className="text-gray-500 mb-4">Add packages from the button above.</p>
                      <Link
                        href="/admin/destinations/new"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Create a destination
                      </Link>
                    </td>
                  </tr>
                ) : null}
                {destinations.map((dest: { _id: string; id: number; name: string; description?: string; image?: string; duration: string; bestTime: string }) => (
                  <tr key={dest._id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      {dest.image ? (
                        <div className="w-16 h-12 rounded-md overflow-hidden bg-gray-100 relative shadow-sm border border-gray-200">
                          <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-12 rounded-md bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{dest.name}</div>
                      <div className="text-xs text-gray-500 line-clamp-1 max-w-xs mt-1">{dest.description}</div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-blue-100">
                        {dest.duration}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="text-sm font-medium text-gray-600">{dest.bestTime}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/destinations/${dest.id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit destination"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteButton id={dest.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
              <span className="text-sm text-gray-500 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex space-x-2">
                <Link href={currentPage > 1 ? adminHref('destinations', currentPage - 1) : '#'}>
                  <button
                    disabled={currentPage <= 1}
                    className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all shadow-sm"
                  >
                    Prev
                  </button>
                </Link>
                <Link href={currentPage < totalPages ? adminHref('destinations', currentPage + 1) : '#'}>
                  <button
                    disabled={currentPage >= totalPages}
                    className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all shadow-sm"
                  >
                    Next
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'vehicles' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800">Vehicles master data</h2>
            <Link
              href="/admin/vehicles/new"
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Add Vehicle
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Icon/Image</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vehicles.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                      <Car className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                      <p className="text-lg font-medium text-gray-900">No vehicles found</p>
                      <Link
                        href="/admin/vehicles/new"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Create a vehicle
                      </Link>
                    </td>
                  </tr>
                ) : null}
                {vehicles.map((v: any) => (
                  <tr key={v._id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      {v.image && v.image !== '/placeholder.svg' ? (
                        <div className="w-16 h-12 rounded-md overflow-hidden bg-gray-100 relative shadow-sm border border-gray-200">
                          <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className={`w-16 h-12 rounded-md flex items-center justify-center ${v.listColor || 'bg-gray-100 text-gray-500'} border border-gray-100`}>
                          {getServiceIcon(v.listIcon)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{v.name}</div>
                      <div className="text-xs text-gray-500 line-clamp-1 max-w-xs mt-1">{v.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      {v.isCustomLink ? (
                        <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-100">
                          Custom Link
                        </span>
                      ) : (
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                          Detailed Service
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/vehicles/${v.id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit vehicle"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <VehicleDeleteButton id={v.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {vehTotalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
              <span className="text-sm text-gray-500 font-medium">
                Page {vehCurrentPage} of {vehTotalPages}
              </span>
              <div className="flex space-x-2">
                <Link href={vehCurrentPage > 1 ? adminHref('vehicles', vehCurrentPage - 1) : '#'}>
                  <button
                    disabled={vehCurrentPage <= 1}
                    className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all shadow-sm"
                  >
                    Prev
                  </button>
                </Link>
                <Link href={vehCurrentPage < vehTotalPages ? adminHref('vehicles', vehCurrentPage + 1) : '#'}>
                  <button
                    disabled={vehCurrentPage >= vehTotalPages}
                    className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all shadow-sm"
                  >
                    Next
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'visas' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800">Visas master data</h2>
            <Link
              href="/admin/visas/new"
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Add Visa
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Icon/Image</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visas.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                      <Plane className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                      <p className="text-lg font-medium text-gray-900">No visas found</p>
                      <Link
                        href="/admin/visas/new"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Create a visa
                      </Link>
                    </td>
                  </tr>
                ) : null}
                {visas.map((v: any) => (
                  <tr key={v._id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      {v.image && v.image !== '/placeholder.svg' ? (
                        <div className="w-16 h-12 rounded-md overflow-hidden bg-gray-100 relative shadow-sm border border-gray-200">
                          <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className={`w-16 h-12 rounded-md flex items-center justify-center ${v.listColor || 'bg-gray-100 text-gray-500'} border border-gray-100`}>
                          {getServiceIcon(v.listIcon)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{v.name}</div>
                      <div className="text-xs text-gray-500 line-clamp-1 max-w-xs mt-1">{v.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      {v.isCustomLink ? (
                        <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-100">
                          Custom Link
                        </span>
                      ) : (
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                          Detailed Service
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/visas/${v.id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit visa"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <VisaDeleteButton id={v.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {visaTotalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
              <span className="text-sm text-gray-500 font-medium">
                Page {visaCurrentPage} of {visaTotalPages}
              </span>
              <div className="flex space-x-3">
                <Link href={visaCurrentPage > 1 ? adminHref('visas', visaCurrentPage - 1) : '#'}>
                  <button
                    disabled={visaCurrentPage <= 1}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Previous
                  </button>
                </Link>
                <Link href={visaCurrentPage < visaTotalPages ? adminHref('visas', visaCurrentPage + 1) : '#'}>
                  <button
                    disabled={visaCurrentPage >= visaTotalPages}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Next
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'events' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800">Events master data</h2>
            <Link
              href="/admin/events/new"
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Add Event
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Icon/Image</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                      <HeartHandshake className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                      <p className="text-lg font-medium text-gray-900">No events found</p>
                      <Link
                        href="/admin/events/new"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Create an event
                      </Link>
                    </td>
                  </tr>
                ) : null}
                {events.map((e: any) => (
                  <tr key={e._id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      {e.image && e.image !== '/placeholder.svg' ? (
                        <div className="w-16 h-12 rounded-md overflow-hidden bg-gray-100 relative shadow-sm border border-gray-200">
                          <img src={e.image} alt={e.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className={`w-16 h-12 rounded-md flex items-center justify-center ${e.listColor || 'bg-gray-100 text-gray-500'} border border-gray-100`}>
                          {getServiceIcon(e.listIcon)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{e.name}</div>
                      <div className="text-xs text-gray-500 line-clamp-1 max-w-xs mt-1">{e.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      {e.isCustomLink ? (
                        <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-100">
                          Custom Link
                        </span>
                      ) : (
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                          Detailed Service
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/events/${e.id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit event"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <EventDeleteButton id={e.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {eventTotalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
              <span className="text-sm text-gray-500 font-medium">
                Page {eventCurrentPage} of {eventTotalPages}
              </span>
              <div className="flex space-x-3">
                <Link href={eventCurrentPage > 1 ? adminHref('events', eventCurrentPage - 1) : '#'}>
                  <button
                    disabled={eventCurrentPage <= 1}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Previous
                  </button>
                </Link>
                <Link href={eventCurrentPage < eventTotalPages ? adminHref('events', eventCurrentPage + 1) : '#'}>
                  <button
                    disabled={eventCurrentPage >= eventTotalPages}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Next
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'hospitality' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Hotel className="w-5 h-5 text-blue-600" />
              Hospitality & Stays
            </h2>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">PROPERTIES</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stay</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hospitality.length > 0 ? (
                  hospitality.map((h: any) => (
                    <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 flex-shrink-0">
                            {h.image ? (
                              <img src={h.image} alt={h.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-slate-400">
                                <ImageIcon size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{h.name}</div>
                            <div className="text-xs text-slate-500 line-clamp-1">{h.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                          <Hotel className="h-3 w-3" />
                          Stay
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/hospitality/${h.id}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all font-bold"
                          >
                            <Edit size={16} />
                          </Link>
                          <HospitalityDeleteButton id={h.id} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500 font-medium">No stays found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {hospTotalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
              <span className="text-sm text-gray-500 font-medium">Page {hospCurrentPage} of {hospTotalPages}</span>
              <div className="flex space-x-3">
                <Link href={hospCurrentPage > 1 ? adminHref('hospitality', hospCurrentPage - 1) : '#'}>
                  <button disabled={hospCurrentPage <= 1} className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all">Prev</button>
                </Link>
                <Link href={hospCurrentPage < hospTotalPages ? adminHref('hospitality', hospCurrentPage + 1) : '#'}>
                  <button disabled={hospCurrentPage >= hospTotalPages} className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all">Next</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'restaurants' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-red-600" />
              Dining & Restaurants
            </h2>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">DINING</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Restaurant</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {restaurants.length > 0 ? (
                  restaurants.map((r: any) => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 flex-shrink-0">
                            {r.image ? (
                              <img src={r.image} alt={r.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-slate-400">
                                <ImageIcon size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{r.name}</div>
                            <div className="text-xs text-slate-500 line-clamp-1">{r.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">
                          <Utensils className="h-3 w-3" />
                          Dining
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/restaurants/${r.id}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700 transition-all font-bold"
                          >
                            <Edit size={16} />
                          </Link>
                          <RestaurantDeleteButton id={r.id} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500 font-medium">No restaurants found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {resTotalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
              <span className="text-sm text-gray-500 font-medium">Page {resCurrentPage} of {resTotalPages}</span>
              <div className="flex space-x-3">
                <Link href={resCurrentPage > 1 ? adminHref('restaurants', resCurrentPage - 1) : '#'}>
                  <button disabled={resCurrentPage <= 1} className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all">Prev</button>
                </Link>
                <Link href={resCurrentPage < resTotalPages ? adminHref('restaurants', resCurrentPage + 1) : '#'}>
                  <button disabled={resCurrentPage >= resTotalPages} className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all">Next</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'enquiries' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Inbox className="w-5 h-5 text-blue-600" />
              Lead enquiries
            </h2>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">LEADS</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Trip</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No enquiries yet
                    </td>
                  </tr>
                ) : null}
                {enquiries.map((enq: { _id: string }) => (
                  <EnquiryRow key={enq._id} enq={enq} />
                ))}
              </tbody>
            </table>
          </div>

          {encTotalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
              <span className="text-sm text-gray-500 font-medium">
                Page {encCurrentPage} of {encTotalPages}
              </span>
              <div className="flex space-x-3">
                <Link href={encCurrentPage > 1 ? adminHref('enquiries', encCurrentPage - 1) : '#'}>
                  <button
                    type="button"
                    disabled={encCurrentPage <= 1}
                    className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all shadow-sm"
                  >
                    Prev
                  </button>
                </Link>
                <Link href={encCurrentPage < encTotalPages ? adminHref('enquiries', encCurrentPage + 1) : '#'}>
                  <button
                    type="button"
                    disabled={encCurrentPage >= encTotalPages}
                    className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all shadow-sm"
                  >
                    Next
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'reviews' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Reviews
            </h2>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">SOCIAL</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[520px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Guest</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Review</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                      No reviews yet
                    </td>
                  </tr>
                ) : null}
                {reviews.map((rev: { _id: string }) => (
                  <ReviewRow key={rev._id} rev={rev} />
                ))}
              </tbody>
            </table>
          </div>

          {revTotalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
              <span className="text-sm text-gray-500 font-medium">
                Page {revCurrentPage} of {revTotalPages}
              </span>
              <div className="flex space-x-3">
                <Link href={revCurrentPage > 1 ? adminHref('reviews', revCurrentPage - 1) : '#'}>
                  <button
                    type="button"
                    disabled={revCurrentPage <= 1}
                    className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all shadow-sm"
                  >
                    Prev
                  </button>
                </Link>
                <Link href={revCurrentPage < revTotalPages ? adminHref('reviews', revCurrentPage + 1) : '#'}>
                  <button
                    type="button"
                    disabled={revCurrentPage >= revTotalPages}
                    className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all shadow-sm"
                  >
                    Next
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
