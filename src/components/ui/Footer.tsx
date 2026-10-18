"use client";

import { FaGithub, FaLinkedinIn, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <footer className="relative">
      <div className="section-divider" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gradient-1)] to-[var(--gradient-2)] flex items-center justify-center font-bold text-white text-sm">
              SD
            </div>
            <div>
              <p className="text-white font-semibold text-sm tracking-wide">
                SAFWAN DJAZOULI
              </p>
              <p className="text-[var(--text-muted)] text-xs">
                Developpeur Full-Stack & IA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Safwan0506"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/30 transition-all duration-300"
            >
              <FaGithub size={15} />
            </a>
            <a
              href="https://linkedin.com/in/djazouli-safwan-079b23342"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/30 transition-all duration-300"
            >
              <FaLinkedinIn size={15} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-muted)] text-xs">
            &copy; {year} Safwan Djazouli. Tous droits reserves.
          </p>
          <p className="text-[var(--text-muted)] text-xs flex items-center gap-1.5">
            Construit avec{" "}
            <FaHeart className="text-[var(--accent)] text-[10px]" /> Next.js,
            Three.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
