import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Strategy Index", href: "#strategy" },
  { label: "Proof Ledger", href: "#proof" },
  { label: "Diagnostics", href: "#contact" },
  { label: "Contact", href: "#quick-message" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-6 md:px-16 py-6">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="text-silica font-heading font-medium text-sm tracking-widest uppercase"
          >
            Afsana
          </a>
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col gap-1.5 group"
            aria-label="Open menu"
          >
            <span className="block w-6 h-px bg-silica group-hover:w-8 transition-all duration-300" />
            <span className="block w-8 h-px bg-silica" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-obsidian flex flex-col"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-6 md:px-16 py-6">
              <span className="text-silica font-heading font-medium text-sm tracking-widest uppercase">
                Afsana
              </span>
              <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6 text-silica" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 md:px-16">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="block w-full text-left py-4 border-b border-white/5"
                  >
                    <span className="text-amber font-mono text-xs mr-4">0{i + 1}</span>
                    <span className="text-silica font-heading text-4xl md:text-6xl font-medium tracking-tight hover:text-amber transition-colors duration-300">
                      {item.label}
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="px-6 md:px-16 py-8 flex items-center justify-between text-alabaster/40 text-xs font-mono">
              <span>Afsana Consult LLC</span>
              <span>Canton, MI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}