import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Consult General Physicians Online | Book Internal Medicine Specialists - Apollo 24|7',
  description: 'Book online consultations with top general physicians and internal medicine specialists. Get expert care for fever, allergies, diabetes, and more. Find doctors by location, experience, language, and fees. Trusted by Apollo 24|7.',
  keywords: [
    'general physician',
    'internal medicine',
    'doctor online',
    'book doctor',
    'Apollo 24|7',
    'fever',
    'allergies',
    'diabetes',
    'consult doctor',
    'find doctor near me',
    'general medicine',
    'doctor reviews',
    'doctor fees',
    'healthcare',
    'India'
  ],
  openGraph: {
    title: 'Consult General Physicians Online | Book Internal Medicine Specialists - Apollo 24|7',
    description: 'Book online consultations with top general physicians and internal medicine specialists. Get expert care for fever, allergies, diabetes, and more. Find doctors by location, experience, language, and fees. Trusted by Apollo 24|7.',
    url: 'https://yourdomain.com/specialties/general-physician-internal-medicine',
    siteName: 'Apollo 24|7',
    images: [
      {
        url: 'https://newassets.apollo247.com/images/ic_logo.png',
        width: 400,
        height: 100,
        alt: 'Apollo 24|7 Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consult General Physicians Online | Book Internal Medicine Specialists - Apollo 24|7',
    description: 'Book online consultations with top general physicians and internal medicine specialists. Get expert care for fever, allergies, diabetes, and more. Find doctors by location, experience, language, and fees. Trusted by Apollo 24|7.',
    images: ['https://newassets.apollo247.com/images/ic_logo.png'],
    site: '@apollo247',
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
            name: 'Apollo 24|7 General Physicians',
            url: 'https://yourdomain.com/specialties/general-physician-internal-medicine',
            description: 'Book online consultations with top general physicians and internal medicine specialists. Get expert care for fever, allergies, diabetes, and more.',
            logo: 'https://newassets.apollo247.com/images/ic_logo.png',
            sameAs: [
              'https://www.facebook.com/Apollo247',
              'https://twitter.com/apollo247',
              'https://www.linkedin.com/company/apollo-247/',
              'https://www.youtube.com/channel/UCw7F7lZQ2wQwQwQwQwQwQ',
            ],
          }),
        }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
