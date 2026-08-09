// Scene manifest for the "AI Support Triage" walkthrough.
// Contract consumed by <WalkthroughPlayer>. Content sourced from
// spec/metatoy-studio/walkthrough-ai-triage-storyboard.md (founder-edited interactively 2026-08-09).
// Arc = the investigative-agent loop: land → hypothesis → investigation → resource →
// draft → approve → resolve → learn.
//
// Each scene: { id, title, body, scene, lottie?, poster?, audio?, durationMs?, badge?, money? }
//   body = caption + VO transcript · scene = key into components/walkthrough-scenes/ai-triage/index.js
//   audio = ElevenLabs VO (voice "Annie K" XW70ikSsadUbinwLMZ5w) — narration drives pacing when unmuted.

export const AI_TRIAGE = {
  slug: "ai-triage",
  label: "AI Support Triage",
  topLabel: "How it works · AI support triage",
  accent: "var(--color-accent)",
  scenes: [
    {
      id: "land",
      title: "A ticket lands.",
      body: "Users ask for support in Slack help channels — account questions, system outages, configuration changes, bug reports. Each one becomes a support ticket with no priority, no owner, and no order.",
      scene: "land",
      audio: "/walkthrough/ai-triage/step-01.mp3",
      durationMs: 8000,
    },
    {
      id: "hypothesis",
      title: "It forms a hypothesis.",
      body: "First, a fast, low-cost pass forms a hypothesis — grounded in real-world triage procedures — reading what's likely wrong and how severe it is.",
      scene: "hypothesis",
      audio: "/walkthrough/ai-triage/step-02.mp3",
      durationMs: 8000,
    },
    {
      id: "investigation",
      title: "It investigates.",
      body: "Then, depending on priority, the agent kicks off a higher-cost, agentic investigation — digging into logs, status, config, and past tickets to test the hypothesis and pin down the real cause.",
      scene: "investigation",
      audio: "/walkthrough/ai-triage/step-03.mp3",
      durationMs: 8500,
    },
    {
      id: "resource",
      title: "It has direct access.",
      body: "The investigator works with real access — code and APIs, recent changes in GitHub, internal docs in the wiki, logs in Datadog — pointed by the hypothesis, with a system-library helper agent alongside. Everything it needs to find the truth.",
      scene: "resource",
      audio: "/walkthrough/ai-triage/step-04.mp3",
      durationMs: 8500,
    },
    {
      id: "draft",
      title: "It attaches a draft spec.",
      body: "When the investigation concludes, the agent attaches a draft spec to the ticket — the root cause it found, the evidence behind it, and a recommended fix.",
      scene: "draft",
      audio: "/walkthrough/ai-triage/step-05.mp3",
      durationMs: 9000,
      money: "before",
    },
    {
      id: "approve",
      title: "The team decides.",
      body: "In a triage Slack channel, support staff review the summary and its recommended actions — approve a course of action, or talk it through and redirect the agent to dig deeper.",
      scene: "approve",
      audio: "/walkthrough/ai-triage/step-06.mp3",
      durationMs: 9000,
      money: "after",
    },
    {
      id: "resolve",
      title: "The request is resolved.",
      body: "The original request gets a clear call — won't fix, urgent, or will fix and backlogged — so every ticket ends in a decision, not a dangling thread.",
      scene: "resolve",
      audio: "/walkthrough/ai-triage/step-07.mp3",
      durationMs: 8500,
    },
    {
      id: "learn",
      title: "The flywheel turns.",
      body: "A flywheel closes the loop — the system rebuilds its rulebook over time, comparing each hypothesis against how tickets are actually resolved, so triage gets sharper with every request.",
      scene: "learn",
      audio: "/walkthrough/ai-triage/step-08.mp3",
      durationMs: 9000,
    },
  ],
};
