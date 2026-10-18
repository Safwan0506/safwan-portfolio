"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs,
  SiTypescript, SiJavascript, SiPython, SiCplusplus,
  SiPhp, SiHtml5, SiCss, SiSpringboot,
  SiLaravel, SiTensorflow, SiPytorch,
  SiMysql, SiPostgresql, SiMongodb, SiFirebase,
  SiGit, SiDocker, SiFigma,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

interface Category {
  title: string;
  color: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: "Langages",
    color: "#7c6aff",
    skills: [
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
    ],
  },
  {
    title: "Frameworks",
    color: "#e040fb",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "IA & Data",
    color: "#ffd93d",
    skills: [
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
    ],
  },
  {
    title: "BDD & Outils",
    color: "#00e5ff",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
];

export default function CompetencesPage() {
  return (
    <section className="page-container relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-[#e040fb] rounded-full opacity-[0.03] blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="label-tag bg-[#e040fb]/10 text-[#e040fb] border border-[#e040fb]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e040fb]" />
            Competences
          </span>
          <h1 className="font-serif italic text-5xl sm:text-6xl text-white mt-6">
            Arsenal<br />
            <span className="gradient-text">Technologique</span>
          </h1>
          <p className="mt-4 text-[var(--text-muted)] text-lg max-w-xl">
            Chaque synapse de mon reseau neural maitrise un outil different.
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + ci * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <h2 className="text-white font-semibold text-xl">{cat.title}</h2>
                <div className="flex-1 h-px bg-white/[0.04]" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {cat.skills.map((skill, si) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + ci * 0.1 + si * 0.03 }}
                      className="group glass-strong rounded-xl p-4 flex items-center gap-3 card-hover"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${skill.color}15` }}
                      >
                        <Icon size={20} style={{ color: skill.color }} />
                      </div>
                      <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
