import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'General Physician | Apollo247 Clone',
  description: 'Find the best General Physicians. Book appointments online. Filters for location, experience, language, and more.',
  keywords: 'General Physician, Internal Medicine, Doctors, Book Appointment, Apollo247',
  openGraph: {
    title: 'General Physician | Apollo247 Clone',
    description: 'Find the best General Physicians. Book appointments online. Filters for location, experience, language, and more.',
    url: 'https://yourdomain.com/specialties/general-physician-internal-medicine',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalBusiness',
            name: 'General Physician | Apollo247 Clone',
            url: 'https://yourdomain.com/specialties/general-physician-internal-medicine',
            description: 'Find the best General Physicians. Book appointments online.',
          }),
        }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
