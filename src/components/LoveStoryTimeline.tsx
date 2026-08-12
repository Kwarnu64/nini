import React, { useState, useEffect } from 'react';
import { DEFAULT_MILESTONES } from '../data/anniversaryData';
import { Milestone } from '../types';
import { Heart, Plus, MapPin, Calendar, Sparkles, Filter, Trash2 } from 'lucide-react';
import { romanticSynth } from '../utils/audioSynth';

export const LoveStoryTimeline: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const saved = localStorage.getItem('kwar_jain_milestones');
    return saved ? JSON.parse(saved) : DEFAULT_MILESTONES;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  // Form fields for new milestone
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDate, setNewDate] = useState('2026-08-21');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<Milestone['category']>('special');
  const [newLocation, setNewLocation] = useState('');
  const [newEmoji, setNewEmoji] = useState('💖');

  useEffect(() => {
    localStorage.setItem('kwar_jain_milestones', JSON.stringify(milestones));
  }, [milestones]);

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const item: Milestone = {
      id: 'm_' + Date.now(),
      title: newTitle,
      subtitle: newSubtitle || newDate,
      date: newDate,
      description: newDescription,
      category: newCategory,
      location: newLocation || undefined,
      emoji: newEmoji || '💖',
    };

    setMilestones((prev) => [...prev, item].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setShowAddModal(false);
    romanticSynth.playHeartSound();

    // Reset form
    setNewTitle('');
    setNewSubtitle('');
    setNewDescription('');
    setNewLocation('');
  };

  const handleDeleteMilestone = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Remove this special milestone?')) {
      setMilestones((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const filteredMilestones = milestones.filter((m) => {
    if (activeCategory === 'all') return true;
    return m.category === activeCategory;
  });

  return (
    <section id="timeline" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest text-rose-400 font-bold flex items-center gap-2 justify-center md:justify-start">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            July 21, 2025 ➔ August 21, 2026
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Our Love Story Timeline
          </h2>
          <p className="text-sm text-slate-300">
            Key chapters in Kwar Nu & Jain Moe's 1 Year 1 Month love journey.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-semibold shadow-lg hover:from-rose-500 hover:to-pink-500 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Our Special Moment
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-12 justify-center sm:justify-start">
        {[
          { id: 'all', label: 'All Moments' },
          { id: 'anniversary', label: '🌹 Anniversaries' },
          { id: 'first-date', label: '💖 First Chapters' },
          { id: 'milestone', label: '🥂 Milestones' },
          { id: 'trip', label: '✈️ Travels & Trips' },
          { id: 'special', label: '💌 Special Days' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
              activeCategory === cat.id
                ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Timeline Container */}
      <div className="relative border-l-2 border-rose-900/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {filteredMilestones.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedMilestone(item)}
            className="relative group cursor-pointer"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-rose-500 flex items-center justify-center text-sm shadow-lg group-hover:scale-125 transition-transform group-hover:bg-rose-950">
              {item.emoji}
            </div>

            {/* Timeline Card */}
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 shadow-xl backdrop-blur-md group-hover:border-rose-500/50 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-950/60 text-rose-300 border border-rose-900/50">
                  {item.subtitle}
                </span>
                {item.location && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {item.location}
                  </span>
                )}
              </div>

              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white group-hover:text-rose-200 transition-colors mt-1">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" /> {item.date}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-rose-300 hover:underline">Click to View Details ➔</span>
                  {milestones.length > 3 && (
                    <button
                      onClick={(e) => handleDeleteMilestone(item.id, e)}
                      className="p-1 hover:text-red-400 transition-colors"
                      title="Delete moment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail View Modal */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-rose-900/50 p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-3xl">{selectedMilestone.emoji}</span>
              <button
                onClick={() => setSelectedMilestone(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                {selectedMilestone.subtitle}
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-rose-200">
                {selectedMilestone.title}
              </h3>
              {selectedMilestone.location && (
                <p className="text-xs text-rose-300/80 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {selectedMilestone.location}
                </p>
              )}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
              {selectedMilestone.description}
            </p>

            <div className="text-center pt-2">
              <span className="font-script text-2xl text-rose-300">
                Dedicated with love to Jain Moe from Kwar Nu ❤️
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Add New Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-rose-900/50 p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="font-serif-display text-lg font-bold text-rose-200">
                Add A Special Moment
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddMilestone} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Moment Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stargazing Date Night"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Emoji</label>
                  <input
                    type="text"
                    value={newEmoji}
                    onChange={(e) => setNewEmoji(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-center focus:border-rose-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subtitle / Badge</label>
                <input
                  type="text"
                  placeholder="e.g. August 2026 Special"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description / Memory Details</label>
                <textarea
                  rows={3}
                  placeholder="Describe this precious memory together..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold"
                >
                  Save Moment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
