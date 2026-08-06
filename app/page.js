import Link from "next/link";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { SITE, pageMetadata } from "@/lib/site";

// Studio contact mailbox (distinct from SITE.contactEmail, which Sorb's legal
// pages use). Studio landing routes "contact" + "subscribe" here.
const STUDIO_EMAIL = "hello@metatoy.com";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-studio-mono",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-studio-display",
  display: "swap",
});

const STUDIO_TITLE = "Metatoy: Build the tool, Ship the toy";
const base = pageMetadata({
  title: null,
  description:
    "Metatoy is a workshop of one — a developer tool (Sorb) and a consumer game (woords) built side by side. One founder, two products.",
  path: "/",
});
export const metadata = {
  ...base,
  title: { absolute: STUDIO_TITLE },
  openGraph: { ...base.openGraph, title: STUDIO_TITLE },
  twitter: { ...base.twitter, title: STUDIO_TITLE },
};

// ---- decorative top strip: 16-cell grid of geometric glyph tiles ----
const C = {
  bg: "#04110a",
  bg2: "#04130a",
  green: "#35ff6a",
  greenDark: "#0a3a1d",
};
const STRIPE_D = `repeating-linear-gradient(-45deg, ${C.bg2} 0 6px, ${C.green} 6px 12px)`;
const STRIPE_H = `repeating-linear-gradient(0deg, ${C.bg2} 0 6px, ${C.green} 6px 12px)`;
const CHECKER = `conic-gradient(${C.green} 90deg, ${C.greenDark} 0 180deg, ${C.green} 0 270deg, ${C.greenDark} 0) 0 0 / 50% 50%`;
const CONC_BL = `repeating-radial-gradient(circle at 0% 100%, ${C.greenDark} 0 18%, ${C.green} 18% 34%, ${C.greenDark} 34% 50%) ${C.greenDark}`;
const CONC_BR = `repeating-radial-gradient(circle at 100% 100%, ${C.greenDark} 0 18%, ${C.green} 18% 34%, ${C.greenDark} 34% 50%) ${C.greenDark}`;
const PIE = `conic-gradient(${C.green} 0 90deg, ${C.greenDark} 0 180deg, ${C.green} 0 270deg, ${C.greenDark} 0)`;
const STAR = "polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%)";
const ARROW = "polygon(50% 100%, 0 42%, 28% 42%, 28% 0, 72% 0, 72% 42%, 100% 42%)";

const center = { display: "flex", alignItems: "center", justifyContent: "center" };

function tile(key, i) {
  switch (key) {
    case "stripeD":
      return <div key={i} style={{ background: STRIPE_D }} />;
    case "stripeH":
      return <div key={i} style={{ background: STRIPE_H }} />;
    case "checker":
      return <div key={i} style={{ background: CHECKER }} />;
    case "concBL":
      return <div key={i} style={{ background: CONC_BL }} />;
    case "concBR":
      return <div key={i} style={{ background: CONC_BR }} />;
    case "circle":
      return (
        <div key={i} style={{ background: C.greenDark, ...center }}>
          <div style={{ width: "54%", height: "54%", background: C.green, borderRadius: "50%" }} />
        </div>
      );
    case "diamond":
      return (
        <div key={i} style={{ background: C.green, ...center }}>
          <div style={{ width: "54%", height: "54%", background: C.bg2, transform: "rotate(45deg)" }} />
        </div>
      );
    case "pie":
      return (
        <div key={i} style={{ background: C.bg2, ...center }}>
          <div style={{ width: "60%", height: "60%", borderRadius: "50%", background: PIE }} />
        </div>
      );
    case "star":
      return (
        <div key={i} style={{ background: C.green, ...center }}>
          <div style={{ width: "64%", height: "64%", background: C.bg2, clipPath: STAR }} />
        </div>
      );
    case "arrow":
      return (
        <div key={i} style={{ background: C.bg2, ...center }}>
          <div style={{ width: "60%", height: "60%", background: C.green, clipPath: ARROW }} />
        </div>
      );
    default:
      return <div key={i} />;
  }
}

const STRIP = [
  "stripeD", "circle", "diamond", "checker", "concBL", "stripeH", "pie", "star",
  "stripeD", "circle", "diamond", "checker", "concBR", "stripeH", "arrow", "star",
];

