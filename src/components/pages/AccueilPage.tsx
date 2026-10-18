"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiLocationMarker, HiMail } from "react-icons/hi";

export default function AccueilPage() {
  return (
    <section className="page-container relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[#7c6aff] rounded-full opacity-[0.04] blur-[120px] animate-blob" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[#e040fb] rounded-full opacity-[0.03] blur-[140px] animate-blob" style={{ animationDelay: "3s" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Hero area */}
        <div className="min-h-[80vh] flex flex-col justify-center py-16">
          <div className="grid lg:grid-cols-[1fr,auto] gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
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

              <div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[var(--text-muted)] text-lg font-light tracking-wide"
                >
                  Bienvenue dans mon univers
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <span className="font-serif text-6xl sm:text-7xl md:text-8xl italic text-white block leading-[0.95]">
                    Bonjour,
                  </span>
                  <span className="font-serif text-6xl sm:text-7xl md:text-8xl italic block leading-[0.95] mt-2">
                    <span className="text-white">je suis </span>
                    <span className="gradient-text">Safwan</span>
                    <span className="text-white"> !</span>
                  </span>
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
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
                  ]}
                  wrapper="span"
                  speed={35}
                  repeat={Infinity}
                  className="text-xl text-white/70 font-light"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[var(--text-muted)] text-lg max-w-2xl leading-relaxed"
              >
                Je suis DJAZOULI SAFWAN, etudiant en 3eme annee specialite IA &
                Big Data a KEYCE Informatique, Douala, Cameroun. Passionne par
                l&apos;ecosysteme web & mobile full-stack, je concois des solutions
                modernes alliant haute performance et design soigne. Mon parcours
                s&apos;enrichit de stages formateurs, de projets ambitieux et d&apos;un
                voyage a travers 3 pays d&apos;Afrique (Centrafrique, Tchad, Cameroun)
                — qui m&apos;a offert une perspective unique sur l&apos;innovation
                technologique au service du continent.
              </motion.p>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-2"
              >
                {["React JS", "Node.js", "Next.js", "Python", "Java", "Spring Boot", "TensorFlow", "TypeScript"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.06] text-[var(--text-muted)]">
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* CTA + social */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4 flex-wrap pt-4"
              >
                <div className="flex items-center gap-3">
                  <a href="https://github.com/Safwan0506" target="_blank" rel="noopener noreferrer" className="group w-11 h-11 rounded-xl glass flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/40 transition-all">
                    <FaGithub size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://linkedin.com/in/djazouli-safwan-079b23342" target="_blank" rel="noopener noreferrer" className="group w-11 h-11 rounded-xl glass flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/40 transition-all">
                    <FaLinkedinIn size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <HiMail className="text-[var(--accent)]" />
                  <span>safwandjazouli@yahoo.com</span>
                </div>
              </motion.div>
            </div>

            {/* Right side: photo placeholder + stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:flex flex-col items-center gap-6"
            >
              {/* Photo placeholder */}
              <div className="relative">
                <div className="w-56 h-64 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] flex items-center justify-center overflow-hidden">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--gradient-1)]/20 to-[var(--gradient-2)]/20 flex items-center justify-center">
                    <span className="text-4xl font-bold gradient-text-static">SD</span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider">
                  Licence 3 · 2026-27
                </div>
                <div className="absolute -bottom-2 -left-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-medium">
                  Tchadien
                </div>
              </div>

              {/* Contact card */}
              <div className="w-56 glass-strong rounded-xl p-4 space-y-3">
                <h3 className="font-serif italic text-white text-lg">Contact</h3>
                <div className="space-y-2 text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <HiLocationMarker className="text-[var(--accent)]" size={14} />
                    <span>Douala, Cameroun</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiMail className="text-[var(--accent)]" size={14} />
                    <span>safwandjazouli@yahoo.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-20"
        >
          {[
            { value: "5+", label: "Projets", color: "#7c6aff" },
            { value: "IA", label: "Specialite", color: "#e040fb" },
            { value: "KEYCE", label: "Ecole", color: "#00e5ff" },
            { value: "3", label: "Baccalaureats", color: "#ffd93d" },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-strong rounded-xl p-5 text-center card-hover"
            >
              <p className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
