import { FileText, TrendingUp, AlertCircle } from 'lucide-react'; 

export const currentUser = {
  name: "Reyhand Astra",
  nim: "230611003",
  avatar: "RA",
  prodi: "Informatika",
  semester: 6,
  ipk: 3.85,
  sks: 18,
  kehadiran: 100
};

export const notifications = [
  { id: 1, title: "Tugas Baru: Makalah AI", isRead: false, time: "Baru saja" },
  { id: 2, title: "Nilai UTS Keluar", isRead: false, time: "1 jam lalu" },
  { id: 3, title: "Jadwal Pengganti Web Lanjut", isRead: true, time: "Kemarin" },
];

export const myClasses = [
  { id: "c1", name: "Pemrograman Web Lanjut", code: "IF402", dosen: "Pak Sandhika", sks: 3, schedule: "Senin, 07:00", progress: 70 },
  { id: "c2", name: "Kecerdasan Buatan", code: "IF330", dosen: "Bu Susi", sks: 3, schedule: "Selasa, 10:00", progress: 45 },
  { id: "c3", name: "Riset Operasional", code: "TI201", dosen: "Pak Budi", sks: 2, schedule: "Rabu, 13:00", progress: 20 },
  { id: "c4", name: "Bahasa Inggris Bisnis", code: "UM102", dosen: "Mrs. Sarah", sks: 2, schedule: "Jumat, 08:00", progress: 90 },
];

export const deadlines = [
  { id: 1, task: "Final Project Next.js", matkul: "Pemrograman Web", due: "Besok, 23:59", priority: "high" },
  { id: 2, task: "Laporan Fuzzy Logic", matkul: "AI", due: "3 Hari lagi", priority: "medium" },
];

export const todaySchedule = [
  { time: "07:30", code: "IF402", name: "Pemrograman Web Lanjut", room: "Lab 3", status: "Berlangsung" },
  { time: "10:00", code: "IF330", name: "Kecerdasan Buatan", room: "B302", status: "Akan Datang" },
];

export const faculties = [
  { id: 1, name: "Fakultas Teknik", prodi: ["Informatika", "Industri", "Sipil"] },
  { id: 2, name: "Fakultas Ekonomi", prodi: ["Manajemen", "Akuntansi"] },
];

export const recentActivities = [
  { user: "Pak Sandhika", action: "mengunggah materi", target: "React Hooks.pdf", time: "20m lalu", icon: FileText, color: "bg-blue-100 text-blue-600" },
  { user: "Sistem", action: "memperbarui nilai", target: "UTS Riset Operasi", time: "1j lalu", icon: TrendingUp, color: "bg-green-100 text-green-600" },
  { user: "Bu Susi", action: "membuat tugas", target: "Laporan Praktikum", time: "3j lalu", icon: AlertCircle, color: "bg-orange-100 text-orange-600" },
];

export const classContents = {
  "c1": { 
    description: "Mata kuliah ini membahas framework modern JavaScript (Next.js) dan manajemen state global.",
    meetings: [
      { id: 1, title: "Pengenalan Next.js 14", date: "7 Feb", type: "Materi", file: "Slide-Intro.pdf", isDone: true },
      { id: 2, title: "Routing & Layouts", date: "14 Feb", type: "Praktek", file: "Modul-Lab-2.pdf", isDone: false },
      { id: 3, title: "Server Components", date: "21 Feb", type: "Tugas", file: null, deadline: "27 Feb", isDone: false },
    ]
  },
  "c2": { 
    description: "Konsep dasar kecerdasan buatan, Machine Learning, dan implementasi algoritma pencarian.",
    meetings: [
      { id: 1, title: "Konsep Dasar AI", date: "8 Feb", type: "Materi", file: "AI-Basic.pdf", isDone: true },
      { id: 2, title: "Fuzzy Logic", date: "15 Feb", type: "Materi", file: "Fuzzy-Logic.pdf", isDone: true },
    ]
  }
};