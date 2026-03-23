import React from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, Zap, Grid, Star, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { TOOLS } from "@/src/constants/tools";
import { SEO } from "@/src/components/SEO";

const TypingText = () => {
  const [text, setText] = React.useState("");
  const fullText = "👋 Hi, what do you want to create today?";
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText("");
        setIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="h-8 flex items-center justify-center">
      <span className="text-purple-400 font-mono text-lg md:text-xl">
        {text}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
};

export const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredTools = TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative overflow-hidden">
      <SEO 
        title="Zyven - Smart AI Tools for Everyday Tasks" 
        description="Create, write, reply, and generate anything instantly with Zyven's suite of smart AI tools. Boost your productivity with our free AI generators."
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 flex flex-col items-center text-center px-4">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Zyven – Free AI Tools <br /> for Content Creators
          </h1>
          <p className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Boost your productivity with Zyven's suite of <strong>free AI tools</strong>. From <strong>AI caption generators</strong> to <strong>YouTube script writers</strong>, we help you create content faster.
          </p>

          <TypingText />

          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search for a tool..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
              />
            </div>
            <a href="#tools" className="w-full md:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-2xl font-bold transition-all shadow-lg shadow-purple-600/20 whitespace-nowrap flex items-center justify-center">
              Start Now
            </a>
          </div>
        </motion.div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-widest mb-2">
              <Zap className="w-4 h-4" />
              <span>Explore Tools</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              🔥 Trending AI Tools
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm font-medium border border-white/10 text-white/60">
              <TrendingUp className="w-4 h-4" />
              Trending
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm font-medium border border-white/10 text-white/60">
              <Star className="w-4 h-4" />
              Featured
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, idx) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to={`/tools/${tool.slug}`}
                className="group relative block p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[60px] -z-10 group-hover:bg-purple-600/20 transition-colors" />
                
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <tool.icon className="w-7 h-7 text-purple-400" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-bold text-purple-400 group-hover:gap-4 transition-all">
                  Try {tool.name} <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Internal Linking Boost */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px]">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Users also tried
          </h3>
          <div className="flex flex-wrap gap-3">
            {TOOLS.map(tool => (
              <Link 
                key={tool.id}
                to={`/tools/${tool.slug}`}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-bold hover:bg-purple-600/20 hover:border-purple-500/50 transition-all"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white/[0.02] py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-widest mb-2">
              <Grid className="w-4 h-4" />
              <span>Categories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Browse by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Social Media", "Writing", "Video", "Marketing"].map((cat) => (
              <div key={cat} className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:bg-white/10 transition-colors cursor-pointer group">
                <span className="font-bold text-white/70 group-hover:text-white transition-colors">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[120px] -z-10" />
          
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to supercharge <br /> your productivity?
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-lg">
              Join thousands of creators using Zyven to automate their daily tasks and focus on what really matters.
            </p>
            <a href="#tools" className="inline-block px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all hover:scale-105">
              Get Started for Free
            </a>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4">
            {TOOLS.slice(0, 4).map((tool) => (
              <div key={tool.id} className="p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl">
                <tool.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h4 className="font-bold text-sm">{tool.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
