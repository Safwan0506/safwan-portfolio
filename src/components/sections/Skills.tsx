"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaJava,
  FaReact,
  FaPhp,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiNextdotjs,
  SiLaravel,
  SiCplusplus,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiTensorflow,
  SiPytorch,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiFigma,
} from "react-icons/si";
import { HiCube, HiChip } from "react-icons/hi";
import type { IconType } from "react-icons";

const skillCategories: {
  title: string;
  icon: IconType;
  skills: { name: string; icon: IconType; color: string }[];
}[] = [
  {
    title: "Langages",
    icon: HiCube,
    skills: [
      { name: "Java", icon: FaJava, color: "#f89820" },
      { name: "Python", icon: FaPython, color: "#3776ab" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "C++", icon: SiCplusplus, color: "#00599c" },
      { name: "PHP", icon: FaPhp, color: "#777bb4" },
      { name: "HTML5", icon: FaHtml5, color: "#e34f26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572b6" },
    ],
  },
  {
    title: "Frameworks & Librairies",
    icon: HiChip,
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "React", icon: FaReact, color: "#61dafb" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
      { name: "Laravel", icon: SiLaravel, color: "#ff2d20" },
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
    ],
  },
  {
    title: "IA & Data Science",
    icon: HiChip,
    skills: [
      { name: "TensorFlow", icon: SiTensorflow, color: "#ff6f00" },
      { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c" },
    ],
  },
  {
    title: "Bases de donnees & Outils",
    icon: FaDatabase,
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479a1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
      { name: "Firebase", icon: SiFirebase, color: "#ffca28" },
      { name: "Git", icon: FaGitAlt, color: "#f05032" },
      { name: "Docker", icon: FaDocker, color: "#2496ed" },
      { name: "Figma", icon: SiFigma, color: "#f24e1e" },
    ],
  },
];

function SkillCard({
  skill,
  delay,
}: {
  skill: { name: string; icon: IconType; color: string };
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.08, y: -4 }}
      className="group flex flex-col items-center gap-2.5 p-4 rounded-xl glass card-hover cursor-default relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${skill.color}10, transparent 70%)`,
        }}
      />
      <skill.icon
        size={26}
        style={{ color: skill.color }}
        className="relative z-10 group-hover:drop-shadow-lg transition-all duration-300"
      />
      <span className="relative z-10 text-[11px] text-[var(--text-muted)] group-hover:text-white transition-colors font-medium">
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="competences" className="section-padding relative" ref={ref}>
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
            Competences
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Stack <span className="gradient-text">Technique</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-5 max-w-2xl mx-auto text-lg">
            Un arsenal technologique complet, du frontend au backend, en passant
            par l&apos;intelligence artificielle et le Big Data.
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                  <category.icon className="text-[var(--accent)]" size={15} />
                </div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                  {category.title}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {category.skills.map((skill, si) => (
                  <SkillCard key={si} skill={skill} delay={si * 0.04} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
