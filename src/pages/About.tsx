import React from "react";
import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { Sparkles, Zap, Shield, Globe } from "lucide-react";

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SEO 
        title="About Us - Zyven AI" 
        description="Learn more about Zyven AI and our mission to empower content creators with free, high-quality AI tools."
        canonical="/about"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 rounded-full text-purple-400 text-sm font-bold mb-6 border border-purple-500/20">
          <Sparkles className="w-4 h-4" />
          Our Mission
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Empowering Creativity <br /> with AI
        </h1>
        <p className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
          Zyven was founded with a simple goal: to make professional-grade AI tools accessible to everyone, for free. We believe that technology should be a bridge, not a barrier.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {[
          {
            icon: Zap,
            title: "Speed",
            desc: "Generate high-quality content in seconds, not hours."
          },
          {
            icon: Shield,
            title: "Privacy",
            desc: "Your data is yours. We don't store your personal inputs."
          },
          {
            icon: Globe,
            title: "Accessibility",
            desc: "Free tools for creators, students, and businesses worldwide."
          },
          {
            icon: Sparkles,
            title: "Quality",
            desc: "Powered by the latest AI models for human-like results."
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="p-8 bg-white/5 border border-white/10 rounded-3xl"
          >
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6">
              <item.icon className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-white/50 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <p className="text-white/60 mb-6 leading-relaxed">
          Zyven started as a small project to help social media managers automate repetitive tasks. Today, it has grown into a comprehensive platform used by thousands of creators globally. We are constantly innovating and adding new tools to our suite, ensuring that you always have the best AI at your fingertips.
        </p>
        <p className="text-white/60 leading-relaxed">
          Whether you're writing your first blog post, planning a viral YouTube video, or just looking for the perfect Instagram caption, Zyven is here to support your journey.
        </p>
      </div>
    </div>
  );
};
