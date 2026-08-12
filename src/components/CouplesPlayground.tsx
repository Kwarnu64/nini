import React, { useState, useEffect } from 'react';
import { DATE_IDEAS, DEFAULT_BUCKET_LIST } from '../data/anniversaryData';
import { DateIdea, BucketListItem } from '../types';
import { Sparkles, Dices, CheckSquare, Square, Plus, Award, Heart, HelpCircle, RefreshCw } from 'lucide-react';
import { romanticSynth } from '../utils/audioSynth';

export const CouplesPlayground: React.FC = () => {
  // Date Night Spinner State
  const [selectedIdea, setSelectedIdea] = useState<DateIdea | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Bucket List State
  const [bucketList, setBucketList] = useState<BucketListItem[]>(() => {
    const saved = localStorage.getItem('kwar_jain_bucket');
    return saved ? JSON.parse(saved) : DEFAULT_BUCKET_LIST;
  });
  const [newBucketTitle, setNewBucketTitle] = useState('');

  // Quiz / Compatibility State
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    localStorage.setItem('kwar_jain_bucket', JSON.stringify(bucketList));
  }, [bucketList]);

  // Spin the date night wheel
  const handleSpinDateIdea = () => {
    setIsSpinning(true);
    romanticSynth.playHeartSound();
    let count = 0;

    const interval = setInterval(() => {
      const random = DATE_IDEAS[Math.floor(Math.random() * DATE_IDEAS.length)];
      setSelectedIdea(random);
      count++;

      if (count > 12) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 120);
  };

  // Toggle bucket list items
  const toggleBucketItem = (id: string) => {
    setBucketList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
    romanticSynth.playHeartSound();
  };

  const handleAddBucketItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBucketTitle.trim()) return;

    const newItem: BucketListItem = {
      id: 'b_' + Date.now(),
      title: newBucketTitle,
      completed: false,
      category: 'romantic',
    };

    setBucketList((prev) => [...prev, newItem]);
    setNewBucketTitle('');
    romanticSynth.playHeartSound();
  };

  // Calculate Quiz Score
  const quizQuestions = [
    {
      q: 'When is Kwar Nu & Jain Moe’s Anniversary Start Date?',
      options: ['July 21, 2025', 'August 21, 2025', 'June 21, 2025'],
      correct: 0,
    },
    {
      q: 'How long are we celebrating in this milestone?',
      options: ['1 Year', '1 Year & 1 Month (13 Months)', '2 Years'],
      correct: 1,
    },
    {
      q: 'What is Kwar Nu & Jain Moe’s Love Compatibility Level?',
      options: ['99%', '100% Infinite Pure Love', '1000% Eternal Bond'],
      correct: 2,
    },
  ];

  const handleAnswerSelect = (qIdx: number, oIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const calculateQuizResult = () => {
    let score = 0;
    quizQuestions.forEach((q, i) => {
      if (answers[i] === q.correct) score += 33.3;
    });
    setQuizScore(Math.round(score));
    romanticSynth.playHeartSound();
  };

  const completedBucketCount = bucketList.filter((b) => b.completed).length;
  const bucketProgressPct = Math.round((completedBucketCount / Math.max(1, bucketList.length)) * 100);

  return (
    <section id="playground" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-rose-400 font-bold flex items-center justify-center gap-2">
          <Dices className="w-4 h-4 text-rose-500" />
          Interactive Couple Fun
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Couples Playground
        </h2>
        <p className="text-sm text-slate-300 max-w-lg mx-auto">
          Spin for date night ideas, track our relationship bucket list, and check our compatibility!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CARD 1: Spin the Date Idea Wheel */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-xl backdrop-blur-md flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Date Night Generator
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-white">
              Spin Our Date Night Idea Wheel
            </h3>
            <p className="text-xs text-slate-300">
              Can't decide what to do for our next anniversary date? Let fate decide for Kwar Nu & Jain Moe!
            </p>
          </div>

          <div className="rounded-2xl bg-slate-950/80 border border-rose-900/40 p-6 text-center space-y-3 min-h-[160px] flex flex-col justify-center items-center">
            {selectedIdea ? (
              <>
                <span className="text-4xl animate-bounce">{selectedIdea.emoji}</span>
                <h4 className="font-serif-display text-xl font-bold text-rose-200">
                  {selectedIdea.title}
                </h4>
                <p className="text-xs text-slate-300 max-w-xs">{selectedIdea.description}</p>
              </>
            ) : (
              <p className="text-sm text-slate-400 italic">
                Click the button below to spin the romantic date generator!
              </p>
            )}
          </div>

          <button
            onClick={handleSpinDateIdea}
            disabled={isSpinning}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white font-semibold text-sm shadow-lg hover:from-rose-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Dices className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'Spinning Date Wheel...' : 'Spin Romantic Date Idea'}
          </button>
        </div>

        {/* CARD 2: Relationship Bucket List Tracker */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-xl backdrop-blur-md flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4 text-rose-500" />
                Goals & Dreams
              </span>
              <span className="text-xs font-semibold text-rose-300">{bucketProgressPct}% Completed</span>
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-white">
              Our Relationship Bucket List
            </h3>
            
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-500"
                style={{ width: `${bucketProgressPct}%` }}
              />
            </div>
          </div>

          {/* List Items */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {bucketList.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleBucketItem(item.id)}
                className={`flex items-center gap-3 p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                  item.completed
                    ? 'bg-rose-950/40 border-rose-800/60 text-slate-300 line-through opacity-80'
                    : 'bg-slate-950/60 border-slate-800 text-slate-100 hover:border-slate-700'
                }`}
              >
                {item.completed ? (
                  <CheckSquare className="w-4 h-4 text-rose-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className="flex-1 font-medium">{item.title}</span>
              </div>
            ))}
          </div>

          {/* Add Bucket Item Form */}
          <form onSubmit={handleAddBucketItem} className="flex gap-2">
            <input
              type="text"
              placeholder="Add new dream goal for Year 2..."
              value={newBucketTitle}
              onChange={(e) => setNewBucketTitle(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-rose-500 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-500 shrink-0"
            >
              Add Goal
            </button>
          </form>
        </div>

      </div>

      {/* CARD 3: Couple Quiz & Match Score */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-900 border border-rose-900/50 p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-900/60 text-rose-200 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-rose-400" /> Kwar Nu & Jain Moe Love Match
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
            Relationship Compatibility Quiz
          </h3>
          <p className="text-xs text-slate-300">
            Answer these 3 quick questions to unlock our anniversary love compatibility!
          </p>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          {quizQuestions.map((q, qIdx) => (
            <div key={qIdx} className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-3">
              <p className="text-sm font-semibold text-rose-100">{qIdx + 1}. {q.q}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswerSelect(qIdx, oIdx)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-left transition-all ${
                      answers[qIdx] === oIdx
                        ? 'bg-rose-950 border-rose-500 text-rose-200 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center pt-2">
            <button
              onClick={calculateQuizResult}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-semibold shadow-lg hover:from-rose-500 hover:to-pink-500 transition-all"
            >
              Check Compatibility Result ❤️
            </button>

            {quizScore !== null && (
              <div className="mt-6 p-6 rounded-2xl bg-rose-950/90 border border-rose-500/50 text-center animate-in zoom-in-95 space-y-2">
                <span className="font-serif-display text-4xl sm:text-5xl font-extrabold text-amber-300">
                  {quizScore === 100 ? '100% Pure Eternal Love!' : `${quizScore}% Perfect Match!`}
                </span>
                <p className="text-xs text-rose-200">
                  Kwar Nu & Jain Moe are 1000% soulmates destined for a lifetime of happiness together!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
