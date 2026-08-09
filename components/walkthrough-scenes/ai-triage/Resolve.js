// Scene 7/8 — "resolve": the original request gets a disposition. Three outcomes are
// shown — Won't fix · Urgent · Will fix (backlog) — a selector sweeps across them and
// lands decisively on "Urgent", stamped onto the ticket. The others dim.

export function Resolve({ active, reduced }) {
  return (
    <svg
      className="rsl-svg"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Three dispositions are weighed and the ticket is decisively stamped Urgent."
    >
      {/* ticket card (through-line) */}
      <g aria-hidden="true">
        <rect x="250" y="96" width="300" height="150" rx="10" fill="#f7f7f7" />
        <rect x="250" y="96" width="300" height="30" rx="10" fill="#d1d1d1" />
        <circle cx="272" cy="111" r="5" fill="#8b7e66" />
        <rect x="286" y="107" width="100" height="8" rx="4" fill="#8b7e66" />
        <rect x="270" y="148" width="200" height="9" rx="4.5" fill="#d1d1d1" />
        <rect x="270" y="170" width="170" height="9" rx="4.5" fill="#d1d1d1" />
        <rect x="270" y="192" width="220" height="9" rx="4.5" fill="#d1d1d1" />
      </g>

      {/* URGENT stamp pressed onto the ticket */}
      <g className="stamp">
        <rect x="424" y="132" width="118" height="40" rx="7" fill="none" stroke="#f26722" strokeWidth="3" transform="rotate(-8 483 152)" />
        <text x="483" y="159" fontSize="20" fill="#f26722" fontWeight="800" textAnchor="middle" letterSpacing="0.06em" transform="rotate(-8 483 152)">
          URGENT
        </text>
      </g>

      {/* three disposition options */}
      <g className="opt opt1">
        <rect x="150" y="330" width="150" height="70" rx="12" fill="#211c15" stroke="#4a4a4a" strokeWidth="1.5" />
        <text x="225" y="360" fontSize="13" fill="#d1d1d1" textAnchor="middle" fontWeight="700">
          Won&#39;t fix
        </text>
        <text x="225" y="380" fontSize="10" fill="#8b7e66" textAnchor="middle">
          close
        </text>
      </g>
      <g className="opt opt2 chosen">
        <rect className="chosenBox" x="325" y="322" width="150" height="86" rx="12" fill="#1c1712" stroke="#f26722" strokeWidth="2" />
        <text x="400" y="356" fontSize="15" fill="#f26722" textAnchor="middle" fontWeight="800">
          Urgent
        </text>
        <text x="400" y="378" fontSize="10" fill="#d1d1d1" textAnchor="middle">
          act now
        </text>
      </g>
      <g className="opt opt3">
        <rect x="500" y="330" width="150" height="70" rx="12" fill="#211c15" stroke="#4a4a4a" strokeWidth="1.5" />
        <text x="575" y="356" fontSize="13" fill="#d1d1d1" textAnchor="middle" fontWeight="700">
          Will fix
        </text>
        <text x="575" y="376" fontSize="10" fill="#8b7e66" textAnchor="middle">
          backlog
        </text>
      </g>

      {/* selector sweep highlight */}
      <rect className="sweep" x="150" y="326" width="150" height="78" rx="12" fill="none" stroke="#f7f7f7" strokeWidth="2" opacity="0" />

      <style jsx>{`
        .rsl-svg {
          font-family: inherit;
        }
        .opt {
          opacity: 0;
          transform: translateY(12px);
          animation: optIn 0.4s ease-out forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .opt1 {
          animation-delay: 0.3s;
        }
        .opt2 {
          animation-delay: 0.5s;
        }
        .opt3 {
          animation-delay: 0.7s;
        }
        /* non-chosen options dim after the decision */
        .opt1,
        .opt3 {
          animation: optIn 0.4s ease-out forwards, dim 0.5s ease-out 2.9s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .opt1 {
          animation-delay: 0.3s, 2.9s;
        }
        .opt3 {
          animation-delay: 0.7s, 2.9s;
        }
        .chosenBox {
          transform-box: fill-box;
          transform-origin: center;
          animation: chosenPulse 0.5s ease-out 2.9s;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .sweep {
          animation: sweepMove 1.6s ease-in-out 1.1s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .stamp {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(2.1) rotate(4deg);
          animation: stampIn 0.45s cubic-bezier(0.3, 1.2, 0.5, 1) 3.05s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        @keyframes optIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes dim {
          to {
            opacity: 0.32;
          }
        }
        @keyframes chosenPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
        }
        @keyframes sweepMove {
          0% {
            opacity: 0.9;
            transform: translate(0, 0);
          }
          28% {
            transform: translate(175px, -4px);
          }
          60% {
            opacity: 0.9;
            transform: translate(350px, 0);
          }
          80% {
            transform: translate(175px, -4px);
          }
          100% {
            opacity: 0;
            transform: translate(175px, -4px);
          }
        }
        @keyframes stampIn {
          0% {
            opacity: 0;
            transform: scale(2.1) rotate(4deg);
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        ${reduced
          ? `
        .opt { animation: none; opacity: 1; transform: translateY(0); }
        .opt1, .opt3 { animation: none; opacity: 0.32; transform: translateY(0); }
        .chosenBox { animation: none; }
        .sweep { animation: none; opacity: 0; }
        .stamp { animation: none; opacity: 1; transform: scale(1) rotate(0deg); }
        `
          : ""}
      `}</style>
    </svg>
  );
}
