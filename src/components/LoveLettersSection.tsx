import React, { useState, useEffect } from 'react';
import { REASONS_WHY_I_LOVE_YOU } from '../data/anniversaryData';
import { LoveNote } from '../types';
import { Heart, Sparkles, Mail, RefreshCw, Bookmark, Plus, Send, Lock } from 'lucide-react';
import { romanticSynth } from '../utils/audioSynth';

interface LoveLettersSectionProps {
  envelopeOpened: boolean;
  setEnvelopeOpened: (opened: boolean) => void;
}

export const LoveLettersSection: React.FC<LoveLettersSectionProps> = ({
  envelopeOpened,
  setEnvelopeOpened,
}) => {
  const [reasons, setReasons] = useState<LoveNote[]>(() => {
    const saved = localStorage.getItem('kwar_jain_reasons');
    return saved ? JSON.parse(saved) : REASONS_WHY_I_LOVE_YOU;
  });

  const [currentReasonIndex, setCurrentReasonIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAddReasonModal, setShowAddReasonModal] = useState<boolean>(false);
  const [newReasonText, setNewReasonText] = useState('');
  const [newReasonCategory, setNewReasonCategory] = useState<LoveNote['category']>('sweet');

  // Custom love letter saved in state/localStorage
  const [loveLetterText, setLoveLetterText] = useState<string>(() => {
    const savedLetter = localStorage.getItem('kwar_jain_letter');
    return (
      savedLetter ||
      `Dearest Jain Moe,

My sweet love, as we reach our 1 Year and 1 Month anniversary (July 21, 2025 to August 21, 2026), my heart overflows with gratitude for every second we've spent together. 

From the very first day I held your hand, you brought light, laughter, and an unimaginable sweetness into my life. Every morning text, every late-night conversation, every smile you give me is my absolute favorite treasure.

Thank you for choosing me, for loving me, and for making this past year and one month the happiest time of my entire existence. Here is to 397 days of love and to a lifetime more of holding you close.

Forever yours,
Kwar Nu ❤️`
    );
  });

  const [isEditingLetter, setIsEditingLetter] = useState(false);

  useEffect(() => {
    localStorage.setItem('kwar_jain_reasons', JSON.stringify(reasons));
  }, [reasons]);

  useEffect(() => {
    localStorage.setItem('kwar_jain_letter', loveLetterText);
  }, [loveLetterText]);

  const nextReason = () => {
    setCurrentReasonIndex((prev) => (prev + 1) % filteredReasons.length);
    romanticSynth.playHeartSound();
  };

  const toggleFavorite = (id: string) => {
    setReasons((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  };

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReasonText.trim()) return;

    const newNote: LoveNote = {
      id: 'r_' + Date.now(),
      number: reasons.length + 1,
      reason: newReasonText,
      category: newReasonCategory,
      isFavorite: true,
    };

    setReasons((prev) => [newNote, ...prev]);
    setShowAddReasonModal(false);
    setNewReasonText('');
    romanticSynth.playHeartSound();
  };

  const filteredReasons = reasons.filter((r) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'favorites') return r.isFavorite;
    return r.category === activeCategory;
  });

  const currentNote = filteredReasons[currentReasonIndex % Math.max(1, filteredReasons.length)] || reasons[0];

  return (
    <section id="notes" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20">
      
      {/* SECTION 1: Interactive Love Letter Envelope */}
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-rose-400 font-bold flex items-center justify-center gap-2">
          <Mail className="w-4 h-4 text-rose-500" />
          Sealed With A Kiss
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          A Special Letter for Jain Moe
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Written with love by Kwar Nu for our 1 Year 1 Month Anniversary.
        </p>

        {/* Envelope Container */}
        <div className="pt-6">
          {!envelopeOpened ? (
            <div
              onClick={() => {
                setEnvelopeOpened(true);
                romanticSynth.playHeartSound();
              }}
              className="group mx-auto max-w-md cursor-pointer rounded-3xl bg-gradient-to-br from-rose-950/90 via-slate-900 to-pink-950/90 border-2 border-rose-500/50 p-8 text-center shadow-2xl box-glow-rose hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              {/* Envelope flap aesthetic */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-rose-900/40 rounded-full blur-md" />
              
              <div className="relative space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-rose-600/20 border border-rose-500 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 fill-rose-500 stroke-rose-300 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif-display text-2xl font-bold text-rose-100">
                    To: My Beloved Jain Moe ❤️
                  </h3>
                  <p className="text-xs text-rose-300/80 mt-1">From: Kwar Nu</p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-900/60 border border-rose-700/50 text-rose-200 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Click to Open Sealed Envelope
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-3xl bg-amber-50/95 text-slate-900 p-8 sm:p-12 shadow-2xl border-4 border-amber-200/80 relative transition-all animate-in zoom-in-95">
              <button
                onClick={() => setEnvelopeOpened(false)}
                className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-rose-900 text-rose-100 hover:bg-rose-800"
              >
                Close Envelope
              </button>

              <div className="text-left space-y-6">
                <div className="border-b border-amber-200 pb-4 flex items-center justify-between">
                  <div>
                    <span className="font-script text-3xl font-bold text-rose-700">Dearest Jain Moe,</span>
                    <p className="text-xs text-amber-800/70">Anniversary Date: July 21, 2025 – August 21, 2026</p>
                  </div>
                  <Heart className="w-6 h-6 fill-rose-600 text-rose-600" />
                </div>

                {isEditingLetter ? (
                  <div className="space-y-3">
                    <textarea
                      rows={8}
                      value={loveLetterText}
                      onChange={(e) => setLoveLetterText(e.target.value)}
                      className="w-full p-4 rounded-xl border border-amber-300 bg-white text-slate-800 font-serif text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <button
                      onClick={() => {
                        setIsEditingLetter(false);
                        romanticSynth.playHeartSound();
                      }}
                      className="px-4 py-2 rounded-full bg-rose-700 text-white text-xs font-semibold"
                    >
                      Save Letter
                    </button>
                  </div>
                ) : (
                  <div className="font-serif text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {loveLetterText}
                  </div>
                )}

                <div className="pt-4 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900/80">
                  <button
                    onClick={() => setIsEditingLetter(!isEditingLetter)}
                    className="text-rose-700 hover:underline font-semibold"
                  >
                    {isEditingLetter ? 'Done Editing' : '✏️ Edit This Letter'}
                  </button>
                  <span className="font-script text-2xl font-bold text-rose-800">
                    With All My Love, Kwar Nu
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: 397 Reasons Why Kwar Nu Loves Jain Moe */}
      <div className="space-y-8 pt-8 border-t border-rose-900/30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              397 Reasons Why Kwar Nu Loves Jain Moe
            </h3>
            <p className="text-xs text-slate-300">
              One sweet reason for every single day of our 1 Year 1 Month together!
            </p>
          </div>

          <button
            onClick={() => setShowAddReasonModal(true)}
            className="px-4 py-2.5 rounded-full bg-slate-900 border border-rose-800/80 text-rose-300 hover:border-rose-500 text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-rose-400" />
            Add Love Reason
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Reasons' },
            { id: 'favorites', label: '⭐ Favorites' },
            { id: 'sweet', label: '🍬 Sweet' },
            { id: 'deep', label: '🌊 Deep Love' },
            { id: 'future', label: '🔮 Future' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentReasonIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeCategory === cat.id
                  ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Display Reason Card */}
        {filteredReasons.length > 0 && currentNote ? (
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-rose-950/60 border border-rose-900/50 p-8 shadow-2xl backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/50">
                Reason #{currentNote.number}
              </span>
              <button
                onClick={() => toggleFavorite(currentNote.id)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
                title="Save as Favorite"
              >
                <Bookmark
                  className={`w-5 h-5 ${currentNote.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`}
                />
              </button>
            </div>

            <blockquote className="font-serif-display text-xl sm:text-2xl text-rose-100 italic leading-relaxed">
              "{currentNote.reason}"
            </blockquote>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
              <span className="text-slate-400 capitalize">Category: {currentNote.category}</span>
              <button
                onClick={nextReason}
                className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-all flex items-center gap-2 shadow-lg shadow-rose-950"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Next Love Reason
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-sm">
            No reasons found in this category. Add a new reason above!
          </div>
        )}
      </div>

      {/* Add Reason Modal */}
      {showAddReasonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-rose-900/50 p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="font-serif-display text-lg font-bold text-rose-200">
                Add Reason Why Kwar Nu Loves Jain Moe
              </h3>
              <button onClick={() => setShowAddReasonModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddReason} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Love Reason *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Because her voice makes every bad day better instantly..."
                  value={newReasonText}
                  onChange={(e) => setNewReasonText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={newReasonCategory}
                  onChange={(e) => setNewReasonCategory(e.target.value as LoveNote['category'])}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none"
                >
                  <option value="sweet">Sweet</option>
                  <option value="deep">Deep Love</option>
                  <option value="funny">Funny</option>
                  <option value="future">Future</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddReasonModal(false)}
                  className="px-4 py-2 rounded-full bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold"
                >
                  Save Love Reason
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
