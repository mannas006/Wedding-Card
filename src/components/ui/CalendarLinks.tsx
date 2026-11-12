'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import { downloadICS, getGoogleCalendarUrl, generateICS, CalendarEvent } from '@/lib/calendar';

interface CalendarLinksProps {
  title: string;
  start: string;
  end: string;
  location: string;
  description: string;
  compact?: boolean;
  align?: 'left' | 'right' | 'center';
  variant?: 'default' | 'compact' | 'hero';
  label?: string;
  className?: string;
  buttonClassName?: string;
}

export default function CalendarLinks({
  title,
  start,
  end,
  location,
  description,
  compact = false,
  align = 'left',
  variant = 'default',
  label,
  className = '',
  buttonClassName,
}: CalendarLinksProps) {
  const t = useTranslations('ceremonies');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const eventData: CalendarEvent = useMemo(
    () => ({
      title,
      start: new Date(start),
      end: new Date(end),
      location,
      description,
    }),
    [title, start, end, location, description],
  );

  const formattedDate = useMemo(() => {
    try {
      const d = eventData.start;
      return d.toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return locale === 'bn' ? 'বুধবার, ২৫ নভেম্বর ২০২৬' : 'Wednesday, 25 November 2026';
    }
  }, [eventData.start, locale]);

  const formattedTime = useMemo(() => {
    try {
      const d = eventData.start;
      return d.toLocaleTimeString(locale === 'bn' ? 'bn-BD' : 'en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return '';
    }
  }, [eventData.start, locale]);

  const googleCalendarUrl = useMemo(
    () => getGoogleCalendarUrl(eventData),
    [eventData],
  );

  const safeFilename = useMemo(() => {
    return (
      title
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase() || 'wedding-event'
    );
  }, [title]);

  const icsDataUri = useMemo(() => {
    try {
      const content = generateICS(eventData);
      return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;
    } catch {
      return '#';
    }
  }, [eventData]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleDownloadICS = (e?: React.MouseEvent) => {
    try {
      downloadICS(eventData);
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => setIsOpen(false), 250);
  };

  const handleGoogleCalendar = (e?: React.MouseEvent) => {
    setTimeout(() => setIsOpen(false), 250);
  };

  // Determine button styling based on variant
  const getButtonClass = () => {
    if (buttonClassName) return buttonClassName;

    if (variant === 'hero') {
      return 'inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B3172F] via-[#941224] to-[#6F0E20] text-[#FFF8EC] border-2 border-[#F2B705]/70 shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95 transition-all text-xs sm:text-sm font-bold tracking-wider cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F2B705] min-h-[46px] select-none';
    }

    if (compact || variant === 'compact') {
      return 'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B3172F] text-[#FFF8EC] text-xs font-semibold hover:bg-[#6F0E20] transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] shadow-sm cursor-pointer select-none';
    }

    return 'inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#B3172F] text-[#FFF8EC] text-sm font-medium hover:bg-[#6F0E20] transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] shadow-sm cursor-pointer select-none';
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={getButtonClass()}
      >
        {/* Calendar Icon */}
        <svg
          className={variant === 'hero' ? 'w-4 h-4 text-[#F2B705]' : 'w-3.5 h-3.5'}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>

        <span>{label || t('addToCalendar')}</span>

        {/* Dropdown Chevron */}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            variant === 'hero' ? 'text-[#F2B705]' : ''
          } ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Universal Modal Dialog via Portal (Never gets clipped or overlapped by stacking contexts) */}
      {isOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={label || title || t('addToCalendar')}
        >
          <div
            className="relative w-full max-w-[340px] sm:max-w-sm rounded-3xl bg-[#FFF8EC] border-2 border-[#F2B705] shadow-2xl p-5 sm:p-6 text-center flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#3A0D14]/10 hover:bg-[#3A0D14]/20 text-[#3A0D14] flex items-center justify-center transition-colors cursor-pointer text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#B3172F]"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header Icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B3172F] to-[#6F0E20] text-[#F2B705] flex items-center justify-center shadow-md mb-2.5">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>

            {/* Title & Date */}
            <h3 className="font-display-bn text-xl sm:text-2xl text-[#6F0E20] font-bold line-clamp-2 px-2">
              {variant === 'hero' ? (label || 'SAVE THE DATE') : (title || label || t('addToCalendar'))}
            </h3>

            <p className="text-sm font-semibold text-[#3A0D14] mt-1">
              {formattedDate}
            </p>
            {formattedTime && (
              <p className="inline-flex items-center gap-1.5 text-xs text-[#B5532E] font-serif mt-0.5 mb-4 font-medium">
                <svg className="w-3.5 h-3.5 text-[#B5532E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{formattedTime} {locale === 'bn' ? 'থেকে' : 'onwards'}</span>
              </p>
            )}

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-2.5 mt-1">
              {/* Google Calendar */}
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleGoogleCalendar}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-[#F6E9D2] active:scale-[0.98] border border-[#B3172F]/20 shadow-sm hover:shadow transition-all text-left min-h-[52px] cursor-pointer group no-underline"
              >
                <span className="w-9 h-9 rounded-xl bg-[#4285F4]/10 text-[#4285F4] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#3A0D14] group-hover:text-[#B3172F] leading-tight">
                    Google Calendar
                  </p>
                  <p className="text-[11px] text-[#6F0E20]/75 leading-tight mt-0.5">
                    {locale === 'bn' ? 'গুগল ক্যালেন্ডারে যুক্ত করুন' : 'Open & save to your Google Calendar'}
                  </p>
                </div>
                <span className="text-[#B3172F] text-base font-bold transition-transform group-hover:translate-x-0.5 shrink-0">
                  →
                </span>
              </a>

              {/* Apple / Outlook */}
              <a
                href={icsDataUri}
                download={`${safeFilename}.ics`}
                onClick={handleDownloadICS}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-[#F6E9D2] active:scale-[0.98] border border-[#B3172F]/20 shadow-sm hover:shadow transition-all text-left min-h-[52px] cursor-pointer group no-underline"
              >
                <span className="w-9 h-9 rounded-xl bg-[#6F0E20]/10 text-[#6F0E20] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <circle cx="12" cy="15" r="2" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#3A0D14] group-hover:text-[#B3172F] leading-tight">
                    Apple / Outlook / Phone
                  </p>
                  <p className="text-[11px] text-[#6F0E20]/75 leading-tight mt-0.5">
                    {locale === 'bn' ? '.ics ক্যালেন্ডার ফাইল ডাউনলোড করুন' : 'Download .ics event file'}
                  </p>
                </div>
                <span className="text-[#B3172F] text-base font-bold transition-transform group-hover:translate-x-0.5 shrink-0">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
