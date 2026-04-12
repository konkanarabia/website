import { getPaginatedDestinations } from '@/app/actions/destinations';
import { getAnalytics } from '@/app/actions/analytics';
import { getEnquiries } from '@/app/actions/enquiries';
import { getAllReviews } from '@/app/actions/reviews';
import Link from 'next/link';
import { Edit, Image as ImageIcon, Globe2, Calendar, Eye, ArrowUpRight, MessageSquare } from 'lucide-react';
import DeleteButton from './DeleteButton';
import AnalyticsCharts from './AnalyticsCharts';
import EnquiryRow from './EnquiryRow';
import ReviewRow from './ReviewRow';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard(props: { searchParams: Promise<{ page?: string }> }) {
  const params = await props.searchParams;
  const page = params?.page ? parseInt(params.page) : 1;

  const [{ data: destinations, totalPages, currentPage, totalCount }, analytics, enquiries, reviews] = await Promise.all([
    getPaginatedDestinations(page, 10),
    getAnalytics(),
    getEnquiries(10),
    getAllReviews(10)
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your website content and view insights.</p>
        </div>
        <Link 
          href="/admin/destinations/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm flex items-center"
        >
          <span className="mr-2">+</span> Add New
        </Link>
      </div>

      {/* Insights Grid */}
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
              {analytics.topPaths.length > 0 ? analytics.topPaths.slice(0, 3).map((pathInfo: any, i: number) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-blue-600 truncate max-w-[120px] font-medium" title={pathInfo._id}>{pathInfo._id || '/'}</span>
                  <span className="font-bold border-l border-gray-200 pl-2">{pathInfo.count}</span>
                </div>
              )) : <span className="text-sm text-gray-400">No data yet</span>}
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Enquiries Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Recent Lead Enquiries
            </h2>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">LEADS</span>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Date</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {enquiries.length === 0 ? (
                    <tr>
                    <td colSpan={2} className="px-6 py-12 text-center text-gray-500">No enquiries yet</td>
                    </tr>
                ) : null}
                {enquiries.slice(0, 5).map((enq: any) => (
                    <tr key={enq._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                            <div className="font-bold text-gray-800 text-sm">{enq.name}</div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{enq.destination}</div>
                        </td>
                        <td className="px-6 py-4 text-right text-xs text-gray-500 font-medium whitespace-nowrap">
                            {new Date(enq.createdAt).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                Recent Reviews
            </h2>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">SOCIAL</span>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-gray-100">
                {reviews.length === 0 ? (
                    <tr>
                    <td className="px-6 py-12 text-center text-gray-500">No reviews yet</td>
                    </tr>
                ) : null}
                {reviews.map((rev: any) => (
                    <ReviewRow key={rev._id} rev={rev} />
                ))}
                </tbody>
            </table>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Destination Master Data</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cover Image</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Destination Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Best Time</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {destinations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                    <Globe2 className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg font-medium text-gray-900">No destinations found</p>
                    <p className="text-gray-500">Go add some amazing locations to your database!</p>
                  </td>
                </tr>
              ) : null}
              {destinations.map((dest: any) => (
                <tr key={dest._id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    {dest.image ? (
                      <div className="w-16 h-12 rounded-md overflow-hidden bg-gray-100 relative shadow-sm border border-gray-200">
                        <img 
                          src={dest.image} 
                          alt={dest.name} 
                          className="w-full h-full object-cover"
                        />
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
                        title="Edit Destination"
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
              Showing Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-3">
              <Link href={currentPage > 1 ? `/admin?page=${currentPage - 1}` : '#'}>
                <button
                  disabled={currentPage <= 1}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Previous
                </button>
              </Link>
              <Link href={currentPage < totalPages ? `/admin?page=${currentPage + 1}` : '#'}>
                <button
                  disabled={currentPage >= totalPages}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Next
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
