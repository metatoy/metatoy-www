import OssDoc from "@/components/OssDoc";
import CodeBlock from "@/components/CodeBlock";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Scout: design-system adoption, now with Angular",
  description:
    "Scout is an open-source dashboard and CLI that shows how your design system is used across every repo. An introduction to the tool, and the Angular support Metatoy added (15 merged pull requests).",
  path: "/oss/scout",
});

const GH = "https://github.com/scoutui/scout";
const DEMO = "https://demo.scoutui.dev";
const DOCS = "https://scoutui.dev/docs/overview";
const MY_PRS = "https://github.com/scoutui/scout/pulls?q=is%3Apr+author%3Anhunsaker";

const TOUR = [
  {
    img: "/brand/scout/repos.jpg",
    alt: "Scout's Repos page: eleven repos with their last scan, component count, deprecated uses and changes since the previous scan",
    title: "Every repo at a glance",
    body: "The home view lists every scanned repo: when it was last scanned, how many components it uses, how many uses are of something deprecated, and what changed since the previous scan. It's the quickest way to spot a repo that's drifting.",
  },
  {
    img: "/brand/scout/components.jpg",
    alt: "The component list for the Angular app ng-matero, with MatFormField selected and its top props shown in a side panel",
    title: "Every component a repo uses",
    body: "Open a repo to see each component it uses, which package and version it comes from, and how many files and uses it has. The side panel shows the props teams actually pass, which tells you which options matter and which nobody touches.",
  },
  {
    img: "/brand/scout/usage.jpg",
    alt: "Usage detail for MatFormField: 117 uses across 20 files, grouped by folder, with prop values",
    title: "Every use, down to the file",
    body: "Open a component to see every file that uses it, grouped by folder, and the values passed for each prop. Before changing a component, you can see exactly who you'd affect.",
  },
  {
    img: "/brand/scout/adoption-chart.jpg",
    alt: "A trend chart of each design system's uses across the organization over a year",
    title: "Adoption over time",
    body: "Scout keeps a scan for each commit, so charts show how adoption changes over months: which libraries are growing, which are shrinking, and whether a push to adopt the design system is working.",
  },
  {
    img: "/brand/scout/governance.jpg",
    alt: "The Governance page listing retired and replaced packages with the uses left in each repo",
    title: "Migrations and retirements",
    body: "Mark a package or component as replaced or retired, with the reason or the replacement. Every remaining use then shows as deprecated, and Scout counts what's left in each repo until it reaches zero.",
  },
  {
    img: "/brand/scout/migration.jpg",
    alt: "A migration chart from ant-design-vue to antdv-next, 51.3 percent migrated",
    title: "Track a migration to the finish",
    body: "Each migration gets its own chart: percent migrated, uses left, and whether anything moved in the last 30 days.",
  },
];

