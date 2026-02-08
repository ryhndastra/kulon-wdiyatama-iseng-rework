'use client';
import { Clock } from 'lucide-react';
import { todaySchedule } from '@/data/mock'; 

export default function ScheduleWidget({ darkMode }) {
  return (
    <section id="jadwal">
      <div className="flex justify-between items-center mb-6">
         <h2 className={`text-xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            <Clock className="text-blue-500" /> Jadwal Hari Ini
         </h2>
         <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">Jumat, 7 Feb</span>
      </div>
      
      <div className={`rounded-3xl p-6 border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
         <div className="space-y-6 relative">
            <div className={`absolute left-13 top-2 bottom-2 w-0.5 ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>

            {todaySchedule.map((item, idx) => (
               <div key={idx} className="flex gap-6 relative z-10">
                  <div className={`flex flex-col items-center w-10 shrink-0 ${idx === 0 ? 'opacity-100' : 'opacity-60'}`}>
                     <span className="text-sm font-bold">{item.time}</span>
                     <div className={`w-3 h-3 rounded-full mt-1 border-2 ${idx === 0 ? 'bg-green-500 border-green-200 animate-pulse' : 'bg-slate-300 border-white dark:bg-slate-700 dark:border-slate-800'}`}></div>
                  </div>
                  <div className={`flex-1 p-4 rounded-xl border transition-all hover:translate-x-1 ${idx === 0 ? (darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-100') : (darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100')}`}>
                     <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-base">{item.name}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${idx === 0 ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}>{item.status}</span>
                     </div>
                     <p className="text-sm opacity-70 mb-2">{item.code} • {item.room}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </section>
  );
}