// Scene 8/8 — "learn": the flywheel. A cyclical loop rebuilds the rulebook (the same
// motif from scene 2). A "hypothesis vs actual" diff feeds in — the hypothesis compared
// against how the ticket was actually resolved — refining the rulebook. Compounding feel:
// a rules counter ticks up and the book glows as a page is added.

export function Learn({ active, reduced }) {
  return (
    <svg
      className="learn-svg"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A learning flywheel compares hypothesis against the actual resolution and refines the rulebook, which gets sharper."
    >
      {/* flywheel loop */}
      <g aria-hidden="true">
        <path
          className="loop"
          d="M 520 250 A 120 120 0 1 1 519 244"
          fill="none"
          stroke="#4a4a4a"
          strokeWidth="3"
        />
        <path
          className="loopHot"
          d="M 520 250 A 120 120 0 1 1 519 244"
          fill="none"
          stroke="#f26722"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#learnArrow)"
        />
        <g className="orbit">
          <circle cx="400" cy="130" r="6" fill="#f26722" />
        </g>
      </g>
      <defs>
        <marker id="learnArrow" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#f26722" />
        </marker>
      </defs>

      {/* rulebook at center (same motif as scene 2, larger) */}
      <g aria-hidden="true">
        <circle className="glow" cx="400" cy="250" r="70" fill="#f26722" opacity="0" />
        <rect x="356" y="200" width="88" height="100" rx="6" fill="#8b7e66" />
        <rect x="356" y="200" width="18" height="100" rx="6" fill="#6f6553" />
        {/* new page sliding in */}
        <rect className="newPage" x="380" y="210" width="52" height="80" rx="3" fill="#f7f7f7" />
        <rect x="388" y="224" width="38" height="5" rx="2.5" fill="#8b7e66" opacity="0.6" />
        <rect x="388" y="236" width="38" height="5" rx="2.5" fill="#8b7e66" opacity="0.45" />
        <rect className="newRule" x="388" y="248" width="38" height="5" rx="2.5" fill="#f26722" />
        <rect x="388" y="260" width="30" height="5" rx="2.5" fill="#8b7e66" opacity="0.3" />
        <rect className="bookMark" x="410" y="194" width="12" height="28" rx="1.5" fill="#f26722" />
        <text x="400" y="330" fontSize="12" fill="#d1d1d1" textAnchor="middle" fontWeight="700">
          rulebook
        </text>
      </g>

      {/* rules counter (getting sharper) */}
      <g aria-hidden="true">
        <text x="400" y="158" fontSize="12" fill="#8b7e66" textAnchor="middle">
          rules
        </text>
        <text className="countOld" x="400" y="186" fontSize="24" fill="#8b7e66" textAnchor="middle" fontWeight="800">
          24
        </text>
        <text className="countNew" x="400" y="186" fontSize="24" fill="#f26722" textAnchor="middle" fontWeight="800">
          25
        </text>
      </g>

      {/* hypothesis vs actual diff card, feeding in from the left */}
      <g className="diff">
        <rect x="70" y="196" width="210" height="108" rx="10" fill="#f7f7f7" />
        <text x="86" y="218" fontSize="10.5" fill="#8b7e66" fontWeight="700" letterSpacing="0.05em">
          HYPOTHESIS vs ACTUAL
        </text>
        <circle cx="92" cy="242" r="4" fill="#8b7e66" />
        <text x="104" y="246" fontSize="12" fill="#4a4a4a">
          config change
        </text>
        <circle cx="92" cy="270" r="4" fill="#f26722" />
        <text x="104" y="274" fontSize="12" fill="#f26722" fontWeight="700">
          config rollback
        </text>
        <path className="feedArrow" d="M286 250 q30 0 44 0" fill="none" stroke="#f26722" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#learnArrow)" />
      </g>

      <style jsx>{`
        .learn-svg {
          font-family: inherit;
        }
        .loopHot {
          stroke-dasharray: 760;
          stroke-dashoffset: 760;
          animation: drawLoop 1.4s ease-out 0.3s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .orbit {
          transform-box: view-box;
          transform-origin: 400px 250px;
          animation: orbit 3.4s linear 1.6s infinite;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .diff {
          opacity: 0;
          transform: translateX(-24px);
          animation: diffIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .feedArrow {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: feed 0.5s ease-out 1.3s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .newPage {
          transform-box: fill-box;
          transform-origin: left center;
          transform: scaleX(0);
          animation: pageIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 1.9s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .newRule {
          transform-box: fill-box;
          transform-origin: left center;
          transform: scaleX(0);
          animation: ruleWrite 0.5s ease-out 2.5s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .glow {
          transform-box: fill-box;
          transform-origin: center;
          animation: glowPulse 0.9s ease-out 2.3s;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .countOld {
          animation: fadeOut 0.3s ease-out 2.5s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .countNew {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: translateY(10px);
          animation: countUp 0.4s cubic-bezier(0.34, 1.5, 0.64, 1) 2.55s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .bookMark {
          transform-box: fill-box;
          transform-origin: center top;
          transform: scaleY(0);
          animation: markIn 0.35s ease-out 2.1s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        @keyframes drawLoop {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes orbit {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes diffIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes feed {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pageIn {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes ruleWrite {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes glowPulse {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          40% {
            opacity: 0.35;
          }
          100% {
            opacity: 0;
            transform: scale(1.1);
          }
        }
        @keyframes fadeOut {
          to {
            opacity: 0;
          }
        }
        @keyframes countUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes markIn {
          to {
            transform: scaleY(1);
          }
        }

        ${reduced
          ? `
        .loopHot { animation: none; stroke-dashoffset: 0; }
        .orbit { animation: none; transform: rotate(215deg); }
        .diff { animation: none; opacity: 1; transform: translateX(0); }
        .feedArrow { animation: none; stroke-dashoffset: 0; }
        .newPage { animation: none; transform: scaleX(1); }
        .newRule { animation: none; transform: scaleX(1); }
        .glow { animation: none; opacity: 0; }
        .countOld { animation: none; opacity: 0; }
        .countNew { animation: none; opacity: 1; transform: translateY(0); }
        .bookMark { animation: none; transform: scaleY(1); }
        `
          : ""}
      `}</style>
    </svg>
  );
}
