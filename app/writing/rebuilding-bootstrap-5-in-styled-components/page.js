import "../writing.css";
import Link from "next/link";
import { archivo, newsreader, mono } from "@/lib/fonts";
import { pageMetadata, SITE } from "@/lib/site";


const PATH = "/writing/rebuilding-bootstrap-5-in-styled-components";
const TITLE = "Rebuilding Bootstrap 5 in styled-components: runtime theming and a pixel-parity harness";
const DESCRIPTION =
  "Bootstrap 5.3.8 rebuilt as React components in styled-components — runtime --bs-* theming, a typed <Box> utility API, and a pixelmatch + axe-core parity harness against a vendored oracle.";
const PUBLISHED = "2026-08-24";

// This page is the canonical original for the dev.to / Hashnode cross-posts
// (their canonical_url points here). Keep the URL stable.
const base = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
export const metadata = {
  ...base,
  openGraph: { ...base.openGraph, type: "article", publishedTime: PUBLISHED, authors: ["Nathan O'Brien"] },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  author: { "@type": "Person", name: "Nathan O'Brien", url: "https://github.com/nhunsaker" },
  publisher: { "@id": "https://metatoy.com/#organization" },
  mainEntityOfPage: `${SITE.url}${PATH}`,
};

const CODE_THEME = `import { BootstrapStyledProvider, createTheme, Button } from '@metatoy/bootstrap-styled'

const theme = createTheme({ colors: { primary: '#7c3aed' } })

export function App() {
  return (
    <BootstrapStyledProvider theme={theme} colorMode="light">
      <Button variant="primary">Save</Button>
      <Button variant="outline-danger">Delete</Button>
    </BootstrapStyledProvider>
  )
}`;

const CODE_BOX = `<Box m={3} d="flex" bg="primary" />   // → <div class="m-3 d-flex bg-primary" />
<Box m={{ base: 2, md: 4 }} />        // → <div class="m-2 m-md-4" />`;

