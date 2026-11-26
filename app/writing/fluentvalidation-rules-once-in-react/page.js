import "../writing.css";
import Link from "next/link";
import { archivo, newsreader, mono } from "@/lib/fonts";
import { pageMetadata, SITE } from "@/lib/site";

const PATH = "/writing/fluentvalidation-rules-once-in-react";
const TITLE = "Write a FluentValidation rule once, enforce it in your React form";
const DESCRIPTION =
  "Cross-field validation rules written once in ASP.NET Core with FluentValidation, published in the OpenAPI document, and enforced unchanged in a React form with react-hook-form and Zod. A C# Advent 2026 post.";
const PUBLISHED = "2026-12-03";
const PLAYGROUND = "https://playground.metatoy.com/?backend=aspnet&frontend=react";
const DOCS = "https://validonce.metatoy.com";
const REPO = "https://github.com/metatoy/validonce";

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

const CODE_BEFORE_CS = `RuleFor(x => x.Company).NotEmpty().When(x => x.Plan == "pro");
RuleFor(x => x.End).GreaterThanOrEqualTo(x => x.Start).When(x => x.End != null);`;

const CODE_BEFORE_TS = `.superRefine((v, ctx) => {
  if (v.plan === "pro" && !v.company)
    ctx.addIssue({ code: "custom", path: ["company"], message: "Company is required on the Pro plan" });
  if (v.start && v.end && v.end < v.start)
    ctx.addIssue({ code: "custom", path: ["end"], message: "End date must be on or after the start date" });
})`;

const CODE_VALIDATOR = `using Validonce;
using Validonce.FluentValidation;

public sealed class SignupValidator : ValidonceValidator<Signup>
{
    public SignupValidator()
    {
        RequiredWhen(x => x.Company, If.Eq(x => x.Plan, "pro"))
            .WithMessageKey("rules.company_required");
        Compare(x => x.End, CompareOp.Ge, x => x.Start)
            .WithMessageKey("rules.end_after_start");

        RuleFor(x => x.Email).NotEmpty(); // ordinary FluentValidation still works
    }
}`;

const CODE_REGISTER = `builder.Services.AddValidonce();
builder.Services.AddOpenApi(o => o.AddValidonceSchemaTransformer());

app.MapOpenApi();
app.MapPost("/signups", (Signup s) => Results.Ok(new { ok = true })).WithValidonce();`;

const CODE_OPENAPI = `"Signup": {
  "type": "object",
  "properties": { "plan": { ... }, "company": { ... }, "start": { ... }, "end": { ... } },
  "x-validonce": {
    "version": 1,
    "rules": [
      { "id": "Signup.required_when.company", "kind": "required_when", "field": "company",
        "when": { "eq": { "field": "plan", "value": "pro" } },
        "message": { "key": "rules.company_required" } },
      { "id": "Signup.compare.end", "kind": "compare",
        "left": { "field": "end" }, "op": "ge", "right": { "field": "start" }, "type": "date",
        "message": { "key": "rules.end_after_start" } }
    ]
  }
}`;

const CODE_REACT = `import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { rulesFromOpenApi } from "validonce/openapi";
import { withRules } from "validonce/zod";
import { z } from "zod";

const doc = await (await fetch("/openapi/v1.json")).json();
const rules = rulesFromOpenApi(doc, "Signup");

const messages = {
  "rules.company_required": "Company is required on the Pro plan",
  "rules.end_after_start": "End date must be on or after the start date",
};

const schema = withRules(
  z.object({
    plan: z.enum(["free", "pro"]),
    company: z.string().nullable(),
    email: z.string().min(1, "Email is required"),
    start: z.string().min(1, "Start date is required"),
    end: z.string().nullable(),
  }),
  rules,
  { messages },
);

const form = useForm({ resolver: zodResolver(schema) });`;

const CODE_422 = `import { fieldErrorsFromIssues, issuesFromResponse } from "validonce/server-errors";

const res = await fetch("/signups", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
if (!res.ok) {
  const body = await res.json().catch(() => null);
  const errors = fieldErrorsFromIssues(issuesFromResponse(body), messages);
  // { company: "Company is required on the Pro plan" }
}`;

