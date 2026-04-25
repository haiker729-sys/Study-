/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Tag, 
  AlertCircle,
  ChevronRight,
  Filter,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTasks } from '../hooks/useFirebase';
import { StudyStatus, Priority } from '../types';

export default function Planner() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<StudyStatus | 'all'>('all');

  const [formData, setFormData] = useState({
    subject: '',
    taskName: '',
    startTime: '09:00',
    endTime: '10:00',
    priority: Priority.MEDIUM,
    color: '#6366f1'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      ...formData,
      status: StudyStatus.PENDING,
      date: new Date().toISOString().split('T')[0]
    });
    setFormData({
      subject: '',
      taskName: '',
      startTime: '09:00',
      endTime: '10:00',
      priority: Priority.MEDIUM,
      color: '#6366f1'
    });
    setShowAddForm(false);
  };

  const filteredTasks = tasks
    .filter(t => filter === 'all' || t.status === filter)
    .sort((a,b) => a.startTime.localeCompare(b.startTime));

  const priorityColors = {
    [Priority.LOW]: 'bg-blue-100 text-blue-700',
    [Priority.MEDIUM]: 'bg-amber-100 text-amber-700',
    [Priority.HIGH]: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Time Table Planner</h2>
          <p className="text-slate-500">Design your perfect study schedule for today.</p>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {(['all', StudyStatus.PENDING, StudyStatus.COMPLETED] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    filter === f ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500'
                  }`}
                >
                  {f}
                </button>
              ))}
           </div>
           <button 
             onClick={() => setShowAddForm(true)}
             className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl shadow-lg transition-all"
           >
             <Plus size={24} />
           </button>
        </div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Mathematics"
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Task Details</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Calculus Revision"
                    value={formData.taskName}
                    onChange={e => setFormData({...formData, taskName: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Start Time</label>
                  <input 
                    type="time" 
                    required
                    value={formData.startTime}
                    onChange={e => setFormData({...formData, startTime: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">End Time</label>
                  <input 
                    type="time" 
                    required
                    value={formData.endTime}
                    onChange={e => setFormData({...formData, endTime: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Priority</label>
                  <select 
                    value={formData.priority}
                    onChange={e => setFormData({...formData, priority: e.target.value as Priority})}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={Priority.LOW}>Low</option>
                    <option value={Priority.MEDIUM}>Medium</option>
                    <option value={Priority.HIGH}>High</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Theme Color</label>
                  <input 
                    type="color" 
                    value={formData.color}
                    onChange={e => setFormData({...formData, color: e.target.value})}
                    className="w-full h-14 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-indigo-200 dark:shadow-none transition-all"
                >
                  Create Task
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-8 bg-slate-100 dark:bg-slate-800 font-bold rounded-2xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-20 bg-slate-100 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No tasks planned yet</h3>
            <p className="text-slate-500">Tap the plus button to start your daily schedule.</p>
          </div>
        ) : (
          filteredTasks.map((task, idx) => (
            <motion.div
              layout
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 hover:shadow-xl transition-all"
            >
              <div 
                className="w-1.5 h-16 rounded-full shrink-0" 
                style={{ backgroundColor: task.color }}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">{task.subject}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${priorityColors[task.priority]}`}>{task.priority}</span>
                </div>
                <h4 className={`text-lg font-bold truncate ${task.status === StudyStatus.COMPLETED ? 'line-through text-slate-400' : ''}`}>
                  {task.taskName || 'Untitled Session'}
                </h4>
                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{task.startTime} - {task.endTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => updateTask(task.id, { status: task.status === StudyStatus.COMPLETED ? StudyStatus.PENDING : StudyStatus.COMPLETED })}
                  className={`p-2 rounded-xl transition-all ${task.status === StudyStatus.COMPLETED ? 'bg-green-100 text-green-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                >
                  <CheckCircle2 size={22} />
                </button>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-2 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-500"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            </motion.div>
          )
        ))}
      </div>
    </div>
  );
}
