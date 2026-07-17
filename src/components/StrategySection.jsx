import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

const STRATEGY_IMAGE = "https://media.base44.com/images/public/6a5555a4058a845db9492b1e/dbe7b03c1_generated_481e5d8e.png";

const SERVICES = [
  {
    id: "01",
    title: "Operational Scaling",
    brief: "Strategic Capability",
    description: "We deconstruct operational bottlenecks and architect scalable frameworks that grow with your ambition. From process engineering to resource optimization.",
    caseStudy: {
      client: "Series B SaaS Platform",
      metric: "340%",
      outcome: "operational throughput increase",
      timeline: "18 months"
    }
  },
  {
    id: "02",
    title: "Risk Mitigation",
    brief: "Strategic Capability",
    description: "Proactive identification and neutralization of organizational risk vectors. We build resilience into the DNA of your business architecture.",
    caseStudy: {
      client: "Regional Healthcare Network",
      metric: "$4.2M",
      outcome: "in prevented losses",
      timeline: "12 months"
    }
  },
  {
    id: "03",
    title: "Digital Transformation",
    brief: "Strategic Capability",
    description: "End-to-end digital metamorphosis. We don't just digitize processes — we reimagine them for a world that doesn't exist yet.",
    caseStudy: {
      client: "Legacy Manufacturing Corp",
      metric: "72%",
      outcome: "reduction in cycle time",
      timeline: "24 months"
    }
  },
  {
    id: "04",
    title: "M&A Advisory",
    brief: "Strategic Capability",
    description: "Navigating the complex terrain of mergers and acquisitions with surgical precision. Due diligence, valuation, and post-merger integration.",
    caseStudy: {
      client: "Mid-Market Private Equity",
      metric: "12",
      outcome: "successful integrations",
      timeline: "36 months"
    }
  },
  {
    id: "05",
    title: "Organizational Design",
    brief: "Strategic Capability",
    description: "Restructuring human capital architecture for maximum velocity. We design organizations that attract, retain, and unleash talent.",
    caseStudy: {
      client: "Global Logistics Firm",
      metric: "58%",
      outcome: "improvement in retention",
      timeline: "9 months"
    }
  }
];

export default function StrategySection() {
  const [expanded, setExpanded] = useState(null);
  const scrollRef = useRef(null);

  return (
    <section id="strategy" className="relative py-24 md:py-40">
      <div className="structural-line mb-16" />

      <div className="px-6 md:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-amber text-xs tracking-widest block mb-4">
            002 — STRATEGY INDEX
          </span>
          <h2
            className="font-heading text-silica font-medium tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
          >
            Strategic<br />Capabilities
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar px-6 md:px-16 pb-8"
      >
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.id}
            className="flex-shrink-0 w-80 md:w-96"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div
              className="glass-card rounded-lg p-8 h-full flex flex-col cursor-pointer group"
              onClick={() => setExpanded(expanded === service.id ? null : service.id)}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-amber text-xs">{service.id}</span>
                <span className="font-mono text-alabaster/30 text-xs">{service.brief}</span>
              </div>

              <h3 className="text-silica font-heading text-2xl font-medium tracking-tight mb-4 group-hover:text-amber transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-alabaster/50 text-sm leading-relaxed mb-6 flex-1">
                {service.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-amber/60 text-xs font-mono">
                  {expanded === service.id ? "Collapse" : "View Case Study"}
                </span>
                <ChevronRight
                  className={`w-4 h-4 text-amber transition-transform duration-300 ${
                    expanded === service.id ? "rotate-90" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {expanded === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 mt-6 border-t border-white/5">
                      <div className="text-alabaster/30 font-mono text-xs mb-2">
                        MICRO-CASE STUDY
                      </div>
                      <div className="text-alabaster/50 text-xs mb-4">{service.caseStudy.client}</div>
                      <div className="text-amber font-heading text-4xl font-medium mb-1">
                        {service.caseStudy.metric}
                      </div>
                      <div className="text-alabaster/60 text-sm mb-3">{service.caseStudy.outcome}</div>
                      <div className="flex items-center gap-2 text-alabaster/30 font-mono text-xs">
                        <span>Timeline</span>
                        <span className="w-4 h-px bg-alabaster/20" />
                        <span>{service.caseStudy.timeline}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Strategy image banner */}
      <div className="mt-16 md:mt-24 px-6 md:px-16">
        <motion.div
          className="relative overflow-hidden rounded-lg h-48 md:h-72"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={STRATEGY_IMAGE}
            alt="Abstract steel beams with amber light refractions"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <span className="font-mono text-amber text-xs tracking-widest">
              5 STRATEGIC DISCIPLINES — INFINITE APPLICATIONS
            </span>
          </div>
        </motion.div>
      </div>

      <div className="structural-line mt-16" />
    </section>
  );
}