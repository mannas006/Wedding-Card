'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import PhotoHolder from '@/components/ui/PhotoHolder';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Venue() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('venue');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const venueName = locale === 'bn' ? event.venue.nameBn : event.venue.name;
  const city = locale === 'bn' ? event.venue.cityBn : event.venue.city;
  const address = locale === 'bn' ? event.venue.addressBn : event.venue.address;

  return (
    <section
      id="venue"
      ref={sectionRef}
      className="relative min-h-0 py-10 sm:py-16 px-4 flex flex-col items-center text-[#FFF8EC] overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #1A0508 0%, #2A0910 40%, #150306 100%)',
      }}
    >
      {/* Golden Fairy Lights & Hanging Lanterns at Top (Screen 7 Atmosphere) */}
      <div className="absolute top-0 inset-x-0 pointer-events-none z-10 flex justify-center">
        <svg
          className="w-full max-w-[500px] h-24 overflow-visible"
          viewBox="0 0 500 90"
          fill="none"
          aria-hidden="true"
        >
          {/* Tree Canopy Silhouette */}
          <path
            d="M 0 0 C 100 35, 200 15, 300 35 C 400 15, 450 35, 500 0 L 500 0 L 0 0 Z"
            fill="#0D0204"
            opacity="0.8"
          />

          {/* Fairy Light Swags */}
          <path
            d="M 20 5 Q 120 40, 240 20 Q 360 40, 480 10"
            stroke="#F2B705"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.6"
          />

          {/* Hanging Brass Lanterns with Warm Candlelight Glow */}
          {[90, 220, 380].map((lx, i) => (
            <g key={lx} transform={`translate(${lx}, ${15 + (i % 2) * 8})`}>
              {/* String */}
              <line x1="0" y1="0" x2="0" y2="35" stroke="#F2B705" strokeWidth="1" opacity="0.7" />
              {/* Lantern Frame */}
              <rect x="-7" y="35" width="14" height="20" rx="3" fill="#D99B00" stroke="#F2B705" strokeWidth="1" />
              {/* Glowing Glass */}
              <rect x="-5" y="38" width="10" height="14" rx="2" fill="#FFE082" />
              {/* Inner Flame Glow */}
              <circle cx="0" cy="45" r="4" fill="#FFF8EC" />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-20 w-full max-w-[430px] mx-auto flex flex-col items-center mt-8">
        {/* Glowing Map Pin Icon */}
        <div className="w-12 h-12 rounded-full bg-[#F2B705]/20 border border-[#F2B705]/40 flex items-center justify-center text-[#F2B705] mb-2 shadow-lg shadow-[#F2B705]/10">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>

        {/* Title: অনুষ্ঠান স্থল / Wedding Venue */}
        <h2 className="font-display-bn text-3xl sm:text-4xl text-[#F2B705] font-bold drop-shadow-md text-center">
          {locale === 'bn' ? 'অনুষ্ঠান স্থল' : 'Wedding Venue'}
        </h2>

        {/* Venue & City with Flourishes */}
        <div className="flex items-center justify-center gap-2 mt-2 text-[#FFF8EC]">
          <span className="text-[#F2B705] select-none text-base">❧</span>
          <p className="font-display-bn text-2xl sm:text-3xl font-semibold tracking-wide text-center">
            {venueName}
          </p>
          <span className="text-[#F2B705] select-none text-base">❧</span>
        </div>
        <p className="font-display italic text-lg sm:text-xl text-[#FFF8EC]/90 text-center mb-1">
          {city}
        </p>

        {/* Date & Time */}
        <div className="flex items-center gap-4 text-xs sm:text-sm text-[#FFF8EC]/80 mt-1 mb-6">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#F2B705] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{locale === 'bn' ? 'বুধবার, ২৫ নভেম্বর ২০২৬' : 'Wed, 25 Nov 2026'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#F2B705] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{locale === 'bn' ? event.ceremonyTimeBn : event.ceremonyTime}</span>
          </div>
        </div>

        {/* Action Button: View on Map */}
        <div className="mb-6">
          <a
            href={event.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#FFF8EC]/15 hover:bg-[#FFF8EC]/25 text-[#FFF8EC] border border-[#F2B705]/50 backdrop-blur-md font-medium text-sm sm:text-base shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#F2B705] min-h-[44px]"
          >
            <svg className="w-4 h-4 text-[#F2B705]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{locale === 'bn' ? 'মানচিত্রে দেখুন' : 'View on Map'}</span>
          </a>
        </div>

        {/* Night Photo / Photo Holder: Heritage Bengali Rajbari */}
        <div ref={cardRef} className="w-full max-w-[390px] mb-6">
          <PhotoHolder
            src={event.photos.venue}
            alt="Heritage Bengali Rajbari courtyard lit with warm lanterns and central Alpona at twilight"
            aspect="aspect-[4/3]"
            shape="rounded"
            labelBn="অনুষ্ঠান স্থলের ছবি"
            labelEn="Wedding Venue Photo"
            hintBn="ভেন্যুর ছবি যুক্ত করুন (৪:৩)"
            hintEn="Add Venue Photo (4:3)"
            className="border-[#F2B705]/40"
          />
        </div>

        {/* Additional Travel Assistance (Collapsible / Compact) */}
        <div className="w-full max-w-[390px] bg-[#1A0508]/80 border border-[#FFF8EC]/10 rounded-2xl p-4 text-xs sm:text-sm text-[#FFF8EC]/85 space-y-2">
          <div className="flex items-start gap-2.5">
            <svg className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-8-7.5-8-12a8 8 0 1116 0c0 4.5-8 12-8 12z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            <span>{address}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <svg className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="4" y="3" width="16" height="16" rx="2" />
              <path d="M4 11h16" />
              <path d="M12 3v8" />
              <circle cx="8" cy="15" r="1" fill="currentColor" />
              <circle cx="16" cy="15" r="1" fill="currentColor" />
              <path d="M6 19l-2 2" />
              <path d="M18 19l2 2" />
            </svg>
            <span>
              {t('station')}: {locale === 'bn' ? event.venue.nearestStationBn : event.venue.nearestStation}
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <svg className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {t('airport')}: {locale === 'bn' ? event.venue.nearestAirportBn : event.venue.nearestAirport}
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <svg className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <path d="M9 16V8h4a2.5 2.5 0 010 5H9" />
            </svg>
            <span>
              {t('parking')}: {locale === 'bn' ? event.venue.parkingBn : event.venue.parking}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
