"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import { FaBrain, FaUser } from "react-icons/fa";
import type { PageId } from "@/app/page";

interface Message {
  role: "bot" | "user";
  text: string;
  typing?: boolean;
  actions?: { label: string; page: PageId }[];
  time?: string;
}

const getTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const quickQuestions = [
  { label: "Qui est Safwan ?", icon: "🧠" },
  { label: "Competences IA", icon: "⚡" },
  { label: "Projets", icon: "📁" },
  { label: "Le reseau neural ?", icon: "🔮" },
  { label: "Contacter", icon: "📬" },
  { label: "Parcours", icon: "🎓" },
];

interface ResponseData {
  text: string;
  actions?: { label: string; page: PageId }[];
}

const responses: Record<string, ResponseData> = {
  "Qui est Safwan ?": {
    text: `Safwan Djazouli est un developpeur Full-Stack et specialiste en Intelligence Artificielle, originaire du Tchad.\n\nIl etudie a Keyce Informatique & IA de Douala en 3eme annee — specialite IA & Big Data.\n\nFait unique : il detient 3 baccalaureats (Centrafrique 2022, Tchad + Cameroun 2023). Un parcours multiculturel forge entre trois pays d'Afrique.`,
    actions: [
      { label: "Ouvrir Accueil & Vision", page: "accueil" },
      { label: "Voir Formations & Competences", page: "parcours" },
    ],
  },
  "Competences IA": {
    text: `⚡ Specialisation IA & Big Data :\n• Machine Learning & Deep Learning\n• TensorFlow, PyTorch\n• Traitement de donnees massives\n\n🔧 Stack Full-Stack :\n• Frontend : React, Next.js, Tailwind CSS\n• Backend : Java/Spring Boot, Node.js, Laravel\n• Langages : Python, TypeScript, Java, C++, PHP\n• BDD : MySQL, PostgreSQL, MongoDB, Firebase`,
    actions: [{ label: "Voir toutes les competences", page: "competences" }],
  },
  "Projets": {
    text: `📁 Projets de Safwan :\n\n🟣 Scensora — Plateforme beaute sensorielle\nDesign immersif, deploye sur Vercel\n\n🔵 Trading Platform — Analyse IA de marches\nAlgorithmes predictifs, temps reel\n\n🟣 Djazz Junior BTP — Site entreprise\nPour une entreprise de Bangui`,
    actions: [{ label: "Entrer dans la Salle des Projets", page: "projets" }],
  },
  "Le reseau neural ?": {
    text: `🔮 Le Neural Hub que vous voyez est une metaphore interactive.\n\n• Chaque neurone = une section du portfolio\n• Les synapses = les connexions entre mes competences\n• Les particules = les donnees qui circulent\n• L'anneau orbital = la plateforme de lancement\n\nCliquez un neurone pour naviguer vers la section correspondante.`,
    actions: [{ label: "Retour au Neural Hub", page: "hub" }],
  },
  "Contacter": {
    text: `📬 Coordonnees de Safwan :\n\n• Email : safwandjazouli@yahoo.com\n• GitHub : github.com/Safwan0506\n• LinkedIn : Djazouli Safwan\n• Base : Douala, Cameroun\n\n✅ Disponible pour stages, freelance et collaborations.`,
    actions: [{ label: "Ouvrir le formulaire de contact", page: "contact" }],
  },
  "Parcours": {
    text: `🎓 Timeline :\n\n2026-2027 → Licence IA & Big Data — Keyce\n2025-2026 → 2eme annee Tronc Commun\n2024-2025 → 1ere annee Keyce\n2024 → Stage Djazz Junior BTP, Bangui\n2022-2023 → Double Bac (Tchad + Cameroun)\n2021-2022 → Bac Centrafricain\n\n3 pays, 3 bacs, 1 passion : l'IA.`,
    actions: [{ label: "Voir le parcours complet", page: "parcours" }],
  },
};

function getResponse(input: string): ResponseData {
  const lower = input.toLowerCase();
  if (lower.includes("safwan") || lower.includes("qui") || lower.includes("toi") || lower.includes("presente"))
    return responses["Qui est Safwan ?"];
  if (lower.includes("competence") || lower.includes("skill") || lower.includes("ia") || lower.includes("intelligence") || lower.includes("tech") || lower.includes("stack"))
    return responses["Competences IA"];
  if (lower.includes("projet") || lower.includes("realisation") || lower.includes("travail") || lower.includes("scensora") || lower.includes("trading"))
    return responses["Projets"];
  if (lower.includes("reseau") || lower.includes("neural") || lower.includes("3d") || lower.includes("hub") || lower.includes("neurone"))
    return responses["Le reseau neural ?"];
  if (lower.includes("contact") || lower.includes("email") || lower.includes("joindre") || lower.includes("mail") || lower.includes("linkedin"))
    return responses["Contacter"];
  if (lower.includes("parcours") || lower.includes("ecole") || lower.includes("bac") || lower.includes("etude") || lower.includes("keyce") || lower.includes("formation"))
    return responses["Parcours"];
  if (lower.includes("bonjour") || lower.includes("salut") || lower.includes("hello") || lower.includes("hey"))
    return { text: "Salut ! 👋 Je suis Orion, l'assistant IA de Safwan. Posez-moi une question ou explorez le Neural Hub !", actions: [{ label: "Explorer le Hub", page: "hub" }] };
  if (lower.includes("merci"))
    return { text: "Avec plaisir ! 🙌 N'hesitez pas si vous avez d'autres questions.", actions: [] };
  return {
    text: "Je suis Orion, l'IA de Safwan. Je peux vous parler de ses competences, son parcours, ses projets ou comment le contacter.",
    actions: [
      { label: "Voir les competences", page: "competences" },
      { label: "Voir les projets", page: "projets" },
    ],
  };
}

