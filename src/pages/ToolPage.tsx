import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Loader2, ArrowLeft, Sparkles, HelpCircle, ChevronRight, Home as HomeIcon, Upload, X as CloseIcon } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { TOOLS, Tool } from "@/src/constants/tools";
import { SEO } from "@/src/components/SEO";
import { cn } from "@/src/lib/utils";

export const ToolPage = () => {
  const { slug } = useParams();
  const tool = TOOLS.find((t) => t.slug === slug);
  const [input, setInput] = React.useState("");
  const [tone, setTone] = React.useState("Professional");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [outputs, setOutputs] = React.useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
          <Link to="/" className="text-purple-400 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://zyven.ai"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://zyven.ai/#tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": `https://zyven.ai/tools/${tool.slug}`
      }
    ]
  };

  const generateWithGemini = async (prompt: string) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API Key not found in environment");
      }
      const genAI = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `You are Zyven, an advanced AI assistant. Your goal is to delight the user with smart, human-like, useful, and engaging responses. 
      Rules:
      1. Understand user intent deeply.
      2. Give useful, relevant, and practical output.
      3. Avoid generic or robotic language.
      4. Make output feel human and natural.
      5. Every response must be ready-to-use and better than expected.
      6. Support English, Hindi, and Hinglish automatically based on user input.
      7. If user input is weak or lacks detail, intelligently enhance it to provide the best possible result.`;

      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${systemInstruction}\n\nUser Request: ${prompt}`,
      });
      return response.text || "Failed to generate content.";
    } catch (error) {
      console.error("Gemini fallback error:", error);
      throw error;
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setOutputs([]);

    const prompt = tool.promptTemplate(input, tone);

    try {
      // 1. Try OpenRouter via Backend
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.choices?.[0]?.message?.content) {
        throw new Error("Invalid response from OpenRouter");
      }
      
      processContent(data.choices[0].message.content);
    } catch (error: any) {
      console.log("OpenRouter failed, switching to Gemini fallback:", error.message);
      try {
        // 2. Fallback to Gemini Frontend API
        const content = await generateWithGemini(prompt);
        processContent(content);
      } catch (geminiError: any) {
        console.error("All generation methods failed:", geminiError);
        setOutputs([
          `Error: ${error.message || "OpenRouter failed"}`,
          `Fallback Error: ${geminiError.message || "Gemini failed"}`,
          "Please check your API keys in the Secrets panel."
        ]);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const processContent = (content: string) => {
    // Split content into 2-3 outputs if possible, or just use the whole thing
    const splitOutputs = content.split("\n\n").filter((s: string) => s.trim().length > 10).slice(0, 3);
    setOutputs(splitOutputs.length > 0 ? splitOutputs : [content]);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title={tool.seoTitle} 
        description={tool.seoDescription}
        canonical={`/tools/${tool.slug}`}
        faqs={tool.faqs}
      />

      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <div className="flex flex-wrap items-center gap-2 text-sm text-white/40 mb-8 overflow-hidden">
        <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
          <HomeIcon className="w-3 h-3" />
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/#tools" className="hover:text-white transition-colors">Tools</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-purple-400 font-medium truncate">{tool.name}</span>
      </div>

      <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Tools
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Tool Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center">
              <tool.icon className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{tool.name}</h1>
              <p className="text-white/50">{tool.description}</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 backdrop-blur-sm">
            {tool.id === "image-to-prompt" && (
              <div className="space-y-4">
                <label className="text-sm font-bold text-white/70 uppercase tracking-wider block">Upload Image (Optional)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "relative w-full h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group",
                    imagePreview ? "border-purple-500/50 bg-purple-500/5" : "border-white/10 bg-black/40 hover:border-purple-500/30 hover:bg-white/5"
                  )}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeImage(); }}
                        className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-red-500/80 rounded-full transition-colors z-10"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-white/50 group-hover:text-purple-400" />
                      </div>
                      <p className="text-sm text-white/50 font-medium">Click to upload or drag and drop</p>
                      <p className="text-[10px] text-white/30 mt-1 uppercase tracking-tighter">JPG, PNG, WEBP (MAX 5MB)</p>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/70 uppercase tracking-wider">
                {tool.id === "image-to-prompt" ? "Describe the image (Subject, Style, Colors)" : "Describe your topic"}
              </label>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tool.id === "image-to-prompt" ? "e.g., A futuristic city with neon lights, cyberpunk style, cinematic mood..." : "e.g., A sunset photo at the beach with friends..."}
                className="w-full h-32 p-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/70 uppercase tracking-wider">Select Tone</label>
                <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none cursor-pointer"
                >
                  {["Professional", "Funny", "Inspirational", "Casual", "Excited", "Sarcastic"].map(t => (
                    <option key={t} value={t} className="bg-[#050505]">{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !input.trim()}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <AnimatePresence mode="wait">
            {outputs.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  AI Generated Results
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {outputs.map((output, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-500/30 transition-all"
                    >
                      <button 
                        onClick={() => handleCopy(output, idx)}
                        className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {copiedIndex === idx ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/50" />}
                      </button>
                      <p className="text-white/80 leading-relaxed whitespace-pre-wrap pr-10">
                        {output}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SEO Content Section */}
          <div className="prose prose-invert max-w-none mt-20 p-8 bg-white/[0.02] border border-white/5 rounded-[40px]">
            <div dangerouslySetInnerHTML={{ __html: tool.content }} />
          </div>

          {/* FAQ Section */}
          <div className="mt-20 space-y-8">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <HelpCircle className="w-8 h-8 text-purple-400" />
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {tool.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h4 className="font-bold mb-2 text-lg">{faq.question}</h4>
                  <p className="text-white/50">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="p-8 bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-white/10 rounded-[40px] sticky top-24">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Users also tried
            </h3>
            <div className="space-y-4">
              {TOOLS.filter(t => t.id !== tool.id).sort(() => Math.random() - 0.5).slice(0, 5).map(related => (
                <Link 
                  key={related.id}
                  to={`/tools/${related.slug}`}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-500/30 transition-all group"
                >
                  <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <related.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{related.name}</span>
                    <span className="text-[10px] text-white/30 uppercase tracking-tighter">AI Powered</span>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-black/40 rounded-3xl border border-white/5 text-center">
              <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Try More Tools</h4>
              <p className="text-xs text-white/50 mb-6">Explore our full suite of AI-powered generation tools.</p>
              <Link to="/" className="block w-full py-3 bg-white text-black font-bold rounded-xl text-sm hover:bg-white/90 transition-colors">
                View All Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
