'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { currentUser, notifications as initialNotifs } from '@/data/mock';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [notifs, setNotifs] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(currentUser);
      setNotifs(initialNotifs);
      
      const unread = initialNotifs.some(n => !n.isRead);
      setHasUnread(unread);
      setIsLoading(false);
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  const markAsRead = () => {
    setHasUnread(false);
    setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <AuthContext.Provider value={{ user, notifs, hasUnread, markAsRead, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}