function Code({ children }) {
  return <pre><code>{children}</code></pre>;
}

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
          <div className="lbl">Writing · C# Advent 2026</div>
          <h1>{TITLE}</h1>
          <p className="dek">
            Cross-field rules defined once in ASP.NET Core, published in the OpenAPI document, and enforced unchanged in
            the browser.
          </p>
          <div className="byline">
            <b>Nathan O&rsquo;Brien</b>
            <time dateTime={PUBLISHED}>December 3, 2026</time>
          </div>
        </div>

        <p>
          <i>This post is part of <a href="https://csadvent.christmas">C# Advent 2026</a>. Thanks to the organizers
          for putting it together again.</i>
        </p>

        <p>
          Single-field validation travels well. A required field, a maximum length or a regex pattern lands in your
          OpenAPI document as JSON Schema, and client generators turn it into form validation for free.
        </p>
        <p>
          Cross-field rules don&rsquo;t travel at all. &ldquo;Company is required on the Pro plan.&rdquo; &ldquo;The
          end date can&rsquo;t be before the start date.&rdquo; &ldquo;Give an email or a phone number.&rdquo; In
          FluentValidation they&rsquo;re a <code>When</code> or a <code>GreaterThanOrEqualTo(x =&gt; x.Other)</code>,
          and JSON Schema has no good way to say them. So the frontend writes them again:
        </p>
        <Code>{CODE_BEFORE_CS}</Code>
        <Code>{CODE_BEFORE_TS}</Code>
        <p>
          Two copies, two languages, two teams. They agree on the day they&rsquo;re written. Then someone changes one.
        </p>

        <h2>Rules as data</h2>
        <p>
          <a href={REPO}>validonce</a> is an open-source library that writes these rules once, on the server, as data.
          There are five kinds, which cover most of what cross-field checks do in practice:
        </p>
        <ul>
          <li><b>required_when:</b> a field is required when a condition holds (<code>plan</code> is <code>&quot;pro&quot;</code>).</li>
          <li><b>compare:</b> one field against another or a constant (<code>end &gt;= start</code>, dates, numbers or strings).</li>
          <li><b>at_least_one_of:</b> email or phone.</li>
          <li><b>exactly_one_of:</b> card or invoice, not both.</li>
          <li><b>all_or_none:</b> street, city and zip together.</li>
        </ul>
        <p>
          The server enforces them, publishes them in the OpenAPI document under <code>x-validonce</code>, and every
          client evaluates the same rules with the same semantics: what counts as blank, no type coercion, dates
          compared as dates. A shared conformance suite of 125 cases holds the C#, TypeScript, Python, Go and Java
          evaluators to identical results.
        </p>

        <h2>On the server: still FluentValidation</h2>
        <p>
          Install <code>Validonce.AspNetCore</code> and derive your validator from <code>ValidonceValidator&lt;T&gt;</code>,
          which is a FluentValidation <code>AbstractValidator&lt;T&gt;</code>. Cross-field rules use two new methods;
          everything else stays plain FluentValidation.
        </p>
        <Code>{CODE_VALIDATOR}</Code>
        <p>Register it, and turn on the OpenAPI transformer:</p>
        <Code>{CODE_REGISTER}</Code>
        <p>
          A request that breaks a rule gets a 422 with the usual problem details, plus a machine-readable list of what
          failed. And <code>/openapi/v1.json</code> now carries the rules, using the JSON names your API serializes:
        </p>
        <Code>{CODE_OPENAPI}</Code>

        <h2>In the browser: read the rules, don&rsquo;t rewrite them</h2>
        <p>
          The React form fetches the OpenAPI document (or extracts the rules at build time), and{" "}
          <code>withRules</code>{" "}attaches them to an ordinary Zod schema. react-hook-form doesn&rsquo;t know anything
          changed.
        </p>
        <Code>{CODE_REACT}</Code>
        <p>
          The messages are keys, so the browser can show its own wording and translations while the server stays
          language-neutral. Change the rule in C# and the form follows on the next load.
        </p>
        <p>
          The server is still the authority: a client can be old, or skip the check. Its 422 maps back onto the same
          fields with the same messages:
        </p>
        <Code>{CODE_422}</Code>

        <h2>What it won&rsquo;t do</h2>
        <p>
          Some checks shouldn&rsquo;t move, and the format is deliberately small so it says no clearly. Arithmetic
          between fields (<code>subtotal + tax == total</code>), comparisons against &ldquo;now&rdquo;, and anything
          that calls a database or a service (&ldquo;this email is already registered&rdquo;) stay in your
          FluentValidation code, on the server. A rule can also be marked <code>.ServerOnly()</code>{" "}when the browser
          shouldn&rsquo;t run it.
        </p>

        <h2>Try it</h2>
        <ul>
          <li>
            <a href={PLAYGROUND}>The playground</a> runs a live ASP.NET Core backend with a React form; swap in
            Angular, Vue or a plain HTML form, or a different backend, without changing the rules.
          </li>
          <li>
            <a href={`${DOCS}/docs/getting-started-aspnet`}>Getting started with ASP.NET Core</a> and the{" "}
            <a href={`${DOCS}/docs/client-react`}>React guide</a> on the docs site.
          </li>
          <li>
            Already have a pile of <code>When</code> clauses? The validonce Claude Code plugin finds your existing
            cross-field checks and drafts the rules, and its full version proves nothing changed by running your old
            validator against the new rules on generated inputs. See{" "}
            <a href={`${DOCS}/docs/agentic-migration`}>migrating with an agent</a>.
          </li>
        </ul>
        <p>
          validonce is Apache-2.0, on NuGet as <code>Validonce.AspNetCore</code> and on npm as{" "}
          <code>validonce</code>. Issues and ideas are welcome on <a href={REPO}>GitHub</a>.
        </p>

        <div className="article-foot">
          <div className="row">
            <a href={PLAYGROUND}>Open the playground ↗</a>
            <a href={REPO}>validonce on GitHub ↗</a>
            <Link href="/writing">More writing</Link>
          </div>
        </div>
      </article>
    </div>
  );
}
