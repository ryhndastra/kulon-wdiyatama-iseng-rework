'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { myClasses, classContents } from '@/data/mock';
import Navbar from '@/components/layout/Navbar'; 
import Footer from '@/components/layout/Footer';
import { 
  ArrowLeft, BookOpen, Clock, Users, FileText, 
  Download, CheckCircle, PlayCircle, Folder 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ClassDetail() {
  const params = useParams();
  const { id } = params;
  
  // State Theme
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('materi'); 

  const classInfo = myClasses.find(c => c.id === id) || myClasses[0];
  const content = classContents[id] || { description: "Belum ada deskripsi.", meetings: [] };

  useEffect(() => {
    setMounted(true);
    const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');
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

  if (!mounted) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950"></div>;

  return (
    <div className={`min-h-screen font-sans selection:bg-orange-500 selection:text-white ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-40 mix-blend-multiply animate-pulse ${darkMode ? 'bg-blue-900' : 'bg-blue-200'}`}></div>
        <div className={`absolute bottom-[10%] right-[0%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-40 mix-blend-multiply animate-pulse ${darkMode ? 'bg-indigo-900' : 'bg-orange-100'}`}></div>
      </div>

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <main className="relative z-10 pb-20">
        
        {/* --- CLASS HERO HEADER --- */}
        <section className="relative h-75 flex items-end pb-10 overflow-hidden">
            <div className={`absolute inset-0 bg-linear-to-r ${darkMode ? 'from-slate-900 via-blue-950 to-slate-900' : 'from-blue-600 via-blue-500 to-indigo-500'}`}></div>
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-medium">
                    <ArrowLeft size={18} /> Kembali ke Dashboard
                </Link>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold mb-2">
                                {classInfo.code} • {classInfo.sks} SKS
                            </span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">
                                {classInfo.name}
                            </h1>
                            <p className="text-blue-100 flex items-center gap-2">
                                <Users size={16} /> Dosen: <span className="font-bold">{classInfo.dosen}</span>
                            </p>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 w-full md:w-64">
                            <div className="flex justify-between text-xs text-white mb-1">
                                <span>Progress Kelas</span>
                                <span className="font-bold">{classInfo.progress || 0}%</span>
                            </div>
                            <div className="w-full bg-black/20 rounded-full h-2">
                                <div 
                                    className="bg-orange-400 h-2 rounded-full transition-all duration-1000" 
                                    style={{ width: `${classInfo.progress || 0}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            
            {/* MAIN CONTENT */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* TABS MENU */}
                <div className={`flex gap-1 p-1 rounded-xl border overflow-x-auto ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    {['materi', 'tugas', 'diskusi', 'nilai'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-bold capitalize transition-all ${
                                activeTab === tab 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : `hover:bg-slate-100 dark:hover:bg-slate-800 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* CONTENT AREA */}
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                    className={`rounded-3xl p-6 border min-h-100 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}
                >
                    <div className="mb-6">
                        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            Pertemuan & Materi
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {content.description}
                        </p>
                    </div>

                    {/* LIST PERTEMUAN (ACCORDION STYLE) */}
                    <div className="space-y-4">
                        {content.meetings.length > 0 ? (
                            content.meetings.map((meet, idx) => (
                                <div key={meet.id} className={`group p-5 rounded-2xl border transition-all hover:border-blue-500/50 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        
                                        {/* Icon & Judul */}
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-lg font-bold ${
                                                meet.isDone 
                                                ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
                                                : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                            }`}>
                                                {meet.isDone ? <CheckCircle size={24} /> : idx + 1}
                                            </div>
                                            <div>
                                                <h4 className={`font-bold text-lg group-hover:text-blue-500 transition-colors ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                                    {meet.title}
                                                </h4>
                                                <div className="flex items-center gap-3 text-xs opacity-60 mt-1">
                                                    <span className="flex items-center gap-1"><Clock size={12}/> {meet.date}</span>
                                                    <span className={`px-2 py-0.5 rounded font-bold uppercase ${meet.type === 'Tugas' ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                                                        {meet.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        {meet.file && (
                                            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-colors ${darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-white text-slate-600'}`}>
                                                <Download size={16} />
                                                <span className="hidden sm:inline">Unduh Materi</span>
                                            </button>
                                        )}
                                        {meet.type === 'Tugas' && (
                                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30">
                                                <FileText size={16} />
                                                Submit Tugas
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 opacity-50">
                                <Folder size={48} className="mx-auto mb-2" />
                                <p>Belum ada materi untuk kelas ini.</p>
                            </div>
                        )}
                    </div>

                </motion.div>
            </div>

            {/* SIDEBAR INFO (RIGHT) */}
            <div className="lg:col-span-4 space-y-6">
                <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <BookOpen className="text-orange-500" /> Informasi Kelas
                    </h3>
                    <div className="space-y-4 text-sm">
                        <InfoRow label="Kode Mata Kuliah" value={classInfo.code} darkMode={darkMode} />
                        <InfoRow label="SKS" value={`${classInfo.sks} SKS`} darkMode={darkMode} />
                        <InfoRow label="Ruangan" value="Lab Komputer 3" darkMode={darkMode} />
                        <InfoRow label="Jadwal" value={classInfo.schedule} darkMode={darkMode} />
                        <div className={`h-px my-2 ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
                        <div className="pt-2">
                            <p className="font-bold mb-2 opacity-70">Forum Diskusi</p>
                            <button className="w-full py-2.5 rounded-xl border border-dashed border-blue-400 text-blue-500 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                Lihat Forum Diskusi
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Banner Mini */}
                <div className={`p-6 rounded-3xl border relative overflow-hidden ${darkMode ? 'bg-linear-to-br from-indigo-900 to-purple-900 border-indigo-800' : 'bg-linear-to-br from-indigo-500 to-purple-600 border-indigo-400'}`}>
                    <div className="relative z-10 text-white">
                        <h3 className="font-bold text-lg mb-1">Rekaman Kelas</h3>
                        <p className="text-xs text-indigo-100 mb-4">Tonton ulang pertemuan minggu lalu.</p>
                        <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-50 transition-colors">
                            <PlayCircle size={16} /> Tonton Sekarang
                        </button>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
                        <PlayCircle size={100} className="text-white" />
                    </div>
                </div>
            </div>

        </div>
      </main>
      
      <Footer darkMode={darkMode} />
    </div>
  );
}

// Helper
function InfoRow({ label, value, darkMode }) {
    return (
        <div className="flex justify-between items-center">
            <span className={`opacity-60 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{label}</span>
            <span className={`font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{value}</span>
        </div>
    );
}