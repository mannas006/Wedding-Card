'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export interface PhotoHolderProps {
  src?: string | null;
  alt?: string;
  aspect?: string; // e.g. "aspect-[4/5]", "aspect-[3/4]", "aspect-[4/3]"
  shape?: 'arch' | 'rounded' | 'rectangle';
  labelBn?: string;
  labelEn?: string;
  hintBn?: string;
  hintEn?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
}

export default function PhotoHolder({
  src,
  alt = 'Wedding Photo Placeholder',
  aspect = 'aspect-[4/3]',
  shape = 'rounded',
  labelBn,
  labelEn,
  hintBn,
  hintEn,
  className = '',
  sizes = '(max-width: 430px) 90vw, 400px',
  priority = false,
  objectPosition = 'object-center',
}: PhotoHolderProps) {
  const locale = useLocale();
  const [hasError, setHasError] = useState(false);

  // Reset error state whenever the source changes or component updates
  useEffect(() => {
    setHasError(false);
  }, [src]);

  // If a valid image source exists and has not errored, render the real photo
  const showImage = Boolean(src && !hasError);

  // Shape container styles for real photo vs placeholder
  const imageShapeClass =
    shape === 'arch'
      ? 'rounded-t-full rounded-b-2xl border-[3px] border-[#B3172F] shadow-xl overflow-hidden'
      : shape === 'rounded'
        ? 'rounded-2xl sm:rounded-3xl border border-[#B3172F]/25 shadow-xl overflow-hidden'
        : 'rounded-xl border border-[#B5532E]/20 shadow-md overflow-hidden';

  const placeholderShapeClass =
    shape === 'arch'
      ? 'rounded-t-full rounded-b-2xl border-[3px] border-[#B3172F] shadow-xl overflow-hidden'
      : shape === 'rounded'
        ? 'rounded-2xl sm:rounded-3xl border-2 border-dashed border-[#B3172F]/35 shadow-md overflow-hidden'
        : 'rounded-xl border border-dashed border-[#B5532E]/35 shadow-sm overflow-hidden';

  const label = locale === 'bn' ? labelBn || 'ছবির স্থান' : labelEn || 'Photo Placeholder';
  const hint = locale === 'bn' ? hintBn || 'ছবি যুক্ত করুন' : hintEn || 'Add Photo';

  if (showImage && src) {
    return (
      <div className={`relative w-full ${aspect} bg-[#F6E9D2] ${imageShapeClass} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${objectPosition}`}
          onError={(e) => {
            console.warn(`[PhotoHolder] Image failed to load: ${src}`, e);
            setHasError(true);
          }}
        />
        {shape === 'arch' && (
          <div className="absolute inset-0 ring-1 ring-inset ring-[#B3172F]/30 rounded-t-full rounded-b-2xl pointer-events-none" />
        )}
      </div>
    );
  }

  // Otherwise render the elegant pre-built Photo Holder (Matches Image 3)
  return (
    <div
      className={`relative w-full ${aspect} bg-[#FFF8EC] flex flex-col items-center justify-center p-4 text-center transition-all duration-300 hover:border-[#B3172F]/60 ${placeholderShapeClass} ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 40%, rgba(246, 233, 210, 0.5) 0%, rgba(255, 248, 236, 1) 100%)',
      }}
    >
      {/* Dashed Inner Frame (for Arch shape or extra elegance) */}
      {shape === 'arch' && (
        <div className="absolute inset-2 rounded-t-full rounded-b-xl border border-dashed border-[#B3172F]/30 pointer-events-none" />
      )}

      {/* Photo Frame Icon (Identical to Image 3) */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-14 h-12 sm:w-16 sm:h-14 text-[#B3172F] opacity-80 mb-2 flex items-center justify-center">
          <svg
            viewBox="0 0 100 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="w-full h-full"
            aria-hidden="true"
          >
            {/* Outer Rounded Rectangle Frame */}
            <rect x="6" y="8" width="88" height="64" rx="8" strokeWidth="2.5" />
            {/* Sun / Moon Circle */}
            <circle cx="28" cy="28" r="8" fill="currentColor" fillOpacity="0.12" strokeWidth="2" />
            {/* Mountain Peaks with Joined Lines */}
            <path
              d="M 14 62 L 38 36 L 62 58 L 74 46 L 86 62"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Primary Label */}
        <p className="font-display font-serif font-bold text-sm sm:text-base text-[#6F0E20] leading-snug px-2">
          {label}
        </p>

        {/* Secondary Subtitle / Hint */}
        <div className="flex items-center gap-1.5 mt-1 text-xs text-[#B5532E]/80 font-serif italic">
          <span>📷</span>
          <span>{hint}</span>
        </div>
      </div>
    </div>
  );
}

