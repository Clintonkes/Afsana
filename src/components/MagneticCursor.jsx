import React, { useState, useEffect, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  const handleMouseMove = useCallback((e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    const handleOver = (e) => {
      if (e.target.closest("a, button, .magnetic-target, [role='button']")) {
        setIsHovering(true);
      }
    };
    const handleOut = (e) => {
      if (e.target.closest("a, button, .magnetic-target, [role='button']")) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [handleMouseMove]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isHovering ? 48 : 8,
            height: isHovering ? 48 : 8,
            borderWidth: isHovering ? 1.5 : 0,
            backgroundColor: isHovering ? "transparent" : "#FDBA74",
            borderColor: "#FDBA74",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>
      <style>{`@media (pointer: fine) { * { cursor: none !important; } }`}</style>
    </>
  );
}