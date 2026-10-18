"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import dynamic from "next/dynamic";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiArrowDown, HiLocationMarker } from "react-icons/hi";
import { useCallback } from "react";

const NeuralNetwork = dynamic(() => import("@/components/3d/NeuralNetwork"), {
  ssr: false,
});

export default function Hero() {
  const handleNavigate = useCallback((section: string) => {
    const el = document.querySelector(section);
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[#7c6aff] rounded-full opacity-[0.04] blur-[120px] animate-blob" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[#e040fb] rounded-full opacity-[0.03] blur-[140px] animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute top-[50%] left-[60%] w-[400px] h-[400px] bg-[#00e5ff] rounded-full opacity-[0.02] blur-[100px] animate-blob" style={{ animationDelay: "6s" }} />
      </div>

      <div className="absolute inset-0 grid-bg opacity-40 z-0" />

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-[1fr,1.3fr] gap-8 lg:gap-0 items-center relative z-10">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col gap-6 lg:pr-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass w-fit"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-sm text-green-300/90 font-medium">
              Disponible pour opportunites
            </span>
          </motion.div>

          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[var(--text-muted)] text-base md:text-lg font-light tracking-wide"
            >
              Bienvenue dans mon reseau neural
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
            >
              <span className="text-white">Safwan</span>
              <br />
              <span className="gradient-text">Djazouli</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-[2px] bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)]" />
            <TypeAnimation
              sequence={[
                "Developpeur Full-Stack",
                2500,
                "Specialiste IA & Big Data",
                2500,
                "Architecte Logiciel",
                2500,
                "Ingenieur en Machine Learning",
                2500,
              ]}
              wrapper="span"
              speed={35}
              repeat={Infinity}
              className="text-lg md:text-xl text-white/70 font-light"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-[var(--text-muted)] text-base md:text-lg max-w-lg leading-relaxed"
          >
            Chaque neurone de ce reseau represente une facette de mon expertise.
            Explorez-les, cliquez, decouvrez mon univers — ou laissez{" "}
            <span className="text-[var(--accent)]">Orion</span>, mon assistant IA,
            vous guider.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-2 text-[var(--text-muted)] text-sm"
          >
            <HiLocationMarker className="text-[var(--accent)]" />
            <span>Douala, Cameroun</span>
            <span className="text-white/20 mx-1">|</span>
            <span>Originaire du Tchad</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <a
              href="#contact"
              className="group relative px-7 py-3.5 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white rounded-xl font-medium transition-all duration-300 hover:scale-[1.03] overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              <span className="relative flex items-center gap-2">
                Me Contacter
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </a>
            <a
              href="#projets"
              className="px-7 py-3.5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/[0.03] hover:border-white/20 transition-all duration-300"
            >
              Voir mes projets
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex items-center gap-3 pt-2"
          >
            <a href="https://github.com/Safwan0506" target="_blank" rel="noopener noreferrer" className="group w-11 h-11 rounded-xl glass flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/40 transition-all duration-300">
              <FaGithub size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://linkedin.com/in/djazouli-safwan-079b23342" target="_blank" rel="noopener noreferrer" className="group w-11 h-11 rounded-xl glass flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/40 transition-all duration-300">
              <FaLinkedinIn size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <div className="h-6 w-px bg-white/10 mx-1" />
            <span className="text-xs text-[var(--text-muted)]">safwandjazouli@yahoo.com</span>
          </motion.div>
        </motion.div>

        {/* Right - Neural Network 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative h-[380px] md:h-[500px] lg:h-[620px] hidden md:flex items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 bg-[var(--accent)] rounded-full opacity-[0.04] blur-[100px] animate-aurora" />
          </div>

          <NeuralNetwork onNavigate={handleNavigate} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 glass rounded-full px-5 py-2 flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              Reseau Neural — Cliquez sur les neurones pour naviguer
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#apropos" className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors group">
          <span className="text-[10px] uppercase tracking-[0.2em]">Explorer</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-[var(--accent)]/40 transition-colors">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-white/60"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
