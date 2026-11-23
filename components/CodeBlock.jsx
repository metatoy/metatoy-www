"use client";

import { useState } from "react";

// A code sample for the open-source pages: a title bar (language, optional file
// name, copy button) over the code, with light, dependency-free highlighting.

const KEYWORDS = {
  csharp: ["public", "private", "sealed", "class", "record", "new", "var", "return", "using", "static", "void", "string", "if", "else", "await", "async"],
  ts: ["import", "from", "export", "const", "let", "var", "await", "async", "return", "function", "new", "if", "else", "type"],
  python: ["from", "import", "class", "def", "return", "None", "True", "False", "if", "else", "with", "as"],
  shell: ["npm", "npx", "pnpm", "pip", "dotnet", "add", "install"],
};

const COMMENT = { csharp: "//", ts: "//", python: "#", shell: "#" };

function tokenize(code, lang) {
  const kw = new Set(KEYWORDS[lang] || []);
  const c = COMMENT[lang] || "//";
  const commentRe = c === "#" ? "#[^\\n]*" : "\\/\\/[^\\n]*";
  const re = new RegExp(`(${commentRe})|("(?:[^"\\\\\\n]|\\\\.)*"|'(?:[^'\\\\\\n]|\\\\.)*'|\`[^\`]*\`)|(\\b\\d+(?:\\.\\d+)?\\b)|([A-Za-z_$][\\w$]*)`, "g");
  const out = [];
  let last = 0;
  let m;
  while ((m = re.exec(code))) {
    if (m.index > last) out.push({ t: code.slice(last, m.index) });
    const [tok, com, str, num, id] = m;
    if (com) out.push({ t: tok, k: "c" });
    else if (str) out.push({ t: tok, k: "s" });
    else if (num) out.push({ t: tok, k: "n" });
    else if (id) {
      const next = code.slice(re.lastIndex).match(/^\s*\(/);
      if (kw.has(id)) out.push({ t: tok, k: "k" });
      else if (next) out.push({ t: tok, k: "f" });
      else if (/^[A-Z]/.test(id) && lang !== "shell") out.push({ t: tok, k: "y" });
      else out.push({ t: tok });
    }
    last = re.lastIndex;
  }
  if (last < code.length) out.push({ t: code.slice(last) });
  return out;
}

const LABEL = { csharp: "C#", ts: "TypeScript", python: "Python", shell: "Terminal" };

export default function CodeBlock({ code, lang = "ts", file }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      setCopied(false);
    }
  };
  return (
    <figure className="cb">
      <div className="cb-bar">
        <span className="cb-lang">{LABEL[lang] || lang}</span>
        {file ? <span className="cb-file">{file}</span> : null}
        <button type="button" className="cb-copy" onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="cb-pre"><code>
        {tokenize(code, lang).map((p, i) => (p.k ? <span key={i} className={`cb-${p.k}`}>{p.t}</span> : p.t))}
      </code></pre>
    </figure>
  );
}
