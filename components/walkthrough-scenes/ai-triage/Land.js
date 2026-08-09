// Scene 1/8 — "land": support requests arrive in a Slack-style #help channel and
// one message becomes THE ticket card (the through-line), settling raw into a queue.
//
// Positioning rule (shared across scenes): elements are drawn at their FINAL absolute
// coords and animated via translate-deltas / opacity / fill-box scale — never a CSS
// transform keyframe layered on an SVG transform="translate(...)" attribute (that combo
// snaps the node to 0,0). Static positioning groups may use the attribute; animated ones
// don't. Keep content out of the top-left / top-right ~60px corners (player overlays).

export function Land({ active, reduced }) {
  return (
    <svg
      className="land-svg"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Support requests arrive in a Slack-style #help channel and one becomes a raw, unsorted ticket card."
    >
      {/* channel panel */}
      <g aria-hidden="true">
        <rect x="80" y="80" width="270" height="340" rx="16" fill="#211c15" stroke="#4a4a4a" strokeWidth="1" />
        <text x="102" y="120" fontSize="18" fill="#8b7e66" fontWeight="700">
          #
        </text>
        <text x="120" y="119" fontSize="15" fill="#f7f7f7" fontWeight="700">
          help
        </text>
        <line x1="80" y1="136" x2="350" y2="136" stroke="#4a4a4a" strokeWidth="1" />
      </g>

      {/* chat messages arriving */}
      <g className="bubble b1" aria-hidden="true">
        <circle cx="108" cy="172" r="11" fill="#8b7e66" />
        <rect x="128" y="158" width="198" height="46" rx="10" fill="#2e281f" />
        <rect x="140" y="170" width="120" height="7" rx="3.5" fill="#6f6553" />
        <rect x="140" y="184" width="160" height="7" rx="3.5" fill="#4a4335" />
      </g>
      <g className="bubble b2" aria-hidden="true">
        <circle cx="108" cy="234" r="11" fill="#8b7e66" />
        <rect x="128" y="220" width="198" height="46" rx="10" fill="#2e281f" />
        <rect x="140" y="232" width="150" height="7" rx="3.5" fill="#6f6553" />
        <rect x="140" y="246" width="108" height="7" rx="3.5" fill="#4a4335" />
      </g>
      <g className="bubble b3" aria-hidden="true">
        <circle cx="108" cy="296" r="11" fill="#8b7e66" />
        <rect x="128" y="282" width="198" height="46" rx="10" fill="#2e281f" />
        <rect x="140" y="294" width="168" height="7" rx="3.5" fill="#6f6553" />
        <rect x="140" y="308" width="128" height="7" rx="3.5" fill="#4a4335" />
      </g>

      {/* destination queue stack (faint) */}
      <g aria-hidden="true">
        <rect x="510" y="250" width="200" height="150" rx="12" fill="#3a342b" opacity="0.4" />
        <rect className="stackGrow" x="498" y="236" width="200" height="150" rx="12" fill="#3a342b" opacity="0" />
      </g>

      {/* the ticket card (through-line) — emerges from the channel, lands on the stack */}
      <g className="ticket">
        <rect x="486" y="222" width="200" height="150" rx="12" fill="#f7f7f7" />
        <rect x="486" y="222" width="200" height="30" rx="12" fill="#d1d1d1" />
        <circle cx="508" cy="237" r="5" fill="#8b7e66" />
        <rect x="522" y="233" width="86" height="8" rx="4" fill="#8b7e66" />
        <rect x="506" y="274" width="150" height="9" rx="4.5" fill="#d1d1d1" />
        <rect x="506" y="296" width="168" height="9" rx="4.5" fill="#d1d1d1" />
        <rect x="506" y="318" width="104" height="9" rx="4.5" fill="#d1d1d1" />
      </g>

      <style jsx>{`
        .land-svg {
          font-family: inherit;
        }
        .bubble {
          opacity: 0;
          transform: translateY(12px);
          animation: msgIn 0.45s ease-out forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .b1 {
          animation-delay: 0.25s;
        }
        .b2 {
          animation-delay: 0.6s;
        }
        .b3 {
          animation-delay: 0.95s;
        }
        .ticket {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: translate(-330px, 34px) scale(0.34);
          animation: emerge 1.2s cubic-bezier(0.22, 1, 0.36, 1) 1.5s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .stackGrow {
          animation: stackIn 0.5s ease-out 2.5s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        @keyframes msgIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes emerge {
          0% {
            opacity: 0;
            transform: translate(-330px, 34px) scale(0.34);
          }
          30% {
            opacity: 1;
          }
          82% {
            transform: translate(0, -10px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes stackIn {
          to {
            opacity: 0.45;
          }
        }

        ${reduced
          ? `
        .bubble { animation: none; opacity: 1; transform: translateY(0); }
        .ticket { animation: none; opacity: 1; transform: translate(0,0) scale(1); }
        .stackGrow { animation: none; opacity: 0.45; }
        `
          : ""}
      `}</style>
    </svg>
  );
}
