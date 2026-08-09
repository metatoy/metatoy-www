// Scene 2/8 — "hypothesis": a fast, cheap pass forms a hypothesis from the ticket.
// A small rulebook motif stamps a hypothesis panel that crystallizes beside the ticket:
// "Likely: config change" + "Severity: High" (orange). Light, quick feel.
// The rulebook motif returns in scene 8 (learn) — the bookend.

export function Hypothesis({ active, reduced }) {
  return (
    <svg
      className="hyp-svg"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A rulebook stamps a quick hypothesis onto the ticket: likely config change, severity high."
    >
      {/* ticket card (through-line) */}
      <g aria-hidden="true">
        <rect x="110" y="150" width="220" height="200" rx="10" fill="#f7f7f7" />
        <rect x="110" y="150" width="220" height="30" rx="10" fill="#d1d1d1" />
        <circle cx="132" cy="165" r="5" fill="#8b7e66" />
        <rect x="146" y="161" width="90" height="8" rx="4" fill="#8b7e66" />
        <rect x="128" y="202" width="170" height="9" rx="4.5" fill="#d1d1d1" />
        <rect x="128" y="224" width="150" height="9" rx="4.5" fill="#d1d1d1" />
        <rect x="128" y="246" width="184" height="9" rx="4.5" fill="#d1d1d1" />
        <rect x="128" y="268" width="120" height="9" rx="4.5" fill="#d1d1d1" />
      </g>

      {/* rulebook motif (top-right, clear of corner) */}
      <g className="book" aria-hidden="true">
        <rect x="556" y="96" width="70" height="52" rx="5" fill="#8b7e66" />
        <rect x="556" y="96" width="14" height="52" rx="5" fill="#6f6553" />
        <rect x="578" y="108" width="38" height="5" rx="2.5" fill="#f7f7f7" opacity="0.7" />
        <rect x="578" y="120" width="38" height="5" rx="2.5" fill="#f7f7f7" opacity="0.55" />
        <rect x="578" y="132" width="26" height="5" rx="2.5" fill="#f7f7f7" opacity="0.4" />
        <rect className="bookMark" x="600" y="90" width="10" height="24" rx="1" fill="#f26722" />
      </g>

      {/* stamp ring pressing onto the panel */}
      <circle className="stamp" cx="530" cy="250" r="46" fill="none" stroke="#f26722" strokeWidth="4" opacity="0" />

      {/* hypothesis panel crystallizing */}
      <g className="panel">
        <rect x="400" y="192" width="290" height="116" rx="10" fill="#f7f7f7" />
        <text x="418" y="216" fontSize="11" fill="#8b7e66" fontWeight="700" letterSpacing="0.06em">
          HYPOTHESIS
        </text>
        <g className="line hl1">
          <text x="418" y="248" fontSize="14" fill="#4a4a4a">
            Likely: config change
          </text>
        </g>
        <g className="line hl2">
          <text x="418" y="278" fontSize="14" fill="#4a4a4a">
            Severity:{" "}
          </text>
          <text x="486" y="278" fontSize="14" fill="#f26722" fontWeight="700">
            High
          </text>
        </g>
      </g>

      <style jsx>{`
        .hyp-svg {
          font-family: inherit;
        }
        .book {
          transform-box: fill-box;
          transform-origin: center;
          animation: bookPulse 0.5s ease-out 0.3s;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .bookMark {
          transform-box: fill-box;
          transform-origin: center top;
          transform: scaleY(0);
          animation: markDrop 0.35s ease-out 0.45s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .stamp {
          transform-box: fill-box;
          transform-origin: center;
          animation: stampPress 0.5s ease-out 0.75s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .panel {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.9);
          animation: crystallize 0.45s cubic-bezier(0.34, 1.4, 0.64, 1) 0.95s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .line {
          opacity: 0;
          animation: lineIn 0.35s ease-out forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .hl1 {
          animation-delay: 1.25s;
        }
        .hl2 {
          animation-delay: 1.55s;
        }
        @keyframes bookPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        @keyframes markDrop {
          to {
            transform: scaleY(1);
          }
        }
        @keyframes stampPress {
          0% {
            opacity: 0;
            transform: scale(1.9);
          }
          55% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }
        @keyframes crystallize {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes lineIn {
          to {
            opacity: 1;
          }
        }

        ${reduced
          ? `
        .book, .bookMark { animation: none; transform: scaleY(1); }
        .stamp { animation: none; opacity: 0; }
        .panel { animation: none; opacity: 1; transform: scale(1); }
        .line { animation: none; opacity: 1; }
        `
          : ""}
      `}</style>
    </svg>
  );
}
