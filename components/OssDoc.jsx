import "@/app/home.css";
import "@/app/oss/oss.css";
import { Archivo, Newsreader, IBM_Plex_Mono } from "next/font/google";

const archivo = Archivo({ subsets: ["latin"], weight: ["600", "800", "900"], variable: "--font-archivo", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-newsreader", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono-studio", display: "swap" });

// Frame for the open-source project pages (/oss/*): the studio header, a back
// link to the Open Source section, the page body, and a short footer.
export default function OssDoc({ children }) {
  return (
    <main className={`mt-home ${archivo.variable} ${newsreader.variable} ${mono.variable}`}>
      <header className="nav">
        <div className="wrap">
          <a className="logo" href="/" style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--color-ink)", textDecoration: "none" }}>
            <img src="/brand/metatoy-mark.svg" alt="" width="30" height="30" style={{ borderRadius: "6px", display: "block" }} />
            metatoy
          </a>
          <nav className="links doc-nav"><a href="/#oss">← Open source</a></nav>
        </div>
      </header>
      <div className="wrap doc">{children}</div>
      <footer className="foot doc-foot">
        <div className="wrap">
          <div className="row">
            <span>metatoy — a studio of one, Minneapolis</span>
            <span><a href="/#oss">Open source</a> · <a href="https://github.com/metatoy">GitHub</a> · <a href="/#contact">Contact</a></span>
          </div>
        </div>
      </footer>
    </main>
  );
}
