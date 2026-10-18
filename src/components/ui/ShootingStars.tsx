"use client";

import { useEffect, useRef } from "react";

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Star { x: number; y: number; size: number; opacity: number; speed: number; }
    interface Shooting { x: number; y: number; len: number; speed: number; opacity: number; angle: number; life: number; maxLife: number; }

    const stars: Star[] = [];
    const shootings: Shooting[] = [];

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.0003 + 0.0001,
      });
    }

    const addShooting = () => {
      if (shootings.length < 2 && Math.random() < 0.008) {
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
        shootings.push({
          x: Math.random() * canvas.width * 0.8,
          y: Math.random() * canvas.height * 0.3,
          len: 60 + Math.random() * 80,
          speed: 6 + Math.random() * 4,
          opacity: 1,
          angle,
          life: 0,
          maxLife: 40 + Math.random() * 20,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = performance.now() * 0.001;

      stars.forEach((s) => {
        const twinkle = Math.sin(t * s.speed * 1000 + s.x) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 190, 255, ${s.opacity * twinkle})`;
        ctx.fill();
      });

      addShooting();

      for (let i = shootings.length - 1; i >= 0; i--) {
        const s = shootings[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity = 1 - s.life / s.maxLife;

        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, `rgba(124, 106, 255, 0)`);
        gradient.addColorStop(0.6, `rgba(180, 160, 255, ${s.opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();

        if (s.life >= s.maxLife) shootings.splice(i, 1);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}
