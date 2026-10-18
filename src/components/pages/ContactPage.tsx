"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import { FaGithub, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:safwandjazouli@yahoo.com?subject=${encodeURIComponent(form.subject || "Contact Portfolio")}&body=${encodeURIComponent(
      `Nom: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.open(mailtoLink, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="page-container relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-[#ff6b6b] rounded-full opacity-[0.03] blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="label-tag bg-[#ff6b6b]/10 text-[#ff6b6b] border border-[#ff6b6b]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b6b]" />
            Contact
          </span>
          <h1 className="font-serif italic text-5xl sm:text-6xl text-white mt-6">
            Travaillons<br />
            <span className="gradient-text">Ensemble</span>
          </h1>
          <p className="mt-4 text-[var(--text-muted)] text-lg max-w-xl">
            Une idee de projet, une opportunite ou juste envie d&apos;echanger ? Je
            reponds rapidement et avec enthousiasme.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { icon: HiMail, label: "EMAIL", value: "safwandjazouli@yahoo.com", href: "mailto:safwandjazouli@yahoo.com" },
              { icon: HiLocationMarker, label: "LOCALISATION", value: "Douala, Cameroun", href: undefined },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                  <item.icon className="text-[var(--accent)]" size={20} />
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white font-medium hover:text-[var(--accent)] transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-white font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-4">
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider font-semibold mb-3">RESEAUX</p>
              <div className="flex items-center gap-3">
                <a href="https://github.com/Safwan0506" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl glass flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/40 transition-all">
                  <FaGithub size={18} />
                </a>
                <a href="https://linkedin.com/in/djazouli-safwan-079b23342" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl glass flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/40 transition-all">
                  <FaLinkedinIn size={18} />
                </a>
              </div>
            </div>

            <div className="mt-6 glass-strong rounded-xl p-5">
              <p className="text-sm text-white/80 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                Disponible pour opportunites et nouveaux defis.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider font-semibold mb-2 block">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jean Dupont"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)]/30 placeholder:text-white/15 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider font-semibold mb-2 block">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jean@email.com"
                    value={form.email}
                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)]/30 placeholder:text-white/15 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider font-semibold mb-2 block">
                  Sujet
                </label>
                <input
                  type="text"
                  placeholder="Proposition de projet, stage..."
                  value={form.subject}
                  onChange={(e) => setForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)]/30 placeholder:text-white/15 transition-colors"
                />
              </div>

              <div>
                <label className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider font-semibold mb-2 block">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Decrivez votre projet ou votre demande en detail..."
                  value={form.message}
                  onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)]/30 placeholder:text-white/15 transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-shadow"
              >
                <FaPaperPlane size={14} />
                {sent ? "Message envoye !" : "Envoyer le message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
