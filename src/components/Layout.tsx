/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  BarChart2, 
  BookOpen, 
  Settings, 
  Plus, 
  Moon, 
  Sun,
  User as UserIcon,
  LogOut,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, logout } from '../services/firebase';
import { useProfile } from '../hooks/useFirebase';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Layout({ children, activeTab, setActiveTab, isDarkMode, toggleDarkMode }: LayoutProps) {
  const { profile } = useProfile();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'planner', icon: Calendar, label: 'Planner' },
    { id: 'progress', icon: BarChart2, label: 'Progress' },
    { id: 'resources', icon: BookOpen, label: 'Resources' },
  ];

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">S</div>
          <h1 className="text-xl font-bold tracking-tight">StudyPlan</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <img 
                src={profile?.photoURL || "https://picsum.photos/seed/user/100/100"} 
                className="w-10 h-10 rounded-full border-2 border-indigo-500"
                alt="Profile"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold truncate text-sm">{profile?.displayName}</p>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Trophy size={12} />
                  <span>{profile?.points || 0} pts</span>
                </div>
              </div>
              <button 
                onClick={() => logout()}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-all"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto h-full mb-20 md:mb-0">
        <header className="flex md:hidden items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">S</div>
            <h1 className="font-bold text-lg">StudyPlan</h1>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={toggleDarkMode} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
               <img src={profile?.photoURL || "https://picsum.photos/seed/user/100/100"} alt="User" referrerPolicy="no-referrer" />
             </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-5xl mx-auto w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`}
          >
            <tab.icon size={20} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
