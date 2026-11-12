'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import Countdown from '@/components/ui/Countdown';
import CalendarLinks from '@/components/ui/CalendarLinks';
import PetalParticles from '@/components/ui/PetalParticles';
import PhotoHolder from '@/components/ui/PhotoHolder';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useLenisContext } from '@/hooks/useLenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('hero');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenisContext();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          },
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 85%',
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollToNext = () => {
    if (lenis) {
      lenis.scrollTo('#couple', { duration: 1.2 });
    } else {
      document.getElementById('couple')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="hero"
      ref={sectionRef}
      className="relative min-h-0 sm:min-h-[100dvh] flex flex-col items-center justify-start px-3 pt-16 pb-8 sm:px-4 sm:pt-14 sm:pb-12 bg-[#FFF8EC]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 20%, rgba(246,233,210,0.85) 0%, rgba(255,248,236,1) 100%)',
      }}
    >
      {/* Drifting Petals Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <PetalParticles />
      </div>

      {/* Top Hanging Mango Leaf Garland with Golden Bells (Matches Screen 2 Top) */}
      <div className="absolute top-0 inset-x-0 pointer-events-none z-20 flex justify-center">
        <svg
          className="w-full max-w-[500px] h-14 sm:h-[72px] text-[#2F5D3A] overflow-visible drop-shadow-sm"
          viewBox="0 0 500 70"
          fill="none"
          aria-hidden="true"
        >
          {/* Main Rope Garland */}
          <path
            d="M 0 5 Q 125 22, 250 22 Q 375 22, 500 5"
            stroke="#B5532E"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />

          {/* Hanging Mango Leaves (Aam Pata) */}
          {[
            { x: 20, y: 12 },
            { x: 60, y: 14 },
            { x: 100, y: 16 },
            { x: 140, y: 17 },
            { x: 180, y: 16 },
            { x: 220, y: 15 },
            { x: 260, y: 13 },
            { x: 300, y: 11 },
            { x: 340, y: 11 },
            { x: 380, y: 13 },
            { x: 420, y: 15 },
            { x: 460, y: 17 },
          ].map((leaf) => (
            <g key={leaf.x} transform={`translate(${leaf.x}, ${leaf.y})`}>
              <path
                d="M 0 0 C 8 16, 14 30, 0 48 C -14 30, -8 16, 0 0 Z"
                fill="#2F5D3A"
                opacity="0.9"
              />
              <path d="M 0 0 L 0 42" stroke="#487A54" strokeWidth="1" />
            </g>
          ))}

          {/* Hanging Golden Brass Bells (Ghonta) */}
          {[80, 250, 420].map((bx) => (
            <g key={bx} transform={`translate(${bx}, 18)`}>
              <line x1="0" y1="0" x2="0" y2="24" stroke="#F2B705" strokeWidth="1.5" />
              <path
                d="M -5 24 C -6 29, -8 32, -8 34 L 8 34 C 8 32, 6 29, 5 24 Z"
                fill="#F2B705"
                stroke="#B5532E"
                strokeWidth="1"
              />
              <circle cx="0" cy="36" r="2" fill="#B5532E" />
            </g>
          ))}
        </svg>
      </div>

      {/* Main Content (Centered max-w-[420px] matching Screen 2) */}
      <div className="relative z-20 w-full max-w-[410px] mx-auto flex flex-col items-center text-center mt-2 sm:mt-3">
        {/* Header Texts (Screen 2 Typography) */}
        <div ref={textRef} className="px-2">
          {/* Main Invitation Title (3 stacked lines matching image) */}
          <h1 className="font-display-bn text-3xl sm:text-4xl text-[#B3172F] font-bold leading-tight drop-shadow-sm">
            {locale === 'bn' ? (
              <>
                আমাদের বিবাহে
                <br />
                আপনাকে
                <br />
                সাদর আমন্ত্রণ
              </>
            ) : (
              <>
                We Cordially Invite You
                <br />
                to Our Wedding
              </>
            )}
          </h1>

          {/* Subtitle in English with names in cursive */}
          <div className="flex items-center justify-center gap-1.5 mt-2 text-[#3A0D14]/85 text-xs sm:text-sm font-serif">
            <span className="text-[#B5532E] select-none text-xs">❧</span>
            <div className="flex flex-col items-center">
              <p className="italic text-[#6F0E20]">
                {locale === 'bn' ? 'We are delighted to invite you to the wedding of' : 'আমাদের শুভ বিবাহে সাদর আমন্ত্রণ'}
              </p>
              <p className="font-display italic text-sm sm:text-base font-bold text-[#B3172F] mt-0.5">
                {event.bride.name} &amp; {event.groom.name}
              </p>
            </div>
            <span className="text-[#B5532E] select-none text-xs">❧</span>
          </div>
        </div>

        {/* Central Couple Artwork with Down Button Anchor */}
        <div className="relative w-full max-w-[320px] sm:max-w-[360px] mt-2.5">
          <div ref={imageRef} className="w-full">
            <PhotoHolder
              src={event.photos.hero}
              alt={`${event.bride.name} & ${event.groom.name}`}
              aspect="aspect-[4/5]"
              shape="rounded"
              labelBn="ঝিলিক ও কৌশিকের ছবি"
              labelEn="Jhilik & Koushik's Photo"
              hintBn="দম্পতির ছবির স্থান (৪:৫)"
              hintEn="Couple Photo Holder (4:5)"
              className="max-h-[38vh] sm:max-h-[44vh]"
              priority={true}
            />
          </div>

          {/* White Circular Scroll Down Button (Matches Screen 2 Chevron) */}
          <motion.button
            type="button"
            onClick={scrollToNext}
            aria-label={t('scrollDown')}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#FFF8EC] border border-[#B3172F]/30 shadow-md flex items-center justify-center text-[#B3172F] hover:bg-[#F6E9D2] active:scale-95 transition-all z-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B3172F]"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              className="w-4 h-4 text-[#B3172F]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </div>

        {/* Live Countdown Timer & SAVE THE DATE Calendar Button */}
        <div className="w-full max-w-sm mt-5 sm:mt-6 px-1 flex flex-col items-center">
          <Countdown />

          {/* Square Wedding Date Card (In between Countdown & SAVE THE DATE) */}
          <div className="w-full max-w-[340px] sm:max-w-[360px] mt-4 mb-3 flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F6E9D2]/75 border border-[#B3172F]/15 shadow-sm text-left">
            {/* Calendar Icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#B3172F]/10 border border-[#B3172F]/30 flex items-center justify-center text-[#B3172F]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <circle cx="8" cy="15" r="1" fill="currentColor" />
                <circle cx="12" cy="15" r="1" fill="currentColor" />
                <circle cx="16" cy="15" r="1" fill="currentColor" />
              </svg>
            </div>
            {/* Text */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display-bn text-lg sm:text-xl text-[#B3172F] font-bold leading-tight">
                {locale === 'bn' ? 'বিবাহের দিন' : 'Wedding Date'}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-[#3A0D14] mt-0.5 leading-tight">
                {locale === 'bn' ? 'বুধবার, ২৫ নভেম্বর ২০২৬' : 'Wednesday, 25 November 2026'}
              </p>
              <p className="text-[11px] sm:text-xs text-[#3A0D14]/70 italic font-serif leading-tight mt-0.5">
                {locale === 'bn' ? 'Wednesday, 25 November 2026' : 'বুধবার, ২৫ নভেম্বর ২০২৬'}
              </p>
            </div>
          </div>

          {/* SAVE THE DATE Action Button linked with Calendar */}
          <div className="mt-1 flex justify-center">
            <CalendarLinks
              title={
                locale === 'bn'
                  ? `${event.bride.nameBn} ও ${event.groom.nameBn}-র শুভ বিবাহ`
                  : `${event.bride.name} & ${event.groom.name}'s Wedding`
              }
              start={event.weddingDate}
              end="2026-11-25T23:59:00+05:30"
              location={`${event.venue.name}, ${event.venue.address}`}
              description={
                locale === 'bn'
                  ? `${event.welcome.subtitleBn} অনুষ্ঠান স্থল: ${event.venue.name}, ${event.venue.address}`
                  : `${event.welcome.subtitleEn} at ${event.venue.name}, ${event.venue.address}`
              }
              variant="hero"
              label="SAVE THE DATE"
              align="center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