export default function Orion({
  currentPage,
  onNavigate,
}: {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Bienvenue dans le Neural Hub de Safwan. 🧠\n\nJe suis Orion, l'IA qui habite ce reseau. Chaque neurone represente une facette de l'expertise de Safwan — et moi, je suis la pour vous guider.\n\nQue voulez-vous decouvrir ?",
      time: getTime(),
      actions: [
        { label: "Ouvrir Accueil & Vision", page: "accueil" },
        { label: "Voir les Projets", page: "projets" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback((text: string) => {
    const time = getTime();
    setMessages((prev) => [...prev, { role: "user", text, time }, { role: "bot", text: "", typing: true }]);
    setInput("");

    setTimeout(() => {
      const response = getResponse(text);
      setMessages((prev) => [
        ...prev.filter((m) => !m.typing),
        { role: "bot", text: response.text, time: getTime(), actions: response.actions },
      ]);
    }, 600 + Math.random() * 800);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[560px] rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-black/50"
            style={{
              background: "rgba(8, 8, 16, 0.95)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(124, 106, 255, 0.1)",
            }}
          >
            {/* Header */}
            <div className="relative p-4 flex items-center justify-between overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--gradient-1)]/10 to-[var(--gradient-2)]/10" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gradient-1)] to-[var(--gradient-2)] flex items-center justify-center">
                  <FaBrain className="text-white" size={16} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm flex items-center gap-2">
                    Orion
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[var(--accent)]/20 text-[var(--accent)]">
                      Assistant IA
                    </span>
                  </p>
                  <p className="text-green-400 text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    En direct du Neural Hub
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <HiX size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--gradient-1)]/20 to-[var(--gradient-2)]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <FaBrain className="text-[var(--accent)]" size={10} />
                    </div>
                  )}
                  <div className="max-w-[82%]">
                    <div
                      className={`px-4 py-3 text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white rounded-2xl rounded-br-md"
                          : "bg-white/[0.04] border border-white/[0.06] text-white/80 rounded-2xl rounded-bl-md"
                      }`}
                    >
                      {msg.typing ? (
                        <div className="flex gap-1.5 py-1 px-1">
                          {[0, 1, 2].map((n) => (
                            <span
                              key={n}
                              className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce"
                              style={{ animationDelay: `${n * 150}ms` }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="whitespace-pre-line">{msg.text}</div>
                      )}
                    </div>

                    {/* Action buttons */}
                    {msg.actions && msg.actions.length > 0 && !msg.typing && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.actions.map((action, ai) => (
                          <button
                            key={ai}
                            onClick={() => onNavigate(action.page)}
                            className="px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[11px] font-medium hover:bg-[var(--accent)]/20 transition-colors"
                          >
                            {action.label} ↗
                          </button>
                        ))}
                      </div>
                    )}

                    {msg.time && !msg.typing && (
                      <p className={`text-[10px] text-white/20 mt-1 ${msg.role === "user" ? "text-right" : ""}`}>
                        {msg.time}
                      </p>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-[var(--gradient-2)]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <FaUser className="text-[var(--gradient-2)]" size={9} />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={endRef} />

              {/* Quick questions */}
              {messages.length <= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 gap-2 mt-3"
                >
                  {quickQuestions.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => sendMessage(q.label)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] text-[var(--text-muted)] hover:text-white hover:bg-[var(--accent)]/5 hover:border-[var(--accent)]/20 transition-all duration-300 text-left"
                    >
                      <span>{q.icon}</span>
                      <span>{q.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-white/[0.04] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez une question a Orion..."
                className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--accent)]/30 placeholder:text-white/15 transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] flex items-center justify-center text-white shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl shadow-2xl transition-all duration-500 ${
          isOpen
            ? "w-14 h-14 bg-white/10 border border-white/20 shadow-none justify-center"
            : "px-4 h-14 bg-gradient-to-br from-[var(--gradient-1)] to-[var(--gradient-2)] animate-pulse-glow"
        }`}
      >
        {isOpen ? (
          <HiX className="text-white" size={22} />
        ) : (
          <>
            <FaBrain className="text-white" size={18} />
            <div className="text-left hidden sm:block">
              <p className="text-white text-xs font-semibold leading-tight">Orion</p>
              <p className="text-white/60 text-[9px] leading-tight">En ligne · Poser une question</p>
            </div>
          </>
        )}
      </motion.button>
    </>
  );
}