// ---- product roster ----
const PRODUCTS = [
  {
    n: "01",
    id: "woords",
    name: "w∞rds™",
    glyph: "stripeD",
    chips: ["iPhone", "iPad"],
    blurb:
      "A spatial crossword. Slide, stack and cross words across a living grid where every move shifts the board. Quick to learn, hard to put down.",
    status: "beta",
    cta: { label: "waitlist →", href: "https://woords.io/", external: true },
  },
  {
    n: "02",
    id: "sorb",
    name: "Sorb",
    glyph: "checker",
    chips: ["Figma", "→", "React"],
    blurb:
      "Sorb is the design-token bridge for the running app: it carries proposed tokens into your own React components as CSS custom properties - auto-bound, nothing to hand-author - live-previews the change, and checks it before merge.",
    status: "private beta",
    cta: { label: "explore →", href: "https://www.sorbcloud.com", external: true },
  },
];

export default function StudioLanding() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.studio,
    url: SITE.url,
    sameAs: [SITE.githubUrl],
  };

  return (
    <div className={`studio-page ${mono.variable} ${display.variable}`}>
      <JsonLd data={org} />

      {/* decorative glyph strip */}
      <div className="studio-strip" aria-hidden="true">
        {STRIP.map((k, i) => tile(k, i))}
      </div>

      <div className="studio-wrap">
        <header className="studio-header">
          <Link className="studio-logo" href="/">
            <span className="studio-logo-mark" aria-hidden="true" />
            metatoy.com
          </Link>
          <nav className="studio-nav">
            <a href="#woords">[woords]</a>
            <a href="#sorb">[sorb]</a>
            <a href={`mailto:${STUDIO_EMAIL}`}>[contact]</a>
          </nav>
        </header>

        <main>
          <section className="studio-hero">
            <p className="studio-eyebrow">
              ~ one founder, two products <span className="studio-caret" />
            </p>
            <h1 className="studio-h1">
              Build the tool.
              <br />
              <span className="studio-accent">Ship the toy.</span>
            </h1>
            <p className="studio-lead">
              Metatoy is a workshop of one — a developer tool and a consumer
              game built side by side, under the same roof. Two audiences, one
              set of hands, zero filler.
            </p>
            <ul className="studio-meta">
              <li>
                <span className="studio-dot" /> status: shipping
              </li>
              <li>loc: remote</li>
              <li>since: 2026</li>
              <li>stack: figma · react · swift</li>
            </ul>
          </section>

          <section className="studio-section">
            <p className="studio-rule-label">{"// CURRENTLY SHIPPING"}</p>
            <ul className="studio-products">
              {PRODUCTS.map((p) => (
                <li className="studio-product" id={p.id} key={p.id}>
                  <span className="studio-num">{p.n}</span>
                  <div className="studio-product-main">
                    <div className="studio-product-name">
                      {tile(p.glyph, p.id)}
                      <h2>{p.name}</h2>
                    </div>
                    <div className="studio-chips">
                      {p.chips.map((c, ci) =>
                        c === "→" ? (
                          <span className="studio-chip-sep" key={ci}>
                            →
                          </span>
                        ) : (
                          <span className="studio-chip" key={ci}>
                            {c}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                  <p className="studio-product-blurb">{p.blurb}</p>
                  <div className="studio-product-side">
                    <span className="studio-status">
                      <span className="studio-dot" /> {p.status}
                    </span>
                    {p.cta.external ? (
                      <a
                        className="studio-btn"
                        href={p.cta.href}
                        rel="noopener noreferrer"
                      >
                        {p.cta.label}
                      </a>
                    ) : (
                      <a className="studio-btn" href={p.cta.href}>
                        {p.cta.label}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="studio-subscribe">
            <p className="studio-subscribe-copy">
              <span className="studio-prompt">$</span> subscribe — one email when
              there&rsquo;s something to see.
            </p>
            <a className="studio-btn studio-btn-solid" href={`mailto:${STUDIO_EMAIL}`}>
              {STUDIO_EMAIL} ↵
            </a>
          </section>
        </main>

        <footer className="studio-footer">
          <p>made by one human, two cups of coffee at a time.</p>
          <p>
            <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a> · © 2026 Metatoy
            LLC
          </p>
        </footer>
      </div>
    </div>
  );
}
