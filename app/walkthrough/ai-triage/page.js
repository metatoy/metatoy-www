import AiTriagePlayer from "../../../components/AiTriagePlayer";

export const metadata = {
  title: "AI Support Triage — walkthrough",
  description: "How AI support triage works, end to end, in eight steps.",
  robots: { index: false, follow: false }, // demo/preview route — not indexed
};

export default function Page() {
  return (
    <main style={{ maxWidth: "var(--maxw, 1080px)", margin: "0 auto", padding: "3.5rem 1.25rem 5rem" }}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <p style={{ textTransform: "uppercase", letterSpacing: "0.14em", fontSize: "0.72rem", fontWeight: 700, color: "var(--color-muted)", margin: "0 0 0.6rem" }}>
          Feature walkthrough
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, margin: 0, color: "var(--color-fg)", textWrap: "balance" }}>
          AI Support Triage
        </h1>
        <p style={{ maxWidth: "56ch", margin: "0.75rem auto 0", color: "var(--color-fg)", opacity: 0.8, lineHeight: 1.55 }}>
          Every ticket, read, sorted, and routed the moment it lands — with a draft reply waiting and a person
          always in charge. Here's the whole loop in eight steps.
        </p>
      </header>
      <AiTriagePlayer />
    </main>
  );
}
