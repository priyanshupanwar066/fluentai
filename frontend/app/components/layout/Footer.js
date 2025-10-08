'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import icons with SSR disabled
const ArrowUp = dynamic(() => import('react-feather').then(mod => mod.ArrowUp), { ssr: false });
const Twitter = dynamic(() => import('react-feather').then(mod => mod.Twitter), { ssr: false });
const GitHub = dynamic(() => import('react-feather').then(mod => mod.GitHub), { ssr: false });
const Linkedin = dynamic(() => import('react-feather').then(mod => mod.Linkedin), { ssr: false });

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-blue-900 border-t border-blue-800/50 mt-20 relative">
      <div className="container mx-auto px-4 py-12">
        {/* Back to Top Button */}
        <motion.button
          whileHover={{ y: -5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute -top-6 right-6 bg-white/5 backdrop-blur-lg p-3 rounded-full border border-white/10 hover:border-blue-400 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="text-blue-400 w-5 h-5" />
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              FluentAI
            </h3>
            <p className="text-gray-400 text-sm">
              Empowering global communication through AI-powered language learning.
            </p>
            <div className="flex space-x-4">
              <motion.a whileHover={{ y: -3 }} href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a whileHover={{ y: -3 }} href="#" className="text-gray-400 hover:text-blue-400">
                <GitHub className="w-5 h-5" />
              </motion.a>
              <motion.a whileHover={{ y: -3 }} href="#" className="text-gray-400 hover:text-blue-400">
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-4">
            <h4 className="text-gray-200 font-semibold">Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Blog', 'Press'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-gray-200 font-semibold">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'Guides', 'API Status', 'Help Center'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h4 className="text-gray-200 font-semibold">Stay Updated</h4>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium py-2 rounded-lg transition-all"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} FluentAI. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;