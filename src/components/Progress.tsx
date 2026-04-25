/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { useTasks } from '../hooks/useFirebase';
import { StudyStatus } from '../types';
import { TrendingUp, Users, Calendar, Target, Trophy } from 'lucide-react';

export default function Progress() {
  const { tasks } = useTasks();

  // Process data for Weekly Performance
  const last7Days = Array.from({length: 7}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const weeklyData = last7Days.map(date => {
    const dayTasks = tasks.filter(t => t.date === date);
    const completed = dayTasks.filter(t => t.status === StudyStatus.COMPLETED).length;
    return {
      name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      completed,
      total: dayTasks.length
    };
  });

  // Process data for Subject Distribution
  const subjectsMap = tasks.reduce((acc, task) => {
    acc[task.subject] = (acc[task.subject] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const subjectData = Object.entries(subjectsMap).map(([name, value]) => ({ name, value }));

  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Your Progress</h2>
          <p className="text-slate-500">Visualizing your hard work and achievements.</p>
        </div>
        <div className="flex bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl border border-indigo-100 dark:border-indigo-900/10 items-center gap-2">
          <TrendingUp size={16} className="text-indigo-600" />
          <span className="text-sm font-bold text-indigo-700 dark:text-indigo-400">Top 5% of Students this week</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Weekly Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
             <Calendar size={20} className="text-indigo-600" />
             Weekly Completion
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f1f5f9', radius: 8}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="completed" radius={[6, 6, 0, 0]} barSize={24}>
                  {weeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.completed > 0 ? '#6366f1' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Pie Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
             <Target size={20} className="text-purple-600" />
             Subject Distribution
          </h3>
          <div className="h-72 w-full flex flex-col items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectData.length > 0 ? subjectData : [{name: 'No data', value: 1}]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {subjectData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  {subjectData.length === 0 && <Cell fill="#e2e8f0" />}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {subjectData.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                  <span className="text-xs font-semibold text-slate-500">{s.name} ({s.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="bg-indigo-600 rounded-[2rem] p-10 text-white relative overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-4xl font-black mb-4 tracking-tight">Level Up Your Studies</h3>
            <p className="text-indigo-100 text-lg mb-8 opacity-80 leading-relaxed font-light">
              You are on a 5-day study streak! Complete your session today to unlock the 'Consistency King' badge.
            </p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform">Claim Daily Bonus</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {[
               { icon: Trophy, label: "Top Performer" },
               { icon: Users, label: "Elite Member" },
             ].map((b, i) => (
               <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center">
                 <b.icon size={32} className="mx-auto mb-3" />
                 <p className="text-xs font-bold uppercase tracking-widest">{b.label}</p>
               </div>
             ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500 rounded-full -mr-20 -mt-20 blur-3xl opacity-30"></div>
      </div>
    </div>
  );
}
