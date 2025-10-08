"use client";
import { motion } from "framer-motion";
import { Globe, Brain, Mic, GraduationCap, Rocket, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Advanced NLP algorithms analyze your speech patterns in real-time"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Pronunciation Analysis",
      description: "Instant feedback on accent and intonation"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Personalized Coaching",
      description: "Adaptive learning paths based on your progress"
    }
  ];

  const team = [
    {
      name: "Priyanshu Panwar",
      role: "Founder & CEO",
      bio: "A visionary leader with 10+ years in language education, Priyanshu combines pedagogical expertise with tech innovation to drive FluentAI's mission of breaking language barriers globally.",
      image: "/Priyanshu.jpg",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Revolutionizing Language Learning
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            At FluentAI, we combine cutting-edge artificial intelligence with 
            proven linguistic methodologies to create the ultimate English 
            learning experience.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex justify-center mt-8"
        >
          <Sparkles className="w-16 h-16 text-amber-400 animate-pulse" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-blue-50 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/stars.svg')]" />
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Globe className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
            Global Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-white/10 rounded-xl backdrop-blur-sm"
              >
                <div className="text-4xl font-bold mb-2 text-blue-200">{stat.value}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Leadership Team
          </motion.h2>
          
          <div className="flex justify-center">
            {team.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow max-w-sm w-full mx-4"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                    <span className="px-3 py-1 w-[150px] bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Rocket className="w-16 h-16 mx-auto mb-6 text-amber-300" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-6">Start Your Journey Today</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Join our community of 50,000+ learners across 150+ countries
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg"
          >
            Begin Free Trial
          </motion.button>
        </div>
      </section>
    </div>
  );
}

const stats = [
  { value: "95%", label: "User Satisfaction Rate" },
  { value: "50k+", label: "Active Learners" },
  { value: "150+", label: "Countries Worldwide" },
];