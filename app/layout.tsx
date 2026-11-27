import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Anton, Caveat_Brush, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveatBrush = Caveat_Brush({
  variable: "--font-caveat-brush",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Rathnavel R — Fashion Technology",
  description:
    "Portfolio of Rathnavel R, a final-year Fashion Technology student interested in Industrial Engineering and Merchandising.",
};

const buildModeScript = `
  (() => {
    const query = new URLSearchParams(location.search).get("agents");
    let saved = null;
    try { saved = localStorage.getItem("portfolio-agents"); } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enabled = query === "on" || (query !== "off" && saved !== "off" && !reduced);
    if (enabled) document.documentElement.classList.add("build-mode");
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${geist.variable} ${geistMono.variable} ${caveatBrush.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: buildModeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
