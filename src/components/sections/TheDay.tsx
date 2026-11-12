'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import CalendarLinks from '@/components/ui/CalendarLinks';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TheDay() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations('theDay');
  const tCeremonies = useTranslations('ceremonies');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      itemsRef.current.filter(Boolean).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.1, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const schedule = event.theDay.schedule;

  return (
    <section
      id="the-day"
      ref={sectionRef}
      className="relative min-h-0 py-10 sm:py-20 px-3 sm:px-6 md:px-8 bg-[#FFF8EC] text-[#3A0D14] overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 50% 15%, rgba(246, 233, 210, 0.75) 0%, rgba(255, 248, 236, 1) 100%)',
      }}
    >
      {/* 1. Cascading Wisteria / Hanging Floral Vine Canopy at Top (Matches Image 1) */}
      <div className="absolute top-0 inset-x-0 pointer-events-none z-10 flex justify-center overflow-hidden">
        <svg
          className="w-full max-w-[900px] h-28 sm:h-36 text-[#8C6D9E] opacity-90 overflow-visible"
          viewBox="0 0 900 140"
          fill="none"
          aria-hidden="true"
        >
          {/* Top subtle foliage arches */}
          <path
            d="M 0 0 C 150 40, 300 20, 450 35 C 600 20, 750 40, 900 0 L 900 0 L 0 0 Z"
            fill="#3A5642"
            opacity="0.12"
          />

          {/* Hanging Wisteria Clusters (Left Side) */}
          <g transform="translate(60, -10)">
            <path d="M 0 0 Q 5 50, -5 95" stroke="#487A54" strokeWidth="1.5" />
            {[
              { cy: 25, r: 9, c: '#B899C7', cx: 0 },
              { cy: 42, r: 8, c: '#A27EAE', cx: 6 },
              { cy: 58, r: 7.5, c: '#8C6D9E', cx: 1 },
              { cy: 72, r: 6, c: '#B899C7', cx: -6 },
              { cy: 84, r: 4.5, c: '#CBB2D6', cx: -2 },
              { cy: 94, r: 3, c: '#E2D3E9', cx: 5 },
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.c} opacity="0.85" />
            ))}
          </g>

          <g transform="translate(130, -5)">
            <path d="M 0 0 Q -5 45, 0 85" stroke="#487A54" strokeWidth="1.2" />
            {[
              { cy: 20, r: 7.5, c: '#C5A3CF', cx: 5 },
              { cy: 35, r: 7, c: '#9A75A7', cx: -1 },
              { cy: 50, r: 6, c: '#8C6D9E', cx: -4 },
              { cy: 65, r: 5, c: '#B899C7', cx: 3 },
              { cy: 78, r: 3.5, c: '#D9C3E3', cx: 4 },
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.c} opacity="0.8" />
            ))}
          </g>

          <g transform="translate(210, -15)">
            <path d="M 0 0 Q 10 60, 5 110" stroke="#487A54" strokeWidth="1.5" />
            {[
              { cy: 30, r: 8.5, c: '#B899C7', cx: 5 },
              { cy: 48, r: 8, c: '#8C6D9E', cx: 11 },
              { cy: 66, r: 7, c: '#795889', cx: 9 },
              { cy: 82, r: 6, c: '#9A75A7', cx: 2 },
              { cy: 96, r: 4.5, c: '#C5A3CF', cx: -1 },
              { cy: 108, r: 3, c: '#E2D3E9', cx: 3 },
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.c} opacity="0.85" />
            ))}
          </g>

          {/* Hanging Wisteria Clusters (Right Side) */}
          <g transform="translate(690, -15)">
            <path d="M 0 0 Q -8 55, -4 108" stroke="#487A54" strokeWidth="1.5" />
            {[
              { cy: 28, r: 8.5, c: '#B899C7', cx: -4 },
              { cy: 46, r: 8, c: '#8C6D9E', cx: 2 },
              { cy: 64, r: 7, c: '#795889', cx: 0 },
              { cy: 80, r: 6, c: '#9A75A7', cx: -7 },
              { cy: 94, r: 4.5, c: '#C5A3CF', cx: -10 },
              { cy: 106, r: 3, c: '#E2D3E9', cx: -6 },
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.c} opacity="0.85" />
            ))}
          </g>

          <g transform="translate(770, -5)">
            <path d="M 0 0 Q 5 45, 0 85" stroke="#487A54" strokeWidth="1.2" />
            {[
              { cy: 20, r: 7.5, c: '#C5A3CF', cx: 0 },
              { cy: 35, r: 7, c: '#9A75A7', cx: 5 },
              { cy: 50, r: 6, c: '#8C6D9E', cx: -2 },
              { cy: 65, r: 5, c: '#B899C7', cx: -5 },
              { cy: 78, r: 3.5, c: '#D9C3E3', cx: 4 },
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.c} opacity="0.8" />
            ))}
          </g>

          <g transform="translate(840, -10)">
            <path d="M 0 0 Q -5 50, 5 95" stroke="#487A54" strokeWidth="1.5" />
            {[
              { cy: 25, r: 9, c: '#B899C7', cx: 5 },
              { cy: 42, r: 8, c: '#A27EAE', cx: 0 },
              { cy: 58, r: 7.5, c: '#8C6D9E', cx: -5 },
              { cy: 72, r: 6, c: '#B899C7', cx: -1 },
              { cy: 84, r: 4.5, c: '#CBB2D6', cx: 5 },
              { cy: 94, r: 3, c: '#E2D3E9', cx: 3 },
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.c} opacity="0.85" />
            ))}
          </g>
        </svg>
      </div>

      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
        {/* 2. Section Header (Matching Image 1) */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-14 pt-2 sm:pt-4">
          {locale === 'bn' ? (
            <h2 className="font-display-bn text-3xl sm:text-4xl text-[#B3172F] font-bold leading-tight my-1 drop-shadow-sm">
              {event.theDay.headerSmallBn}
            </h2>
          ) : (
            <>
              <p className="font-serif text-xs sm:text-sm tracking-[0.25em] text-[#B5532E] uppercase font-semibold mb-1">
                {event.theDay.headerSmallEn}
              </p>
              <h2 className="font-display italic text-5xl sm:text-6xl md:text-7xl text-[#3A0D14] font-normal leading-tight my-1 drop-shadow-sm">
                {event.theDay.titleEn}
              </h2>
            </>
          )}

          <p className="font-serif italic text-sm sm:text-base text-[#6F0E20]/90 mt-1">
            {locale === 'bn' ? event.theDay.subtitleBn : event.theDay.subtitleEn}
          </p>

          {/* Delicate Divider Flourish */}
          <div className="flex items-center justify-center gap-3 my-3 text-[#B5532E]/80">
            <span className="w-10 h-[1px] bg-[#B5532E]/30" />
            <span className="text-xs select-none">❧</span>
            <span className="text-sm select-none">✦</span>
            <span className="text-xs select-none">❧</span>
            <span className="w-10 h-[1px] bg-[#B5532E]/30" />
          </div>
        </div>

        {/* 3. Chronological Vertical Timeline with Central Dotted Guide Line */}
        <div className="relative w-full">
          {/* Continuous Dotted Vertical Rail Line */}
          <div className="absolute left-[24px] sm:left-1/2 -translate-x-1/2 top-4 bottom-8 w-px border-l-2 border-dotted border-[#B5532E]/40 pointer-events-none" />

          {/* The 8 Timeline Events */}
          <div className="flex flex-col gap-12 sm:gap-16">
            {schedule.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const tag = locale === 'bn' ? item.tagBn : item.tagEn;
              const time = locale === 'bn' ? item.timeBn : item.timeEn;
              const title = locale === 'bn' ? item.titleBn : item.titleEn;
              const subtitle = locale === 'bn' ? item.subtitleBn : item.subtitleEn;
              const desc = locale === 'bn' ? item.descBn : item.descEn;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemsRef.current[idx] = el;
                  }}
                  className="relative flex flex-col sm:flex-row items-center w-full"
                >
                  {/* Central Golden Node Ring */}
                  <div className="absolute left-[24px] sm:left-1/2 -translate-x-1/2 z-20 w-6 h-6 rounded-full bg-[#FFF8EC] border-2 border-[#B3172F] shadow-sm flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F2B705] ring-2 ring-[#B5532E]/30" />
                  </div>

                  {/* Left Column / Card on even; Cloud on odd (on desktop) */}
                  <div
                    className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                      isEven ? 'sm:pr-10 sm:text-right' : 'sm:order-2 sm:pl-10 sm:text-left'
                    }`}
                  >
                    <div className="flex flex-col">
                      {/* Day / Session Tag */}
                      <p className="font-serif text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#B5532E] font-bold">
                        {tag}
                      </p>

                      {/* Lavender/Rose Time Pill */}
                      <div className={`my-1.5 ${isEven ? 'sm:self-end' : 'sm:self-start'}`}>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5ECF7] border border-[#D8BFD8] text-[#6F0E20] font-bold text-xs sm:text-sm tracking-wider shadow-sm">
                          <svg className="w-3.5 h-3.5 text-[#8C6D9E] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {time}
                        </span>
                      </div>

                      {/* Main Ceremony Title */}
                      <h3 className="font-display font-serif text-2xl sm:text-3xl text-[#3A0D14] font-bold leading-tight mt-0.5">
                        {title}
                      </h3>

                      {/* Subtitle in Uppercase Spaced Font */}
                      <p className="text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[#B5532E] font-bold mt-1">
                        {subtitle}
                      </p>

                      {/* Description Narrative */}
                      <p className="font-serif italic text-sm sm:text-base text-[#3A0D14]/85 leading-relaxed mt-2 max-w-md">
                        {desc}
                      </p>

                      {/* Calendar Action */}
                      <div
                        className={`mt-3 flex items-center gap-2 ${
                          isEven ? 'sm:justify-end' : 'sm:justify-start'
                        }`}
                      >
                        <CalendarLinks
                          title={`${title} - ${subtitle}`}
                          start={item.date}
                          end={item.endDate}
                          location={`${event.venue.name}, ${event.venue.address}`}
                          description={desc}
                          compact={true}
                          align={isEven ? 'right' : 'left'}
                        />

                        <a
                          href={event.venue.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[#B3172F] bg-[#FFF8EC] hover:bg-[#F6E9D2] border border-[#B3172F]/25 transition-colors min-h-[44px]"
                          aria-label={`${tCeremonies('openMap')}: ${title}`}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>{tCeremonies('openMap')}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Opposite Column: Dreamy Pastel Sunset Cloud (Matches Images 1, 2, 3) */}
                  <div
                    className={`hidden sm:flex w-full sm:w-1/2 items-center justify-center ${
                      isEven ? 'sm:order-2 sm:pl-10' : 'sm:order-1 sm:pr-10'
                    }`}
                  >
                    <motion.div
                      className="relative w-full max-w-[240px] aspect-[16/9] opacity-90"
                      animate={{ y: isEven ? [0, -6, 0] : [0, 6, 0] }}
                      transition={{
                        duration: 3.5 + (idx % 3),
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Image
                        src="/images/pastel-cloud.webp"
                        alt="Ethereal pastel sunset watercolor cloud"
                        fill
                        sizes="240px"
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Bottom Signoff (Matches Image 3 Bottom) */}
        <div className="mt-20 pt-10 text-center flex flex-col items-center">
          <p className="font-serif text-xs sm:text-sm tracking-[0.25em] text-[#B5532E] uppercase font-semibold mb-2">
            {locale === 'bn' ? event.theDay.taglineBn : event.theDay.taglineEn}
          </p>

          <p className="font-display italic text-4xl sm:text-5xl md:text-6xl text-[#3A0D14] font-bold drop-shadow-sm">
            {locale === 'bn' ? event.theDay.coupleBn : event.theDay.coupleEn}
          </p>

          <div className="flex items-center justify-center gap-2 mt-4 text-[#B5532E]/60">
            <span className="w-12 h-[1px] bg-[#B5532E]/30" />
            <span className="text-xs select-none">❧</span>
            <span className="text-sm select-none">♡</span>
            <span className="text-xs select-none">❧</span>
            <span className="w-12 h-[1px] bg-[#B5532E]/30" />
          </div>
        </div>
      </div>
    </section>
  );
}

