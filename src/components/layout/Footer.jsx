'use client';

export default function Footer({ darkMode }) {
  return (
    <footer className={`border-t py-12 text-center text-sm transition-colors relative z-10 ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-600' : 'bg-white border-slate-200 text-slate-500'}`}>
      <p>&copy; 2026 Universitas Widyatama. Made with</p>
    </footer>
  );
}