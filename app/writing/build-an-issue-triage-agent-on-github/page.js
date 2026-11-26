import "../writing.css";
import Link from "next/link";
import { archivo, newsreader, mono } from "@/lib/fonts";
import { pageMetadata, SITE } from "@/lib/site";

const PATH = "/writing/build-an-issue-triage-agent-on-github";
const TITLE = "Build an issue-triage agent on GitHub";
const DESCRIPTION =
  "A hands-on tutorial: a rulebook that classifies and routes issues, a confidence gate that decides when an agent should investigate the code, and a flywheel that turns human corrections into better rules. Built on Actions, issues, labels and one Python script.";
const PUBLISHED = "2026-11-26";
const REPO = "https://github.com/nhunsaker/github-triage-agent-tutorial";

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

const CODE_START = `gh repo fork nhunsaker/github-triage-agent-tutorial --clone
cd github-triage-agent-tutorial
python -m pytest tests/ -q
# 27 passed, 38 skipped   <- the skips tick down as you build`;

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
          <div className="lbl">Writing · Tutorial</div>
          <h1>{TITLE}</h1>
          <p className="dek">
            A rulebook that routes issues, a confidence gate that decides when an agent should read the code, and the
            flywheel that turns human corrections into better rules. All on stock GitHub.
          </p>
          <div className="byline">
            <b>Nathan O&rsquo;Brien</b>
            <time dateTime={PUBLISHED}>November 26, 2026</time>
          </div>
        </div>

        <p>
          Most issue queues have the same shape. A few kinds of report make up most of the volume, someone senior
          reads every one of them anyway, and the interesting ones wait behind the routine ones. Triage is the part
          worth automating first, and it doesn&rsquo;t need a platform. It needs a few things GitHub already has:
          Actions, issues, labels, one Python script, and, if you want it, the Copilot coding agent.
        </p>
        <p>
          The <a href={REPO}>github-triage-agent-tutorial</a> repository builds that agent step by step. You write the
          code; the tests tell you when each chapter is right.
        </p>

        <h2>Two phases</h2>
        <p>
          <b>Phase one is a rulebook.</b> It is deterministic: each rule matches something in the issue and bids a
          severity, a destination and a confidence. Destinations are an internal service, an outside vendor or a
          human. It runs in an Action on every new issue and labels it in seconds.
        </p>
        <p>
          <b>Phase two is an investigation, and a confidence gate decides when it runs.</b>{" "}When the rulebook is sure,
          the labels stand. When it isn&rsquo;t, an agent reads the code that the error points to, writes up a
          hypothesis with its evidence, and leaves the decision to a person. The gate is what keeps the agent&rsquo;s
          work on the issues that need it.
        </p>

        <h2>The wall is the point</h2>
        <p>
          The demo company is Jane&rsquo;s Jeans, a fictional online jeans store with four services and two years of
          issue history. You train the rulebook on year one and watch it climb from about 31% correct routing to about
          83%. Then year two arrives: a payment vendor deprecates an API, the reports change shape, severity accuracy
          drops to about 72% and the gate starts sending 40% of issues to people.
        </p>
        <p>
          That drift is the lesson. A rulebook trained once decays, so the last chapters build the flywheel: when a
          person corrects a label, the correction is recorded, the misses are grouped, and the tutorial proposes the
          rule that would have caught them. Applying those rules brings routing back to about 89%, with under a quarter of
          issues gated.
        </p>

        <h2>How the tutorial works</h2>
        <ul>
          <li>
            <b>You write the core of each chapter.</b> The plumbing is given; each core function is a stub whose
            docstring is the contract. The finished versions live in <code>solutions/</code>, for comparison after,
            not before.
          </li>
          <li>
            <b>The tests are the progress meter.</b> A fresh clone runs green with one skipped block per unwritten
            chapter, and each chapter has its own gate.
          </li>
          <li>
            <b>It runs on your fork.</b> Real issues, real Actions runs, real labels. A seeding script files the demo
            issues and predicts what the triage should do with each one, so you can check it.
          </li>
          <li>
            <b>It&rsquo;s free up to the agent layers.</b> Most layers need nothing but a GitHub account. The LLM
            investigation needs one Anthropic API key and costs a few cents per issue; the Copilot coding-agent layer
            needs a Copilot seat.
          </li>
        </ul>
        <pre><code>{CODE_START}</code></pre>

        <h2>Where it came from</h2>
        <p>
          The tutorial is the second half of &ldquo;Automate the Queue&rdquo;, a talk I gave at the Applied AI
          Conference in Saint Paul on November 2, 2026. The first half covered what an AI triage agent gets right on a
          real queue and where it hits the wall. This is the version you can build yourself.
        </p>

        <div className="article-foot">
          <div className="row">
            <a href={REPO}>The tutorial on GitHub ↗</a>
            <Link href="/writing">More writing</Link>
          </div>
        </div>
      </article>
    </div>
  );
}
