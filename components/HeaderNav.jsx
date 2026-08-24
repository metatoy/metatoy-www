"use client";

import { useState } from "react";

// Primary nav. Desktop shows the inline link row; below 820px the row is hidden
// (see home.css) and this right-aligned hamburger toggles a dropdown — previously
// the links just vanished on mobile with no replacement.
const LINKS = [
  { href: "#studio", label: "Studio" },
  { href: "#projects", label: "Projects" },
  { href: "#oss", label: "Open Source" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export default function HeaderNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <nav className="links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={`nav-burger${open ? " open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="mobile-nav" className={`mobile-nav${open ? " open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
      </nav>
    </>
  );
}
