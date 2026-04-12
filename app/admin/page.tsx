import { getPaginatedDestinations } from '@/app/actions/destinations';
import { getAnalytics } from '@/app/actions/analytics';
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
} from 'lucide-react';
import DeleteButton from './DeleteButton';
import EnquiryRow from './EnquiryRow';
import ReviewRow from './ReviewRow';

export const dynamic = 'force-dynamic';

type AdminTab = 'destinations' | 'enquiries' | 'reviews';

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
    tabParam === 'enquiries' || tabParam === 'reviews' ? tabParam : 'destinations';

  const destPage = tab === 'destinations' ? page : 1;
  const encPage = tab === 'enquiries' ? page : 1;
  const revPage = tab === 'reviews' ? page : 1;

  const [
    { data: destinations, totalPages, currentPage, totalCount },
    analytics,
    enquiryCount,
    reviewCount,
    enquiriesResult,
    reviewsResult,
  ] = await Promise.all([
    getPaginatedDestinations(destPage, 10),
    getAnalytics(),
    getEnquiryCount(),
    getReviewCount(),
    tab === 'enquiries' ? getPaginatedEnquiries(encPage, 10) : Promise.resolve({ data: [], totalPages: 0, currentPage: 1, totalCount: 0 }),
    tab === 'reviews' ? getPaginatedReviews(revPage, 10) : Promise.resolve({ data: [], totalPages: 0, currentPage: 1, totalCount: 0 }),
  ]);

  const enquiries = enquiriesResult.data;
  const encTotalPages = enquiriesResult.totalPages;
  const encCurrentPage = enquiriesResult.currentPage;

  const reviews = reviewsResult.data;
  const revTotalPages = reviewsResult.totalPages;
  const revCurrentPage = reviewsResult.currentPage;

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
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Best time</th>
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
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-blue-100">
                        {dest.duration}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-600">{dest.bestTime}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
              <div className="flex space-x-3">
                <Link href={currentPage > 1 ? adminHref('destinations', currentPage - 1) : '#'}>
                  <button
                    disabled={currentPage <= 1}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Previous
                  </button>
                </Link>
                <Link href={currentPage < totalPages ? adminHref('destinations', currentPage + 1) : '#'}>
                  <button
                    disabled={currentPage >= totalPages}
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
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Previous
                  </button>
                </Link>
                <Link href={encCurrentPage < encTotalPages ? adminHref('enquiries', encCurrentPage + 1) : '#'}>
                  <button
                    type="button"
                    disabled={encCurrentPage >= encTotalPages}
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
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Previous
                  </button>
                </Link>
                <Link href={revCurrentPage < revTotalPages ? adminHref('reviews', revCurrentPage + 1) : '#'}>
                  <button
                    type="button"
                    disabled={revCurrentPage >= revTotalPages}
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
    </div>
  );
}
