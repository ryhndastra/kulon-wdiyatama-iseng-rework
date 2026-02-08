'use client';
import Link from 'next/link';
import { BookOpen, Users, Clock, ChevronRight } from 'lucide-react';
import { myClasses } from '@/data/mock'; 

export default function ClassList({ darkMode }) {
  return (
    <section id="kelas">
      <div className="flex justify-between items-end mb-6">
        <h2 className={`text-xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
           <BookOpen className="text-orange-500" /> Kelas Semester Ini
        </h2>
        <Link href="#" className="text-blue-600 text-sm font-semibold hover:underline">Lihat Semua</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {myClasses.map((cls) => (
          <Link href={`/class/${cls.id}`} key={cls.id} className="group block h-full">
            <div className={`h-full rounded-2xl p-5 border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col ${darkMode ? 'bg-slate-900 border-slate-800 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:border-blue-300'}`}>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">{cls.code}</span>
                <span className={`text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{cls.sks} SKS</span>
              </div>
              <h3 className={`font-bold text-lg mb-1 group-hover:text-blue-500 transition-colors line-clamp-1 ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{cls.name}</h3>
              <p className={`text-sm flex items-center gap-1 mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}><Users size={14} /> {cls.dosen}</p>
              <div className={`mt-auto pt-4 border-t flex justify-between items-center text-sm ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                 <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}><span className="flex items-center gap-1"><Clock size={14}/> {cls.schedule}</span></span>
                 <ChevronRight size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}