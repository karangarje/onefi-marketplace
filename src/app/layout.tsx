import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: '1Fi Marketplace | Shop Smart, Pay Smarter with MF-Backed EMIs',
  description:
    'Explore premium smartphones with flexible, zero-cost and cashback-enabled EMI plans backed by your mutual fund investments.',
  keywords: ['EMI', 'Mutual Fund', 'Smartphones', 'iPhone', 'Galaxy S24', '1Fi Marketplace', 'Fintech'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
