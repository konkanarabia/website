'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && !pathname.startsWith('/admin')) {
      let sid = localStorage.getItem('analytics_sid');
      if (!sid) {
          sid = Math.random().toString(36).substring(2, 15);
          localStorage.setItem('analytics_sid', sid);
      }
      
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: pathname, sessionId: sid }),
        keepalive: true
      }).catch(() => {
        // silently fail local dev tracking issues
      });
    }
  }, [pathname]);

  return null;
}
