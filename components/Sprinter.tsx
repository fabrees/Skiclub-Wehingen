import React from "react";

const SKIN = "#f1c7a3";
const SKIN_BACK = "#d9a883";
const SHIRT = "#1279BF";
const SHORTS = "#334155";
const SHOES = "#0f172a";
const SHOES_BACK = "#1e293b";

const HIP = { x: 200, y: 215 };
const KNEE = { x: 200, y: 275 };
const SHOULDER = { x: 226, y: 138 };
const ELBOW = { x: 226, y: 180 };

const Leg = ({ back }: { back?: boolean }) => (
  <g className={`thigh ${back ? "leg-b" : "leg-a"}`}>
    <line x1={HIP.x} y1={HIP.y} x2={KNEE.x} y2={KNEE.y} stroke={back ? SKIN_BACK : SKIN} strokeWidth={20} strokeLinecap="round" />
    <line x1={HIP.x} y1={HIP.y} x2={KNEE.x} y2={HIP.y + 28} stroke={SHORTS} strokeWidth={26} strokeLinecap="round" />
    <g className="shin">
      <line x1={KNEE.x} y1={KNEE.y} x2={KNEE.x} y2={KNEE.y + 58} stroke={back ? SKIN_BACK : SKIN} strokeWidth={16} strokeLinecap="round" />
      <path d={`M${KNEE.x - 8} ${KNEE.y + 56} h26 a8 8 0 0 1 0 14 h-26 z`} fill={back ? SHOES_BACK : SHOES} />
    </g>
  </g>
);

const Arm = ({ back }: { back?: boolean }) => (
  <g className={`upper-arm ${back ? "arm-b" : "arm-a"}`}>
    <line x1={SHOULDER.x} y1={SHOULDER.y} x2={ELBOW.x} y2={ELBOW.y} stroke={back ? SKIN_BACK : SKIN} strokeWidth={13} strokeLinecap="round" />
    <g className="forearm">
      <line x1={ELBOW.x} y1={ELBOW.y} x2={ELBOW.x} y2={ELBOW.y + 38} stroke={back ? SKIN_BACK : SKIN} strokeWidth={12} strokeLinecap="round" />
    </g>
  </g>
);

const Sprinter = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Animierter Sprinter">
    <style>{`
      .sprinter * { transform-box: view-box; }
      .sprinter .thigh { transform-origin: ${HIP.x}px ${HIP.y}px; }
      .sprinter .shin { transform-origin: ${KNEE.x}px ${KNEE.y}px; }
      .sprinter .upper-arm { transform-origin: ${SHOULDER.x}px ${SHOULDER.y}px; }
      .sprinter .forearm { transform-origin: ${ELBOW.x}px ${ELBOW.y}px; transform: rotate(-100deg); }
      .sprinter .leg-a { animation: thigh 0.7s linear infinite; }
      .sprinter .leg-a .shin { animation: shin 0.7s linear infinite; }
      .sprinter .leg-b { animation: thigh 0.7s linear infinite -0.35s; }
      .sprinter .leg-b .shin { animation: shin 0.7s linear infinite -0.35s; }
      .sprinter .arm-a { animation: arm 0.7s ease-in-out infinite; }
      .sprinter .arm-b { animation: arm 0.7s ease-in-out infinite -0.35s; }
      .sprinter .body { animation: bob 0.35s ease-in-out infinite; }
      .sprinter .shadow { transform-origin: 200px 362px; animation: shadow 0.35s ease-in-out infinite; }
      .sprinter .speed line { animation: speed 0.6s linear infinite; }
      .sprinter .speed line:nth-child(2) { animation-delay: -0.2s; }
      .sprinter .speed line:nth-child(3) { animation-delay: -0.4s; }

      @keyframes thigh {
        0%   { transform: rotate(-55deg); }
        25%  { transform: rotate(-15deg); }
        50%  { transform: rotate(40deg); }
        75%  { transform: rotate(0deg); }
        100% { transform: rotate(-55deg); }
      }
      @keyframes shin {
        0%   { transform: rotate(25deg); }
        25%  { transform: rotate(10deg); }
        50%  { transform: rotate(45deg); }
        75%  { transform: rotate(120deg); }
        100% { transform: rotate(25deg); }
      }
      @keyframes arm {
        0%, 100% { transform: rotate(50deg); }
        50%      { transform: rotate(-60deg); }
      }
      @keyframes bob {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-8px); }
      }
      @keyframes shadow {
        0%, 100% { transform: scaleX(1); opacity: 0.35; }
        50%      { transform: scaleX(0.85); opacity: 0.25; }
      }
      @keyframes speed {
        0%   { transform: translateX(40px); opacity: 0; }
        30%  { opacity: 1; }
        100% { transform: translateX(-60px); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .sprinter * { animation: none !important; }
      }
    `}</style>

    <g className="sprinter">
      <ellipse className="shadow" cx={200} cy={362} rx={95} ry={12} fill="#94a3b8" />

      <g className="speed" stroke="#7FB8E0" strokeWidth={6} strokeLinecap="round">
        <line x1={80} y1={150} x2={130} y2={150} />
        <line x1={60} y1={200} x2={120} y2={200} />
        <line x1={90} y1={250} x2={135} y2={250} />
      </g>

      <g className="body">
        <Arm back />
        <Leg back />

        {/* Torso, leicht nach vorne geneigt */}
        <path d="M188 222 L214 124 Q228 118 240 130 L222 226 Q205 234 188 222 Z" fill={SHIRT} />
        <rect x={196} y={160} width={26} height={22} rx={3} fill="white" transform="rotate(14 209 171)" />
        <text x={209} y={177} fontSize={14} fontWeight={800} textAnchor="middle" fill={SHORTS} transform="rotate(14 209 171)">
          1
        </text>
        <path d="M186 214 Q205 236 224 218 L222 234 Q204 244 184 232 Z" fill={SHORTS} />

        {/* Kopf */}
        <line x1={232} y1={124} x2={238} y2={110} stroke={SKIN} strokeWidth={12} strokeLinecap="round" />
        <circle cx={244} cy={92} r={22} fill={SKIN} />
        <path d="M222 90 Q226 66 250 68 Q266 72 264 86 Q248 78 234 92 Z" fill="#3b2a20" />
        <path d="M223 84 Q244 76 265 82 L264 90 Q244 84 224 92 Z" fill={SHIRT} />

        <Leg />
        <Arm />
      </g>
    </g>
  </svg>
);

export default Sprinter;
