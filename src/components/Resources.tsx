/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  Search, 
  ExternalLink, 
  ArrowRight,
  BookOpen,
  Zap,
  Coffee,
  Brain
} from 'lucide-react';
import { motion } from 'motion/react';
import { fetchStudyTips } from '../services/ai';
import { StudyTip } from '../types';

export default function Resources() {
  const [tips, setTips] = useState<StudyTip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudyTips().then(data => {
      setTips(data);
      setLoading(false);
    });
  }, []);

  const categoryIcons = {
    motivation: Coffee,
    technique: Zap,
    'subject-guide': BookOpen,
  };

  const categoryColors = {
    motivation: 'bg-amber-100 text-amber-600',
    technique: 'bg-indigo-100 text-indigo-600',
    'subject-guide': 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Study Resources</h2>
          <p className="text-slate-500">Boost your productivity with AI-curated tips and techniques.</p>
        </div>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="w-full md:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
          />
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({length: 6}).map((_, i) => (
            <div key={i} className="bg-slate-100 dark:bg-slate-900 h-64 rounded-3xl animate-pulse"></div>
          ))
        ) : (
          tips.map((tip, idx) => {
            const Icon = categoryIcons[tip.category] || Lightbulb;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={tip.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl ${categoryColors[tip.category]} flex items-center justify-center mb-6`}>
                  <Icon size={24} />
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">{tip.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {tip.content}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{tip.category}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Featured Technique */}
      <div className="mt-12 bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white grid md:grid-cols-2 gap-12 items-center">
        <div>
           <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
              <Brain size={32} className="text-indigo-400" />
           </div>
           <h3 className="text-4xl font-black mb-6 tracking-tight">The Pomodoro Technique</h3>
           <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
             A time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
           </p>
           <button className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-indigo-500/50 transition-all">
             Start a Session <ArrowRight size={20} />
           </button>
        </div>
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5">
           <img 
             src="https://picsum.photos/seed/focus/800/600" 
             className="w-full h-full object-cover opacity-60" 
             alt="Focus" 
             referrerPolicy="no-referrer"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                 <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
