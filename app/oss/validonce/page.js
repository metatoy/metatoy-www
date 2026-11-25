import OssDoc from "@/components/OssDoc";
import CodeBlock from "@/components/CodeBlock";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "validonce",
  description:
    "validonce: write cross-field validation rules once on the server (ASP.NET Core, FastAPI, Fastify, NestJS, Go, Spring Boot or Kubernetes CRDs) and enforce the same rules in React, Angular, Vue and plain HTML forms. Try it in the playground. Open source, Apache-2.0.",
  path: "/oss/validonce",
});

const GH = "https://github.com/metatoy/validonce";

const PACKAGES = [
  { reg: "NuGet", name: "Validonce.AspNetCore", what: "ASP.NET Core minimal APIs and MVC: 422 on a broken rule, OpenAPI export", url: "https://www.nuget.org/packages/Validonce.AspNetCore" },
  { reg: "NuGet", name: "Validonce.FluentValidation", what: "Write the rules in FluentValidation validators", url: "https://www.nuget.org/packages/Validonce.FluentValidation" },
  { reg: "NuGet", name: "Validonce", what: "The core rule model and evaluator for .NET", url: "https://www.nuget.org/packages/Validonce" },
  { reg: "NuGet", name: "Validonce.Cli", what: "dotnet tool, including the regex portability linter", url: "https://www.nuget.org/packages/Validonce.Cli" },
  { reg: "PyPI", name: "validonce", what: "Pydantic models and FastAPI", url: "https://pypi.org/project/validonce/" },
  { reg: "npm", name: "validonce", what: "Browser runtime (Zod 4, React, Angular, Vue, plain HTML), Fastify and NestJS servers, Kubernetes CEL translation, kubb / Hey API / orval plugins", url: "https://www.npmjs.com/package/validonce" },
  { reg: "Go", name: "github.com/metatoy/validonce/go", what: "Go evaluator and builders, Huma and go-playground/validator integration", url: "https://pkg.go.dev/github.com/metatoy/validonce/go" },
  { reg: "Maven", name: "com.metatoy:validonce-spring", what: "Spring Boot: Bean Validation constraint, springdoc OpenAPI, 422 ProblemDetail (Java and Kotlin)", url: "https://central.sonatype.com/artifact/com.metatoy/validonce-spring" },
  { reg: "npm", name: "validonce-mcp", what: "MCP server for coding agents: read, check, evaluate and generate rules, and prove a migration", url: "https://www.npmjs.com/package/validonce-mcp" },
];

