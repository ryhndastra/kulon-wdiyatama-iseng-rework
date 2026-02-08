'use client';
import { motion } from 'framer-motion';
import Image from 'next/image'; 
import { useAuth } from '@/context/AuthContext'; 

export default function Hero({ darkMode }) {
  const { user } = useAuth(); 

  return (
    <section className="relative h-112.5 flex items-center overflow-hidden">
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2886&auto=format&fit=crop"
          alt="Kampus Widyatama"
          fill 
          priority 
          quality={85} 
          sizes="100vw" 
          className="object-cover transform scale-105 origin-bottom" 
        />
        
        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-linear-to-r transition-colors duration-700 ${darkMode ? 'from-slate-950 via-slate-900/90 to-slate-900/40' : 'from-blue-900/95 via-blue-900/70 to-blue-600/20'}`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 max-w-3xl drop-shadow-2xl">
            Halo, {user?.name || "Mahasiswa"}! <br/> 
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-cyan-200">
              Semangat Belajar Hari Ini.
            </span>
          </h1>
          
          <p className="text-lg text-blue-100 max-w-xl mb-8 leading-relaxed font-light">
            Akses materi kuliah, diskusi, dan ujian di mana saja. Platform akademik modern Universitas Widyatama.
          </p>
        </motion.div>
      </div>
    </section>
  );
}