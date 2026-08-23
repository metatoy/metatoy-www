// POST /api/contact — verifies Turnstile, honeypot-guards, emails hello@metatoy.com via Migadu SMTP.
// The recipient address lives ONLY here (server-side); it is never sent to the client.
// Env (deploy): SMTP_USER, SMTP_PASS (required to send), TURNSTILE_SECRET; optional SMTP_HOST/PORT, CONTACT_TO.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const {
  SMTP_HOST = "smtp.migadu.com",
  SMTP_PORT = "587", // 587/STARTTLS — the Hetzner host blocks outbound 465
  SMTP_USER,
  SMTP_PASS,
  CONTACT_TO = "hello@metatoy.com",
  // "always passes" TEST secret in dev; set the real one via env in prod.
  TURNSTILE_SECRET = "1x0000000000000000000000000000000AA",
} = process.env;

async function verifyTurnstile(token, ip) {
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: TURNSTILE_SECRET, response: token || "", remoteip: ip || "" }),
    });
    const data = await res.json();
    return !!data.success;
  } catch {
    return false;
  }
}

export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return Response.json({ error: "Bad request." }, { status: 400 }); }
  const name = (b?.name || "").trim();
  const email = (b?.email || "").trim();
  const message = (b?.message || "").trim();
  const website = (b?.website || "").trim(); // honeypot
  const token = b?.token || "";

  if (website) return Response.json({ ok: true }); // silently drop bots
  if (!name || !email || !message) return Response.json({ error: "Please fill in every field." }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Response.json({ error: "That email doesn't look right." }, { status: 400 });
  if (message.length > 5000) return Response.json({ error: "That message is a bit long." }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  if (!(await verifyTurnstile(token, ip))) {
    return Response.json({ error: "Captcha check failed — please try again." }, { status: 400 });
  }

  if (!SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP not configured (SMTP_USER/SMTP_PASS missing)");
    // dev: accept so the end-to-end flow is testable without mail creds
    return Response.json({ ok: true, note: "dev: mail not sent (SMTP unconfigured)" });
  }

  try {
    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"metatoy.com" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: `"${name}" <${email}>`,
      subject: `metatoy.com — message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return Response.json({ ok: true });
  } catch (e) {
    console.error("[contact] sendMail failed:", e.message);
    return Response.json({ error: "Couldn't send right now — please try again shortly." }, { status: 502 });
  }
}
