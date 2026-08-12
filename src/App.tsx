import React, { useState } from 'react';
import { ThemeMode, FXSettings } from './types';
import { FlowingLightsBackground } from './components/FlowingLightsBackground';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { AnniversaryCounter } from './components/AnniversaryCounter';
import { LoveStoryTimeline } from './components/LoveStoryTimeline';
import { LoveLettersSection } from './components/LoveLettersSection';
import { MemoryScrapbook } from './components/MemoryScrapbook';
import { CouplesPlayground } from './components/CouplesPlayground';
import { Footer } from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('rose-gold');
  const [envelopeOpened, setEnvelopeOpened] = useState<boolean>(false);

  const [fx, setFx] = useState<FXSettings>({
    emojiSpeed: 'medium',
    emojiDensity: 'medium',
    emojiSet: 'all',
    flowLightIntensity: 'radiant',
    soundEnabled: true,
    musicPlaying: false,
    mouseTrail: true,
  });

  return (
    <div className="relative min-h-screen text-slate-100 font-sans-clean selection:bg-rose-500 selection:text-white">
      {/* Live Flow Light & Automated Floating Emoji Canvas */}
      <FlowingLightsBackground theme={theme} fx={fx} />

      {/* Navigation Bar with Theme & Audio Controls */}
      <Navbar theme={theme} setTheme={setTheme} fx={fx} setFx={setFx} />

      <main className="relative z-10 space-y-12">
        {/* Romantic Hero Banner */}
        <HeroBanner onOpenLetter={() => setEnvelopeOpened(true)} />

        {/* Live Counter & Milestone Countdown */}
        <AnniversaryCounter />

        {/* Love Story Timeline (July 21, 2025 - August 21, 2026) */}
        <LoveStoryTimeline />

        {/* Love Letter Envelope & 397 Reasons */}
        <LoveLettersSection
          envelopeOpened={envelopeOpened}
          setEnvelopeOpened={setEnvelopeOpened}
        />

        {/* Polaroid Memory Scrapbook */}
        <MemoryScrapbook />

        {/* Interactive Couple Playground */}
        <CouplesPlayground />
      </main>

      {/* Romantic Footer */}
      <Footer />
    </div>
  );
}

