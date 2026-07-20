import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ArrowUpRight, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/api";
import QuickContactForm from "@/components/QuickContactForm";

const CONTACT_IMAGE = "https://media.base44.com/images/public/6a5555a4058a845db9492b1e/d1dacb007_generated_c004308b.png";

const CHALLENGES = [
  "Operational Scaling",
  "Risk & Compliance",
  "Digital Transformation",
  "M&A Advisory",
  "Organizational Redesign",
  "Market Entry Strategy",
  "Cost Optimization",
  "Leadership Development",
  "Others"
];

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const TIME_SLOTS = (() => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 17 && minute === 30) continue;
      const value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      const label = `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
      slots.push({ value, label });
    }
  }
  return slots;
})();

const TODAY_STR = getTodayDateString();

export default function ContactSection() {
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

  const toggleChallenge = (c) => {
    setSelected((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected.length || !name || !email || !preferredDate || !preferredTime || !message.trim()) return;

    setError("");
    setSubmitting(true);
    try {
      await apiRequest("/bookings", {
        method: "POST",
        body: {
          name,
          email,
          phone: phone || undefined,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          challenges: selected,
          message,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelected([]);
    setName("");
    setEmail("");
    setPhone("");
    setPreferredDate("");
    setPreferredTime("");
    setMessage("");
    setError("");
    setSubmitted(false);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("afsanaconsult@proton.me");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-40">
      <div className="px-6 md:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-amber text-xs tracking-widest block mb-4">
            004 — DIAGNOSTIC GATEWAY
          </span>
          <h2
            className="font-heading text-silica font-medium tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
          >
            Start the<br />Conversation
          </h2>
        </motion.div>
      </div>

      <div className="px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left — Conversation Starter */}
          <div>
            {!submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-alabaster/60 mb-8 text-base">
                  Select your primary challenges and preferred time. We'll
                  craft a diagnostic framework tailored to your organization.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {CHALLENGES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleChallenge(c)}
                      className={`px-4 py-2.5 rounded-full font-mono text-xs tracking-wide transition-all duration-300 ${
                        selected.includes(c)
                          ? "bg-amber text-obsidian"
                          : "glass-card text-alabaster/60 hover:text-silica hover:border-amber/30"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {error && (
                  <div className="mb-6 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 mb-8">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-silica placeholder:text-alabaster/20 font-heading text-lg focus:outline-none focus:border-amber/40 transition-colors duration-300"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-silica placeholder:text-alabaster/20 font-heading text-lg focus:outline-none focus:border-amber/40 transition-colors duration-300"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Your Phone (optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-silica placeholder:text-alabaster/20 font-heading text-lg focus:outline-none focus:border-amber/40 transition-colors duration-300"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-alabaster/30 text-xs mb-2">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={preferredDate}
                          min={TODAY_STR}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full bg-transparent border-b border-white/10 pb-3 text-silica placeholder:text-alabaster/20 text-base focus:outline-none focus:border-amber/40 transition-colors duration-300 [color-scheme:dark]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-alabaster/30 text-xs mb-2">
                          Preferred Time
                        </label>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full bg-transparent border-b border-white/10 pb-3 text-silica text-base focus:outline-none focus:border-amber/40 transition-colors duration-300 [color-scheme:dark]"
                          required
                        >
                          <option value="" disabled className="bg-obsidian text-alabaster/40">
                            Select a time
                          </option>
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot.value} value={slot.value} className="bg-obsidian text-silica">
                              {slot.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <textarea
                      placeholder="Tell us about your challenges"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-silica placeholder:text-alabaster/20 font-heading text-base focus:outline-none focus:border-amber/40 transition-colors duration-300 resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !selected.length || !name || !email || !preferredDate || !preferredTime || !message.trim()}
                    className="flex items-center gap-3 px-8 py-4 bg-amber text-obsidian font-heading font-medium text-sm tracking-wide rounded-full hover:bg-silica transition-colors duration-300 disabled:opacity-30 disabled:hover:bg-amber"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Initiate Diagnostic
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-lg p-10"
              >
                <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center mb-6">
                  <Check className="w-6 h-6 text-amber" />
                </div>
                <h3 className="text-silica font-heading text-2xl font-medium mb-3">
                  Diagnostic Initiated
                </h3>
                <p className="text-alabaster/60 text-base mb-8">
                  Our team will analyze your challenges and respond within 24
                  hours with a preliminary strategic framework.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-3 px-8 py-4 bg-transparent border border-amber/30 text-amber font-heading font-medium text-sm tracking-wide rounded-full hover:bg-amber hover:text-obsidian transition-colors duration-300"
                >
                  Submit Another Request
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Right — Visual */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={CONTACT_IMAGE}
              alt="Glass sphere with amber refractions"
              className="w-full h-full object-cover rounded-lg opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent rounded-lg" />
          </motion.div>
        </div>
      </div>

      <div className="structural-line mt-24" />

      {/* Data-sheet footer */}
      <div className="px-6 md:px-16 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="font-mono text-alabaster/30 text-xs mb-3">ENTITY</div>
            <div className="text-silica font-heading text-lg font-medium">
              Afsana Consult LLC
            </div>
          </div>

          <div>
            <div className="font-mono text-alabaster/30 text-xs mb-3">COORDINATES</div>
            <div className="text-alabaster/80 text-sm leading-relaxed">
              1622 Orchard Dr<br />
              Canton, MI 48188-1547
            </div>
          </div>

          <div>
            <div className="font-mono text-alabaster/30 text-xs mb-3">DIRECT LINE</div>
            <a
              href="tel:+17346642211"
              className="font-mono text-alabaster/80 text-sm tracking-wide hover:text-amber transition-colors duration-300"
            >
              +1 (734) 664-2211
            </a>
          </div>

          <div>
            <div className="font-mono text-alabaster/30 text-xs mb-3">SECURE CHANNEL</div>
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 group"
            >
              <span className="font-mono text-alabaster/80 text-sm group-hover:text-amber transition-colors duration-300">
                afsanaconsult@proton.me
              </span>
              {emailCopied ? (
                <Check className="w-3 h-3 text-amber" />
              ) : (
                <Copy className="w-3 h-3 text-alabaster/30 group-hover:text-amber transition-colors" />
              )}
            </button>
            {emailCopied && (
              <span className="font-mono text-amber text-xs mt-1 block">
                Copied
              </span>
            )}
          </div>
        </div>

        <QuickContactForm />
      </div>
    </section>
  );
}