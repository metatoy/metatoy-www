import "./home.css";
import { archivo, newsreader, mono } from "@/lib/fonts";
import { pageMetadata } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
import HeroFX from "@/components/HeroFX";
import HeaderNav from "@/components/HeaderNav";
import Link from "next/link";
import { POSTS } from "./writing/posts";


const STUDIO_TITLE = "Metatoy: Build the tool, Ship the toy";
const base = pageMetadata({
  title: null,
  description:
    "Metatoy is a studio of one working the seam between design and engineering — production tools (Sorb), playful apps (woords, TattleTown), and open source built in the open.",
  path: "/",
});
export const metadata = {
  ...base,
  title: { absolute: STUDIO_TITLE },
  openGraph: { ...base.openGraph, title: STUDIO_TITLE },
  twitter: { ...base.twitter, title: STUDIO_TITLE },
};

const PROJECTS = [
  {
    name: "Sorb", kind: "Tool", tag: "beta", tagText: "Beta · invite", img: "/projects/sorb.png",
    body: "A design-token bridge carrying a live design system from Figma into a running React app, with a read layer AI agents can query.",
    why: "tokens change once, everywhere updates.",
    links: [{ t: "Site", u: "https://www.sorbcloud.com" }],
  },
  {
    name: "woords", kind: "Toy", tag: "live", tagText: "Live", img: "/projects/woords.png",
    body: "An infinite daily crossword whose board scales from a neighborhood to an alternate reality across five seasons. On the App Store.",
    why: "a new spatial word game, not a clone.",
    links: [{ t: "Site", u: "https://woords.io" }, { t: "App Store", u: "https://apps.apple.com/app/id6778837773" }, { t: "Features", u: "https://www.woords.io/features" }],
  },
  {
    name: "TattleTown", kind: "Toy", tag: "live", tagText: "Live", img: "/projects/tattletown.png",
    body: "Anonymous, place-anchored storytelling — drop and discover stories by geo and QR. On the App Store.",
    why: "the map is the feed.",
    links: [{ t: "Site", u: "https://tattletown.com" }, { t: "App Store", u: "https://apps.apple.com/us/app/tattletown/id6786742107" }, { t: "Features", u: "https://tattletown.com/features/" }],
  },
];
const OSS = [
  {
    name: "validonce",
    icon: "/brand/oss-validonce-light.svg",
    meta: "npm · PyPI · NuGet · Go · Maven · Apache-2.0",
    body: "Write cross-field validation rules once on the server (.NET, Python, Node, Go, Spring or Kubernetes CRDs) and enforce the same rules in React, Angular, Vue and plain HTML forms. With an MCP server and Claude Code plugin to migrate existing code.",
    subs: ["live playground", "6 backends · 4 frontends", "MCP server + Claude Code plugin", "kubb · Hey API · orval"],
    page: "/oss/validonce",
    play: "https://playground.metatoy.com",
    gh: "https://github.com/metatoy/validonce",
  },
  {
    name: "Scout",
    icon: "/brand/oss-scout-s4-small.svg",
    meta: "contributor · scoutui/scout · MIT",
    body: "Scout shows how a design system is used across every repo: which components, where, on which version. I added Angular support, 15 pull requests merged.",
    subs: ["Angular templates", "installed libraries", "selector matching", "unused props"],
    page: "/oss/scout",
    gh: "https://github.com/scoutui/scout/pulls?q=is%3Apr+author%3Anhunsaker",
  },
  {
    name: "Fidelity Ladder",
    icon: "/brand/oss-fls.svg",
    meta: "fidelity-ladder-system · MIT",
    body: "An agentic loop that climbs design fidelity — spec → wireframe → interactive demo → flagged code.",
    gh: "https://github.com/nhunsaker/fidelity-ladder-system",
  },
  {
    name: "woords-lab",
    icon: "/brand/oss-woords-lab.png",
    meta: "woords-lab-app · MIT",
    body: "An open-source SwiftUI showcase of the 14 visual effects built for woords — live on device.",
    gh: "https://github.com/metatoy/woords-lab-app",
  },
];

// Structured data (Organization + WebSite) so search engines can attach the
// studio's identity, logo, and profiles to the domain — dropped in the refresh.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://metatoy.com/#organization",
      name: "Metatoy",
      alternateName: "Metatoy LLC",
      url: "https://metatoy.com",
      logo: "https://metatoy.com/brand/metatoy-mark.svg",
      email: "hello@metatoy.com",
      description:
        "Metatoy is a studio of one working the seam between design and engineering — production tools (Sorb), playful apps (woords, TattleTown), and open source built in the open.",
      foundingDate: "2026",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Minneapolis",
          addressRegion: "MN",
          addressCountry: "US",
        },
      },
      sameAs: [
        "https://github.com/metatoy",
        "https://www.npmjs.com/org/sorb",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://metatoy.com/#website",
      url: "https://metatoy.com",
      name: "Metatoy",
      inLanguage: "en-US",
      publisher: { "@id": "https://metatoy.com/#organization" },
    },
  ],
};

