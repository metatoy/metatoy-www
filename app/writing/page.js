import "./writing.css";
import Link from "next/link";
import { archivo, newsreader, mono } from "@/lib/fonts";
import { pageMetadata } from "@/lib/site";


export const metadata = pageMetadata({
  title: "Writing",
  description: "Notes from the workshop — how the tools, toys, and open-source libraries get built.",
  path: "/writing",
});

const POSTS = [
  {
    slug: "rebuilding-bootstrap-5-in-styled-components",
    date: "2026-08-24",
    dateText: "August 24, 2026",
    title: "Rebuilding Bootstrap 5 in styled-components",
    dek: "Runtime theming through Bootstrap's own --bs-* variables, utilities as typed props, and a parity harness that counts the pixels instead of trusting my eyes.",
  },
];

export default function WritingIndex() {
  return (
    <div className={`mt-writing ${archivo.variable} ${newsreader.variable} ${mono.variable}`}>
      <header className="nav">
        <div className="wrap">
          <Link className="logo" href="/">
            <img src="/brand/metatoy-mark.svg" alt="Metatoy" width="30" height="30" style={{ borderRadius: "6px", display: "block" }} />
            metatoy
          </Link>
          <Link className="nav-back" href="/">← Home</Link>
        </div>
      </header>

      <div className="index">
        <div className="lbl" style={{ marginBottom: "18px" }}>Writing</div>
        <h1>Notes from the workshop</h1>
        {POSTS.map((p) => (
          <div className="entry" key={p.slug}>
            <time dateTime={p.date}>{p.dateText}</time>
            <h2><Link href={`/writing/${p.slug}`}>{p.title}</Link></h2>
            <p>{p.dek}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
