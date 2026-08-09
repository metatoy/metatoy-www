// Scene 4/8 — "resource": the investigator wired into real tools. A center agent
// connects to a constellation of labeled nodes — GitHub, Datadog, Wiki, Code, APIs,
// Helper agent — and the connections light up. The credibility beat: real access.

export function Resource({ active, reduced }) {
  const nodes = [
    { id: "gh", label: "GitHub", sub: "recent changes", x: 400, y: 96, d: 0.5 },
    { id: "dd", label: "Datadog", sub: "logs", x: 604, y: 168, d: 0.7 },
    { id: "wiki", label: "Wiki", sub: "docs", x: 604, y: 344, d: 0.9 },
    { id: "code", label: "Code", sub: "", x: 400, y: 416, d: 1.1 },
    { id: "api", label: "APIs", sub: "", x: 196, y: 344, d: 1.3 },
    { id: "helper", label: "Helper agent", sub: "", x: 196, y: 168, d: 1.5 },
  ];
  return (
    <svg
      className="res-svg"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A central agent connects to real tools: GitHub, Datadog, Wiki, Code, APIs, and a helper agent."
    >
      {/* connection lines */}
      <g fill="none" aria-hidden="true">
        {nodes.map((n) => (
          <line
            key={n.id}
            className={`link link-${n.id}`}
            x1="400"
            y1="256"
            x2={n.x}
            y2={n.y}
            stroke="#f26722"
            strokeWidth="2"
            style={{ animationDelay: `${n.d}s` }}
          />
        ))}
      </g>

      {/* tool nodes */}
      {nodes.map((n) => (
        <g key={n.id} className={`node node-${n.id}`} style={{ animationDelay: `${n.d + 0.15}s` }} aria-hidden="true">
          <circle cx={n.x} cy={n.y} r="30" fill="#211c15" stroke="#8b7e66" strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="6" fill="#8b7e66" />
          <text x={n.x} y={n.y + 48} fontSize="12.5" fill="#f7f7f7" textAnchor="middle" fontWeight="700">
            {n.label}
          </text>
          {n.sub ? (
            <text x={n.x} y={n.y + 64} fontSize="10" fill="#8b7e66" textAnchor="middle">
              {n.sub}
            </text>
          ) : null}
        </g>
      ))}

      {/* center agent */}
      <g aria-hidden="true">
        <circle className="hub" cx="400" cy="256" r="42" fill="#1c1712" stroke="#f26722" strokeWidth="2" />
        <circle className="hubCore" cx="400" cy="256" r="10" fill="#f26722" />
        <text x="400" y="260" fontSize="11" fill="#f7f7f7" textAnchor="middle" fontWeight="700" dy="14">
          investigator
        </text>
      </g>

      <style jsx>{`
        .res-svg {
          font-family: inherit;
        }
        .link {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          opacity: 0.85;
          animation: lightUp 0.55s ease-out forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .node {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0.6);
          animation: nodeIn 0.4s cubic-bezier(0.34, 1.5, 0.64, 1) forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .hub {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.6);
          animation: hubIn 0.5s cubic-bezier(0.34, 1.5, 0.64, 1) 0.1s forwards;
          animation-play-state: ${active ? "running" : "paused"};
        }
        .hubCore {
          transform-box: fill-box;
          transform-origin: center;
          animation: hubPulse 1.4s ease-in-out 1s infinite;
          animation-play-state: ${active ? "running" : "paused"};
        }
        @keyframes lightUp {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes nodeIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes hubIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes hubPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }

        ${reduced
          ? `
        .link { animation: none; stroke-dashoffset: 0; }
        .node { animation: none; opacity: 1; transform: scale(1); }
        .hub { animation: none; opacity: 1; transform: scale(1); }
        .hubCore { animation: none; }
        `
          : ""}
      `}</style>
    </svg>
  );
}