export default function Article() {
  return (
    <div className={`mt-writing ${archivo.variable} ${newsreader.variable} ${mono.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <header className="nav">
        <div className="wrap">
          <Link className="logo" href="/">
            <img src="/brand/metatoy-mark.svg" alt="Metatoy" width="30" height="30" style={{ borderRadius: "6px", display: "block" }} />
            metatoy
          </Link>
          <Link className="nav-back" href="/writing">← Writing</Link>
        </div>
      </header>

      <article className="article">
        <div className="article-head">
          <div className="lbl">Writing · Open Source</div>
          <h1>Rebuilding Bootstrap 5 in styled-components</h1>
          <p className="dek">Runtime theming through Bootstrap&rsquo;s own <code>--bs-*</code> variables, utilities as typed props, and a parity harness that counts the pixels instead of trusting my eyes.</p>
          <div className="byline">
            <b>Nathan O&rsquo;Brien</b>
            <time dateTime={PUBLISHED}>August 24, 2026</time>
          </div>
        </div>

        <p>
          I maintain a handful of React apps that sit on Bootstrap, and the pattern is always the same:
          ship the entire Bootstrap stylesheet, then spend the rest of the project fighting it.
          Override files, specificity wars, a Sass build kept alive just to change three brand colors.
          The components were never the problem. The delivery mechanism was.
        </p>
        <p>
          So I rebuilt Bootstrap 5.3.8 as React components in styled-components.
          Same components, same class semantics, no stylesheet to import. It&rsquo;s called{" "}
          <a href="https://github.com/nhunsaker/bootstrap-styled">bootstrap-styled</a> — MIT, TypeScript
          types, tree-shakeable, on npm as <code>@metatoy/bootstrap-styled</code>. It&rsquo;s a modern
          successor to the old bootstrap-styled/v4 project, which stopped at Bootstrap 4.
        </p>
        <img
          src="https://raw.githubusercontent.com/nhunsaker/bootstrap-styled/main/assets/theming-demo.gif"
          alt="bootstrap-styled components re-skinning at runtime, light and dark"
          loading="lazy"
        />
        <p>
          This post covers the three decisions that shaped it: theming through Bootstrap&rsquo;s own{" "}
          <code>--bs-*</code> variables, a <code>&lt;Box&gt;</code> that takes utilities as typed props,
          and the harness that proves the rebuild actually matches Bootstrap.
        </p>

        <h2>Theming: Bootstrap already had the right API</h2>
        <p>
          Bootstrap 5 moved its internals onto CSS custom properties. <code>.btn-primary</code> doesn&rsquo;t
          hardcode a blue anymore, it reads <code>--bs-btn-bg</code>. Which means Bootstrap&rsquo;s theming
          layer is already runtime-capable — the Sass build mostly exists to generate those variables
          ahead of time.
        </p>
        <p>
          bootstrap-styled skips the generation step. <code>createTheme()</code> deep-merges your overrides
          onto the Bootstrap 5 defaults as a plain object, and the provider projects the result onto{" "}
          <code>--bs-*</code> variables at runtime:
        </p>
        <pre><code>{CODE_THEME}</code></pre>
        <p>
          Change the theme object and every component re-skins live. No rebuild, no Sass, no override
          file. Dark mode rides Bootstrap&rsquo;s native <code>data-bs-theme</code> attribute, with a{" "}
          <code>useColorMode</code> hook on top.
        </p>

        <h2>&lt;Box&gt;: utilities as typed props</h2>
        <p>
          Bootstrap&rsquo;s utility classes are half the reason teams stay on it — <code>d-flex</code> and{" "}
          <code>mt-3</code> are a shared vocabulary. But in React they&rsquo;re stringly-typed, and typos
          ship silently.
        </p>
        <p>
          <code>&lt;Box&gt;</code> keeps the utility vocabulary and moves it into props. Each prop maps
          1:1 to the exact Bootstrap class, including the responsive object form:
        </p>
        <pre><code>{CODE_BOX}</code></pre>
        <p>
          Because the mapping is 1:1 to real classes, a <code>&lt;Box&gt;</code> renders identically to a
          hand-written <code>&lt;div className=&quot;…&quot;&gt;</code>, which matters for the next section.
          It&rsquo;s polymorphic (<code>as=&quot;section&quot;</code>), and your own <code>className</code> is
          appended after the generated classes so overrides behave the way you&rsquo;d expect.
        </p>

        <h2>The parity harness: a number instead of a vibe</h2>
        <p>
          The failure mode of every &ldquo;X rebuilt in Y&rdquo; project is drift. You eyeball it, call it
          close enough, and six months later nothing quite matches. I wanted a number.
        </p>
        <p>The harness works like this:</p>
        <ol>
          <li>A vendored copy of Bootstrap 5.3.8 — pinned CSS and JS, hermetic, no CDN — is the oracle.</li>
          <li>A Vite page renders every fixture twice: once as native Bootstrap markup against the oracle stylesheet, once as the styled component.</li>
          <li>Playwright screenshots both sides at 2x with animations frozen.</li>
          <li>Each pair is padded to a common canvas, so a size difference counts as a difference, then diffed with pixelmatch at a 0.1 threshold.</li>
          <li>axe-core runs on both cell subtrees, and the violation counts have to match native.</li>
        </ol>
        <p>
          That last point is worth pausing on. The bar is not &ldquo;zero axe violations&rdquo; — some native
          Bootstrap fixtures carry a few of their own. The bar is parity: my Button cells report exactly
          the violations native Bootstrap&rsquo;s do, no more and no fewer. Claiming better-than-Bootstrap
          accessibility out of a parity harness would be marketing. Matching it is verifiable.
        </p>
        <p>
          The current scorecard covers 30 components, most at 0.0% pixel diff — Button alone is 96
          fixture cells at zero. What isn&rsquo;t covered is written down too: a{" "}
          <a href="https://github.com/nhunsaker/bootstrap-styled/blob/main/parity/gap-analysis.md">gap analysis</a>{" "}
          enumerates the full Bootstrap 5.3.x surface and marks every piece built, partial, or missing.
          It is not all of Bootstrap yet, and I&rsquo;d rather list the gaps than round up.
        </p>

        <h2>The styled-components question</h2>
        <p>
          Fair to ask: styled-components went into maintenance mode in March 2025, and its own maintainer
          has said he wouldn&rsquo;t pick it for a new project. I built on it anyway, with eyes open.
        </p>
        <p>
          Runtime <code>--bs-*</code> theming is exactly what a runtime CSS-in-JS engine is good at, and
          styled-components is stable today. More to the point, the styling engine sits behind a stable
          component API — your app imports <code>&lt;Button variant=&quot;primary&quot;&gt;</code>, not the
          internals — so a later move to a zero-runtime engine (or the Sanity fork) wouldn&rsquo;t break
          consumer code.
        </p>
        <p>
          The honest limitation: React Server Components don&rsquo;t work cleanly. styled-components needs
          Context, which means <code>&apos;use client&apos;</code>. If you need RSC or zero-runtime today,
          this library isn&rsquo;t for you yet.
        </p>

        <h2>Where it is</h2>
        <p>
          Docs and a live demo are at{" "}
          <a href="https://bootstrap-styled.metatoy.com">bootstrap-styled.metatoy.com</a> — the kitchen-sink
          page re-skins in place when you change the theme. The repo is{" "}
          <a href="https://github.com/nhunsaker/bootstrap-styled">github.com/nhunsaker/bootstrap-styled</a>.
        </p>
        <pre><code>npm install @metatoy/bootstrap-styled styled-components</code></pre>
        <p>
          It&rsquo;s early. The parts I most want feedback on are the theming API and the{" "}
          <code>&lt;Box&gt;</code> props — if you try it and something reads wrong,{" "}
          <a href="https://github.com/nhunsaker/bootstrap-styled/issues">open an issue</a>.
        </p>

        <div className="article-foot">
          <div className="row">
            <a href="https://bootstrap-styled.metatoy.com">Docs + demo ↗</a>
            <a href="https://github.com/nhunsaker/bootstrap-styled">GitHub ↗</a>
            <a href="https://www.npmjs.com/package/@metatoy/bootstrap-styled">npm ↗</a>
            <Link href="/writing">More writing</Link>
          </div>
        </div>
      </article>
    </div>
  );
}
