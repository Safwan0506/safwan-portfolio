<div align="center">

# Neural Hub

**An interactive 3D portfolio experience built with Next.js and Three.js**

![Screenshot](./public/screenshot.png)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-000000?style=flat-square&logo=threedotjs)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

---

## About

Neural Hub is a developer portfolio that replaces traditional navigation with an interactive 3D neural network. Five neuron nodes connected by animated synapses serve as the main navigation system, built entirely with React Three Fiber. The site features smooth page transitions, a shooting stars background, and an AI assistant chatbot named Orion.

Accent color: `#7c6aff`

## Features

- **3D Neural Network Navigation** -- Five interconnected neuron nodes rendered with Three.js and React Three Fiber, forming an interactive hub that drives site navigation.
- **Animated Loading Screen** -- Typewriter effect intro sequence before the main experience loads.
- **Orion AI Chatbot** -- Conversational assistant with CTA navigation buttons that guide visitors through the portfolio.
- **Shooting Stars Background** -- Persistent animated canvas layer with particle effects.
- **Pill Navbar** -- Compact navigation bar with spring-based animations via Framer Motion.
- **Page Transitions** -- Smooth animated transitions between all pages using Framer Motion.
- **Five Pages** -- Accueil (Home), Parcours (Journey/Timeline), Competences (Skills), Projets (Projects), Contact.

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 16, React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| 3D | Three.js, React Three Fiber, Drei |
| Animation | Framer Motion, react-type-animation |
| Particles | tsparticles |
| Icons | react-icons |

## Getting Started

**Prerequisites:** Node.js 18+ and npm (or yarn/pnpm).

```bash
# Clone the repository
git clone https://github.com/safwan-djazouli/safwan-portfolio.git
cd safwan-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Other Commands

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Entry page
│   └── globals.css         # Global styles
├── components/
│   ├── 3d/                 # Three.js / R3F components
│   │   ├── NeuralHub.tsx   # Main 3D hub orchestrator
│   │   ├── NeuralNetwork.tsx
│   │   └── Scene.tsx       # R3F Canvas scene
│   ├── chatbot/
│   │   └── Orion.tsx       # AI chatbot assistant
│   ├── pages/              # Full page components
│   │   ├── AccueilPage.tsx
│   │   ├── ParcoursPage.tsx
│   │   ├── CompetencesPage.tsx
│   │   ├── ProjetsPage.tsx
│   │   └── ContactPage.tsx
│   ├── sections/           # Reusable page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   └── ui/                 # UI primitives
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── LoadingScreen.tsx
│       ├── ShootingStars.tsx
│       └── ParticlesBackground.tsx
└── types/                  # TypeScript type definitions
```

## Author

**Safwan Djazouli** -- Full-Stack & AI Developer

Student at KEYCE Informatique Douala

- GitHub: [github.com/safwan-djazouli](https://github.com/safwan-djazouli)
- LinkedIn: [linkedin.com/in/safwan-djazouli](https://linkedin.com/in/safwan-djazouli)

## License

This project is licensed under the [MIT License](./LICENSE).
