"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaGlobe } from "react-icons/fa";

const timeline = [
  {
    period: "2026 — 2027",
    title: "Licence IA & Big Data",
    place: "KEYCE Informatique, Douala",
    description: "3eme annee — Specialite Intelligence Artificielle & Big Data. Machine Learning, Deep Learning, Traitement de donnees massives.",
    type: "education" as const,
    current: true,
  },
  {
    period: "2025 — 2026",
    title: "2eme annee Tronc Commun",
    place: "KEYCE Informatique, Douala",
    description: "Fondamentaux avances : programmation orientee objet, bases de donnees, architecture logicielle, reseaux.",
    type: "education" as const,
  },
  {
    period: "2024 — 2025",
    title: "1ere annee Tronc Commun",
    place: "KEYCE Informatique, Douala",
    description: "Initiation au developpement web, algorithmique, programmation C/C++, Introduction aux systemes.",
    type: "education" as const,
  },
  {
    period: "2024",
    title: "Stage — Djazz Junior BTP",
    place: "Bangui, Centrafrique",
    description: "Developpement du site web de l'entreprise. Gestion de projet, relation client, integration WordPress puis migration vers stack moderne.",
    type: "work" as const,
  },
  {
    period: "2022 — 2023",
    title: "Double Baccalaureat",
    place: "Tchad & Cameroun",
    description: "Obtention simultanee de deux baccalaureats — un exploit rare qui temoigne d'une determination hors norme.",
    type: "education" as const,
    highlight: true,
  },
  {
    period: "2021 — 2022",
    title: "Baccalaureat Centrafricain",
    place: "Bangui, Centrafrique",
    description: "Premier baccalaureat obtenu en Centrafrique. Debut d'un parcours academique multinational.",
    type: "education" as const,
  },
];

const countries = [
  { name: "Centrafrique", flag: "🇨🇫", desc: "Ne et premier bac" },
  { name: "Tchad", flag: "🇹🇩", desc: "Origines & 2eme bac" },
  { name: "Cameroun", flag: "🇨🇲", desc: "3eme bac & etudes actuelles" },
];

export default function ParcoursPage() {
  return (
    <section className="page-container relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#00e5ff] rounded-full opacity-[0.03] blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="label-tag bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
            A Propos & CV
          </span>
          <h1 className="font-serif italic text-5xl sm:text-6xl md:text-7xl text-white mt-6 leading-[0.95]">
            Bonjour,<br />
            <span className="gradient-text">je suis Safwan !</span>
          </h1>
          <p className="mt-6 text-[var(--text-muted)] text-lg max-w-2xl leading-relaxed">
            Un parcours forge entre trois pays d&apos;Afrique, anime par la passion du
            code et la conviction que l&apos;IA peut transformer le continent.
          </p>
        </motion.div>

        {/* Countries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-16"
        >
          {countries.map((c) => (
            <div key={c.name} className="glass-strong rounded-xl p-5 text-center card-hover">
              <span className="text-3xl mb-2 block">{c.flag}</span>
              <p className="text-white font-semibold text-sm">{c.name}</p>
              <p className="text-[var(--text-muted)] text-xs mt-1">{c.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-5 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/30 via-[var(--accent)]/10 to-transparent" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="relative pl-14 md:pl-20"
              >
                {/* Dot */}
                <div className={`absolute left-3.5 md:left-6.5 top-1 w-3 h-3 rounded-full border-2 ${
                  item.current
                    ? "bg-[var(--accent)] border-[var(--accent)] shadow-lg shadow-[var(--accent)]/30"
                    : item.type === "work"
                    ? "bg-[#ffd93d] border-[#ffd93d]"
                    : "bg-transparent border-[var(--accent)]/40"
                }`} />

                <div className={`glass-strong rounded-xl p-6 ${item.highlight ? "border-[#ffd93d]/20" : ""}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-[var(--accent)] font-mono">{item.period}</span>
                    {item.current && (
                      <span className="px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 text-[10px] font-semibold uppercase">
                        En cours
                      </span>
                    )}
                    {item.type === "work" && (
                      <FaBriefcase className="text-[#ffd93d]" size={12} />
                    )}
                    {item.type === "education" && (
                      <FaGraduationCap className="text-[var(--accent)]" size={12} />
                    )}
                  </div>
                  <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm mt-0.5 flex items-center gap-1">
                    <FaGlobe size={10} /> {item.place}
                  </p>
                  <p className="text-[var(--text-muted)] text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
