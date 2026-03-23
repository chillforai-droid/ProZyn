import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Proxy for OpenRouter
  app.post("/api/generate", async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(401).json({ error: "OpenRouter API Key not configured" });
    }

    // List of free/stable models to try in sequence
    const models = [
      "google/gemini-2.0-flash-lite-preview-02-05:free",
      "google/gemma-2-9b-it:free",
      "meta-llama/llama-3-8b-instruct:free",
      "microsoft/phi-3-mini-128k-instruct:free",
      "qwen/qwen-2-7b-instruct:free",
      "google/gemini-2.0-flash-001",
      "meta-llama/llama-3.1-8b-instruct"
    ];

    const systemInstruction = `You are Zyven, an advanced AI assistant. Your goal is to delight the user with smart, human-like, useful, and engaging responses. 
    Rules:
    1. Understand user intent deeply.
    2. Give useful, relevant, and practical output.
    3. Avoid generic or robotic language.
    4. Make output feel human and natural.
    5. Every response must be ready-to-use and better than expected.
    6. Support English, Hindi, and Hinglish automatically based on user input.
    7. If user input is weak or lacks detail, intelligently enhance it to provide the best possible result.`;

    const fullPrompt = `${systemInstruction}\n\nUser Request: ${prompt}`;

    for (const model of models) {
      try {
        console.log(`Attempting generation with OpenRouter model: ${model}`);
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
            "X-Title": "Zyven AI Tools",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: fullPrompt }],
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          if (data.choices && data.choices.length > 0) {
            console.log(`Success with OpenRouter model: ${model}`);
            return res.json(data);
          }
        }
        
        console.warn(`OpenRouter model ${model} failed with status ${response.status}:`, JSON.stringify(data.error || data));
      } catch (error) {
        console.error(`Network error with OpenRouter model ${model}:`, error);
      }
    }

    // Final Backend Fallback: Try Gemini directly if all OpenRouter models fail
    try {
      console.log("All OpenRouter models failed. Attempting direct Gemini backend fallback...");
      const geminiKey = process.env.GEMINI_API_KEY;
      if (geminiKey) {
        // Using gemini-1.5-flash as it's the most stable and widely available
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }]
          })
        });

        const geminiData = await geminiResponse.json().catch(() => ({}));

        if (geminiResponse.ok) {
          const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            console.log("Success with direct Gemini backend fallback (gemini-1.5-flash)");
            return res.json({
              choices: [{ message: { content: text } }]
            });
          }
        } else {
          console.error("Direct Gemini backend fallback failed with status:", geminiResponse.status, JSON.stringify(geminiData));
        }
      } else {
        console.warn("GEMINI_API_KEY not found in environment for backend fallback");
      }
    } catch (fallbackError) {
      console.error("Backend Gemini fallback failed:", fallbackError);
    }

    res.status(500).json({ error: "All AI models (OpenRouter & Gemini) failed. Please check your API keys." });
  });

  // Dynamic Sitemap
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = "https://zyven.ai";
    const tools = [
      "caption-generator",
      "comment-reply-generator",
      "content-writer",
      "youtube-script-generator",
      "image-to-prompt"
    ];

    const today = new Date().toISOString().split("T")[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${tools.map(tool => `
  <url>
    <loc>${baseUrl}/tools/${tool}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  });

  // Robots.txt
  app.get("/robots.txt", (req, res) => {
    const baseUrl = "https://zyven.ai";
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${baseUrl}/sitemap.xml`);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
