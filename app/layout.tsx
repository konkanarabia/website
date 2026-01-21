import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'
import { Toaster } from "@/components/ui/toaster"
import { I18nProvider } from '@/lib/i18n-provider'
import ExchangeRatesInitializer from '@/components/exchange-rates-initializer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata = {
  title: 'KonkanArabia Hospitality & Holiday Group',
  description: 'KonkanArabia Hospitality & Holiday Group',
  keywords: 'KonkanArabia, Hospitality, Holiday, Group, Travel, Tourism',
  authors: [{ name: 'KonkanArabia' }],
  creator: 'KonkanArabia',
  publisher: 'KonkanArabia',
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans`}
        suppressHydrationWarning={true}
      >
        <I18nProvider>
          <ExchangeRatesInitializer />
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  )
}