import './globals.css'
import { Geist } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { trTR } from '@clerk/localizations'
import { getAllCategoryGroups } from '@/lib/prisma'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MessageBox from '@/components/MessageBox';

const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
})

export const metadata = {
  title: 'Moda Çiçekçi',
  description: 'Moda Çiçekçi - Online Çiçek Siparişi',
}

export default async function RootLayout({ children }) {
  const categoryGroups = await getAllCategoryGroups();

  return (
    <ClerkProvider localization={trTR}>
      <html lang="tr">
        <body className={`${geistSans.variable} antialiased`}>
          <Header categoryGroups={categoryGroups} />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Footer />
          <MessageBox />
        </body>
      </html>
    </ClerkProvider>
  )
}
