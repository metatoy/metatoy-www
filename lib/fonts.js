// The site's three Google fonts, declared once. Next.js wants each next/font call in one module;
// pages and components import these instead of calling the loaders themselves.
import { Archivo, Newsreader, IBM_Plex_Mono } from "next/font/google";

export const archivo = Archivo({ subsets: ["latin"], weight: ["600", "800", "900"], variable: "--font-archivo", display: "swap" });
export const newsreader = Newsreader({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-newsreader", display: "swap" });
export const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono-studio", display: "swap" });
