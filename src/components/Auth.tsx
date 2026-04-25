/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { LogIn, BookOpen, Clock, Target } from 'lucide-react';
import { signInWithGoogle } from '../services/firebase';

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side: Illustration & Branding */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-indigo-600 text-white relative">
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8"
            >
              <BookOpen size={32} />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Plan your success, one session at a time.</h1>
            <p className="text-indigo-100 text-lg mb-10 leading-relaxed font-light">Join thousands of students who have transformed their study habits with our smart timetable planner.</p>
            
            <div className="space-y-4">
              {[
                { icon: Clock, text: "Smart task reminders" },
                { icon: Target, text: "Precision progress tracking" },
                { icon: LogIn, text: "Sync across devices" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    <item.icon size={16} />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Animated Background Blob */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-50"></div>
        </div>

        {/* Right Side: Login Actions */}
        <div className="flex flex-col justify-center p-8 md:p-16">
          <div className="md:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">S</div>
            <h1 className="font-bold text-xl uppercase tracking-widest text-slate-900">StudyPlan</h1>
          </div>

          <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-500 mb-10">Log in to sync your timetable and never miss a revision session.</p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-4 bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-700 font-semibold py-4 rounded-2xl transition-all shadow-sm"
          >
            <img src="https://www.google.com/favicon.ico" className="w-6 h-6" alt="Google" />
            Sign in with Google
          </motion.button>

          <p className="mt-8 text-center text-slate-400 text-sm">
            By signing in, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
