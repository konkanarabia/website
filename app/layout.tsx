import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import Header from './components/header'
import Footer from './components/footer'
import { Toaster } from "@/components/ui/toaster"
import { I18nProvider } from '@/lib/i18n-provider'
import ExchangeRatesInitializer from '@/components/exchange-rates-initializer'
import AnalyticsTracker from '@/components/AnalyticsTracker'
import TravelChat from '@/components/TravelChat'
import ScrollToTop from '@/components/ScrollToTop'
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/structured-data'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata = {
  title: {
    default: 'KonkanArabia Hospitality & Holiday Group | Luxury Tours & Travel',
    template: '%s | KonkanArabia'
  },
  description: 'KonkanArabia Hospitality & Holiday Group offers premium holiday packages, vehicle rentals, visa services, and event management across India and the UAE. Discover the best of Konkan and beyond.',
  keywords: ['KonkanArabia', 'Konkan Tourism', 'Holiday Packages India', 'Dubai Tourism', 'PedneCar Goa', 'Goa Tourist Taxi', 'Mapusa Taxi Service', 'MOPA Airport Taxi', 'Dabolim Airport Cab', 'Toyota Rumion Rental Goa', 'Vehicle Rental Mumbai', 'Visa Services UAE', 'Event Management Dubai', 'Luxury Travel India', 'Hospitality Group', 'Travel Agent Vashi', 'Tour Operator Navi Mumbai', 'Dubai Tours from Vashi', 'Holiday Packages Vashi', 'Travel Agency Navi Mumbai', 'Dubai Group Tours Navi Mumbai', 'Honeymoon Packages Navi Mumbai', 'Mumbai to Malabar Food Express Franchise', 'Tour Packages Sector 30A Vashi'],
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
    title: 'KonkanArabia Hospitality & Holiday Group | Luxury Tours, Goa Taxi & Travel',
    description: 'Premier hospitality and travel management group in India and Dubai. Luxury holiday packages, PedneCar Goa tourist taxi rentals, visa assistance, and franchise partnerships.',
    siteName: 'KonkanArabia',
    images: [
      {
        url: 'https://konkanarabiahospitalitygroup.com/logo/KonkanArabia-New-Logo.webp',
        width: 1200,
        height: 630,
        alt: 'KonkanArabia Hospitality & Holiday Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KonkanArabia Hospitality & Holiday Group',
    description: 'Premier hospitality, luxury holiday packages, and Goa tourist taxi rentals.',
    images: ['https://konkanarabiahospitalitygroup.com/logo/KonkanArabia-New-Logo.webp'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  return (
    <html lang="en" suppressHydrationWarning={true} data-scroll-behavior="smooth">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K09V6901MT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K09V6901MT');
          `}
        </Script>
        {/* JSON-LD Organization & WebSite Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteSchema()),
          }}
        />
      </head>
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