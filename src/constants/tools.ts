import { 
  Captions, 
  MessageSquareReply, 
  FileText, 
  Youtube, 
  Image as ImageIcon 
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  slug: string;
  primaryKeyword: string;
  promptTemplate: (input: string, tone: string) => string;
  seoTitle: string;
  seoDescription: string;
  content: string;
  faqs: { question: string; answer: string }[];
}

export const TOOLS: Tool[] = [
  {
    id: "caption-generator",
    name: "AI Caption Generator",
    description: "Generate catchy captions for Instagram, TikTok, and Facebook.",
    icon: Captions,
    slug: "caption-generator",
    primaryKeyword: "free AI caption generator for Instagram",
    promptTemplate: (input, tone) => `Generate 3 catchy, scroll-stopping social media captions for the following topic: "${input}". 
    Tone: ${tone}. 
    Requirements:
    - Include relevant emojis.
    - Add 3-5 trending hashtags.
    - Make it viral-ready.
    - Provide 3 distinct variations.
    - Separate each variation with double newlines.`,
    seoTitle: "AI Caption Generator - Free Instagram & TikTok Captions | Zyven",
    seoDescription: "Boost your social media engagement with our free AI Caption Generator. Create catchy captions for Instagram, TikTok, and more instantly.",
    content: `
      <h2>Why Use a Free AI Caption Generator for Instagram?</h2>
      <p>In the fast-paced world of social media, a great caption can make or break your post. Whether you're an influencer, a small business owner, or just someone looking to spice up their feed, Zyven's <strong>AI Caption Generator</strong> is here to help. Our tool uses advanced AI to understand your topic and craft captions that resonate with your audience.</p>
      
      <h3>How to Write Captions Using AI for Free</h3>
      <p>Simply enter a brief description of your photo or video, choose a tone (like funny, professional, or inspirational), and hit generate. Our AI will provide you with three unique options, complete with emojis and trending hashtags. This is the easiest way to <strong>write captions using AI free</strong> of charge.</p>
      
      <h3>Benefits of Using Zyven's AI Tool</h3>
      <ul>
        <li><strong>Save Time:</strong> No more staring at a blank screen for hours.</li>
        <li><strong>Increase Engagement:</strong> High-quality copy that encourages likes and comments.</li>
        <li><strong>Consistency:</strong> Maintain a consistent brand voice across all your social platforms.</li>
      </ul>
      
      <h3>Optimized for Every Platform</h3>
      <p>Whether you need a short and punchy caption for TikTok or a longer, story-driven one for Facebook, our generator adapts to your needs. It's the ultimate <strong>AI caption generator for Instagram</strong> and beyond.</p>
    `,
    faqs: [
      { question: "Is the AI Caption Generator free?", answer: "Yes, you can use our basic caption generator for free without any hidden costs." },
      { question: "Can I use these for Instagram and TikTok?", answer: "Absolutely! Our captions are optimized for Instagram, TikTok, Facebook, and LinkedIn." },
      { question: "How many captions can I generate?", answer: "You can generate as many as you need to find the perfect fit for your post." }
    ]
  },
  {
    id: "comment-reply-generator",
    name: "AI Comment Reply Generator",
    description: "Instantly craft thoughtful replies to social media comments.",
    icon: MessageSquareReply,
    slug: "comment-reply-generator",
    primaryKeyword: "AI reply generator for comments",
    promptTemplate: (input, tone) => `Generate 3 smart, natural, and engaging replies to this comment: "${input}". 
    Tone: ${tone}. 
    Requirements:
    - Include emotional intelligence.
    - Make it feel like a real human wrote it.
    - Provide 3 distinct variations.
    - Separate each variation with double newlines.`,
    seoTitle: "AI Comment Reply Generator - Engage Your Audience | Zyven",
    seoDescription: "Never leave a follower hanging. Use Zyven's AI Comment Reply Generator to craft perfect responses to every comment instantly.",
    content: `
      <h2>Master Social Media Engagement with an AI Reply Generator</h2>
      <p>Responding to comments is crucial for building a community, but it can be time-consuming. Zyven's <strong>AI reply generator for comments</strong> helps you maintain a high level of engagement without spending hours typing. Whether it's a compliment, a question, or a critique, our AI helps you find the right words.</p>
      
      <h3>Why Engagement Matters for Your Algorithm Ranking</h3>
      <p>Social media algorithms favor posts with high engagement. By replying to comments quickly and thoughtfully, you signal to the platform that your content is valuable, leading to more reach and visibility. Our <strong>AI comment reply generator</strong> ensures you never miss an opportunity to connect.</p>
      
      <h3>How to Use the Reply Generator</h3>
      <p>Simply paste the comment you received, select the desired tone, and let Zyven do the rest. You'll get three different options to choose from, ensuring your response feels authentic and personal.</p>
      
      <h3>Features of Zyven Reply AI</h3>
      <ul>
        <li><strong>Human-Like Responses:</strong> Avoid generic "thanks!" and provide real value.</li>
        <li><strong>Tone Customization:</strong> Match your brand's personality perfectly.</li>
        <li><strong>Multi-Platform Support:</strong> Works for YouTube, Instagram, Facebook, and more.</li>
      </ul>
    `,
    faqs: [
      { question: "Does it work for YouTube comments?", answer: "Yes, it works for YouTube, Instagram, Facebook, and any other platform where you receive comments." },
      { question: "Is it free to use?", answer: "Yes, our comment reply generator is free for all users." },
      { question: "Can I generate multiple replies?", answer: "Yes, the tool provides 3 variations for every comment you input." }
    ]
  },
  {
    id: "content-writer",
    name: "AI Content Writer",
    description: "Write blog posts, articles, and emails in seconds.",
    icon: FileText,
    slug: "content-writer",
    primaryKeyword: "free AI content writer for blogs",
    promptTemplate: (input, tone) => `Write high-quality, structured content about: "${input}". 
    Tone: ${tone}. 
    Requirements:
    - Use clear headings and bullet points.
    - Keep SEO in mind.
    - Make it informative and easy to read.
    - Avoid robotic language.`,
    seoTitle: "AI Content Writer - Generate High-Quality Articles & Blogs | Zyven",
    seoDescription: "Stop staring at a blank page. Zyven's AI Content Writer helps you generate blog posts, articles, and emails in seconds.",
    content: `
      <h2>The Future of Content Creation: Free AI Content Writer</h2>
      <p>Content is king, but creating it is hard. Zyven's <strong>free AI content writer for blogs</strong> is designed to help you overcome writer's block and produce high-quality text at scale. From SEO-optimized blog posts to professional emails, our AI handles the heavy lifting.</p>
      
      <h3>SEO-Friendly Output for Better Ranking</h3>
      <p>Our AI understands the importance of keywords and structure. The content generated is designed to be readable for humans and crawlable for search engines. Using an <strong>AI blog post generator</strong> can significantly speed up your content marketing efforts.</p>
      
      <h3>How Zyven Helps Content Creators</h3>
      <ul>
        <li><strong>Overcome Writer's Block:</strong> Get a draft ready in seconds.</li>
        <li><strong>Professional Quality:</strong> High-standard English and logical flow.</li>
        <li><strong>Versatile Use:</strong> Good for blogs, newsletters, and social media articles.</li>
      </ul>
      
      <h3>Writing Articles with AI</h3>
      <p>Whether you need a 500-word article or a quick email draft, our tool adapts to your requirements. It's the perfect <strong>AI writing assistant</strong> for busy professionals and students alike.</p>
    `,
    faqs: [
      { question: "Is the content unique?", answer: "Yes, our AI generates original content based on your specific prompts and inputs." },
      { question: "Can I use it for SEO articles?", answer: "Absolutely! The tool is designed to create structured, keyword-rich content." },
      { question: "Is there a word limit?", answer: "The tool is optimized for short to medium-form content like blogs and emails." }
    ]
  },
  {
    id: "youtube-script-generator",
    name: "AI YouTube Script Generator",
    description: "Create engaging scripts for your next viral video.",
    icon: Youtube,
    slug: "youtube-script-generator",
    primaryKeyword: "free AI YouTube script generator",
    promptTemplate: (input, tone) => `Generate a professional YouTube video script for the topic: "${input}". 
    Tone: ${tone}. 
    Requirements:
    - Start with a strong, attention-grabbing hook.
    - Use storytelling elements.
    - Include clear transitions between main points.
    - End with a powerful Call to Action (CTA).`,
    seoTitle: "AI YouTube Script Generator - Plan Your Next Viral Video | Zyven",
    seoDescription: "Create professional YouTube scripts in minutes. Zyven's AI YouTube Script Generator helps you structure your videos for maximum retention.",
    content: `
      <h2>Level Up Your YouTube Channel with AI Scripts</h2>
      <p>A great video starts with a great script. Zyven's <strong>free AI YouTube script generator</strong> helps you structure your ideas into a compelling narrative that keeps viewers watching. Whether you're making tutorials, vlogs, or reviews, we've got you covered.</p>
      
      <h3>Retention-Focused Scripts for Viral Growth</h3>
      <p>We know what makes viewers stay. Our scripts include hooks, clear transitions, and strong calls to action to help you grow your subscriber base. Using a <strong>YouTube script AI</strong> is the secret weapon of many successful creators.</p>
      
      <h3>Why You Need a Script Generator</h3>
      <ul>
        <li><strong>Better Structure:</strong> Ensure your video has a logical flow.</li>
        <li><strong>Higher Retention:</strong> Keep viewers engaged from start to finish.</li>
        <li><strong>Professional CTA:</strong> Convert viewers into subscribers effectively.</li>
      </ul>
      
      <h3>How to Generate Your First Script</h3>
      <p>Enter your video topic, choose your style, and hit generate. You'll get a full script including an intro, main body points, and a closing statement.</p>
    `,
    faqs: [
      { question: "Can I use this for YouTube Shorts?", answer: "Yes, just specify that you want a script for a Short in the input box!" },
      { question: "Is it really free?", answer: "Yes, Zyven offers a free version of the YouTube script generator." },
      { question: "Does it include visual cues?", answer: "The script provides the spoken text and general structure for your video." }
    ]
  },
  {
    id: "image-to-prompt",
    name: "Image to Prompt Generator",
    description: "Turn your image descriptions into detailed AI art prompts.",
    icon: ImageIcon,
    slug: "image-to-prompt",
    primaryKeyword: "AI art prompt generator from text",
    promptTemplate: (input, tone) => `Generate 3 highly detailed, structured, and artistic AI art prompts based on this description: "${input}". 
    Style/Tone: ${tone}. 
    
    For each prompt, include the following structure:
    - Subject: [Detailed subject description]
    - Style: [Artistic style, e.g., realistic, anime, digital art]
    - Lighting: [Lighting conditions, e.g., cinematic, soft, neon]
    - Mood: [Overall mood, e.g., mysterious, vibrant, dark]
    - Camera Angle: [Perspective, e.g., wide shot, close-up, low angle]
    - Technical Details: [Resolution, engine, e.g., 8k, octane render, trending on artstation]

    Provide 3 distinct variations. Separate each variation with double newlines.`,
    seoTitle: "Image to Prompt Generator - Create Stunning AI Art Prompts | Zyven",
    seoDescription: "Unlock the power of AI art. Turn your ideas into detailed prompts for Midjourney, DALL-E, and Stable Diffusion with Zyven.",
    content: `
      <h2>Unlock Your Creative Potential with an AI Art Prompt Generator</h2>
      <p>Getting the perfect image from an AI art generator requires the perfect prompt. Zyven's <strong>AI art prompt generator from text</strong> takes your simple ideas and expands them into detailed, descriptive prompts that Midjourney and DALL-E love.</p>
      
      <h3>Artistic Styles, Lighting, and Camera Settings</h3>
      <p>Our tool automatically adds details about lighting, camera settings, and artistic styles to ensure your generated images look professional and unique. This is the best <strong>Midjourney prompt generator</strong> for beginners and pros alike.</p>
      
      <h3>How to Create Better AI Art</h3>
      <ul>
        <li><strong>Be Descriptive:</strong> Give the AI more context to work with.</li>
        <li><strong>Experiment with Styles:</strong> Try different artistic movements.</li>
        <li><strong>Use Technical Terms:</strong> Our tool adds terms like 'octane render' or '8k resolution' for you.</li>
      </ul>
      
      <h3>Optimized for DALL-E and Midjourney</h3>
      <p>The prompts generated are specifically tailored to work with the latest versions of popular AI art models, ensuring you get the best possible results every time.</p>
    `,
    faqs: [
      { question: "Does this work for Midjourney?", answer: "Yes, the prompts are specifically designed to work well with Midjourney, DALL-E, and Stable Diffusion." },
      { question: "Can I use it for free?", answer: "Yes, our prompt generator is free to use." },
      { question: "How many prompts do I get?", answer: "You get 3 distinct, highly detailed variations for every input." }
    ]
  }
];

