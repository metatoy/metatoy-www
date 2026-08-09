// Scene 5/8 — "draft" (money-moment BEFORE): a draft spec forms and attaches to the
// ticket. Sections: Root cause · Evidence (citation chips: code / change / log / wiki)
// · Recommended fix. Left in the "attached, pending review" state.

export function Draft({ active, reduced }) {
  const chips = [
    { id: "code", label: "code", x: 348 },
    { id: "change", label: "change", x: 410 },
    { id: "log", label: "log", x: 486 },
    { id: "wiki", label: "wiki", x: 540 },
  ];
  return (
    <svg
      className="draft-svg"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A draft spec with root cause, evidence citations, and a recommended fix attaches to the ticket, pending review."
    >
      {/* ticket card (through-line), small, on the left */}
      <g aria-hidden="true">
        <rect x="96" y="176" width="170" height="150" rx="10" fill="#f7f7f7" />
        <rect x="96" y="176" width="170" height="26" rx="10" fill="#d1d1d1" />
        <circle cx="116" cy="189" r="4.5" fill="#8b7e66" />
        <rect x="128" y="185" width="78" height="7" rx="3.5" fill="#8b7e66" />
        <rect x="112" y="220" width="130" height="8" rx="4" fill="#d1d1d1" />
        <rect x="112" y="238" width="110" height="8" rx="4" fill="#d1d1d1" />
        <rect x="112" y="256" width="138" height="8" rx="4" fill="#d1d1d1" />
      </g>

      {/* attach connector clip */}
      <path className="clip" d="M266 250 q28 0 40 0" fill="none" stroke="#8b7e66" strokeWidth="2.5" strokeLinecap="round" />

      {/* draft spec doc */}
      <g className="doc">
        <rect x="312" y="96" width="378" height="308" rx="12" fill="#f7f7f7" />
        <rect x="312" y="96" width="378" height="38" rx="12" fill="#e7e2d6" />
        <text x="332" y="121" fontSize="13" fill="#4a4a4a" fontWeight="700">
          Draft spec
        </text>
        <g className="pending">
          <rect x="596" y="106" width="78" height="20" rx="10" fill="#211c15" />
          <text x="608" y="120" fontSize="10" fill="#f26722" fontWeight="700">
            PENDING
          </text>
        </g>

        {/* Root cause */}
        <text x="332" y="164" fontSize="11" fill="#8b7e66" fontWeight="700" letterSpacing="0.05em">
          ROOT CAUSE
        </text>
        <g className="line r1">
          <rect x="332" y="174" width="300" height="9" rx="4.5" fill="#4a4a4a" />
        </g>
        <g className="line r2">
          <rect x="332" y="190" width="240" height="9" rx="4.5" fill="#4a4a4a" />
        </g>

        {/* Evidence */}
        <text x="332" y="230" fontSize="11" fill="#8b7e66" fontWeight="700" letterSpacing="0.05em">
          EVIDENCE
        </text>
        {chips.map((c) => (
          <g key={c.id} className={`chip chip-${c.id}`} style={{ animationDelay: `${1.9 + chips.indexOf(c) * 0.18}s` }}>
            <rect x={c.x} y="240" width={c.label.length * 7 + 22} height="24" rx="12" fill="#1c1712" stroke="#8b7e66" strokeWidth="1" />
            <circle cx={c.x + 13} cy="252" r="3.5" fill="#f26722" />
            <text x={c.x + 22} y="256" fontSize="10.5" fill="#d1d1d1">
              {c.label}
            </text>
          </g>
        ))}

        {/* Recommended fix */}
        <text x="332" y="300" fontSize="11" fill="#8b7e66" fontWeight="700" letterSpacing="0.05em">
          RECOMMENDED FIX
        </text>
        <g className="line f1">
          <rect x="332" y="310" width="280" height="9" rx="4.5" fill="#4a4a4a" />
        </g>
        <g className="line f2">
          <rect x="332" y="326" width="200" height="9" rx="4.5" fill="#4a4a4a" />
        </g>
        <g className="line f3">
          <rect x="332" y="360" width="150" height="26" rx="6" fill="none" stroke="#f26722" strokeWidth="1.4" />
          <text x="352" y="377" fontSize="11" fill="#f26722" fontWeight="600">
            Roll back config
          </text>
        </g>
      </g>

      <style jsx>{`
        .draft-svg {
          font-family: inherit;
        }
        .doc {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: translateY(14px) scale(0.97);
          animation: docIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .clip {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: clipIn 0.4s ease-out 0.75s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .line rect {
          transform-box: fill-box;
          transform-origin: left center;
          transform: scaleX(0);
          animation: reveal 0.45s ease-out forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .line {
          animation-play-state: ${active ? "running" : "paused"};
        }
        .r1 rect {
          animation-delay: 0.9s;
        }
        .r2 rect {
          animation-delay: 1.15s;
        }
        .f1 rect {
          animation-delay: 2.75s;
        }
        .f2 rect {
          animation-delay: 3.0s;
        }
        .f3 {
          opacity: 0;
          animation: fixIn 0.4s ease-out 3.35s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .chip {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0.5);
          animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .pending {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: pendIn 0.4s ease-out 3.7s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        @keyframes docIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes clipIn {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes reveal {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes pop {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fixIn {
          to {
            opacity: 1;
          }
        }
        @keyframes pendIn {
          0% {
            opacity: 0;
            transform: scale(0.7);
          }
          60% {
            opacity: 1;
            transform: scale(1.12);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        ${reduced
          ? `
        .doc { animation: none; opacity: 1; transform: translateY(0) scale(1); }
        .clip { animation: none; stroke-dashoffset: 0; }
        .line rect { animation: none; transform: scaleX(1); }
        .f3 { animation: none; opacity: 1; }
        .chip { animation: none; opacity: 1; transform: scale(1); }
        .pending { animation: none; opacity: 1; transform: scale(1); }
        `
          : ""}
      `}</style>
    </svg>
  );
}
