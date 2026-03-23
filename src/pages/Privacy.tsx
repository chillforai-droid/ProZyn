import React from "react";
import { SEO } from "../components/SEO";
import { motion } from "motion/react";

export const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SEO 
        title="Privacy Policy - Zyven AI" 
        description="Read Zyven AI's privacy policy to understand how we protect your data and ensure your privacy while using our AI tools."
        canonical="/privacy"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
          Last updated: March 23, 2026. Your privacy is our priority. This policy explains how we handle your information.
        </p>
      </motion.div>

      <div className="prose prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <p className="text-white/60 leading-relaxed">
            Zyven AI is designed to be as private as possible. We do not require you to create an account to use our basic tools. We only collect minimal data necessary to provide our services, such as:
          </p>
          <ul className="list-disc pl-6 text-white/60 space-y-2">
            <li>Usage statistics (anonymized) to improve our tools.</li>
            <li>Technical data like IP address and browser type for security and analytics.</li>
            <li>The text you input into our AI tools (processed temporarily and not stored permanently).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. How We Use Your Data</h2>
          <p className="text-white/60 leading-relaxed">
            We use the collected information to:
          </p>
          <ul className="list-disc pl-6 text-white/60 space-y-2">
            <li>Provide and maintain our AI services.</li>
            <li>Improve the quality and accuracy of our AI models.</li>
            <li>Monitor and prevent fraudulent or illegal activity.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
          <p className="text-white/60 leading-relaxed">
            We implement industry-standard security measures to protect your data. However, please remember that no method of transmission over the internet is 100% secure. We encourage you not to input sensitive personal information (like passwords or credit card numbers) into our AI tools.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
          <p className="text-white/60 leading-relaxed">
            Our tools are powered by third-party AI models (like Google's Gemini). When you use our tools, your input may be processed by these third parties. We encourage you to review their privacy policies as well.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
          <p className="text-white/60 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at privacy@zyven.ai.
          </p>
        </section>
      </div>
    </div>
  );
};
