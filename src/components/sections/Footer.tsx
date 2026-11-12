'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import LiveStreamBanner from '@/components/ui/LiveStreamBanner';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer
      id="closing"
      className="relative min-h-0 py-10 sm:py-16 px-4 flex flex-col items-center text-[#FFF8EC] overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #5A0A19 0%, #400913 60%, #2A050C 100%)',
      }}
    >
      <div className="w-full max-w-[430px] mx-auto flex flex-col items-center text-center">
        {/* Top Visual: Bride's Hands with Shankha-Pola Holding Paan Leaf with Sindoor */}
        <div className="relative w-full aspect-[4/3] max-w-[390px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FFF8EC]/20 bg-[#3A0D14] mb-8">
          <Image
            src="/images/paan-hands-shankhapola.webp"
            alt="Bride's hands adorned with shankha-pola holding a green betel leaf with vermillion"
            fill
            sizes="(max-width: 430px) 100vw, 390px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#400913]/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Closing Note Text Block (Screen 8) */}
        <div className="px-4 mb-6">
          <h2 className="font-display-bn text-2xl sm:text-3xl text-[#FFF8EC] font-semibold leading-relaxed mb-3 drop-shadow-sm">
            {event.closingNote.textBn}
          </h2>
          <p className="font-display italic text-base sm:text-lg text-[#FFF8EC]/90 leading-relaxed font-serif">
            &ldquo;{event.closingNote.textEn}&rdquo;
          </p>
        </div>

        {/* Ornate Star / Diamond Divider */}
        <div className="flex items-center justify-center gap-3 my-2 text-[#FFF8EC]/70" aria-hidden="true">
          <span className="w-8 h-[1px] bg-[#FFF8EC]/40" />
          <span className="text-sm">✤</span>
          <span className="text-lg">❖</span>
          <span className="text-sm">✤</span>
          <span className="w-8 h-[1px] bg-[#FFF8EC]/40" />
        </div>

        {/* Live Stream Banner (Automated for 25 Nov) */}
        <div className="w-full max-w-sm my-4">
          <LiveStreamBanner />
        </div>

        {/* Couple Signatures & Bangla Date */}
        <div className="mt-4 pt-4 border-t border-[#FFF8EC]/15 w-full max-w-xs text-center text-xs text-[#FFF8EC]/70">
          <p className="font-display-bn text-base text-[#FFF8EC] font-bold">
            {locale === 'bn' ? 'ঝিলিক ও কৌশিক' : 'Jhilik & Koushik'}
          </p>
          <p className="mt-1 font-serif">
            {event.banglaDate} • 25 November 2026
          </p>
        </div>
      </div>

      {/* Bottom Embroidered Kantha Running Stitch Border */}
      <div className="w-full max-w-[430px] pt-6 border-t border-[#FFF8EC]/15 flex justify-center opacity-70 mt-6">
        <svg className="w-full h-3 text-[#FFF8EC]" viewBox="0 0 320 12" fill="none" stroke="currentColor">
          <line x1="0" y1="6" x2="320" y2="6" strokeWidth="1.5" strokeDasharray="5 4" />
        </svg>
      </div>
    </footer>
  );
}
