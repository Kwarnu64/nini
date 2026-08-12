import React from 'react';
import { Heart, Sparkles, Calendar, Volume2, ArrowDown } from 'lucide-react';
import { romanticSynth } from '../utils/audioSynth';
import heroArt from '../assets/images/romantic_hero_art_1786534362574.jpg';

interface HeroBannerProps {
  onOpenLetter: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenLetter }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        
        {/* Top Anniversary Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Happy 1 Year & 1 Month Anniversary!</span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
        </div>

        {/* Main Names Typography */}
        <div className="space-y-3">
          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-rose-300 via-pink-100 to-amber-200 bg-clip-text text-transparent text-glow-rose leading-tight tracking-wide">
            Kwar Nu <span className="inline-block text-rose-500 animate-pulse text-5xl sm:text-7xl">❤️</span> Jain Moe
          </h1>
          <p className="font-serif-display text-lg sm:text-2xl md:text-3xl text-rose-200/90 font-medium italic">
            "One Year & One Month of Pure Love, Laughter, and Infinite Magic"
          </p>
        </div>

        {/* Date Range Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <Calendar className="w-4 h-4 text-rose-400" />
            <span>Started: July 21, 2025</span>
          </div>
          <span className="text-rose-500 font-bold">➜</span>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-200">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>1Y 1M Milestone: August 21, 2026</span>
          </div>
        </div>

        {/* Hero Artwork Frame */}
        <div className="relative mx-auto max-w-3xl rounded-3xl overflow-hidden p-1 bg-gradient-to-tr from-rose-500/40 via-amber-400/30 to-purple-600/40 shadow-2xl box-glow-rose group">
          <div className="relative rounded-[22px] overflow-hidden bg-slate-950 aspect-[16/9]">
            <img
              src={heroArt}
              alt="Kwar Nu and Jain Moe romantic art"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-6 sm:p-8">
              <div className="text-left space-y-1">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">Our Eternal Bond</span>
                <h2 className="font-serif-display text-xl sm:text-2xl text-white font-semibold">
                  July 21, 2025 ➜ August 21, 2026
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Every second spent with Jain Moe is Kwar Nu's happiest moment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="#timeline"
            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white font-semibold text-sm shadow-xl shadow-rose-950/60 hover:from-rose-500 hover:to-pink-500 transition-all flex items-center gap-2 group"
          >
            <Heart className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
            Explore Our Love Story
          </a>

          <button
            onClick={onOpenLetter}
            className="px-6 py-3.5 rounded-full bg-slate-900/90 border border-rose-500/50 text-rose-200 hover:text-white hover:border-rose-400 text-sm font-semibold shadow-lg backdrop-blur-md transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Open Love Letter Envelope
          </button>

          <button
            onClick={() => romanticSynth.togglePlay()}
            className="p-3.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-rose-300 hover:border-rose-500/50 transition-all"
            title="Toggle Romantic Chimes"
          >
            <Volume2 className="w-5 h-5 text-rose-400" />
          </button>
        </div>

        {/* Down indicator */}
        <div className="pt-6">
          <a href="#counter" className="inline-block text-rose-400/60 hover:text-rose-300 transition-colors animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto" />
          </a>
        </div>

      </div>
    </section>
  );
};
