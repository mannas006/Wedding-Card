import fs from 'fs';
import path from 'path';
import { setRequestLocale } from 'next-intl/server';
import { event } from '../../../content/event';
import Gate from '@/components/sections/Gate';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import TheCouple from '@/components/sections/TheCouple';
import WeddingDetails from '@/components/sections/WeddingDetails';
import Nimontron from '@/components/sections/Nimontron';
import TheDay from '@/components/sections/TheDay';
import Venue from '@/components/sections/Venue';
import Gallery from '@/components/sections/Gallery';
import Footer from '@/components/sections/Footer';

export function generateStaticParams() {
  return [{ locale: 'bn' }, { locale: 'en' }];
}

export default async function WeddingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Automatically filter gallery photos to only those that actually exist on disk in public/
  const existingGalleryPhotos = (event.gallery || []).filter((photo) => {
    if (!photo.src) return false;
    try {
      const filePath = path.join(process.cwd(), 'public', photo.src);
      return fs.existsSync(filePath);
    } catch {
      return true;
    }
  });

  return (
    <>
      {/* 0. Gate: Ceremonial Cover, Diya & Shankha Still Life, Split-Door with Auspicious Chime */}
      <Gate />

      {/* Persistent Floating Header Bar: [Pause | Sound | বাংলা/EN | Hamburger] */}
      <Navbar />

      {/* Single-Page Scroll Sections Matching Reference Panels */}
      <main className="relative bg-[#FFF8EC]">
        {/* 1. Hero: Invitation with Mango Leaf Garland, Couple Illustration, Drifting Petals, Countdown */}
        <Hero />

        {/* 2. The Couple: Arched Portraits of Jhilik & Koushik, Heart, Jora Mach Motif */}
        <TheCouple />

        {/* 3. Wedding Details: Date, Ceremony Time, Venue with Folk Thatched Village Illustration */}
        <WeddingDetails />

        {/* 4. Family Invitation: Bishnupur Terracotta Horse Relief, Invitation Note, Mangal Kalash */}
        <Nimontron />

        {/* 5. The Day: Detailed Wedding Day Rituals & Chronological Itinerary ("Let the Day Unfold") */}
        <TheDay />

        {/* 7. Venue & Location: Twilight Rajbari Courtyard with Lanterns & Alpona, Map & Travel */}
        <Venue />

        {/* 8. Gallery: Cherished Moments Grid with Full-Screen Lightbox */}
        <Gallery photos={existingGalleryPhotos} />

        {/* 9. Closing Blessings & Bidaay Footer: Bride's Hands with Paan, Jora Mach, Share Link */}
        <Footer />
      </main>
    </>
  );
}
