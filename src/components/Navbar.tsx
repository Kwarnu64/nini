import React, { useState } from 'react';
import { ThemeMode, FXSettings } from '../types';
import { romanticSynth } from '../utils/audioSynth';
import { Music, Volume2, VolumeX, Sparkles, Sliders, Heart, Sun, Palette, Calendar } from 'lucide-react';

interface NavbarProps {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  fx: FXSettings;
  setFx: React.Dispatch<React.SetStateAction<FXSettings>>;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, setTheme, fx, setFx }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(romanticSynth.getIsPlaying());
  const [showFxModal, setShowFxModal] = useState<boolean>(false);
  const [showThemeMenu, setShowThemeMenu] = useState<boolean>(false);

  const handleMusicToggle = () => {
    const active = romanticSynth.togglePlay();
    setIsPlaying(active);
    setFx((prev) => ({ ...prev, musicPlaying: active }));
  };

  const themeOptions: { id: ThemeMode; label: string; icon: string; colorClass: string }[] = [
    { id: 'rose-gold', label: 'Rose Gold Dream', icon: '🌹', colorClass: 'bg-rose-500' },
    { id: 'midnight-starlight', label: 'Midnight Starlight', icon: '✨', colorClass: 'bg-indigo-500' },
    { id: 'sunset-glow', label: 'Sunset Glow', icon: '🌅', colorClass: 'bg-amber-500' },
    { id: 'cherry-blossom', label: 'Cherry Blossom', icon: '🌸', colorClass: 'bg-fuchsia-400' },
    { id: 'golden-hour', label: 'Golden Hour', icon: '👑', colorClass: 'bg-yellow-500' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-rose-900/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand & Couple Names */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 p-0.5 shadow-lg shadow-rose-900/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-rose-400">
                <Heart className="w-5 h-5 fill-rose-500 stroke-rose-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-script text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200 bg-clip-text text-transparent text-glow-rose">
                Kwar Nu & Jain Moe
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-rose-300/70 font-semibold -mt-1">
                1 Year & 1 Month Anniversary
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#counter" className="hover:text-rose-300 transition-colors flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-400" /> Live Counter
            </a>
            <a href="#timeline" className="hover:text-rose-300 transition-colors">Love Story</a>
            <a href="#notes" className="hover:text-rose-300 transition-colors">397 Love Notes</a>
            <a href="#scrapbook" className="hover:text-rose-300 transition-colors">Scrapbook</a>
            <a href="#playground" className="hover:text-rose-300 transition-colors">Couples Playground</a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Romantic Music Synth Player Button */}
            <button
              onClick={handleMusicToggle}
              title={isPlaying ? "Mute Background Music" : "Play Romantic Background Music"}
              className={`p-2.5 rounded-full border transition-all flex items-center gap-2 text-xs font-semibold ${
                isPlaying
                  ? 'bg-rose-600/30 border-rose-500/60 text-rose-200 box-glow-rose shadow-lg shadow-rose-950/50'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {isPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span className="hidden sm:inline text-rose-300">Music On</span>
                  <span className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-3 bg-rose-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 h-2 bg-rose-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 h-3.5 bg-rose-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline">Play Music</span>
                </>
              )}
            </button>

            {/* Theme Selector Menu */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2.5 rounded-full bg-slate-900/80 border border-slate-800 text-rose-300 hover:border-rose-500/50 transition-all flex items-center gap-1.5"
                title="Change Visual Theme"
              >
                <Palette className="w-4 h-4 text-rose-400" />
                <span className="hidden lg:inline text-xs font-medium capitalize text-slate-300">
                  {theme.replace('-', ' ')}
                </span>
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-rose-900/40 shadow-2xl backdrop-blur-xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 text-xs font-semibold text-rose-300/80 border-b border-slate-800 uppercase tracking-wider">
                    Romantic Themes
                  </div>
                  <div className="py-1 space-y-1">
                    {themeOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setTheme(opt.id);
                          setShowThemeMenu(false);
                          romanticSynth.playHeartSound();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          theme === opt.id
                            ? 'bg-rose-950/60 text-rose-200 border border-rose-800/50'
                            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{opt.icon}</span> {opt.label}
                        </span>
                        <span className={`w-2.5 h-2.5 rounded-full ${opt.colorClass}`} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FX & Automation Settings Button */}
            <button
              onClick={() => setShowFxModal(true)}
              className="p-2.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-rose-300 hover:border-rose-500/50 transition-all"
              title="Live Flow Light & Emoji Controls"
            >
              <Sliders className="w-4 h-4 text-rose-400" />
            </button>
          </div>
        </div>
      </header>

      {/* FX & Automation Settings Modal */}
      {showFxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900/90 border border-rose-900/50 p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <h3 className="font-serif-display font-semibold text-lg text-rose-200">
                  Live Flow Light & Emoji Automation
                </h3>
              </div>
              <button
                onClick={() => setShowFxModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 text-sm">
              {/* Emoji Stream Set */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-rose-300 mb-2">
                  Automated Emoji Set
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['hearts', 'flowers', 'sparkles', 'all'] as const).map((set) => (
                    <button
                      key={set}
                      onClick={() => setFx((prev) => ({ ...prev, emojiSet: set }))}
                      className={`py-2 px-1 rounded-xl text-xs font-medium border capitalize transition-all ${
                        fx.emojiSet === set
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {set === 'hearts' ? '❤️ Hearts' : set === 'flowers' ? '🌹 Flowers' : set === 'sparkles' ? '✨ Sparkles' : '🌈 All'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emoji Speed */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-rose-300 mb-2">
                  Emoji Flow Speed
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['slow', 'medium', 'fast'] as const).map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setFx((prev) => ({ ...prev, emojiSpeed: speed }))}
                      className={`py-2 rounded-xl text-xs font-medium border capitalize transition-all ${
                        fx.emojiSpeed === speed
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-300'
                      }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emoji Density */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-rose-300 mb-2">
                  Emoji Stream Density
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map((density) => (
                    <button
                      key={density}
                      onClick={() => setFx((prev) => ({ ...prev, emojiDensity: density }))}
                      className={`py-2 rounded-xl text-xs font-medium border capitalize transition-all ${
                        fx.emojiDensity === density
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-300'
                      }`}
                    >
                      {density}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flow Light Intensity */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-rose-300 mb-2">
                  Flowing Light Glow Intensity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['soft', 'radiant', 'vibrant'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setFx((prev) => ({ ...prev, flowLightIntensity: level }))}
                      className={`py-2 rounded-xl text-xs font-medium border capitalize transition-all ${
                        fx.flowLightIntensity === level
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Mouse Glow Trail Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-sm font-medium text-slate-200">Interactive Cursor Glow Trail</span>
                <input
                  type="checkbox"
                  checked={fx.mouseTrail}
                  onChange={(e) => setFx((prev) => ({ ...prev, mouseTrail: e.target.checked }))}
                  className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setShowFxModal(false);
                  romanticSynth.playHeartSound();
                }}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-semibold shadow-lg hover:from-rose-500 hover:to-pink-500"
              >
                Apply & Save FX
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
