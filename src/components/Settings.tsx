/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Download, 
  Printer, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Smartphone,
  Eye,
  FileImage,
  FileText
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Settings() {
  const exportPDF = async () => {
    const element = document.getElementById('root');
    if (!element) return;
    
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('study-timetable.pdf');
  };

  const exportImage = async () => {
    const element = document.getElementById('root');
    if (!element) return;
    const canvas = await html2canvas(element);
    const link = document.createElement('a');
    link.download = 'study-timetable.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">App Settings</h2>
        <p className="text-slate-500">Customize your experience and manage your data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Export Options */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
             <Download size={20} className="text-indigo-600" />
             Export & Print
          </h3>
          
          <div className="space-y-4">
            <button 
              onClick={exportPDF}
              className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 group transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold">Export as PDF</p>
                  <p className="text-xs text-slate-400">High-quality document format</p>
                </div>
              </div>
              <Download size={18} className="text-slate-300 group-hover:text-indigo-600" />
            </button>

            <button 
              onClick={exportImage}
              className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 group transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                  <FileImage size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold">Export as Image</p>
                  <p className="text-xs text-slate-400">PNG format for sharing</p>
                </div>
              </div>
              <Download size={18} className="text-slate-300 group-hover:text-indigo-600" />
            </button>

            <button 
              onClick={handlePrint}
              className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 group transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/20 text-green-600 flex items-center justify-center">
                  <Printer size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold">Print Timetable</p>
                  <p className="text-xs text-slate-400">Optimized for A4 paper</p>
                </div>
              </div>
              <Download size={18} className="text-slate-300 group-hover:text-indigo-600" />
            </button>
          </div>
        </div>

        {/* Notifications & Preferences */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
             <Bell size={20} className="text-purple-600" />
             Notification Settings
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Task Reminders</p>
                <p className="text-xs text-slate-500">Get notified 10 minutes before starting</p>
              </div>
              <div className="w-12 h-6 bg-indigo-600 rounded-full relative p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm transition-all"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Break Notifications</p>
                <p className="text-xs text-slate-500">Daily reminders to take a break</p>
              </div>
              <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 shadow-sm transition-all"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Study Streak Alerts</p>
                <p className="text-xs text-slate-500">Don't lose your streak! Alerts at 9 PM</p>
              </div>
              <div className="w-12 h-6 bg-indigo-600 rounded-full relative p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm transition-all"></div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-4 text-slate-400">
                <Shield size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Privacy & Security</span>
                <ChevronRight size={14} className="ml-auto" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
