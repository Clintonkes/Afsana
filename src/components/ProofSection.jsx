import React from "react";
import { motion } from "framer-motion";

const PROOF_IMAGE = "https://media.base44.com/images/public/6a5555a4058a845db9492b1e/f176b3e49_generated_020ae2d1.png";

const PROOF_ITEMS = [
  {
    phase: "Challenge",
    content: "A rapidly scaling fintech company faced systemic operational fragility — processes built for 50 employees were breaking under the weight of 500."
  },
  {
    phase: "Process",
    content: "We deployed a 90-day diagnostic sprint. Every workflow was deconstructed, stress-tested, and rebuilt from first principles using our proprietary Kinetic Framework."
  },
  {
    phase: "Solution",
    content: "A new operational architecture that self-scales — automated triggers, distributed decision-making, and predictive resource allocation."
  },
  {
    phase: "Outcome",
    content: "Zero operational failures in 14 months. 340% throughput increase. The company successfully closed a $40M Series C with operational risk at an all-time low."
  }
];

export default function ProofSection() {
  return (
    <section id="proof" className="relative py-24 md:py-40">
      <div className="px-6 md:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-amber text-xs tracking-widest block mb-4">
            003 — PROOF LEDGER
          </span>
          <h2
            className="font-heading text-silica font-medium tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
          >
            Validated<br />Methodology
          </h2>
        </motion.div>
      </div>

      {/* Split-screen case study */}
      <div className="px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0 rounded-lg overflow-hidden">
          {/* Left — static image */}
          <motion.div
            className="relative h-72 lg:h-auto lg:min-h-[600px] lg:sticky lg:top-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={PROOF_IMAGE}
              alt="Prismatic light refracting through glass"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <div className="glass-card rounded px-4 py-3 inline-block">
                <div className="font-mono text-amber text-xs mb-1">CASE STUDY 001</div>
                <div className="text-silica font-heading text-lg font-medium">
                  Fintech Operational Redesign
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — scrollable phases */}
          <div className="bg-white/[0.02] p-8 md:p-12 lg:p-16">
            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4 mb-12 pb-8 border-b border-white/5">
              {[
                { value: "340%", label: "Throughput" },
                { value: "90", label: "Day Sprint" },
                { value: "$40M", label: "Series C" }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="text-amber font-heading text-2xl md:text-3xl font-medium">
                    {stat.value}
                  </div>
                  <div className="text-alabaster/40 font-mono text-xs mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Phases */}
            {PROOF_ITEMS.map((item, i) => (
              <motion.div
                key={item.phase}
                className="mb-10 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-amber text-xs">0{i + 1}</span>
                  <span className="w-6 h-px bg-amber/30" />
                  <span className="text-silica font-heading text-lg font-medium tracking-tight">
                    {item.phase}
                  </span>
                </div>
                <p className="text-alabaster/60 text-base leading-relaxed pl-12">
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="structural-line mt-24" />
    </section>
  );
}