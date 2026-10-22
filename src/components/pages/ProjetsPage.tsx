"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

interface Project {
  id: string;
  room: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  status: "live" | "in-progress" | "coming-soon";
  url?: string;
  github?: string;
  highlight?: boolean;
}

const projects: Project[] = [
  {
    id: "scensora",
    room: "ROOM // 01",
    title: "Scensora",
    category: "WEB",
    description: "Plateforme beaute sensorielle avec design immersif, animations fluides et experience utilisateur premium. Deploye sur Vercel.",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    status: "live",
    url: "https://scensora-site.vercel.app",
    highlight: true,
  },
  {
    id: "trading",
    room: "ROOM // 02",
    title: "Trading Platform",
    category: "IA",
    description: "Plateforme d'analyse de marches financiers avec algorithmes predictifs IA et visualisation temps reel des donnees.",
    tech: ["Python", "TensorFlow", "React", "Node.js", "WebSocket"],
    status: "in-progress",
  },
  {
    id: "proofpay",
    room: "ROOM // 03",
    title: "ProofPay",
    category: "FINTECH",
    description: "Application de generation et verification de preuves de paiement. Interface moderne, gestion securisee des transactions et architecture full-stack robuste.",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js", "Database"],
    status: "live",
    url: "https://proof-pay-rho.vercel.app/",
    highlight: true,
  },
  {
    id: "djazz",
    room: "ROOM // 04",
    title: "Djazz Junior BTP",
    category: "WEB",
    description: "Site vitrine pour une entreprise de BTP basee a Bangui, Centrafrique. Design professionnel et presentation des services.",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "coming-soon",
  },
];

const statusConfig = {
  "live": { label: "En ligne", color: "#22c55e", bg: "rgba(34, 197, 94, 0.1)" },
  "in-progress": { label: "En cours", color: "#ffd93d", bg: "rgba(255, 217, 61, 0.1)" },
  "coming-soon": { label: "A venir", color: "#7c6aff", bg: "rgba(124, 106, 255, 0.1)" },
};

export default function ProjetsPage() {
  return (
    <section className="page-container relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-[20%] left-[30%] w-[400px] h-[400px] bg-[#ffd93d] rounded-full opacity-[0.03] blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="label-tag bg-[#ffd93d]/10 text-[#ffd93d] border border-[#ffd93d]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd93d]" />
            Projets
          </span>
          <h1 className="font-serif italic text-5xl sm:text-6xl text-white mt-6">
            Salle des<br />
            <span className="gradient-text">Projets</span>
          </h1>
          <p className="mt-4 text-[var(--text-muted)] text-lg max-w-xl">
            Chaque projet est une experience — explorez mes realisations.
          </p>
        </motion.div>

        {/* Project list */}
        <div className="space-y-8">
          {projects.map((project, i) => {
            const status = statusConfig[project.status];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className={`glass-strong rounded-2xl overflow-hidden card-hover ${
                  project.highlight ? "border-[var(--accent)]/20" : ""
                }`}
              >
                {/* Top gradient bar */}
                <div className="h-1 bg-gradient-to-r from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)]" />

                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-[var(--accent)]">{project.room}</span>
                      <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{project.category}</span>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif italic text-3xl md:text-4xl text-white mb-3">{project.title}</h2>

                  {/* Description */}
                  <p className="text-[var(--text-muted)] text-base leading-relaxed mb-6 max-w-2xl">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.06] text-[var(--text-muted)]">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white text-sm rounded-xl font-medium hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all"
                      >
                        Explorer la Fiche
                        <FaExternalLinkAlt size={11} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white text-sm rounded-xl font-medium hover:bg-white/[0.03] transition-all"
                      >
                        <FaGithub size={14} />
                        Code Source
                      </a>
                    )}
                    {!project.url && !project.github && (
                      <span className="text-[var(--text-muted)] text-sm italic">Bientot disponible</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-between mt-12 text-xs text-[var(--text-muted)] font-mono"
        >
          <span>SAFWAN DJAZOULI // LABS</span>
          <span>ROOM // {String(projects.length).padStart(2, "0")}</span>
        </motion.div>
      </div>
    </section>
  );
}
