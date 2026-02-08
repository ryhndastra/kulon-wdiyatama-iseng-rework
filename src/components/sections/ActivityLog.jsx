'use client';
import { Activity } from 'lucide-react';
import { recentActivities } from '@/data/mock'; 

export default function ActivityLog({ darkMode }) {
  return (
    <section>
      <h2 className={`text-xl font-bold flex items-center gap-2 mb-6 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
         <Activity className="text-purple-500" /> Aktivitas Terbaru
      </h2>
      <div className={`rounded-3xl p-1 border shadow-sm overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
         <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentActivities.map((act, idx) => (
               <div key={idx} className="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${act.color}`}>
                     <act.icon size={18} />
                  </div>
                  <div>
                     <p className={`text-sm ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        <span className="font-bold">{act.user}</span> {act.action} <span className="font-bold text-blue-500">{act.target}</span>
                     </p>
                     <span className="text-xs opacity-50">{act.time}</span>
                  </div>
               </div>
            ))}
         </div>
         <button className="w-full py-3 text-xs font-bold text-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            Lihat Semua Log Aktivitas
         </button>
      </div>
    </section>
  );
}