'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Mic, Globe, Users, Rocket, Award, Clock } from "lucide-react";

const Feature = ({ icon, title, description, color }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
  >
    <div className={`mb-4 text-4xl p-4 rounded-lg bg-gradient-to-r ${color} inline-block`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-200 leading-relaxed">{description}</p>
    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="h-1 bg-gradient-to-r from-blue-400 to-indigo-400 w-8 rounded-full"></div>
    </div>
  </motion.div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 animate-gradient-flow" />
      </div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center mb-16 relative z-10"
      >
        <div className="mb-8 flex bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 border border-white/20">
          <span className="text-blue-400 font-semibold flex items-center gap-2">
            <Rocket className="w-5 h-5" /> New Feature: Real-time Pronunciation Analysis!
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
          Master English Speaking<br/>with AI Precision
        </h1>
        
        <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
          Transform your spoken English through <span className="font-semibold text-blue-400">real-time AI analysis</span> of your grammar, fluency, and pronunciation. Get personalized feedback instantly!
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/ai-feedback"
            className="flex bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl items-center gap-2"
          >
            <Mic className="w-5 h-5" /> Start Free Trial
          </Link>
        </motion.div>

        <div className="mt-6 text-sm text-gray-400 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" /> 50,000+ Learners
          </span>
          <span className="flex items-center gap-1">
            <Globe className="w-4 h-4" /> 150+ Countries
          </span>
          <span className="flex items-center gap-1">
            <Award className="w-4 h-4" /> 4.9/5 Rating
          </span>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="w-full max-w-7xl px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          <Feature
            icon={<Mic className="w-8 h-8" />}
            title="Speech Analysis"
            description="Real-time feedback on pronunciation and fluency"
            color="from-blue-400 to-indigo-400"
          />
          <Feature
            icon={<Clock className="w-8 h-8" />}
            title="Progress Tracking"
            description="Detailed analytics & personalized improvement plans"
            color="from-green-400 to-teal-400"
          />
          <Feature
            icon={<Globe className="w-8 h-8" />}
            title="Global Community"
            description="Practice with learners from around the world"
            color="from-purple-400 to-pink-400"
          />
          <Feature
            icon={<Award className="w-8 h-8" />}
            title="Certification"
            description="Earn recognized English proficiency certificates"
            color="from-orange-400 to-red-400"
          />
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 w-full max-w-6xl relative z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {[
            { value: "95%", label: "Success Rate" },
            { value: "1M+", label: "Exercises Completed" },
            { value: "50k+", label: "Active Users" },
            { value: "4.9/5", label: "User Rating" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Testimonial Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-20 max-w-4xl w-full relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 mx-4">
          <p className="text-2xl italic text-gray-200 mb-4">
            FluentAI helped me reduce my accent and finally feel confident in international meetings
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
              <span className="text-white">MS</span>
            </div>
            <div>
              <p className="font-semibold text-white">Maria Sanchez</p>
              <p className="text-sm text-gray-400">Product Manager, Spain</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 w-full max-w-4xl relative z-10"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Your Journey Today</h2>
          <p className="text-gray-200 mb-6">Join thousands of successful learners worldwide</p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all"
          >
            Get Started Free
          </Link>
        </div>
      </motion.div>
    </div>
  );
}