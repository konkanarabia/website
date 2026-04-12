'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ExternalLink, Plus, LogOut, Menu, X } from 'lucide-react';
import { logout } from '@/app/actions/auth';
import { useState } from 'react';
import { Toaster } from 'sonner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-20">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-gray-200 flex flex-col fixed md:sticky top-0 h-screen transition-transform z-10 ${mobileMenuOpen ? 'translate-x-0 pt-16' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-200 hidden md:block">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Admin<span className="text-blue-600">Pro</span></h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link onClick={() => setMobileMenuOpen(false)} href="/admin" className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${pathname === '/admin' ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}>
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/admin/destinations/new" className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${pathname === '/admin/destinations/new' ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Plus className="w-5 h-5 mr-3" /> Add Destination
          </Link>
          <div className="pt-4 mt-4 border-t border-gray-100">
            <Link onClick={() => setMobileMenuOpen(false)} href="/" target="_blank" className="flex items-center px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <ExternalLink className="w-5 h-5 mr-3" /> View Main Site
            </Link>
          </div>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen pt-16 md:pt-0">
        <div className="p-4 md:p-8 flex-1">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-0 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
      <Toaster richColors position="top-center" />
    </div>
  );
}
