'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export interface GalleryPhoto {
  id: number;
  src?: string | null;
  titleEn: string;
  titleBn: string;
  captionEn: string;
  captionBn: string;
  aspect: string;
  objectPosition?: string;
}

interface LightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  locale: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  isOpen,
  locale,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const t = useTranslations('gallery');
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) onNext();
    else if (diff < -50) onPrev();
    setTouchStart(null);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];
  const title = locale === 'bn' ? currentPhoto.titleBn : currentPhoto.titleEn;
  const caption = locale === 'bn' ? currentPhoto.captionBn : currentPhoto.captionEn;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1A0508]/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Lightbox Container */}
      <div
        className="relative max-w-4xl w-full bg-[#FFF8EC] rounded-3xl p-6 sm:p-8 border border-[#B5532E]/30 shadow-2xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls: Index Indicator & Close Button */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-[#B5532E]/20 mb-6">
          <span className="font-display text-sm font-semibold text-[#6F0E20]">
            {currentIndex + 1} / {photos.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('close')}
            className="w-11 h-11 rounded-full bg-[#3A0D14]/10 hover:bg-[#3A0D14]/20 text-[#3A0D14] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Photo Display Card with Bengali Folk Border */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#F6E9D2] rounded-2xl flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#B5532E]/40 overflow-hidden shadow-inner select-none cursor-grab"
        >
          {currentPhoto?.src ? (
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src={currentPhoto.src}
                alt={title}
                fill
                sizes="(max-width: 800px) 100vw, 800px"
                className="object-contain"
              />
            </div>
          ) : (
            <>
              {/* Decorative Corner Folk Accents */}
              <div className="absolute top-3 left-3 text-[#B3172F]/40 font-mono text-xs">✦ শুভ ✦</div>
              <div className="absolute top-3 right-3 text-[#B3172F]/40 font-mono text-xs">✦ বিবাহ ✦</div>
              <div className="absolute bottom-3 left-3 text-[#B3172F]/40 font-mono text-xs">✦ Jhilik ✦</div>
              <div className="absolute bottom-3 right-3 text-[#B3172F]/40 font-mono text-xs">✦ Koushik ✦</div>

              {/* Stylized Photo Graphic Placeholder */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 text-[#B3172F] mb-4">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                  <rect x="10" y="15" width="80" height="70" rx="8" strokeWidth="2.5" />
                  <circle cx="35" cy="40" r="10" />
                  <path d="M15 75 L45 45 L70 70 L85 55" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <h4
                className={
                  locale === 'bn'
                    ? 'font-display-bn text-2xl sm:text-3xl font-bold text-[#6F0E20] text-center'
                    : 'font-display text-2xl sm:text-3xl font-bold text-[#6F0E20] text-center'
                }
              >
                {title}
              </h4>
              <p className="text-sm sm:text-base text-[#3A0D14]/75 mt-2 text-center max-w-md">
                {caption}
              </p>
            </>
          )}
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="w-full flex items-center justify-between pt-6 mt-2">
          <button
            type="button"
            onClick={onPrev}
            aria-label={t('prev')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFF8EC] hover:bg-[#F6E9D2] border border-[#B5532E]/30 text-[#6F0E20] text-sm font-semibold transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>{t('prev')}</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label={t('next')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B3172F] hover:bg-[#6F0E20] text-[#FFF8EC] text-sm font-semibold transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
          >
            <span>{t('next')}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

