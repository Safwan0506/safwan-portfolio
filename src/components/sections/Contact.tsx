"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    const mailtoLink = `mailto:safwandjazouli@yahoo.com?subject=${encodeURIComponent(
      formState.subject || "Contact depuis le portfolio"
    )}&body=${encodeURIComponent(
      `De: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    )}`;
    window.open(mailtoLink, "_blank");
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    }, 1000);
  };

  const inputClasses =
    "w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)]/40 focus:ring-1 focus:ring-[var(--accent)]/10 focus:bg-white/[0.03] transition-all duration-300 placeholder:text-white/15";

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
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
            Contact
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Travaillons <span className="gradient-text">Ensemble</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-5 max-w-2xl mx-auto text-lg">
            Vous avez un projet en tete, une opportunite ou simplement envie
            d&apos;echanger ? N&apos;hesitez pas a me contacter.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt className="text-[var(--accent)]" size={18} />
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-0.5">
                    Localisation
                  </p>
                  <p className="text-white font-medium text-sm">
                    Douala, Cameroun
                  </p>
                  <p className="text-[var(--text-muted)] text-xs">
                    Originaire du Tchad
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-[var(--accent)]" size={18} />
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <a
                    href="mailto:safwandjazouli@yahoo.com"
                    className="text-white font-medium text-sm hover:text-[var(--accent)] transition-colors"
                  >
                    safwandjazouli@yahoo.com
                  </a>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-4">
                Reseaux
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/Safwan0506"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 h-11 rounded-xl glass flex items-center justify-center gap-2 text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/30 transition-all duration-300"
                >
                  <FaGithub size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/djazouli-safwan-079b23342"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 h-11 rounded-xl glass flex items-center justify-center gap-2 text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/30 transition-all duration-300"
                >
                  <FaLinkedinIn size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs">LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-400 opacity-[0.03] blur-[40px] rounded-full" />
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-green-400 text-xs font-medium">
                  Disponible
                </span>
              </div>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                Ouvert aux opportunites de stage, freelance et collaborations sur
                des projets innovants.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

            <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              <FaPaperPlane className="text-[var(--accent)]" size={14} />
              Ecrire un Message
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2 block">
                  Nom
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className={inputClasses}
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  className={inputClasses}
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2 block">
                Sujet
              </label>
              <input
                type="text"
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                className={inputClasses}
                placeholder="Sujet du message"
              />
            </div>

            <div className="mb-6">
              <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2 block">
                Message
              </label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
                rows={5}
                className={`${inputClasses} resize-none`}
                placeholder="Votre message..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full py-3.5 rounded-xl font-medium text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                sent
                  ? "bg-green-500/80"
                  : "bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] hover:shadow-lg hover:shadow-[var(--accent-glow)]"
              }`}
            >
              {sent ? (
                "Message envoye !"
              ) : sending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Envoi...
                </span>
              ) : (
                <>
                  <FaPaperPlane size={13} />
                  Envoyer le message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
