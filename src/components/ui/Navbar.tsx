'use client';

import LanguageToggle from './LanguageToggle';
import SoundToggle from './SoundToggle';
import PauseAnimations from './PauseAnimations';

export default function Navbar() {
  return (
    <>
      {/* Top Floating Controls Bar */}
      <header
        className="fixed top-3 right-3 sm:top-5 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-2"
        role="banner"
      >
        {/* Pause Animations (Hidden on Mobile View) */}
        <div className="hidden sm:inline-flex">
          <PauseAnimations />
        </div>

        {/* Sound Toggle in Top Bar (Desktop / Tablet only) */}
        <div className="hidden sm:inline-flex">
          <SoundToggle />
        </div>

        <LanguageToggle />
      </header>

      {/* Floating Sound Toggle at Bottom-Right Corner in Mobile View */}
      <div className="fixed bottom-4 right-4 z-40 sm:hidden drop-shadow-xl">
        <SoundToggle />
      </div>
    </>
  );
}
