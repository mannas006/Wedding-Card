'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppLocale } from '@/components/providers/ClientIntlProvider';

interface LanguageOption {
  code: 'bn' | 'en';
  label: string;
  nativeLabel: string;
}

const languages: LanguageOption[] = [
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'en', label: 'English', nativeLabel: 'English' },
];

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale: currentLocale, setLocale } = useAppLocale();

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const switchLocale = (targetLocale: 'bn' | 'en') => {
    setLocale(targetLocale);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left select-none">
      {/* Trigger Button - Icon only for maximum space */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select language"
        title={currentLocale === 'bn' ? 'ভাষা নির্বাচন করুন (বাংলা)' : 'Select language (English)'}
        className="liquid-glass w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-[#B3172F] hover:text-[#6F0E20] hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B3172F]/50 shadow-sm"
      >
        {/* Globe SVG */}
        <svg
          className="w-5 h-5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      </button>

      {/* Extended Language Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="liquid-glass absolute top-full right-0 mt-2 w-44 rounded-2xl p-1.5 shadow-2xl border border-white/80 z-50 flex flex-col gap-1 animate-fadeIn origin-top-right backdrop-blur-2xl"
        >
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#B5532E]/80 border-b border-[#B3172F]/10 mb-0.5">
            {currentLocale === 'bn' ? 'ভাষা নির্বাচন' : 'Select Language'}
          </div>

          {languages.map((lang) => {
            const isSelected = currentLocale === lang.code;

            return (
              <button
                key={lang.code}
                type="button"
                role="menuitem"
                onClick={() => switchLocale(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#B3172F] to-[#941224] text-white shadow-sm'
                    : 'text-[#3A0D14] hover:bg-white/70 hover:text-[#B3172F]'
                }`}
              >
                <div className="flex flex-col text-left">
                  <span className="leading-tight">{lang.nativeLabel}</span>
                  <span
                    className={`text-[10px] leading-tight ${
                      isSelected ? 'text-white/80' : 'text-[#6F0E20]/60'
                    }`}
                  >
                    {lang.label}
                  </span>
                </div>

                {isSelected && (
                  <svg
                    className="w-4 h-4 text-white shrink-0 ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
