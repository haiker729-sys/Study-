/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Flame, 
  Target, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTasks, useProfile } from '../hooks/useFirebase';
import { StudyStatus } from '../types';
import { generateMotivationQuote } from '../services/ai';

export default function Dashboard() {
  const { tasks } = useTasks();
  const { profile } = useProfile();
  const [quote, setQuote] = useState("Focus on being productive instead of busy.");

  useEffect(() => {
    generateMotivationQuote().then(setQuote);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.date === today);
  const completedToday = todayTasks.filter(t => t.status === StudyStatus.COMPLETED).length;
  const progress = todayTasks.length > 0 ? Math.round((completedToday / todayTasks.length) * 100) : 0;

  const nextTask = todayTasks
    .filter(t => t.status === StudyStatus.PENDING)
    .sort((a,b) => a.startTime.localeCompare(b.startTime))[0];

  return (
    <div className="space-y-8">
      {/* Welcome & Quote */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2">Hey, {profile?.displayName?.split(' ')[0]}! 👋</h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium"
          >
            <Sparkles size={16} />
            <p className="italic">"{quote}"</p>
          </motion.div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/10 p-4 rounded-3xl flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center">
                <Flame size={20} />
             </div>
             <div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Streak</p>
               <p className="text-xl font-black text-amber-700 dark:text-amber-500">{profile?.streak || 0} Days</p>
             </div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/10 p-4 rounded-3xl flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                <Trophy size={20} />
             </div>
             <div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Points</p>
               <p className="text-xl font-black text-indigo-700 dark:text-indigo-400">{profile?.points || 0}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative group">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                 <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={364.42} strokeDashoffset={364.42 * (1 - progress / 100)} className="text-indigo-600 transition-all duration-1000 ease-out" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-3xl font-black">{progress}%</span>
               </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Target size={20} className="text-indigo-600" />
                <h3 className="text-xl font-bold">Today's Focus</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                You've completed <span className="font-bold text-slate-800 dark:text-slate-200">{completedToday}</span> out of your <span className="font-bold text-slate-800 dark:text-slate-200">{todayTasks.length}</span> scheduled study sessions.
              </p>
              <div className="flex gap-3">
                 <div className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 dark:shadow-none">View Details</div>
                 <div className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold">Analyze</div>
              </div>
            </div>
          </div>
          {/* Abstract Decors */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
        </div>

        {/* Next Task Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-indigo-900 dark:to-slate-900 rounded-[2rem] p-8 text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Upcoming Session</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Clock size={16} />
              </div>
            </div>
            
            {nextTask ? (
              <>
                <h3 className="text-2xl font-bold mb-2 leading-tight">{nextTask.taskName}</h3>
                <p className="text-indigo-200 mb-4">{nextTask.subject}</p>
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs">{nextTask.startTime}</div>
                  <ChevronRight size={14} className="opacity-40" />
                  <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs">{nextTask.endTime}</div>
                </div>
              </>
            ) : (
              <div className="py-4">
                <p className="text-indigo-200 font-medium opacity-80">All caught up! No more sessions today.</p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex -space-x-2">
               {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700"></div>)}
            </div>
            <p className="text-xs font-medium opacity-60">3 Study Mates online</p>
          </div>
        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Completed", val: completedToday, icon: CheckCircle, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/10" },
          { label: "Hours Studied", val: "4.5", icon: Clock, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/10" },
          { label: "Growth", val: "+12%", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/10" },
          { label: "Badges", val: profile?.badges?.length || 0, icon: Trophy, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
              <p className="text-xl font-bold">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