export default function Home() {
  return (
    <main className={`mt-home ${archivo.variable} ${newsreader.variable} ${mono.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <header className="nav">
        <div className="wrap">
          <div className="logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="/brand/metatoy-mark.svg" alt="Metatoy" width="30" height="30" style={{ borderRadius: "6px", display: "block" }} />
            metatoy
          </div>
          <HeaderNav />
        </div>
      </header>

      <div className="wrap">
        <section className="hero" style={{ borderTop: "none" }}>
          <HeroFX />
          <div className="lbl">Metatoy — a studio of one · design × engineering</div>
          <h1>Build the tool, <em>ship the toy.</em></h1>
          <p className="lead">I work the seam between design and engineering — production tools, playful apps, and open source I build in the open.</p>
          <div className="cta">
            <a className="btn primary" href="#projects">See the work</a>
            <a className="btn" href="#contact">Talk to me</a>
          </div>
          <div className="term-context">
            <div className="k">Quick start · Sorb</div>
            <p>Point an AI agent at your design tokens, or pull them into React — one line each.</p>
          </div>
          <div className="term">
            <div className="bar"><i className="r"></i><i className="y"></i><i className="g"></i><span className="t">bash — sorb quickstart</span></div>
            <pre>
<span className="c-com"># let an AI agent read your design tokens — live, from the running bridge</span>{"\n"}
<span className="p">$ </span><span className="c-fn">npx</span> -y @sorb/tap{"\n"}{"\n"}
<span className="c-com"># or pull tokens into React with the SDK</span>{"\n"}
<span className="c-key">import</span> {"{ SorbProvider }"} <span className="c-key">from</span> <span className="c-str">{"'@sorb/leaf'"}</span>
            </pre>
          </div>
        </section>

        <section id="studio">
          <div className="sec-h"><h2>What the studio makes</h2><span className="lbl">Design × Engineering</span></div>
          <div className="triad">
            <div className="cell"><div className="n">01 · tools</div><h3>Tools</h3><p>Production software for people who build software. Sorb carries design tokens from Figma into a running React app — no rebuild.</p></div>
            <div className="cell"><div className="n">02 · toys</div><h3>Toys</h3><p>Playful iOS apps with real craft — an infinite crossword, place-anchored storytelling, an effects lab.</p></div>
            <div className="cell"><div className="n">03 · open source</div><h3>Open Source</h3><p>Libraries and tools built in the open, on npm, NuGet and PyPI, plus work merged upstream in other projects. Free for anyone to build on.</p></div>
          </div>
        </section>

        <section id="projects">
          <div className="sec-h"><h2>Featured work</h2><span className="lbl">Selected · 2026</span></div>
          <div className="cards">
            {PROJECTS.map((p) => (
              <div className="card" key={p.name}>
                {p.img ? <div className="card-media"><img src={p.img} alt={`${p.name} preview`} loading="lazy" /></div> : null}
                <div className={`kind ${p.kind.toLowerCase()}`}>{p.kind}</div>
                <div className="top"><h3>{p.name}</h3><span className={`tag ${p.tag}`}>{p.tagText}</span></div>
                <p>{p.body}</p>
                <div className="why">Why it matters: <b>{p.why}</b></div>
                {p.links ? <div className="card-links">{p.links.map((l) => (<a key={l.t} href={l.u}>{l.t} ↗</a>))}</div> : null}
              </div>
            ))}
          </div>
        </section>

        <section id="oss">
          <div className="sec-h"><h2>Open Source</h2><span className="lbl">npm · NuGet · PyPI · GitHub</span></div>
          <div className="oss-list">
            {OSS.map((o) => (
              <div className="oss-item" key={o.name}>
                <div className="oss-head"><span className="oss-title">{o.icon ? <img className="oss-icon" src={o.icon} alt="" width="28" height="28" /> : null}<h3>{o.page ? <a href={o.page} className="oss-name">{o.name}</a> : o.name}</h3></span><span className="oss-meta">{o.meta}</span></div>
                <p>{o.body}</p>
                {o.subs ? <div className="oss-sub">{o.subs.map((s) => (<span className="chip" key={s}>{s}</span>))}</div> : null}
                <div className="oss-links">
                  {o.page ? <a href={o.page}>Project page →</a> : null}
                  {o.play ? <a href={o.play}>Playground ↗</a> : null}
                  {o.npm ? <a href={o.npm}>npm ↗</a> : null}
                  {o.gh ? <a href={o.gh}>{o.page && o.name === "Scout" ? "Pull requests ↗" : "GitHub ↗"}</a> : null}
                </div>
              </div>
            ))}
          </div>
          <div className="install"><span className="p">$</span> dotnet add package Validonce.AspNetCore</div>
        </section>

        <section id="writing">
          <div className="sec-h"><h2>Writing</h2><Link className="lbl" href="/writing">All writing →</Link></div>
          <div className="ship">
            {POSTS.map((p) => (
              <div className="r" key={p.slug}>
                <time>{p.short}</time>
                <span><b><Link href={`/writing/${p.slug}`}>{p.title}</Link></b></span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="foot" id="contact">
        <div className="wrap">
          <div className="lbl" style={{ marginBottom: "20px" }}>Contact</div>
          <h3>Stuck between the design and the build?</h3>
          <p className="foot-lead">Send a note — it lands in my inbox, not a form graveyard.</p>
          <ContactForm />
          <div className="row">
            <span>
              <img src="/brand/spoon-cherry.svg" alt="" width="44" height="44" style={{ borderRadius: "6px", verticalAlign: "middle", marginRight: "9px" }} />
              metatoy — a studio of one, Minneapolis
            </span>
            <span><a href="https://github.com/metatoy">GitHub</a> · <a href="https://www.npmjs.com/org/sorb">npm</a></span>
          </div>
        </div>
      </footer>
    </main>
  );
}
