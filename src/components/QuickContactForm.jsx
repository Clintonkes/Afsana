import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { apiRequest } from "@/lib/api";

export default function QuickContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await apiRequest("/contact", { method: "POST", body: { name, email, message } });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="glass-card rounded-lg p-8 mt-12 border border-amber/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="font-mono text-amber text-xs tracking-widest block mb-3">
        QUICK MESSAGE
      </span>
      <h3 className="text-silica font-heading text-2xl font-medium mb-3">
        Prefer to just send a message?
      </h3>

      {submitted ? (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center">
            <Check className="w-4 h-4 text-amber" />
          </div>
          <p className="text-alabaster/70 text-sm">
            Thanks — we've received your message and will be in touch shortly.
          </p>
        </div>
      ) : (
        <>
          <p className="text-alabaster/50 text-sm mb-6">
            Not ready to book a consultation? Send us a quick note instead.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-white/10 pb-3 text-silica placeholder:text-alabaster/20 text-sm focus:outline-none focus:border-amber/40 transition-colors duration-300"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-white/10 pb-3 text-silica placeholder:text-alabaster/20 text-sm focus:outline-none focus:border-amber/40 transition-colors duration-300"
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="md:col-span-2 w-full bg-transparent border-b border-white/10 pb-3 text-silica placeholder:text-alabaster/20 text-sm focus:outline-none focus:border-amber/40 transition-colors duration-300 resize-none"
              required
            />
            <button
              type="submit"
              disabled={submitting || !name || !email || !message}
              className="md:col-span-2 justify-self-start flex items-center gap-2 px-6 py-3 bg-transparent border border-amber/30 text-amber font-mono text-xs tracking-wide rounded-full hover:bg-amber hover:text-obsidian transition-colors duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-amber"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
}
