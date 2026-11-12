import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#6F0E20',
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wedding-card-seven-steel.vercel.app'),
  openGraph: {
    title: 'Jhilik Dey & Koushik Dutta | শুভ বিবাহ — ২৫ নভেম্বর ২০২৬',
    description:
      'দিলীপ দে ও মায়া দে-র কন্যা ঝিলিক এবং কৌশিকের শুভ বিবাহে সাদর আমন্ত্রণ — ২৫ নভেম্বর ২০২৬, অশ্বিনী রাজ কমিউনিটি হল, বেলিয়াতোড়, বাঁকুড়া।',
    images: ['/og-image.png'],
    siteName: 'Jhilik Dey & Koushik Dutta | শুভ বিবাহ',
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Galada&family=Hind+Siliguri:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-body min-h-[100dvh]"
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
