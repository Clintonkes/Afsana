import React from "react";
import { motion } from "framer-motion";

const HERO_IMAGE = "https://media.base44.com/images/public/6a5555a4058a845db9492b1e/e2b932f82_generated_e29538c4.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden grid-bg">
      {/* Structural lines */}
      <div className="absolute top-1/3 left-0 right-0 structural-line" />
      <div className="absolute top-2/3 left-0 right-0 structural-line" />

      {/* Floating monolith image */}
      <motion.div
        className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 w-48 md:w-80 lg:w-96"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-amber/10 blur-3xl rounded-full" />
          <img
            src={HERO_IMAGE}
            alt="Abstract glass monolith refracting amber light"
            className="relative w-full h-auto rounded-lg opacity-80"
          />
        </div>
      </motion.div>

      {/* Main heading */}
      <div className="relative z-10 px-6 md:px-16 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="font-mono text-amber text-xs tracking-widest">
            CONSULTANCY / STRATEGY / EVOLUTION
          </span>
        </motion.div>

        <motion.h1
          className="font-heading text-silica font-medium leading-none"
          style={{ fontSize: "clamp(4rem, 12vw, 10rem)", letterSpacing: "-0.04em" }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          AFSANA
        </motion.h1>

        <motion.div
          className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-alabaster/60 max-w-md text-base leading-relaxed">
            Architecting corporate evolution through precision strategy,
            operational intelligence, and relentless execution.
          </p>
          <div className="flex items-center gap-3 text-alabaster/30 font-mono text-xs">
            <span>48.3871° N</span>
            <span className="w-8 h-px bg-alabaster/20" />
            <span>83.4816° W</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}