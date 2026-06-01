import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web On Fire Academy — Aprenda na prática o que está pegando fogo na Web",
  description:
    "Laboratórios 100% interativos, códigos testados e comentados, passo a passo intuitivo. React, Next.js, Firebase e TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body
        style={{
          fontFamily: "var(--font-sans), sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
