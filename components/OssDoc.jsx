import "@/app/home.css";
import "@/app/oss/oss.css";
import { archivo, newsreader, mono } from "@/lib/fonts";


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
