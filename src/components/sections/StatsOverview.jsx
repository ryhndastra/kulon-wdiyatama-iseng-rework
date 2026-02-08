'use client';
import { TrendingUp, BookOpen, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function StatsOverview({ darkMode }) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card title="IPK Sementara" value={user.ipk} icon={TrendingUp} color="text-green-500" bg="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" darkMode={darkMode} />
        <Card title="SKS Diambil" value={`${user.sks} SKS`} icon={BookOpen} color="text-blue-500" bg="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" darkMode={darkMode} />
        <Card title="Kehadiran" value={`${user.kehadiran}%`} icon={ShieldCheck} color="text-orange-500" bg="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" darkMode={darkMode} />
      </motion.div>
    </div>
  );
}

function Card({ title, value, icon: Icon, color, bg, darkMode }) {
  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-xl flex items-center justify-between shadow-lg transition-all hover:-translate-y-1 ${darkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white/90 border-slate-100'}`}>
       <div>
          <p className="text-xs font-bold opacity-60 uppercase tracking-wider mb-1">{title}</p>
          <h3 className={`text-4xl font-extrabold ${color}`}>{value}</h3>
       </div>
       <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}>
          <Icon size={24} />
       </div>
    </div>
  );
}