export default function ValidoncePage() {
  return (
    <OssDoc>
      <div className="lbl">Open source · Metatoy</div>
      <div className="doc-head">
        <img src="/brand/oss-validonce-light.svg" alt="" width="56" height="56" />
        <h1>validonce</h1>
      </div>
      <p className="tagline">Write cross-field validation rules once, on the server, and enforce the same rules in the browser.</p>
      <div className="facts">
        <span>v0.5.0</span>
        <span>Apache-2.0</span>
        <span>© 2026 Metatoy LLC</span>
        <span>C# · Python · TypeScript · Go · Java/Kotlin</span>
      </div>
      <div className="cta">
        <a className="btn primary" href="https://playground.metatoy.com">▶ Try it in the playground</a>
        <a className="btn" href={GH}>GitHub ↗</a>
        <a className="btn" href="https://www.npmjs.com/package/validonce">npm ↗</a>
        <a className="btn" href="https://pypi.org/project/validonce/">PyPI ↗</a>
        <a className="btn" href="https://www.nuget.org/packages/Validonce.AspNetCore">NuGet ↗</a>
        <a className="btn" href="https://pkg.go.dev/github.com/metatoy/validonce/go">Go ↗</a>
        <a className="btn" href="https://central.sonatype.com/artifact/com.metatoy/validonce-spring">Maven ↗</a>
      </div>

      <section>
        <h2>The problem</h2>
        <p>Field rules such as types, lengths and patterns already travel from a backend&rsquo;s OpenAPI document to the frontend. Rules that involve more than one field don&rsquo;t: <b>&ldquo;company is required when the plan is Pro&rdquo;</b>, <b>&ldquo;the end date must be on or after the start date&rdquo;</b>. Teams write those twice, once in the backend and once in the form, and the two copies drift apart.</p>
        <p>validonce exports those rules from your backend (ASP.NET Core, FastAPI, Fastify, NestJS, Go or Spring Boot, or the CEL rules of a Kubernetes CRD) as data in your OpenAPI document. A small runtime applies them in the browser, so React, Angular, Vue and plain HTML forms check the same rules and show each error on the right field.</p>
        <p><a href="https://playground.metatoy.com">The playground</a> lets you pick any backend and frontend and watch it work, including the server&rsquo;s 422 landing on the same fields.</p>
      </section>

      <section>
        <h2>How it works</h2>
        <figure className="vo-flow" aria-label="How validonce works: server rules become data in the OpenAPI document, the browser applies them, and the server still enforces every request">
          <div className="vo-col">
            <div className="vo-h vo-slate">01 · Server rules</div>
            <div className="vo-card vo-server"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><polyline points="64 88 16 128 64 168" /><polyline points="192 88 240 128 192 168" /><line x1="160" y1="40" x2="96" y2="216" /></svg><span><b>FluentValidation</b> (C#)<br /><code>RequiredWhen · Compare</code></span></div>
            <div className="vo-card vo-server"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><polyline points="64 88 16 128 64 168" /><polyline points="192 88 240 128 192 168" /><line x1="160" y1="40" x2="96" y2="216" /></svg><span><b>Pydantic</b> (Python)<br /><code>__rules__ = [ when(…).require(…) ]</code></span></div>
            <div className="vo-card vo-server"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><polyline points="64 88 16 128 64 168" /><polyline points="192 88 240 128 192 168" /><line x1="160" y1="40" x2="96" y2="216" /></svg><span><b>Fastify / NestJS</b> (TypeScript)<br /><code>validonce/rules</code></span></div>
            <div className="vo-card vo-server"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><polyline points="64 88 16 128 64 168" /><polyline points="192 88 240 128 192 168" /><line x1="160" y1="40" x2="96" y2="216" /></svg><span><b>Huma</b> (Go)<br /><code>struct rules</code></span></div>
            <div className="vo-card vo-server"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><polyline points="64 88 16 128 64 168" /><polyline points="192 88 240 128 192 168" /><line x1="160" y1="40" x2="96" y2="216" /></svg><span><b>Spring Boot</b> (Java / Kotlin)<br /><code>Bean Validation</code></span></div>
            <div className="vo-card vo-server"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><polyline points="64 88 16 128 64 168" /><polyline points="192 88 240 128 192 168" /><line x1="160" y1="40" x2="96" y2="216" /></svg><span><b>Kubernetes CRDs</b> (CEL)<br /><code>x-kubernetes-validations</code></span></div>
          </div>
          <div className="vo-arrow vo-arrow-slate" aria-hidden="true"></div>
          <div className="vo-col">
            <div className="vo-h vo-cyan">02 · OpenAPI document</div>
            <div className="vo-card vo-data"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><path d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z" /><polyline points="152 32 152 88 208 88" /><line x1="96" y1="136" x2="160" y2="136" /><line x1="96" y1="168" x2="160" y2="168" /></svg><span><b>The rules travel as data</b><br /><code>components.schemas.Signup</code><br /><span className="vo-chip">&quot;x-validonce&quot;: [ … ]</span><br />Five rule kinds, one format</span></div>
          </div>
          <div className="vo-arrow vo-arrow-cyan" aria-hidden="true"></div>
          <div className="vo-col">
            <div className="vo-h vo-green">03 · Browser</div>
            <div className="vo-card vo-browser"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" /><polyline points="88 136 112 160 168 104" /></svg><span><b>validonce runtime</b><br /><code>withRules(zod)</code><br />React (react-hook-form)<br />Angular (Signal / Reactive Forms)<br />Vue (VeeValidate)<br />Web components (<code>validonce/dom</code>)</span></div>
          </div>
          <div className="vo-enforce">
            <div className="vo-card vo-gate"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><polyline points="88 136 112 160 168 104" /><circle cx="128" cy="128" r="96" /></svg><span><b>The server always enforces</b><br />every request; a broken rule returns 422</span></div>
            <div className="vo-return"><span>422 · same issue shape, mapped back onto each field</span></div>
          </div>
        </figure>
        <p>The server always enforces the rules. The browser runs them first, for fast feedback. If the browser is skipped or out of date, the server&rsquo;s 422 response uses the same issue shape, and the client maps each error back onto its form field.</p>
      </section>

      <section>
        <h2>Migrate with an agent</h2>
        <p>Already have cross-field checks in FluentValidation, Pydantic, Zod, yup or Angular? A coding agent can move them to validonce and prove that nothing changed. The kit is an <b>MCP server</b> (<a href="https://www.npmjs.com/package/validonce-mcp"><code>validonce-mcp</code></a>, for any MCP client) and a <b>Claude Code plugin</b> that bundles it with the <code>validonce-migrate</code> skill.</p>
        <CodeBlock lang="shell" code={`/plugin marketplace add metatoy/validonce   # Claude Code
/plugin install validonce@validonce

claude mcp add --transport stdio validonce -- npx -y validonce-mcp   # the server alone`} />
        <p>The agent finds each check, rewrites it as a validonce rule, and runs a <b>differential test</b>: the old validator and validonce must accept and reject exactly the same inputs across thousands of generated edge cases. Every run is graded by code, not by a model. In 49 graded runs, including a hold-out of three public apps, no migration changed what the validator accepts or rejects.</p>
        <p className="note">Tools, results and the support policy: <a href={`${GH}/blob/main/docs/agentic-migration.md`}>docs/agentic-migration.md</a>.</p>
      </section>

      <section>
        <h2>What&rsquo;s in v0.5</h2>
        <ul>
          <li><b>Five rule kinds:</b> <code>required_when</code>, <code>compare</code>, <code>at_least_one_of</code>, <code>exactly_one_of</code> and <code>all_or_none</code>.</li>
          <li><b>Six backends:</b> ASP.NET Core with FluentValidation, FastAPI with Pydantic, Fastify, NestJS, Go with Huma, and Spring Boot (Java and Kotlin). They all return the same 422.</li>
          <li><b>Kubernetes:</b> the CEL rules of custom resources (<code>x-kubernetes-validations</code>) translate to validonce rules, checked against the API server&rsquo;s own validation.</li>
          <li><b>Four frontends:</b> React (react-hook-form), Angular (Signal and Reactive Forms), Vue (VeeValidate), and plain HTML or web components.</li>
          <li><b>Generator plugins:</b> the Zod schemas that kubb, Hey API and orval generate carry the cross-field rules.</li>
          <li><b>AI tooling:</b> an MCP server and a Claude Code plugin that migrate existing validation and prove it.</li>
          <li><b>One conformance suite</b> of 125 cases that the C#, Python, TypeScript, Go and Java evaluators all pass.</li>
          <li><b>A published standard:</b> the rule format has a permanent home at <a href="https://schemas.metatoy.com/validonce/">schemas.metatoy.com</a> and is listed on SchemaStore.</li>
          <li><b>A regex portability linter</b> for <code>pattern</code> rules, which flags patterns that behave differently across JavaScript, Python, Rust and .NET.</li>
        </ul>
      </section>

      <section>
        <h2>A rule, written once</h2>
        <CodeBlock lang="csharp" file="SignupValidator.cs" code={`public sealed class SignupValidator : ValidonceValidator<Signup>
{
    public SignupValidator()
    {
        RequiredWhen(x => x.Company, If.Eq(x => x.Plan, "pro"))
            .WithMessageKey("rules.company_required");
        Compare(x => x.End, CompareOp.Ge, x => x.Start)
            .WithMessageKey("rules.end_after_start");
    }
}`} />
        <p>The same two rules reach the browser through the OpenAPI document:</p>
        <CodeBlock lang="ts" file="signup-form.ts" code={`import { rulesFromOpenApi } from "validonce/openapi";
import { withRules } from "validonce/zod";

const rules = rulesFromOpenApi(openApiDoc, "Signup");
const schema = withRules(signupZodSchema, rules);`} />
        <p className="note">Quick starts for every backend and frontend are in the <a href={GH}>README</a>, or <a href="https://playground.metatoy.com">try them in the playground</a>.</p>
      </section>

      <section>
        <h2>Install</h2>
        <CodeBlock lang="shell" code={`dotnet add package Validonce.AspNetCore   # ASP.NET Core
pip install validonce                     # FastAPI / Pydantic (Python 3.10+)
go get github.com/metatoy/validonce/go    # Go / Huma
npm install validonce zod                 # browser, Fastify, NestJS`} />
        <p className="note">Spring Boot (Gradle): <code>implementation(&quot;com.metatoy:validonce-spring:0.5.0&quot;)</code></p>
        <div className="tbl"><table>
          <thead><tr><th>Registry</th><th>Package</th><th>What it does</th></tr></thead>
          <tbody>
            {PACKAGES.map((p) => (
              <tr key={p.reg + p.name}><td>{p.reg}</td><td><a href={p.url}><code>{p.name}</code></a></td><td>{p.what}</td></tr>
            ))}
          </tbody>
        </table></div>
      </section>

      <section>
        <h2>License</h2>
        <p>Apache-2.0, copyright 2026 Metatoy LLC. Contributions and issues are welcome on <a href={GH}>GitHub</a>.</p>
      </section>
    </OssDoc>
  );
}
