"use client";
import { useEffect, useRef, useState } from "react";

// Cloudflare Turnstile. Real key via env in prod; the "always passes" TEST key in dev.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [err, setErr] = useState("");
  const widgetRef = useRef(null);
  const tokenRef = useRef("");

  useEffect(() => {
    let cancelled = false;
    function render() {
      if (cancelled || !window.turnstile || !widgetRef.current || widgetRef.current.dataset.rendered) return;
      window.turnstile.render(widgetRef.current, {
        sitekey: SITE_KEY,
        callback: (t) => { tokenRef.current = t; },
        "error-callback": () => { tokenRef.current = ""; },
        "expired-callback": () => { tokenRef.current = ""; },
      });
      widgetRef.current.dataset.rendered = "1";
    }
    if (window.turnstile) { render(); return; }
    if (!document.getElementById("cf-turnstile-script")) {
      const s = document.createElement("script");
      s.id = "cf-turnstile-script";
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true; s.defer = true;
      s.onload = render;
      document.head.appendChild(s);
    } else {
      document.getElementById("cf-turnstile-script").addEventListener("load", render);
    }
    return () => { cancelled = true; };
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending"); setErr("");
    const body = {
      name: (fd.get("name") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      message: (fd.get("message") || "").toString().trim(),
      website: (fd.get("website") || "").toString(), // honeypot
      token: tokenRef.current,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setStatus("ok"); form.reset(); }
      else { setStatus("error"); setErr(data.error || "Something went wrong. Try again."); }
    } catch {
      setStatus("error"); setErr("Network error. Try again.");
    }
  }

  if (status === "ok") {
    return <p className="form-ok">Thanks — your message is on its way. I&apos;ll get back to you.</p>;
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="fgrid">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows={4} required></textarea>
      </div>
      <input type="text" name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div ref={widgetRef} className="cf-widget"></div>
      <div className="form-row">
        <button className="btn primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" ? <span className="form-err">{err}</span> : null}
      </div>
    </form>
  );
}
