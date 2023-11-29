import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import { exo2, orbitron } from "./fonts";
import { Metadata } from "next";

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: 'Indie Gamer',
    template: '%s | Indie Gamer',
  },
};


export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
      <body className="flex flex-col min-h-screen px-4 py-2 bg-orange-50">
        <header>
          <Navbar />
        </header>
        <main className="py-3 grow"> {children}</main>
        <footer className="py-3 text-xs text-center border-t text-slate-500">
          Game data and images courtesy of{" "}
          <a
            href="https://rawg.io"
            target="_blank"
            className="text-orange-800 hover:underline"
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}
