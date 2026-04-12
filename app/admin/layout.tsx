'use client';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Suspense, useState } from 'react';
import { Toaster } from 'sonner';
import AdminSidebarNav from './AdminSidebarNav';

function SidebarNavFallback() {
  return (
    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-11 rounded-lg bg-gray-100 animate-pulse" />
      ))}
    </nav>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (pathname === '/admin/login') return <>{children}</>;

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
        <Suspense fallback={<SidebarNavFallback />}>
          <AdminSidebarNav setMobileMenuOpen={setMobileMenuOpen} />
        </Suspense>
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
