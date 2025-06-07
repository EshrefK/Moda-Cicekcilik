import './globals.css'
import { Geist } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { trTR } from '@clerk/localizations'
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';

const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
})

export const metadata = {
  title: 'Moda Çiçekçi',
  description: 'Moda Çiçekçi - Online Çiçek Siparişi',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider localization={trTR}>
      <html lang="tr">
        <body className={`${geistSans.variable} antialiased`}>
          <HeaderWrapper />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Footer />

        </body>
      </html>
    </ClerkProvider>
  )
}
