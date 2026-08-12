import React, { useState, useEffect } from 'react';
import { ANNIVERSARY_START_DATE, ANNIVERSARY_MILESTONE_DATE } from '../data/anniversaryData';
import { Clock, Heart, Sparkles, Calendar, Award } from 'lucide-react';

export const AnniversaryCounter: React.FC = () => {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
    heartbeats: 0,
  });

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const updateCounters = () => {
      const now = new Date().getTime();
      const startDate = new Date(ANNIVERSARY_START_DATE).getTime();
      const milestoneDate = new Date(ANNIVERSARY_MILESTONE_DATE).getTime();

      // Time together calculation (since July 21, 2025)
      const diffSinceStart = Math.max(0, now - startDate);
      const days = Math.floor(diffSinceStart / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffSinceStart / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffSinceStart / (1000 * 60)) % 60);
      const seconds = Math.floor((diffSinceStart / 1000) % 60);
      const heartbeats = Math.floor(days * 24 * 60 * 75 + hours * 60 * 75 + minutes * 75 + seconds * 1.25);

      setTimeTogether({
        days,
        hours,
        minutes,
        seconds,
        totalDays: days,
        heartbeats,
      });

      // Countdown to August 21, 2026
      const diffToMilestone = milestoneDate - now;
      if (diffToMilestone <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
      } else {
        const cDays = Math.floor(diffToMilestone / (1000 * 60 * 60 * 24));
        const cHours = Math.floor((diffToMilestone / (1000 * 60 * 60)) % 24);
        const cMinutes = Math.floor((diffToMilestone / (1000 * 60)) % 60);
        const cSeconds = Math.floor((diffToMilestone / 1000) % 60);
        setCountdown({ days: cDays, hours: cHours, minutes: cMinutes, seconds: cSeconds, isPassed: false });
      }
    };

    updateCounters();
    const timer = setInterval(updateCounters, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="counter" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs uppercase tracking-widest text-rose-400 font-bold flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-rose-500" />
          Real-Time Love Clock
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Our Time Together
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Every second since <span className="text-rose-300 font-semibold">July 21, 2025</span> is a precious blessing for Kwar Nu & Jain Moe.
        </p>
      </div>

      {/* Main Counter Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {[
          { label: 'Days Together', val: timeTogether.days, color: 'from-rose-500 to-pink-600', unit: 'Days' },
          { label: 'Hours', val: timeTogether.hours, color: 'from-pink-500 to-purple-600', unit: 'Hours' },
          { label: 'Minutes', val: timeTogether.minutes, color: 'from-purple-500 to-indigo-600', unit: 'Mins' },
          { label: 'Seconds', val: timeTogether.seconds, color: 'from-indigo-500 to-rose-600', unit: 'Secs' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="relative rounded-3xl bg-slate-900/80 border border-rose-900/40 p-6 text-center shadow-xl backdrop-blur-md hover:border-rose-500/50 transition-all group overflow-hidden"
          >
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.color}`} />
            <div className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white group-hover:scale-105 transition-transform">
              {item.val.toString().padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-rose-300/80 mt-2">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Countdown to August 21, 2026 & Fun Love Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Countdown to Aug 21, 2026 Milestone */}
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-rose-950/80 via-slate-900/90 to-purple-950/80 border border-rose-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-900/60 text-rose-200 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-amber-300" /> Milestone Countdown
              </span>
              <span className="text-xs text-slate-400 font-mono">21,8,2026 Target</span>
            </div>
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-rose-100">
              Countdown to 1 Year & 1 Month Official Milestone!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Celebrating our exact 1 Year 1 Month anniversary date on <strong className="text-rose-200">August 21, 2026</strong>.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 my-6">
            <div className="bg-slate-950/70 rounded-2xl p-3 text-center border border-rose-900/40">
              <span className="font-bold text-2xl sm:text-3xl text-rose-300">{countdown.days}</span>
              <span className="block text-[10px] text-slate-400 uppercase">Days</span>
            </div>
            <div className="bg-slate-950/70 rounded-2xl p-3 text-center border border-rose-900/40">
              <span className="font-bold text-2xl sm:text-3xl text-rose-300">{countdown.hours}</span>
              <span className="block text-[10px] text-slate-400 uppercase">Hours</span>
            </div>
            <div className="bg-slate-950/70 rounded-2xl p-3 text-center border border-rose-900/40">
              <span className="font-bold text-2xl sm:text-3xl text-rose-300">{countdown.minutes}</span>
              <span className="block text-[10px] text-slate-400 uppercase">Mins</span>
            </div>
            <div className="bg-slate-950/70 rounded-2xl p-3 text-center border border-rose-900/40">
              <span className="font-bold text-2xl sm:text-3xl text-amber-300 animate-pulse">{countdown.seconds}</span>
              <span className="block text-[10px] text-slate-400 uppercase">Secs</span>
            </div>
          </div>

          <div className="text-xs text-rose-200/80 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Kwar Nu & Jain Moe: 1 Year 1 Month = 13 Months of Unconditional Devotion</span>
          </div>
        </div>

        {/* Fun Love Metrics Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <Heart className="w-4 h-4 fill-rose-500" />
              Love Pulse Stat
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                {timeTogether.heartbeats.toLocaleString()}
              </span>
              <span className="block text-xs text-slate-400 mt-1">
                Estimated Heartbeats Together for Jain Moe & Kwar Nu
              </span>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Total Months:</span>
                <strong className="text-rose-300">13 Months (1Y 1M)</strong>
              </div>
              <div className="flex justify-between">
                <span>Laughs Shared:</span>
                <strong className="text-amber-300">Infinite ∞</strong>
              </div>
              <div className="flex justify-between">
                <span>Future Ahead:</span>
                <strong className="text-pink-300">Forever & Ever</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <span className="font-script text-2xl text-rose-300">
              "You are my today and all of my tomorrows."
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
