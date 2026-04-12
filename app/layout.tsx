import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'
import { Toaster } from "@/components/ui/toaster"
import { I18nProvider } from '@/lib/i18n-provider'
import ExchangeRatesInitializer from '@/components/exchange-rates-initializer'
import AnalyticsTracker from '@/components/AnalyticsTracker'
import TravelChat from '@/components/TravelChat'
import ScrollToTop from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata = {
  title: {
    default: 'KonkanArabia Hospitality & Holiday Group | Luxury Tours & Travel',
    template: '%s | KonkanArabia'
  },
  description: 'KonkanArabia Hospitality & Holiday Group offers premium holiday packages, vehicle rentals, visa services, and event management across India and the UAE. Discover the best of Konkan and beyond.',
  keywords: ['KonkanArabia', 'Konkan Tourism', 'Holiday Packages India', 'Dubai Tourism', 'Vehicle Rental Mumbai', 'Visa Services UAE', 'Event Management Dubai', 'Luxury Travel India', 'Hospitality Group'],
  authors: [{ name: 'KonkanArabia' }],
  creator: 'KonkanArabia',
  publisher: 'KonkanArabia',
  metadataBase: new URL('https://konkanarabiahospitalitygroup.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://konkanarabiahospitalitygroup.com',
    title: 'KonkanArabia Hospitality & Holiday Group',
    description: 'Premier hospitality and travel management group in India and Dubai.',
    siteName: 'KonkanArabia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KonkanArabia Hospitality & Holiday Group',
    description: 'Premier hospitality and travel management group in India and Dubai.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  return (
    <html lang="en" suppressHydrationWarning={true} data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans`}
        suppressHydrationWarning={true}
      >
        <I18nProvider>
          <ScrollToTop />
          <ExchangeRatesInitializer />
          <AnalyticsTracker />
          <Header />
          <main>{children}</main>
          <Footer />
          <TravelChat />
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  )
}