export default function ScoutPage() {
  return (
    <OssDoc>
      <div className="lbl">Open source · contributor</div>
      <h1 className="sr-only">Scout</h1>
      <img className="banner" src="/brand/scout-s4-banner-light.svg" alt="Scout. See how your design system is used across every repo." width="1280" height="320" />
      <p className="tagline">An open-source dashboard and command-line tool that shows how your design system is used across every repo. I added Angular support.</p>
      <div className="facts">
        <span>scoutui/scout</span>
        <span>MIT</span>
        <span>React · Vue · Angular · web components</span>
        <span>15 of my pull requests merged</span>
      </div>
      <div className="cta">
        <a className="btn primary" href={DEMO}>Try the demo ↗</a>
        <a className="btn" href={DOCS}>Docs ↗</a>
        <a className="btn" href={GH}>GitHub ↗</a>
        <a className="btn" href={MY_PRS}>My pull requests ↗</a>
      </div>

      <section>
        <h2>The problem it solves</h2>
        <p>A design-system team publishes a component library: buttons, form fields, cards. Then dozens of product teams install it in their own repos, and the design-system team loses sight of it. Which teams use which components? On which version? With which options? Is anyone still on the old library everyone was asked to leave?</p>
        <p>Without those answers, every change is a guess. You can&rsquo;t tell who a breaking change will hurt, which components are worth investing in, or whether a migration is actually happening.</p>
      </section>

      <section>
        <h2>What Scout does</h2>
        <p><b>Scout reads the code instead of asking people.</b> Its command-line tool scans a repo written in React, Vue or Angular, web components included, and records every component the code uses, where it&rsquo;s used and with which props. A dashboard collects those scans from all your repos, so you can see adoption at a glance, plan migrations and track each one until it&rsquo;s done.</p>
        <ul>
          <li><b>Adoption across repos:</b> which repos use each component, and on which version.</li>
          <li><b>Every use:</b> each file that uses a component, and the props passed.</li>
          <li><b>Migrations and retirements:</b> mark something as replaced or retired, and watch each repo move off it.</li>
          <li><b>History:</b> a scan for each commit, so charts show change over time.</li>
          <li><b>Scans from CI:</b> a fresh scan on every merge keeps the dashboard current.</li>
        </ul>
      </section>

      <section>
        <h2>How you set it up</h2>
        <p><b>1. Scan a repo.</b> Install the CLI in the repo you want to scan (Node 24 or later). The dry run writes a <code>scout-scan.json</code> file you can inspect, without uploading anything.</p>
        <CodeBlock lang="shell" code={`npm i -D @scoutui/cli
npx scout init
npx scout scan --dry-run`} />
        <p><b>2. Run the dashboard.</b> Try it on your own machine first, then deploy it for your team on Kubernetes with the project&rsquo;s Helm chart.</p>
        <p><b>3. Scan from CI.</b> Add a step that uploads a scan on every merge, in each repo you want to track. From then on the dashboard stays current without anyone running anything.</p>
        <p className="note">Step-by-step guides are in <a href={DOCS}>Scout&rsquo;s docs</a>.</p>
      </section>

      <section>
        <h2>A tour of the dashboard</h2>
        <p className="note">Screenshots from Scout&rsquo;s public demo, which scans a set of open-source apps. You can click through it yourself at <a href={DEMO}>demo.scoutui.dev</a>.</p>
        {TOUR.map((t) => (
          <figure className="shot" key={t.img}>
            <a href={t.img}><img src={t.img} alt={t.alt} loading="lazy" /></a>
            <figcaption><b>{t.title}.</b> {t.body}</figcaption>
          </figure>
        ))}
      </section>

      <section>
        <h2>What I added: Angular</h2>
        <p>When I found Scout, it read React and Vue. A lot of enterprise design systems ship for Angular, and those teams had no way in. I proposed Angular support to the maintainer, who agreed to the scope, and built it as a series of small pull requests that could be reviewed and merged in order. The component screenshots above are an Angular app, ng-matero, read by that code.</p>
        <div className="stats">
          <div className="stat"><div className="n">15</div><div className="k">pull requests merged, Nov 6–18, 2026</div></div>
          <div className="stat"><div className="n">2</div><div className="k">more open for review</div></div>
          <div className="stat"><div className="n">1</div><div className="k">real Angular Material app scanned in CI on every change</div></div>
        </div>
        <p>The approach: read templates with Angular&rsquo;s own compiler, loaded from the repo being scanned rather than bundled; match components through Angular&rsquo;s selector rules, because design systems lean heavily on attribute selectors; and treat Angular as one more template language instead of a special case.</p>
        <p><b>What the 15 merged pull requests cover:</b></p>
        <ul>
          <li><b>Angular support end to end:</b> finding the components used in Angular templates, counting components that come from installed libraries such as a company design system, and opening Scout&rsquo;s scan format to any framework.</li>
          <li><b>Accurate counts on real apps:</b> eight fixes for cases real Angular codebases hit, such as shared import lists, components exported under two names, attribute selectors and directives.</li>
          <li><b>A real app in CI:</b> ng-matero, an Angular Material app, is scanned on every change, so Angular support stays working.</li>
          <li><b>Beyond Angular:</b> unused declared props on the dashboard&rsquo;s component list, and a React fix for children passed between a component&rsquo;s tags.</li>
        </ul>
        <p className="note">Two more are open for review. <a href={MY_PRS}>See every pull request on GitHub</a>.</p>
      </section>

      <section>
        <h2>License</h2>
        <p>Scout is MIT-licensed and maintained by the ScoutUI project. My contributions are under Scout&rsquo;s license, in the upstream repo.</p>
      </section>
    </OssDoc>
  );
}
