import React, { useState, useEffect } from "react";

export default function FooterSection() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Detroit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(now);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="px-6 md:px-16 py-12 border-t border-white/5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <span className="text-silica font-heading font-medium text-sm tracking-widest uppercase">
            Afsana
          </span>
          <span className="w-8 h-px bg-white/10" />
          <span className="font-mono text-alabaster/30 text-xs">
            © {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse" />
            <span className="font-mono text-alabaster/40 text-xs">
              Canton, MI — GMT-5
            </span>
          </div>
          <span className="font-mono text-amber/60 text-xs tabular-nums">
            {time}
          </span>
        </div>
      </div>
    </footer>
  );
}