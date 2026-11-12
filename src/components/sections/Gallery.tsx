'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { event } from '../../../content/event';
import Lightbox, { GalleryPhoto } from '@/components/ui/Lightbox';
import PhotoHolder from '@/components/ui/PhotoHolder';
import KanthaStitchSVG from '@/components/motifs/KanthaStitch';
import PaanLeafSVG from '@/components/motifs/PaanLeaf';

// Convert numbers to Bengali digits
function toBengaliDigits(num: number): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .padStart(2, '0')
    .split('')
    .map((d) => bnDigits[parseInt(d, 10)] ?? d)
    .join('');
}

function formatSlideNumber(num: number, isBn: boolean): string {
  if (isBn) return toBengaliDigits(num);
  return num.toString().padStart(2, '0');
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 280 : -280,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.32 },
      scale: { duration: 0.32 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 280 : -280,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.24 },
      scale: { duration: 0.24 },
    },
  }),
};

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const t = useTranslations('gallery');
  const locale = useLocale();
  const isBn = locale === 'bn';

  const photos: GalleryPhoto[] = event.gallery || [];
  const total = photos.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        if (newDirection > 0) {
          return (prev + 1) % total;
        }
        return (prev - 1 + total) % total;
      });
    },
    [total]
  );

  const jumpToSlide = useCallback(
    (targetIndex: number) => {
      if (targetIndex === currentIndex) return;
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setCurrentIndex(targetIndex);
    },
    [currentIndex]
  );

  // Auto-slide effect (advances every 4.2 seconds when playing and not hovered/lightbox-opened)
  useEffect(() => {
    if (!isPlaying || isHovered || selectedPhotoIndex !== null || total <= 1) {
      return;
    }

    const timer = setInterval(() => {
      paginate(1);
    }, 4200);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, selectedPhotoIndex, total, paginate]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      paginate(1); // Swipe left -> Next
    } else if (diff < -45) {
      paginate(-1); // Swipe right -> Prev
    }
    setTouchStart(null);
  };

  // Lightbox handlers
  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handleLightboxNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % total);
  };

  const handleLightboxPrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + total) % total);
  };

  const currentPhoto = photos[currentIndex];
  if (!currentPhoto) return null;

  const currentTitle = isBn ? currentPhoto.titleBn : currentPhoto.titleEn;

  return (
    <section
      id="gallery"
      className="bg-[#FFF8EC] py-16 sm:py-24 px-3 sm:px-6 relative overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle Bengali Floral Background Accents */}
      <div className="absolute top-10 -left-16 w-48 h-48 rounded-full bg-[#B3172F]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-16 w-56 h-56 rounded-full bg-[#F2B705]/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 px-2">
          {/* Paan Leaf Icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 text-[#2F5D3A] mx-auto mb-2 opacity-85">
            <PaanLeafSVG />
          </div>

          {/* Bengali & English Section Titles */}
          <h2
            className={
              isBn
                ? 'font-display-bn text-3xl sm:text-4xl md:text-5xl text-[#B3172F] font-bold leading-tight mb-1.5'
                : 'font-display text-3xl sm:text-4xl md:text-5xl text-[#B3172F] font-bold leading-tight mb-1.5'
            }
          >
            {t('title')}
          </h2>

          <p className="font-display text-xs sm:text-sm text-[#B5532E] tracking-widest uppercase font-medium mb-3">
            {t('subtitle')}
          </p>

          <p className="text-xs sm:text-sm text-[#3A0D14]/75 italic max-w-md mx-auto mb-3">
            {isBn
              ? 'আমাদের একান্তে কাটানো কিছু মধুর স্মৃতি ও রঙিন মুহূর্ত'
              : 'Cherished memories and precious moments on our journey of love'}
          </p>

          {/* Ornamental Divider */}
          <div className="max-w-xs mx-auto text-[#B5532E]/35">
            <KanthaStitchSVG />
          </div>
        </div>

        {/* Top Controls Bar: Slide Counter & Auto-Play Toggle */}
        <div className="w-full max-w-[460px] sm:max-w-[500px] flex items-center justify-between px-2 mb-3.5 text-xs text-[#6F0E20]">
          {/* Slide Indicator Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6E9D2] border border-[#B3172F]/20 font-serif font-semibold shadow-xs">
            <span className="text-[#B3172F] font-bold">
              {formatSlideNumber(currentIndex + 1, isBn)}
            </span>
            <span className="opacity-50">/</span>
            <span className="opacity-75">{formatSlideNumber(total, isBn)}</span>
            <span className="text-[10px] text-[#B5532E] uppercase tracking-wider ml-1">
              {isBn ? 'স্মৃতি' : 'Moment'}
            </span>
          </div>

          {/* Auto-Play Toggle Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? t('autoPlayPause') : t('autoPlayPlay')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8EC] hover:bg-[#F6E9D2] text-[#6F0E20] border border-[#B3172F]/20 transition-all cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-[#B3172F]"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'
              }`}
            />
            <span className="font-medium text-[11px] sm:text-xs">
              {isPlaying ? (isBn ? 'চলছে' : 'Auto-sliding') : (isBn ? 'স্থগিত' : 'Paused')}
            </span>
            <svg
              className="w-3 h-3 text-[#B3172F]"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              {isPlaying ? (
                <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
              ) : (
                <path d="M6 4l10 6-10 6V4z" />
              )}
            </svg>
          </button>
        </div>

        {/* Animated Sliding Stage */}
        <div
          className="relative w-full max-w-[460px] sm:max-w-[500px] min-h-[350px] sm:min-h-[410px] flex items-center justify-center overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={currentPhoto.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_e, info) => {
                const swipeThreshold = 45;
                if (info.offset.x < -swipeThreshold) {
                  paginate(1);
                } else if (info.offset.x > swipeThreshold) {
                  paginate(-1);
                }
              }}
              className="w-full bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EC] to-[#F6E9D2] rounded-3xl p-3.5 sm:p-4.5 border-2 border-[#B3172F]/20 shadow-xl relative cursor-grab active:cursor-grabbing transition-colors hover:border-[#B3172F]/40"
            >
              {/* Corner Traditional Flourishes */}
              <div className="absolute top-2.5 left-3 text-[#B3172F]/30 text-xs font-serif select-none pointer-events-none">
                ❧
              </div>
              <div className="absolute top-2.5 right-3 text-[#B3172F]/30 text-xs font-serif select-none pointer-events-none">
                ☙
              </div>

              {/* Photo Display with Expand Icon */}
              <div
                className="relative group cursor-pointer mb-2"
                onClick={() => handleOpenLightbox(currentIndex)}
                title={t('viewPhoto')}
              >
                <PhotoHolder
                  src={currentPhoto.src}
                  alt={currentTitle}
                  aspect="aspect-[4/3]"
                  shape="rounded"
                  labelBn={currentPhoto.titleBn}
                  labelEn={currentPhoto.titleEn}
                  hintBn="মধুর স্মৃতির ছবি (৪:৩)"
                  hintEn="Cherished Moment (4:3)"
                  priority={true}
                  className="shadow-md"
                  objectPosition={currentPhoto.objectPosition || (currentPhoto.aspect === 'portrait' ? 'object-top' : 'object-center')}
                />

                {/* Floating "View Full Size" Hover Pill */}
                <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full bg-[#1A0508]/80 hover:bg-[#1A0508] text-[#FFF8EC] backdrop-blur-md text-[11px] font-medium shadow-lg flex items-center gap-1.5 transition-all opacity-90 group-hover:opacity-100 group-hover:scale-105">
                  <svg
                    className="w-3.5 h-3.5 text-[#F2B705]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                  <span>{isBn ? 'বড় করে দেখুন' : 'Full Size'}</span>
                </div>
              </div>

              {/* Bottom Animated Slide Progress Bar */}
              {isPlaying && !isHovered && (
                <div className="w-full bg-[#B3172F]/15 h-1 rounded-full mt-2.5 overflow-hidden">
                  <motion.div
                    key={currentIndex}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4.2, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-[#B3172F] to-[#F2B705]"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label={t('prev')}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFF8EC] border-2 border-[#B3172F]/40 shadow-lg text-[#B3172F] hover:bg-[#B3172F] hover:text-[#FFF8EC] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B3172F]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label={t('next')}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFF8EC] border-2 border-[#B3172F]/40 shadow-lg text-[#B3172F] hover:bg-[#B3172F] hover:text-[#FFF8EC] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B3172F]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Indicator Dots Bar */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {photos.map((photo, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => jumpToSlide(idx)}
                aria-label={`${t('viewPhoto')} ${idx + 1}`}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#B3172F] cursor-pointer ${
                  isActive
                    ? 'w-7 sm:w-8 h-2.5 bg-[#B3172F] shadow-sm'
                    : 'w-2.5 h-2.5 bg-[#B3172F]/25 hover:bg-[#B3172F]/60'
                }`}
              />
            );
          })}
        </div>

        {/* Interactive Thumbnail Carousel Strip */}
        <div className="w-full max-w-[460px] sm:max-w-[500px] mt-4 px-1">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto py-1.5 px-2 scrollbar-none scroll-smooth">
            {photos.map((photo, idx) => {
              const isActive = idx === currentIndex;
              const photoTitle = isBn ? photo.titleBn : photo.titleEn;

              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => jumpToSlide(idx)}
                  aria-label={`${photoTitle} (${idx + 1})`}
                  className={`relative w-12 h-10 sm:w-14 sm:h-11 rounded-xl overflow-hidden shrink-0 transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center ${
                    isActive
                      ? 'ring-2 ring-[#B3172F] ring-offset-2 ring-offset-[#FFF8EC] scale-105 shadow-md opacity-100 bg-[#F6E9D2]'
                      : 'opacity-60 hover:opacity-100 hover:scale-102 border border-[#B3172F]/20 bg-[#FFF8EC]'
                  }`}
                >
                  {photo.src ? (
                    <Image
                      src={photo.src}
                      alt={photoTitle}
                      fill
                      sizes="56px"
                      className={`object-cover ${photo.objectPosition || (photo.aspect === 'portrait' ? 'object-top' : 'object-center')}`}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-[#B3172F] p-1">
                      <svg
                        className="w-3.5 h-3.5 opacity-80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                      <span className="text-[9px] font-bold font-serif leading-none mt-0.5">
                        {formatSlideNumber(idx + 1, isBn)}
                      </span>
                    </div>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#B3172F]/10 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-center text-[11px] text-[#6F0E20]/60 italic mt-2">
            {isBn
              ? 'আঙুল দিয়ে টেনে বা তীর চিহ্নে ক্লিক করে স্মৃতিগুলো দেখুন'
              : 'Swipe or click arrows to explore each cherished moment'}
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={selectedPhotoIndex}
          isOpen={selectedPhotoIndex !== null}
          locale={locale}
          onClose={handleCloseLightbox}
          onNext={handleLightboxNext}
          onPrev={handleLightboxPrev}
        />
      )}
    </section>
  );
}
