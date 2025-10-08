'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Activity, Clock, AlertTriangle, LogOut, LogIn, Loader, Home, Mic, LayoutDashboard, Info, Rocket, Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Route change handler
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
  
    const handleRouteChange = () => fetchUser();
    
    // Check if router events exist before using
    if (router.events) {
      router.events.on('routeChangeComplete', handleRouteChange);
      
      // Cleanup function
      return () => {
        if (router.events) {
          router.events.off('routeChangeComplete', handleRouteChange);
        }
      };
    }
  }, [router.events]); // Use router.events in dependencies
  
  // Scroll listener (already correct)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fetch user data (already correct)
  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/protected/profile', {
        credentials: 'include',
      });
      const data = await res.json();
      setUser(res.ok ? data.user : null);
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchUser(); }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    router.push('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '/', name: 'Home', icon: <Home size={18} /> },
    { href: '/ai-feedback', name: 'Practice', icon: <Mic size={18} /> },
    { href: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={18} />, protected: true },
    { href: '/about', name: 'About', icon: <Info size={18} /> },
  ];

  const authLinks = [
    { href: '/login', name: 'Login', icon: <LogIn size={18} /> },
    { href: '/register', name: 'Register', icon: <User size={18} /> },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-blue-900/50'
          : 'bg-gradient-to-r from-gray-900 to-blue-900 border-b border-blue-900/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <Link href="/" className="relative group">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                FluentAI
              </span>
              <div className="absolute bottom-0 h-[2px] w-0 group-hover:w-full bg-cyan-400 transition-all duration-300" />
            </Link>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-blue-400">
              <Rocket size={20} />
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              (!link.protected || user) && (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group text-gray-300 hover:text-white px-3 py-2 transition-all duration-200 font-medium flex items-center gap-1.5"
                >
                  {link.icon}
                  <span>{link.name}</span>
                  <div className="absolute bottom-0 h-[2px] w-0 group-hover:w-full bg-blue-400 transition-all duration-300" />
                </Link>
              )
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <Loader className="animate-spin w-5 h-5 text-blue-400" />
            ) : user ? (
              <motion.div whileHover={{ scale: 1.05 }} className="relative group">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <User size={18} className="text-blue-400" />
                  <span className="text-gray-300">{user.user}</span>
                </div>
                <div className="absolute hidden group-hover:block right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-xl">
                  <Link
                    href="/dashboard"
                    className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700/20 flex items-center gap-2"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-900/20 flex items-center gap-2"
                  >
                    <LogOut size={16} /> 
                    Logout
                  </button>
                </div>
              </motion.div>
            ) : (
              authLinks.map((link) => (
                <motion.div key={link.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={link.href}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex items-center gap-2 transition-all"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </motion.div>
              ))
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-lg border-b border-blue-900/50"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                (!link.protected || user) && (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white rounded-lg transition-all"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                )
              ))}

              {user ? (
                <div className="pt-4 border-t border-blue-900/50 space-y-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white rounded-lg transition-all"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-900/20 rounded-lg"
                  >
                    <LogOut size={18} /> 
                    Logout
                  </button>
                </div>
              ) : (
                authLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-blue-400 hover:bg-blue-900/20 rounded-lg"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}