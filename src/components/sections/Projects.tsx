"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const projects = [
  {
    title: "Scensora",
    subtitle: "L'art de la beaute sensorielle",
    description:
      "Plateforme web immersive dediee a l'univers de la beaute sensorielle. Design moderne avec animations fluides, experience utilisateur premium et architecture performante.",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
    link: "https://scensora-site.vercel.app/",
    github: "https://github.com/Safwan0506",
    color: "#e040fb",
    gradient: "from-[#e040fb] to-[#7c6aff]",
    status: "En ligne",
  },
  {
    title: "Trading Platform",
    subtitle: "Plateforme d'analyse de marches",
    description:
      "Application de trading integrant des algorithmes d'IA pour l'analyse predictive des marches financiers. Visualisation de donnees en temps reel et dashboards interactifs.",
    tags: ["Python", "React", "TensorFlow", "WebSocket", "API REST"],
    link: null,
    github: null,
    color: "#00e5ff",
    gradient: "from-[#00e5ff] to-[#7c6aff]",
    status: "En cours",
  },
  {
    title: "ProofPay",
    subtitle: "Preuve de paiement securisee",
    description:
      "Application fintech permettant de generer et verifier des preuves de paiement. Interface moderne, gestion securisee des transactions et architecture full-stack robuste.",
    tags: ["Next.js", "React", "Tailwind CSS", "Node.js", "Database"],
    link: "https://proof-pay-rho.vercel.app/",
    github: null,
    color: "#10b981",
    gradient: "from-[#10b981] to-[#00e5ff]",
    status: "En ligne",
  },
  {
    title: "Djazz Junior BTP",
    subtitle: "Site officiel entreprise BTP",
    description:
      "Conception et developpement du site web officiel pour l'entreprise Djazz Junior BTP basee a Bangui. Presentation de services, portfolio de realisations.",
    tags: ["Next.js", "Tailwind CSS", "Responsive", "SEO"],
    link: null,
    github: null,
    color: "#7c6aff",
    gradient: "from-[#7c6aff] to-[#e040fb]",
    status: "A venir",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
    >
      <div className="glass rounded-2xl overflow-hidden card-hover relative">
        {/* Top gradient bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at 50% 0%, ${project.color}06, transparent 60%)`,
          }}
        />

        <div className="relative p-7 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-2.5 h-2.5 rounded-full shadow-lg"
                  style={{ backgroundColor: project.color, boxShadow: `0 0 10px ${project.color}40` }}
                />
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider border ${
                    project.status === "En ligne"
                      ? "bg-green-500/10 border-green-500/20 text-green-400"
                      : project.status === "En cours"
                      ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                      : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:gradient-text-static transition-all duration-300">
                {project.title}
              </h3>
              <p className="text-[var(--text-muted)] text-sm mt-1 font-light">
                {project.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 ml-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all duration-300"
                >
                  <FaGithub size={15} />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all duration-300"
                >
                  <FaExternalLinkAlt size={13} />
                </a>
              )}
            </div>
          </div>

          <p className="text-[var(--text-muted)] mb-6 leading-relaxed text-sm">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[11px] text-[var(--text-muted)] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--accent)] text-sm font-medium hover:gap-3 transition-all duration-300"
            >
              Voir le projet
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projets" className="section-padding relative" ref={ref}>
      <div className="section-divider mb-20" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-[var(--accent)] font-mono tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            Projets
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Mes <span className="gradient-text">Realisations</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-5 max-w-2xl mx-auto text-lg">
            Des projets concrets qui allient innovation technique et impact reel,
            du web a l&apos;intelligence artificielle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
