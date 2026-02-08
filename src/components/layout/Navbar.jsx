'use client';
import { School, Bell, Sun, Moon, User, Settings, LogOut, ChevronDown, LayoutDashboard, Calendar, BookOpen, MonitorPlay } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useState, useRef, useEffect } from 'react';

export default function Navbar({ darkMode, toggleTheme }) {
  const { user, hasUnread, markAsRead, notifs } = useAuth();
  
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['dashboard', 'jadwal', 'kelas', 'layanan'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logic Dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) setActiveDropdown(null);
    else {
      setActiveDropdown(name);
      if (name === 'notif' && hasUnread) markAsRead();
    }
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jadwal', label: 'Jadwal', icon: Calendar },
    { id: 'kelas', label: 'Kelas', icon: BookOpen },
    { id: 'layanan', label: 'Layanan', icon: MonitorPlay },
  ];

  return (
    <nav ref={navRef} className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <School className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-900'}`} />
          <div>
            <h1 className={`text-xl font-bold leading-none ${darkMode ? 'text-white' : 'text-blue-900'}`}>KULON</h1>
            <p className="text-[10px] font-bold tracking-widest text-orange-500">UNIVERSITAS WIDYATAMA</p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex gap-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 z-10 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
              >
                {/* Active State */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className={`absolute inset-0 rounded-full shadow-sm -z-10 ${darkMode ? 'bg-slate-700' : 'bg-white'}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <link.icon size={16} />
                {link.label}
              </button>
            );
          })}
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-3 md:gap-4">
           
           {/* NOTIFIKASI */}
           <div className="relative">
             <button 
                onClick={() => toggleDropdown('notif')}
                className={`p-2 rounded-full transition-colors relative ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'} ${activeDropdown === 'notif' ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
             >
                <Bell size={20} />
                {hasUnread && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-white dark:ring-slate-900"></span>
                )}
             </button>

             <AnimatePresence>
               {activeDropdown === 'notif' && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                   animate={{ opacity: 1, y: 0, scale: 1 }} 
                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
                   transition={{ duration: 0.2 }}
                   className={`absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl border p-4 overflow-hidden origin-top-right z-50 ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'}`}
                 >
                   <div className="flex justify-between items-center mb-3 px-1">
                      <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Notifikasi</h4>
                      <button className="text-[10px] text-blue-500 hover:underline">Tandai dibaca</button>
                   </div>
                   <div className="space-y-2 max-h-75 overflow-y-auto custom-scrollbar">
                     {notifs.map(n => (
                       <div key={n.id} className={`text-sm p-3 rounded-xl transition-colors cursor-pointer ${darkMode ? 'hover:bg-slate-800 bg-slate-800/30' : 'hover:bg-slate-50 bg-slate-50/50'}`}>
                          <div className="flex justify-between items-start mb-1">
                             <p className={`font-semibold text-xs ${n.isRead ? (darkMode ? 'text-slate-400' : 'text-slate-500') : 'text-blue-500'}`}>{n.title}</p>
                             <span className="text-[10px] opacity-50 whitespace-nowrap ml-2">{n.time}</span>
                          </div>
                          <p className={`text-xs truncate ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Klik untuk detail.</p>
                       </div>
                     ))}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>

           {/* THEME TOGGLE */}
           <button onClick={toggleTheme} className={`p-2 rounded-full transition-all ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              <motion.div key={darkMode ? "moon" : "sun"} initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }}>
                {darkMode ? <Moon size={18} /> : <Sun size={18} />}
              </motion.div>
           </button>

           {/* USER PROFILE */}
           <div className="relative pl-2 border-l border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => toggleDropdown('profile')}
                className="flex items-center gap-2 group focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg ring-2 ring-transparent group-hover:ring-blue-400 transition-all">
                  {user?.avatar || "MH"}
                </div>
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'profile' ? 'rotate-180' : ''} ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'profile' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl border py-2 overflow-hidden origin-top-right z-50 ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'}`}
                  >
                    <div className={`px-4 py-3 border-b mb-1 ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                      <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{user?.name || "Mahasiswa"}</p>
                      <p className="text-xs opacity-50">{user?.nim || "000000"}</p>
                    </div>
                    <div className="px-2 space-y-1">
                      <MenuItem icon={User} label="Profil Saya" darkMode={darkMode} />
                      <MenuItem icon={Settings} label="Pengaturan" darkMode={darkMode} />
                      <div className={`my-1 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}></div>
                      <MenuItem icon={LogOut} label="Keluar" color="text-red-500" hoverColor="hover:bg-red-50 dark:hover:bg-red-900/20" darkMode={darkMode} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </nav>
  );
}

function MenuItem({ icon: Icon, label, color, hoverColor, darkMode }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${color ? color : (darkMode ? 'text-slate-300' : 'text-slate-600')} ${hoverColor ? hoverColor : (darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50')}`}>
      <Icon size={16} />
      {label}
    </button>
  );
}