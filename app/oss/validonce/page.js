import OssDoc from "@/components/OssDoc";
import CodeBlock from "@/components/CodeBlock";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "validonce",
  description:
    "validonce: write cross-field validation rules once on the server (FluentValidation or Pydantic) and enforce the same rules in React and Angular forms. Open source, Apache-2.0.",
  path: "/oss/validonce",
});

const GH = "https://github.com/metatoy/validonce";

const PACKAGES = [
  { reg: "NuGet", name: "Validonce.AspNetCore", what: "ASP.NET Core minimal APIs and MVC: 422 on a broken rule, OpenAPI export", url: "https://www.nuget.org/packages/Validonce.AspNetCore" },
  { reg: "NuGet", name: "Validonce.FluentValidation", what: "Write the rules in FluentValidation validators", url: "https://www.nuget.org/packages/Validonce.FluentValidation" },
  { reg: "NuGet", name: "Validonce", what: "The core rule model and evaluator for .NET", url: "https://www.nuget.org/packages/Validonce" },
  { reg: "NuGet", name: "Validonce.Cli", what: "dotnet tool, including the regex portability linter", url: "https://www.nuget.org/packages/Validonce.Cli" },
  { reg: "PyPI", name: "validonce", what: "Pydantic models and FastAPI", url: "https://pypi.org/project/validonce/" },
  { reg: "npm", name: "validonce", what: "Browser runtime on Zod 4, React and Angular helpers, server-error mapping", url: "https://www.npmjs.com/package/validonce" },
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
        <span>v0.2.0</span>
        <span>Apache-2.0</span>
        <span>© 2026 Metatoy LLC</span>
        <span>C# · Python · TypeScript</span>
      </div>
      <div className="cta">
        <a className="btn primary" href={GH}>GitHub ↗</a>
        <a className="btn" href="https://www.nuget.org/packages/Validonce.AspNetCore">NuGet ↗</a>
        <a className="btn" href="https://www.npmjs.com/package/validonce">npm ↗</a>
        <a className="btn" href="https://pypi.org/project/validonce/">PyPI ↗</a>
      </div>

      <section>
        <h2>The problem</h2>
        <p>Field rules such as types, lengths and patterns already travel from a backend&rsquo;s OpenAPI document to the frontend. Rules that involve more than one field don&rsquo;t: <b>&ldquo;company is required when the plan is Pro&rdquo;</b>, <b>&ldquo;the end date must be on or after the start date&rdquo;</b>. Teams write those twice, once in the backend and once in the form, and the two copies drift apart.</p>
        <p>validonce exports those rules from FluentValidation (C#) or Pydantic (Python) as data in your OpenAPI document. A small TypeScript runtime applies them to your Zod schema, so React and Angular forms check the same rules and show each error on the right field.</p>
      </section>

      <section>
        <h2>How it works</h2>
        <figure className="vo-flow" aria-label="How validonce works: server rules become data in the OpenAPI document, the browser applies them, and the server still enforces every request">
          <div className="vo-col">
            <div className="vo-h vo-slate">01 · Server rules</div>
            <div className="vo-card vo-server"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><polyline points="64 88 16 128 64 168" /><polyline points="192 88 240 128 192 168" /><line x1="160" y1="40" x2="96" y2="216" /></svg><span><b>FluentValidation</b> (C#)<br /><code>RequiredWhen · Compare</code></span></div>
            <div className="vo-card vo-server"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><polyline points="64 88 16 128 64 168" /><polyline points="192 88 240 128 192 168" /><line x1="160" y1="40" x2="96" y2="216" /></svg><span><b>Pydantic</b> (Python)<br /><code>__rules__ = [ when(…).require(…) ]</code></span></div>
          </div>
          <div className="vo-arrow vo-arrow-slate" aria-hidden="true"></div>
          <div className="vo-col">
            <div className="vo-h vo-cyan">02 · OpenAPI document</div>
            <div className="vo-card vo-data"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><path d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z" /><polyline points="152 32 152 88 208 88" /><line x1="96" y1="136" x2="160" y2="136" /><line x1="96" y1="168" x2="160" y2="168" /></svg><span><b>The rules travel as data</b><br /><code>components.schemas.Signup</code><br /><span className="vo-chip">&quot;x-validonce&quot;: [ … ]</span><br />Five rule kinds, one format</span></div>
          </div>
          <div className="vo-arrow vo-arrow-cyan" aria-hidden="true"></div>
          <div className="vo-col">
            <div className="vo-h vo-green">03 · Browser</div>
            <div className="vo-card vo-browser"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" /><polyline points="88 136 112 160 168 104" /></svg><span><b>validonce runtime</b><br /><code>withRules(zod)</code><br />React (react-hook-form)<br />Angular (Signal / Reactive Forms)</span></div>
          </div>
          <div className="vo-enforce">
            <div className="vo-card vo-gate"><svg aria-hidden="true" className="vo-ic" viewBox="0 0 256 256"><polyline points="88 136 112 160 168 104" /><circle cx="128" cy="128" r="96" /></svg><span><b>The server always enforces</b><br />every request; a broken rule returns 422</span></div>
            <div className="vo-return"><span>422 · same issue shape, mapped back onto each field</span></div>
          </div>
        </figure>
        <p>The server always enforces the rules. The browser runs them first, for fast feedback. If the browser is skipped or out of date, the server&rsquo;s 422 response uses the same issue shape, and the client maps each error back onto its form field.</p>
      </section>

      <section>
        <h2>What&rsquo;s in v0.2</h2>
        <ul>
          <li><b>Five rule kinds:</b> <code>required_when</code>, <code>compare</code>, <code>at_least_one_of</code>, <code>exactly_one_of</code> and <code>all_or_none</code>.</li>
          <li><b>C# first:</b> FluentValidation validators, ASP.NET Core minimal APIs and MVC, and OpenAPI export.</li>
          <li><b>Python:</b> Pydantic models and FastAPI.</li>
          <li><b>Browser:</b> Zod 4, react-hook-form helpers, Angular Signal Forms and Reactive Forms, and mapping of server errors onto fields.</li>
          <li><b>One conformance suite</b> of 125 cases that the C#, Python and TypeScript evaluators all pass.</li>
          <li><b>A regex portability linter</b> for <code>pattern</code> rules, which flags patterns that behave differently in JavaScript, Python and .NET.</li>
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
        <p className="note">Full quick starts for ASP.NET Core, FastAPI, React and Angular are in the <a href={GH}>README</a>.</p>
      </section>

      <section>
        <h2>Install</h2>
        <CodeBlock lang="shell" code={`dotnet add package Validonce.AspNetCore   # ASP.NET Core
pip install validonce                     # FastAPI / Pydantic (Python 3.10+)
npm install validonce zod                 # browser`} />
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
