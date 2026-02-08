'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import StatsOverview from '@/components/sections/StatsOverview';
import ScheduleWidget from '@/components/sections/ScheduleWidget';
import ClassList from '@/components/sections/ClassList';
import ActivityLog from '@/components/sections/ActivityLog';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      
      const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setDarkMode(isDark);
      if (isDark) document.documentElement.classList.add('dark');
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950"></div>;
  }

  return (
    <div className={`min-h-screen font-sans selection:bg-orange-500 selection:text-white ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-40 mix-blend-multiply animate-pulse ${darkMode ? 'bg-blue-900' : 'bg-blue-200'}`}></div>
        <div className={`absolute top-[30%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-40 mix-blend-multiply animate-pulse ${darkMode ? 'bg-indigo-900' : 'bg-orange-100'}`}></div>
      </div>

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <div id="dashboard">
         <Hero darkMode={darkMode} />
         <StatsOverview darkMode={darkMode} />
      </div>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <div className="lg:col-span-8 space-y-10">
           <div id="jadwal" className="scroll-mt-28">
              <ScheduleWidget darkMode={darkMode} />
           </div>
           
           <div id="kelas" className="scroll-mt-28">
              <ClassList darkMode={darkMode} />
           </div>
           
           <ActivityLog darkMode={darkMode} />
        </div>
        
        <Sidebar darkMode={darkMode} />
      </main>
      
      <Footer darkMode={darkMode} />
    </div>
  );
}