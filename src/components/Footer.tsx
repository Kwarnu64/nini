import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { romanticSynth } from '../utils/audioSynth';

export const Footer: React.FC = () => {
  const triggerHeartBurst = () => {
    romanticSynth.playHeartSound();
    // Dispatch a custom click event to trigger floating sparkles
    const evt = new MouseEvent('click', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2,
      bubbles: true,
    });
    document.dispatchEvent(evt);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-rose-900/40 bg-slate-950/90 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Heart Burst Button */}
        <button
          onClick={triggerHeartBurst}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-semibold shadow-lg hover:bg-rose-900 hover:scale-105 transition-all group"
        >
          <Heart className="w-4 h-4 fill-rose-500 text-rose-400 group-hover:scale-125 transition-transform" />
          <span>Send Kwar Nu & Jain Moe A Heart Burst 💖</span>
        </button>

        {/* Big Script Names */}
        <div>
          <h2 className="font-script text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200 bg-clip-text text-transparent">
            Kwar Nu ❤️ Jain Moe
          </h2>
          <p className="font-serif-display text-xs sm:text-sm text-rose-300/80 mt-1">
            July 21, 2025 ➜ August 21, 2026 • 1 Year 1 Month Anniversary
          </p>
        </div>

        <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
          "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
        </p>

        {/* Back to top */}
        <div className="pt-4">
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-rose-500/50 transition-all inline-flex items-center gap-1.5 text-xs"
          >
            <ArrowUp className="w-4 h-4 text-rose-400" />
            <span>Back To Top</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-300 pt-6 border-t border-slate-900">
          Crafted exclusively for Kwar Nu and Jain Moe's 1st Year & 1st Month Anniversary.
        </div>
      </div>
    </footer>
  );
};
