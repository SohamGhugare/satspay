import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from 'react-hot-toast';
import { Navbar } from "./components/navbar";
import "./globals.css";
import { Footer } from './components/footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SatsPay - Buy Anything. Pay Later. Keep Your Bitcoin.",
  description: "Shop online using your Bitcoin as collateral—without selling it. Get instant approval, flexible repayment terms, and keep your sats stacking.",
  keywords: ["Bitcoin", "sBTC", "DeFi", "Lending", "Cryptocurrency", "Pay Later", "Bitcoin Collateral"],
  authors: [{ name: "SohamGhugare" }],
  openGraph: {
    title: "SatsPay - Buy Anything. Pay Later. Keep Your Bitcoin.",
    description: "Shop online using your Bitcoin as collateral—without selling it. Get instant approval, flexible repayment terms, and keep your sats stacking.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SatsPay - Buy Anything. Pay Later. Keep Your Bitcoin.",
    description: "Shop online using your Bitcoin as collateral—without selling it. Get instant approval, flexible repayment terms, and keep your sats stacking.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
