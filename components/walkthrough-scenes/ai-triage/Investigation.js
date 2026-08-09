// Scene 3/8 — "investigation": a higher-cost, agentic investigation (gated by priority).
// A central agent node actively digs through sources — streaming log lines, a config
// panel, past tickets — while a status bar fills. Reads deeper / heavier than scene 2.

export function Investigation({ active, reduced }) {
  return (
    <svg
      className="inv-svg"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="An agent digs through logs, config, and past tickets, testing the hypothesis while a progress bar fills."
    >
      {/* connective lines (drawn behind) */}
      <g aria-hidden="true" stroke="#4a4a4a" strokeWidth="1.5" fill="none">
        <path className="wire w1" d="M400 250 L212 168" />
        <path className="wire w2" d="M400 250 L612 168" />
        <path className="wire w3" d="M400 250 L212 356" />
        <path className="wire w4" d="M400 250 L612 356" />
      </g>

      {/* logs panel (top-left, clear of corner) */}
      <g aria-hidden="true">
        <rect x="92" y="108" width="220" height="120" rx="10" fill="#211c15" stroke="#4a4a4a" />
        <text x="108" y="130" fontSize="11" fill="#8b7e66" fontWeight="700">
          logs
        </text>
        <g fontFamily="ui-monospace, monospace">
          <rect className="log lg1" x="108" y="142" width="150" height="6" rx="3" fill="#6f6553" />
          <rect className="log lg2" x="108" y="156" width="180" height="6" rx="3" fill="#6f6553" />
          <rect className="log lg3" x="108" y="170" width="120" height="6" rx="3" fill="#f26722" />
          <rect className="log lg4" x="108" y="184" width="168" height="6" rx="3" fill="#6f6553" />
          <rect className="log lg5" x="108" y="198" width="140" height="6" rx="3" fill="#6f6553" />
          <rect className="log lg6" x="108" y="212" width="110" height="6" rx="3" fill="#6f6553" />
        </g>
      </g>

      {/* config panel (top-right) */}
      <g aria-hidden="true">
        <rect x="512" y="108" width="200" height="120" rx="10" fill="#211c15" stroke="#4a4a4a" />
        <text x="528" y="130" fontSize="11" fill="#8b7e66" fontWeight="700">
          config
        </text>
        <rect x="528" y="144" width="120" height="7" rx="3.5" fill="#4a4335" />
        <rect className="cfgHit" x="528" y="160" width="150" height="14" rx="4" fill="#f26722" opacity="0.18" />
        <rect x="536" y="163" width="110" height="7" rx="3.5" fill="#f26722" />
        <rect x="528" y="184" width="96" height="7" rx="3.5" fill="#4a4335" />
        <rect x="528" y="200" width="130" height="7" rx="3.5" fill="#4a4335" />
      </g>

      {/* past tickets (bottom-left) */}
      <g aria-hidden="true">
        <rect x="92" y="288" width="220" height="120" rx="10" fill="#211c15" stroke="#4a4a4a" />
        <text x="108" y="310" fontSize="11" fill="#8b7e66" fontWeight="700">
          past tickets
        </text>
        <rect x="108" y="324" width="188" height="20" rx="5" fill="#2e281f" />
        <rect x="108" y="350" width="188" height="20" rx="5" fill="#2e281f" />
        <rect x="108" y="376" width="188" height="20" rx="5" fill="#2e281f" />
      </g>

      {/* status panel with progress bar (bottom-right) */}
      <g aria-hidden="true">
        <rect x="512" y="288" width="200" height="120" rx="10" fill="#211c15" stroke="#4a4a4a" />
        <text x="528" y="310" fontSize="11" fill="#8b7e66" fontWeight="700">
          testing hypothesis
        </text>
        <rect x="528" y="330" width="168" height="10" rx="5" fill="#2e281f" />
        <rect className="prog" x="528" y="330" width="168" height="10" rx="5" fill="#f26722" />
        <rect x="528" y="356" width="120" height="6" rx="3" fill="#4a4335" />
        <rect x="528" y="370" width="150" height="6" rx="3" fill="#4a4335" />
      </g>

      {/* central agent node */}
      <g aria-hidden="true">
        <circle className="agentRing" cx="400" cy="250" r="46" fill="none" stroke="#f26722" strokeWidth="2" opacity="0.5" />
        <circle cx="400" cy="250" r="34" fill="#1c1712" stroke="#8b7e66" strokeWidth="1.5" />
        <circle className="agentCore" cx="400" cy="250" r="9" fill="#f26722" />
        <text x="400" y="298" fontSize="12" fill="#d1d1d1" textAnchor="middle" fontWeight="700">
          agent
        </text>
      </g>

      <style jsx>{`
        .inv-svg {
          font-family: inherit;
        }
        .wire {
          stroke-dasharray: 240;
          stroke-dashoffset: 240;
          animation: drawWire 0.6s ease-out forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .w1 {
          animation-delay: 0.3s;
        }
        .w2 {
          animation-delay: 0.5s;
        }
        .w3 {
          animation-delay: 0.7s;
        }
        .w4 {
          animation-delay: 0.9s;
        }
        .log {
          opacity: 0;
          transform: translateX(-8px);
          animation: logIn 0.28s ease-out forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .lg1 {
          animation-delay: 1.0s;
        }
        .lg2 {
          animation-delay: 1.25s;
        }
        .lg3 {
          animation-delay: 1.5s;
        }
        .lg4 {
          animation-delay: 1.75s;
        }
        .lg5 {
          animation-delay: 2.0s;
        }
        .lg6 {
          animation-delay: 2.25s;
        }
        .cfgHit {
          opacity: 0;
          animation: hitIn 0.4s ease-out 2.0s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .prog {
          transform-box: fill-box;
          transform-origin: left center;
          transform: scaleX(0);
          animation: fill 3.0s ease-in-out 1.0s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .agentCore {
          transform-box: fill-box;
          transform-origin: center;
          animation: corePulse 1.1s ease-in-out infinite;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .agentRing {
          transform-box: fill-box;
          transform-origin: center;
          animation: ringPulse 1.8s ease-in-out infinite;
          animation-play-state: ${active ? "running" : "paused"};
        }
        @keyframes drawWire {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes logIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes hitIn {
          to {
            opacity: 1;
          }
        }
        @keyframes fill {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes corePulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.75;
          }
        }
        @keyframes ringPulse {
          0%,
          100% {
            transform: scale(0.92);
            opacity: 0.55;
          }
          50% {
            transform: scale(1.06);
            opacity: 0.2;
          }
        }

        ${reduced
          ? `
        .wire { animation: none; stroke-dashoffset: 0; }
        .log { animation: none; opacity: 1; transform: translateX(0); }
        .cfgHit { animation: none; opacity: 1; }
        .prog { animation: none; transform: scaleX(1); }
        .agentCore, .agentRing { animation: none; }
        `
          : ""}
      `}</style>
    </svg>
  );
}
