import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { trTR } from '@clerk/localizations'
import { getAllCategoryGroups } from '@/lib/prisma'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Samsun Moda Cicekcilik",
  description: "samsun moda cicekcilik",
};

export default async function RootLayout({ children }) {
  const categoryGroups = await getAllCategoryGroups();

  return (
    <ClerkProvider localization={trTR}>
      <html lang="tr">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header categoryGroups={categoryGroups} />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
