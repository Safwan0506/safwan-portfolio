"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import type { PageId } from "@/app/page";

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "accueil", label: "Accueil" },
  { id: "parcours", label: "A Propos & CV" },
  { id: "projets", label: "Projets" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({
  currentPage,
  onNavigate,
}: {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{ background: "rgba(5, 5, 8, 0.7)", backdropFilter: "blur(20px)" }}
      >
        <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate("hub")}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--gradient-1)] to-[var(--gradient-2)] flex items-center justify-center font-bold text-white text-sm group-hover:shadow-lg group-hover:shadow-[var(--accent)]/20 transition-shadow">
              SD
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-semibold text-sm tracking-wide">
                Safwan Djazouli
              </span>
            </div>
          </button>

          {/* Center: Hub button */}
          {currentPage !== "hub" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onNavigate("hub")}
              className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-medium hover:bg-[var(--accent)]/10 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Neural Hub
            </motion.button>
          )}

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center gap-0.5 glass rounded-full px-1.5 py-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                  className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors"
                >
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      currentPage === item.id ? "text-white" : "text-[var(--text-muted)] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            <a
              onClick={(e) => { e.preventDefault(); onNavigate("contact"); }}
              href="#"
              className="ml-3 flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white text-sm rounded-full font-medium hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-shadow"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              Me contacter
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-xl glass flex items-center justify-center text-white"
          >
            {mobileOpen ? <HiX size={20} /> : <HiMenu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--background)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            <button
              onClick={() => { onNavigate("hub"); setMobileOpen(false); }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--accent)]/30 text-[var(--accent)] text-base font-medium"
            >
              Neural Hub
            </button>
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                className={`text-2xl font-medium transition-colors ${
                  currentPage === item.id ? "gradient-text" : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
