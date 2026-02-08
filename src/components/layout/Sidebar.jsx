'use client';
import { AlertCircle, MonitorPlay, Library, CreditCard, GraduationCap, FileText, Calendar, Bell } from 'lucide-react';
import { deadlines, faculties } from '@/data/mock'; 

const news = [
  { id: 1, title: "Jadwal Perwalian Genap", date: "2 Feb", tag: "Akademik" },
  { id: 2, title: "Maintenance Server", date: "5 Feb", tag: "System" },
];

export default function Sidebar({ darkMode }) {
  return (
    <aside className="lg:col-span-4 space-y-8">
      
      {/* Widget Deadline */}
      <div className={`rounded-2xl p-6 border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
         <h3 className="font-bold text-lg mb-5 flex items-center gap-2 text-red-500">
            <AlertCircle size={20}/> Deadline Tugas
         </h3>
         <div className="space-y-4">
            {deadlines.map((item, idx) => (
               <div key={idx} className={`p-4 rounded-xl border relative overflow-hidden group transition-all hover:scale-[1.02] cursor-pointer ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.priority === 'high' ? 'bg-red-500' : item.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                  <h4 className={`font-bold text-sm mb-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{item.task}</h4>
                  <p className="text-xs opacity-60 mb-2">{item.matkul}</p>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${item.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'}`}>Due: {item.due}</span>
               </div>
            ))}
         </div>
      </div>

      {/* Widget Layanan */}
      <div id="layanan" className={`rounded-2xl p-6 border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
         <h3 className="font-bold text-lg mb-5 flex items-center gap-2 text-blue-500">
            <MonitorPlay size={20}/> Layanan
         </h3>
         <div className="grid grid-cols-3 gap-4">
            {[
               { name: "Perpus", icon: Library, color: "text-purple-500 bg-purple-100 dark:bg-purple-900/20" },
               { name: "Keuangan", icon: CreditCard, color: "text-green-500 bg-green-100 dark:bg-green-900/20" },
               { name: "Transkrip", icon: GraduationCap, color: "text-orange-500 bg-orange-100 dark:bg-orange-900/20" },
               { name: "Surat", icon: FileText, color: "text-blue-500 bg-blue-100 dark:bg-blue-900/20" },
               { name: "Kalender", icon: Calendar, color: "text-red-500 bg-red-100 dark:bg-red-900/20" },
               { name: "Bantuan", icon:  AlertCircle, color: "text-slate-500 bg-slate-100 dark:bg-slate-800" },
            ].map((item, idx) => (
               <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}>
                     <item.icon size={20} />
                  </div>
                  <span className="text-xs font-medium opacity-80">{item.name}</span>
               </div>
            ))}
         </div>
      </div>

      {/* Widget Pengumuman */}
      <div className={`rounded-2xl p-6 border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
         <h3 className="font-bold text-lg mb-5 flex items-center gap-2 text-slate-500">
            <Bell size={20}/> Pengumuman
         </h3>
         <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
            {news.map((n, idx) => (
               <div key={idx} className="pt-3 first:pt-0 group cursor-pointer">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                     <span>{n.tag}</span>
                     <span>{n.date}</span>
                  </div>
                  <h4 className={`text-sm font-semibold group-hover:text-blue-500 transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{n.title}</h4>
               </div>
            ))}
         </div>
      </div>
    </aside>
  );
}