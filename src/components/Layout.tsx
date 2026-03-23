import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Github, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Zyven
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={cn("text-sm font-medium transition-colors hover:text-purple-400", location.pathname === "/" ? "text-purple-400" : "text-white/70")}>
                Home
              </Link>
              <a href="/#tools" className="text-sm font-medium text-white/70 hover:text-purple-400 transition-colors">
                Tools
              </a>
              <a href="/#tools" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors border border-white/10">
                Start Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-white/70" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-16 left-0 w-full bg-black/95 border-b border-white/5 p-4"
            >
              <div className="flex flex-col gap-4">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Home</Link>
                <a href="/#tools" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Tools</a>
                <a href="/#tools" onClick={() => setIsMenuOpen(false)} className="w-full py-3 bg-purple-600 rounded-xl text-center font-bold">Start Now</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/50 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <span className="text-2xl font-bold tracking-tight">Zyven</span>
              </Link>
              <p className="text-white/50 max-w-sm leading-relaxed">
                Smart AI tools for everyday tasks. Create, write, and generate anything instantly with the power of advanced artificial intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Tools</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><Link to="/tools/caption-generator" className="hover:text-purple-400 transition-colors">Caption Generator</Link></li>
                <li><Link to="/tools/content-writer" className="hover:text-purple-400 transition-colors">Content Writer</Link></li>
                <li><Link to="/tools/youtube-script-generator" className="hover:text-purple-400 transition-colors">YouTube Scripts</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                <li><Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} Zyven AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/30 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
