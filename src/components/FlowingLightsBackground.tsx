import React, { useEffect, useState, useRef } from 'react';
import { ThemeMode, FXSettings } from '../types';

interface FlowingLightsProps {
  theme: ThemeMode;
  fx: FXSettings;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number; // percentage
  size: number; // rem
  duration: number; // seconds
  delay: number; // seconds
  spin: number; // deg
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const FlowingLightsBackground: React.FC<FlowingLightsProps> = ({ theme, fx }) => {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [clickSparkles, setClickSparkles] = useState<SparkleParticle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Emoji sets based on user preference
  const getEmojiList = () => {
    switch (fx.emojiSet) {
      case 'hearts':
        return ['❤️', '💖', '💕', '💗', '💘', '💓', '💝', '💞'];
      case 'flowers':
        return ['🌹', '🌸', '🌺', '🌷', '💐', '🌻', '🥀'];
      case 'sparkles':
        return ['✨', '💫', '⭐', '🌟', '🎆', '🔮', '🎇'];
      case 'all':
      default:
        return ['❤️', '💕', '💖', '🌹', '🌸', '✨', '💫', '🥂', '💍', '👑', '🦋', '💌'];
    }
  };

  // Generate automated floating emojis
  useEffect(() => {
    const list = getEmojiList();
    const count = fx.emojiDensity === 'low' ? 18 : fx.emojiDensity === 'high' ? 45 : 30;
    
    const speedMult = fx.emojiSpeed === 'slow' ? 1.5 : fx.emojiSpeed === 'fast' ? 0.6 : 1.0;

    const newEmojis: FloatingEmoji[] = Array.from({ length: count }).map((_, i) => {
      const emoji = list[Math.floor(Math.random() * list.length)];
      return {
        id: i,
        emoji,
        left: Math.random() * 96,
        size: 1.2 + Math.random() * 1.8,
        duration: (8 + Math.random() * 10) * speedMult,
        delay: Math.random() * 12,
        spin: (Math.random() - 0.5) * 60,
      };
    });

    setEmojis(newEmojis);
  }, [fx.emojiDensity, fx.emojiSpeed, fx.emojiSet]);

  // Track mouse position for live interactive light trail
  useEffect(() => {
    if (!fx.mouseTrail) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [fx.mouseTrail]);

  // Spawn floating sparkles on mouse click
  const handleContainerClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const colors = ['#f43f5e', '#fb7185', '#fbbf24', '#c084fc', '#38bdf8'];
    const newSparkles: SparkleParticle[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: clickX + (Math.random() - 0.5) * 60,
      y: clickY + (Math.random() - 0.5) * 60,
      size: 10 + Math.random() * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setClickSparkles((prev) => [...prev.slice(-20), ...newSparkles]);

    // Clean up sparkles
    setTimeout(() => {
      setClickSparkles((prev) => prev.filter((p) => !newSparkles.some((ns) => ns.id === p.id)));
    }, 1200);
  };

  // Theme specific background gradient classes and light colors
  const getThemeGradient = () => {
    switch (theme) {
      case 'rose-gold':
        return 'from-slate-950 via-rose-950/60 to-slate-950';
      case 'midnight-starlight':
        return 'from-slate-950 via-indigo-950/70 to-slate-950';
      case 'sunset-glow':
        return 'from-slate-950 via-amber-950/60 to-rose-950/80';
      case 'cherry-blossom':
        return 'from-slate-950 via-fuchsia-950/50 to-pink-950/60';
      case 'golden-hour':
        return 'from-slate-950 via-yellow-950/50 to-slate-950';
      default:
        return 'from-slate-950 via-rose-950/60 to-slate-950';
    }
  };

  const getOrbColor1 = () => {
    switch (theme) {
      case 'rose-gold': return 'bg-rose-600/30';
      case 'midnight-starlight': return 'bg-indigo-600/30';
      case 'sunset-glow': return 'bg-amber-600/30';
      case 'cherry-blossom': return 'bg-fuchsia-500/30';
      case 'golden-hour': return 'bg-yellow-500/30';
    }
  };

  const getOrbColor2 = () => {
    switch (theme) {
      case 'rose-gold': return 'bg-pink-500/20';
      case 'midnight-starlight': return 'bg-purple-600/25';
      case 'sunset-glow': return 'bg-rose-500/25';
      case 'cherry-blossom': return 'bg-pink-400/30';
      case 'golden-hour': return 'bg-amber-500/25';
    }
  };

  const opacityMultiplier = fx.flowLightIntensity === 'soft' ? 0.6 : fx.flowLightIntensity === 'vibrant' ? 1.3 : 1.0;

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={`fixed inset-0 pointer-events-auto overflow-hidden transition-colors duration-1000 bg-gradient-to-b ${getThemeGradient()} -z-10`}
    >
      {/* Dynamic Animated Flow Light Orbs */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse-glow ${getOrbColor1()}`}
        style={{ opacity: 0.7 * opacityMultiplier, animationDuration: '8s' }}
      />
      <div
        className={`absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl animate-pulse-glow ${getOrbColor2()}`}
        style={{ opacity: 0.6 * opacityMultiplier, animationDuration: '11s', animationDelay: '2s' }}
      />
      <div
        className={`absolute -bottom-32 left-1/4 w-[36rem] h-[36rem] rounded-full blur-3xl animate-pulse-glow ${getOrbColor1()}`}
        style={{ opacity: 0.5 * opacityMultiplier, animationDuration: '14s', animationDelay: '4s' }}
      />

      {/* Aurora light ribbon animation */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none animate-flow-gradient"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.25), transparent 60%), radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.2), transparent 50%)',
        }}
      />

      {/* Interactive Cursor Light Glow Trail */}
      {fx.mouseTrail && mousePos.x >= 0 && (
        <div
          className="absolute pointer-events-none rounded-full blur-2xl transition-transform duration-75 ease-out bg-rose-400/25"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: '200px',
            height: '200px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Automated Floating Emoji Stream */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {emojis.map((item) => (
          <div
            key={item.id}
            className="absolute select-none transform transition-transform filter drop-shadow-md"
            style={{
              left: `${item.left}%`,
              fontSize: `${item.size}rem`,
              animation: `floatUp ${item.duration}s linear infinite`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Click Burst Sparkle Particles */}
      {clickSparkles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none font-script text-xl animate-ping text-rose-300 select-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            color: p.color,
          }}
        >
          💖
        </div>
      ))}
    </div>
  );
};
