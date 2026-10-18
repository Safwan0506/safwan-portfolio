"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const duration = 2800;
    const interval = 30;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const t = elapsed / duration;
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setProgress(Math.min(100, eased * 100));

      if (elapsed >= duration) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          setShow(false);
          setTimeout(onComplete, 500);
        }, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "var(--background)" }}
        >
          {/* Neural pattern background */}
          <div className="absolute inset-0 opacity-[0.04]">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              {Array.from({ length: 20 }).map((_, i) => (
                <circle
                  key={`c-${i}`}
                  cx={100 + (i % 5) * 200}
                  cy={100 + Math.floor(i / 5) * 250}
                  r="3"
                  fill="var(--accent)"
                />
              ))}
              {Array.from({ length: 15 }).map((_, i) => (
                <line
                  key={`l-${i}`}
                  x1={100 + (i % 5) * 200}
                  y1={100 + Math.floor(i / 5) * 250}
                  x2={100 + ((i + 1) % 5) * 200}
                  y2={100 + Math.floor((i + 1) / 5) * 250}
                  stroke="var(--accent)"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              ))}
            </svg>
          </div>

          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--accent)] rounded-full blur-[200px] opacity-[0.06]" />

          {/* Logo icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--gradient-1)] to-[var(--gradient-2)] flex items-center justify-center mb-10 shadow-lg shadow-[var(--accent)]/20"
          >
            <span className="text-white font-bold text-2xl">SD</span>
          </motion.div>

          {/* Name typewriter */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-2 tracking-tight"
            style={{ fontStyle: "italic" }}
          >
            <TypewriterText text="Safwan Djazouli..." delay={600} speed={80} />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2.2 }}
            className="text-[var(--text-muted)] text-sm tracking-[0.3em] uppercase mb-12"
          >
            Neural Network Portfolio
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-xs text-[var(--text-muted)] font-mono"
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypewriterText({ text, delay, speed }: { text: string; delay: number; speed: number }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <>
      {displayed}
      {showCursor && (
        <span
          className="inline-block w-[2px] h-[0.8em] bg-[var(--accent)] ml-1 align-baseline"
          style={{ animation: "typewriter-cursor 0.8s step-end infinite" }}
        />
      )}
    </>
  );
}
