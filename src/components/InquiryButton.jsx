import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function InquiryButton() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToContact}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-3 bg-amber text-obsidian font-heading font-medium text-sm tracking-wide rounded-full hover:bg-silica transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Inquiry
      <ArrowUpRight className="w-4 h-4" />
    </motion.button>
  );
}