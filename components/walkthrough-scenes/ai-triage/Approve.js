// Scene 6/8 — "approve" (money-moment AFTER): a #triage Slack-style channel review.
// A summary card with recommended actions is posted; support avatars review; a cursor
// lands decisively on Approve (orange). The alternative "Dig deeper" is hinted, not taken.

export function Approve({ active, reduced }) {
  return (
    <svg
      className="apr-svg"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="In a #triage channel, the team reviews a recommended-action summary and a cursor clicks Approve."
    >
      {/* channel panel */}
      <g aria-hidden="true">
        <rect x="150" y="78" width="500" height="344" rx="16" fill="#211c15" stroke="#4a4a4a" />
        <text x="176" y="116" fontSize="18" fill="#8b7e66" fontWeight="700">
          #
        </text>
        <text x="194" y="115" fontSize="15" fill="#f7f7f7" fontWeight="700">
          triage
        </text>
        <line x1="150" y1="132" x2="650" y2="132" stroke="#4a4a4a" />
      </g>

      {/* posted summary card (bot message) */}
      <g className="post">
        <circle cx="192" cy="176" r="13" fill="#f26722" />
        <circle cx="192" cy="176" r="4.5" fill="#1c1712" />
        <text x="216" y="164" fontSize="12" fill="#8b7e66" fontWeight="700">
          triage-agent
        </text>
        <rect x="216" y="176" width="404" height="130" rx="10" fill="#f7f7f7" />
        <text x="234" y="200" fontSize="11" fill="#8b7e66" fontWeight="700" letterSpacing="0.05em">
          RECOMMENDED
        </text>
        <rect x="234" y="212" width="300" height="9" rx="4.5" fill="#4a4a4a" />
        <rect x="234" y="230" width="230" height="9" rx="4.5" fill="#4a4a4a" />

        {/* action buttons */}
        <g className="approveBtn">
          <rect className="approveBg" x="234" y="258" width="120" height="34" rx="8" fill="#f26722" />
          <text className="approveLabel" x="294" y="280" fontSize="13" fill="#1c1712" fontWeight="700" textAnchor="middle">
            Approve
          </text>
        </g>
        <g>
          <rect x="368" y="258" width="130" height="34" rx="8" fill="none" stroke="#8b7e66" strokeWidth="1.4" />
          <text x="386" y="280" fontSize="12" fill="#8b7e66">
            Dig deeper
          </text>
        </g>
      </g>

      {/* reviewer avatars */}
      <g aria-hidden="true">
        <circle className="rev rev1" cx="216" cy="360" r="15" fill="#8b7e66" />
        <circle className="rev rev2" cx="250" cy="360" r="15" fill="#6f6553" />
        <circle className="rev rev3" cx="284" cy="360" r="15" fill="#4a4335" />
        <text className="rev rev3" x="312" y="365" fontSize="12" fill="#8b7e66">
          reviewing…
        </text>
      </g>

      {/* approved confirmation */}
      <g className="approved">
        <rect x="446" y="384" width="150" height="32" rx="16" fill="#211c15" stroke="#f26722" strokeWidth="1.4" />
        <path d="M468 400 l6 6 l12 -13" fill="none" stroke="#f26722" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="496" y="405" fontSize="12" fill="#f7f7f7" fontWeight="700">
          Approved
        </text>
      </g>

      {/* cursor */}
      <g className="cursor" aria-hidden="true">
        <path d="M0 0 L0 16 L4.5 12.5 L7.5 18.5 L10 17.2 L7 11.2 L12 11 Z" fill="#f7f7f7" stroke="#2b2b2b" strokeWidth="0.8" />
      </g>

      <style jsx>{`
        .apr-svg {
          font-family: inherit;
        }
        .post {
          opacity: 0;
          transform: translateY(16px);
          animation: postIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .rev {
          opacity: 0;
          animation: revIn 0.4s ease-out forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .rev1 {
          animation-delay: 1.0s;
        }
        .rev2 {
          animation-delay: 1.2s;
        }
        .rev3 {
          animation-delay: 1.4s;
        }
        .cursor {
          transform-box: view-box;
          transform-origin: 0 0;
          opacity: 0;
          animation: cursorPath 2.2s cubic-bezier(0.45, 0, 0.2, 1) 1.6s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .approveBtn {
          transform-box: fill-box;
          transform-origin: center;
          animation: click 0.3s ease-out 3.5s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .approved {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0.7);
          animation: apprIn 0.4s cubic-bezier(0.34, 1.5, 0.64, 1) 3.85s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        @keyframes postIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes revIn {
          to {
            opacity: 1;
          }
        }
        @keyframes cursorPath {
          0% {
            opacity: 0;
            transform: translate(520px, 120px);
          }
          20% {
            opacity: 1;
          }
          70% {
            transform: translate(300px, 300px);
          }
          88% {
            transform: translate(292px, 274px);
          }
          100% {
            opacity: 1;
            transform: translate(292px, 274px) scale(0.85);
          }
        }
        @keyframes click {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.93);
          }
        }
        @keyframes apprIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        ${reduced
          ? `
        .post { animation: none; opacity: 1; transform: translateY(0); }
        .rev { animation: none; opacity: 1; }
        .cursor { animation: none; opacity: 0; }
        .approveBtn { animation: none; }
        .approved { animation: none; opacity: 1; transform: scale(1); }
        `
          : ""}
      `}</style>
    </svg>
  );
}
