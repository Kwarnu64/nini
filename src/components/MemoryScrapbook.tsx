import React, { useState, useEffect } from 'react';
import { DEFAULT_SCRAPBOOK } from '../data/anniversaryData';
import { ScrapbookItem } from '../types';
import { Camera, Plus, Heart, Sparkles, Image, Trash2, Maximize2 } from 'lucide-react';
import { romanticSynth } from '../utils/audioSynth';

export const MemoryScrapbook: React.FC = () => {
  const [items, setItems] = useState<ScrapbookItem[]>(() => {
    const saved = localStorage.getItem('kwar_jain_scrapbook');
    return saved ? JSON.parse(saved) : DEFAULT_SCRAPBOOK;
  });

  const [activePhoto, setActivePhoto] = useState<ScrapbookItem | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Add photo form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('August 2026');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [tag, setTag] = useState('Special Memory');

  useEffect(() => {
    localStorage.setItem('kwar_jain_scrapbook', JSON.stringify(items));
  }, [items]);

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    const newPhoto: ScrapbookItem = {
      id: 's_' + Date.now(),
      title,
      date,
      imageUrl,
      caption: caption || title,
      tag: tag || 'Anniversary Memory',
      rotation: (Math.random() - 0.5) * 6,
    };

    setItems((prev) => [newPhoto, ...prev]);
    setShowAddModal(false);
    romanticSynth.playHeartSound();

    // Reset form
    setTitle('');
    setImageUrl('');
    setCaption('');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this photo memory?')) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="scrapbook" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs uppercase tracking-widest text-rose-400 font-bold flex items-center gap-2 justify-center sm:justify-start">
            <Camera className="w-4 h-4 text-rose-500" />
            Polaroid Memory Scrapbook
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Kwar Nu & Jain Moe Photo Memories
          </h2>
          <p className="text-sm text-slate-300">
            A visual gallery of our sweetest moments together.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-semibold shadow-lg hover:from-rose-500 hover:to-pink-500 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Our Photo
        </button>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group cursor-pointer rounded-2xl bg-slate-100 text-slate-900 p-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 relative border-4 border-white/90"
            style={{
              transform: `rotate(${item.rotation}deg)`,
            }}
          >
            {/* Washi Tape Accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-rose-300/60 backdrop-blur-sm transform -rotate-2 z-10 rounded-sm shadow-sm" />

            <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 mb-3 group">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/70 text-white text-[10px] font-semibold">
                {item.tag}
              </div>
              <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Maximize2 className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif-display font-bold text-base text-slate-900 line-clamp-1">
                {item.title}
              </h3>
              <p className="font-script text-lg text-rose-700 line-clamp-2">
                "{item.caption}"
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                <span>{item.date}</span>
                <button
                  onClick={(e) => handleDelete(item.id, e)}
                  className="hover:text-red-600 transition-colors"
                  title="Delete photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Zoom Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-xl w-full rounded-3xl bg-slate-900 border border-rose-900/50 p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                {activePhoto.tag}
              </span>
              <button
                onClick={() => setActivePhoto(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 max-h-96 aspect-auto">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain mx-auto"
              />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif-display text-2xl font-bold text-white">
                {activePhoto.title}
              </h3>
              <p className="font-script text-2xl text-rose-300">
                "{activePhoto.caption}"
              </p>
              <span className="text-xs text-slate-400 block pt-2 border-t border-slate-800">
                Date: {activePhoto.date} • Kwar Nu & Jain Moe Memory
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-rose-900/50 p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="font-serif-display text-lg font-bold text-rose-200">
                Add Scrapbook Photo Memory
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Memory Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anniversary Date Night"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Photo Image Source *</label>
                <input
                  type="url"
                  placeholder="Paste Image URL (https://...)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none mb-2"
                />
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>Or upload from device:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="text-xs text-slate-300 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-950 file:text-rose-200 hover:file:bg-rose-900 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="text"
                    placeholder="e.g. August 2026"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Special Date"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Romantic Caption</label>
                <input
                  type="text"
                  placeholder="e.g. Jain Moe smiling under golden lights..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none"
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
