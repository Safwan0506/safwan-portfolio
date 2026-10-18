"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/ui/Navbar";
import Orion from "@/components/chatbot/Orion";
import ShootingStars from "@/components/ui/ShootingStars";
import AccueilPage from "@/components/pages/AccueilPage";
import ParcoursPage from "@/components/pages/ParcoursPage";
import CompetencesPage from "@/components/pages/CompetencesPage";
import ProjetsPage from "@/components/pages/ProjetsPage";
import ContactPage from "@/components/pages/ContactPage";

const NeuralHub = dynamic(() => import("@/components/3d/NeuralHub"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[var(--background)] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export type PageId = "hub" | "accueil" | "parcours" | "competences" | "projets" | "contact";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const hubTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageId>("hub");

  const navigate = useCallback((page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0 });
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "accueil": return <AccueilPage />;
      case "parcours": return <ParcoursPage />;
      case "competences": return <CompetencesPage />;
      case "projets": return <ProjetsPage />;
      case "contact": return <ContactPage />;
      default: return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      <ShootingStars />
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <Orion currentPage={currentPage} onNavigate={navigate} />

      <AnimatePresence mode="wait">
        {currentPage === "hub" ? (
          <motion.div key="hub" {...hubTransition} className="fixed inset-0 pt-16">
            <NeuralHub onNavigate={navigate} />
          </motion.div>
        ) : (
          <motion.div key={currentPage} {...pageTransition} className="relative z-10">
            {renderPage()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
