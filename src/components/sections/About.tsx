"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaProjectDiagram,
  FaBrain,
} from "react-icons/fa";
import { HiAcademicCap, HiLightningBolt } from "react-icons/hi";

const stats = [
  { icon: FaProjectDiagram, value: "5+", label: "Projets", color: "#7c6aff" },
  { icon: FaBrain, value: "IA", label: "Specialite", color: "#e040fb" },
  { icon: FaGraduationCap, value: "KEYCE", label: "Ecole", color: "#00e5ff" },
  { icon: HiLightningBolt, value: "3", label: "Baccalaureats", color: "#7c6aff" },
];

const timeline = [
  {
    year: "2026 - 2027",
    title: "Licence IA & Big Data",
    place: "Keyce Informatique & IA, Douala",
    description: "Specialisation en Intelligence Artificielle et Big Data. Machine Learning, Deep Learning, traitement de donnees massives.",
    icon: HiAcademicCap,
    current: true,
  },
  {
    year: "2025 - 2026",
    title: "2eme annee Tronc Commun",
    place: "Keyce Informatique & IA, Douala",
    description: "Approfondissement en developpement web, bases de donnees avancees, architectures logicielles.",
    icon: HiAcademicCap,
    current: false,
  },
  {
    year: "2024 - 2025",
    title: "1ere annee Tronc Commun",
    place: "Keyce Informatique & IA, Douala",
    description: "Fondamentaux de l'informatique, programmation, algorithmique, developpement web.",
    icon: HiAcademicCap,
    current: false,
  },
  {
    year: "2024",
    title: "Stage — Djazz Junior BTP",
    place: "Bangui, Centrafrique",
    description: "Stage en entreprise BTP. Analyse des besoins numeriques, conception d'une solution web pour l'entreprise.",
    icon: FaBriefcase,
    current: false,
  },
  {
    year: "2022 - 2023",
    title: "Double Baccalaureat",
    place: "Tchad & Cameroun",
    description: "Obtention simultanee du baccalaureat tchadien et camerounais — un exploit academique remarquable.",
    icon: HiLightningBolt,
    current: false,
  },
  {
    year: "2021 - 2022",
    title: "Baccalaureat Centrafricain",
    place: "Centrafrique",
    description: "Premier baccalaureat obtenu en Centrafrique, marquant le debut d'un parcours academique exceptionnel.",
    icon: HiLightningBolt,
    current: false,
  },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="apropos" className="section-padding relative">
      <div className="section-divider mb-20" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-[var(--accent)] font-mono tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              A propos
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Mon <span className="gradient-text">Parcours</span>
            </h2>
            <p className="text-[var(--text-muted)] mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
              Un itineraire multiculturel, forge entre trois pays d&apos;Afrique,
              anime par la passion de l&apos;IA et du developpement logiciel.
            </p>
          </div>
        </Reveal>

        {/* Bio card */}
        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-8 md:p-10 mb-16 relative overflow-hidden glow-box">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent)] opacity-[0.03] blur-[60px] rounded-full" />
            <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light relative z-10">
              Originaire du <strong className="text-white font-medium">Tchad</strong>,
              j&apos;ai grandi entre la{" "}
              <strong className="text-white font-medium">Centrafrique</strong> et le{" "}
              <strong className="text-white font-medium">Cameroun</strong>, ou je
              poursuis actuellement mes etudes a{" "}
              <strong className="gradient-text-static font-semibold">
                Keyce Informatique & Intelligence Artificielle
              </strong>{" "}
              de Douala. Detenteur de{" "}
              <strong className="text-white font-medium">trois baccalaureats</strong>{" "}
              (centrafricain, tchadien et camerounais), je me specialise
              aujourd&apos;hui en{" "}
              <strong className="gradient-text font-semibold">
                Intelligence Artificielle et Big Data
              </strong>
              . Mon expertise couvre le developpement full-stack, la conception
              d&apos;architectures logicielles robustes, et la mise en oeuvre de
              solutions alimentees par l&apos;IA. Je suis convaincu que la
              technologie, et particulierement l&apos;intelligence artificielle, est
              le levier le plus puissant pour transformer notre continent.
            </p>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04, y: -4 }}
                className="glass rounded-2xl p-6 text-center card-hover relative overflow-hidden group"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${stat.color}08, transparent 70%)`,
                  }}
                />
                <stat.icon
                  className="mx-auto mb-3 transition-transform group-hover:scale-110"
                  size={22}
                  style={{ color: stat.color }}
                />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Timeline */}
        <Reveal>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-white">
              Chronologie
            </h3>
          </div>
        </Reveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--gradient-2)] to-transparent md:-translate-x-px" />

          {timeline.map((item, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div
                className={`relative flex items-start gap-8 mb-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2" />

                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-7 z-10" style={{ backgroundColor: item.current ? "var(--accent)" : "var(--text-muted)" }}>
                  {item.current && (
                    <span className="absolute inset-0 rounded-full bg-[var(--accent)] animate-ping opacity-40" />
                  )}
                </div>

                {/* Card */}
                <div className={`md:w-1/2 ml-14 md:ml-0 ${i % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}>
                  <div className="glass rounded-xl p-6 card-hover relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[var(--accent)]/20 to-transparent" />
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                        <item.icon className="text-[var(--accent)]" size={14} />
                      </div>
                      <span className="text-[var(--accent)] text-xs font-mono tracking-wide">
                        {item.year}
                      </span>
                      {item.current && (
                        <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] uppercase tracking-wider font-medium">
                          En cours
                        </span>
                      )}
                    </div>
                    <h4 className="text-white font-semibold text-base mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[var(--accent-light)] text-xs mb-2">
                      {item.place}
                    </p>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
