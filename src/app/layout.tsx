import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Safwan Djazouli | Developpeur Full-Stack & IA",
  description:
    "Portfolio de Safwan Djazouli - Developpeur Full-Stack specialise en Intelligence Artificielle et Big Data. Base a Douala, Cameroun.",
  keywords: [
    "Safwan Djazouli",
    "Developpeur",
    "Full-Stack",
    "IA",
    "Intelligence Artificielle",
    "Big Data",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Safwan Djazouli" }],
  openGraph: {
    title: "Safwan Djazouli | Developpeur Full-Stack & IA",
    description:
      "Portfolio de Safwan Djazouli - Developpeur Full-Stack specialise en Intelligence Artificielle et Big Data.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="noise-bg min-h-full flex flex-col">{children}</body>
    </html>
  );
}
