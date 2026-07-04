"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { CarColor, CarShape } from "@/data/types";
import { shapes, VIEWBOX } from "./shapes";
import { RotateIcon } from "@/components/icons";

export interface Decorations {
  flowers?: boolean;
  ribbons?: boolean;
  carpet?: boolean;
}

interface CarVisualizerProps {
  shape: CarShape;
  color: CarColor;
  decorations?: Decorations;
  /** auto-spin until the user interacts */
  autoRotate?: boolean;
  className?: string;
  /** smaller paddings for compact contexts (cards) */
  compact?: boolean;
  /** hide the "drag to rotate" hint + controls */
  bare?: boolean;
}

const DEPTH = 116;
const LAYERS = 13;

export function CarVisualizer({
  shape,
  color,
  decorations = {},
  autoRotate = false,
  className = "",
  compact = false,
  bare = false,
}: CarVisualizerProps) {
  const def = shapes[shape];
  const uid = useId().replace(/:/g, "");
  const [angle, setAngle] = useState(-22);
  const [interacted, setInteracted] = useState(false);
  const drag = useRef<{ x: number; start: number } | null>(null);
  const rafBetween = useRef<number>();

  // gentle auto-rotation until the user grabs it
  useEffect(() => {
    if (!autoRotate || interacted) return;
    let frame: number;
    const tick = () => {
      setAngle((a) => a + 0.25);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoRotate, interacted]);

  const onPointerDown = (e: ReactPointerEvent) => {
    drag.current = { x: e.clientX, start: angle };
    setInteracted(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!drag.current) return;
    const delta = e.clientX - drag.current.x;
    if (rafBetween.current) cancelAnimationFrame(rafBetween.current);
    rafBetween.current = requestAnimationFrame(() =>
      setAngle(drag.current!.start + delta * 0.6)
    );
  };
  const endDrag = () => {
    drag.current = null;
  };

  const nudge = (d: number) => {
    setInteracted(true);
    setAngle((a) => a + d);
  };

  // normalise for shading (how face-on we are)
  const rad = (angle * Math.PI) / 180;
  const faceOn = Math.abs(Math.cos(rad)); // 1 = side view, 0 = edge-on
  const shadowScale = 0.55 + faceOn * 0.45;

  return (
    <div
      className={`relative flex w-full select-none flex-col items-center justify-center ${className}`}
    >
      <div
        className={`relative w-full ${compact ? "py-2" : "py-6"}`}
        style={{ perspective: "1500px" }}
      >
        {/* contact shadow */}
        <div
          className="pointer-events-none absolute left-1/2 top-[78%] h-7 -translate-x-1/2 rounded-[50%] bg-ink/20 blur-xl transition-transform"
          style={{ width: `${58 * shadowScale}%` }}
        />

        <div
          className="relative mx-auto cursor-grab touch-none active:cursor-grabbing"
          style={{ width: "100%", maxWidth: 720, aspectRatio: "620 / 300" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(-10deg) rotateY(${angle}deg)`,
              transition: drag.current ? "none" : "transform 0.12s linear",
            }}
          >
            {/* extruded body slabs */}
            {Array.from({ length: LAYERS }).map((_, i) => {
              const z = (i / (LAYERS - 1) - 0.5) * DEPTH;
              const isFront = i === LAYERS - 1;
              const isBack = i === 0;
              return (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{ transform: `translateZ(${z}px)` }}
                >
                  {isFront || isBack ? (
                    <DetailFace def={def} color={color} uid={`${uid}-${i}`} />
                  ) : (
                    <BodySilhouette def={def} color={color} uid={`${uid}-${i}`} />
                  )}
                </div>
              );
            })}

            {/* decorations live in the rotating space (centered in depth) */}
            {decorations.carpet && <Carpet def={def} />}
            {decorations.ribbons && <Ribbons def={def} />}
            {decorations.flowers && <Flowers def={def} />}
          </div>
        </div>
      </div>

      {!bare && (
        <div className="mt-1 flex items-center gap-3 text-ink-faint">
          <button
            type="button"
            onClick={() => nudge(-30)}
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/12 transition hover:border-ink/30 hover:text-ink"
            aria-label="Obróć w lewo"
          >
            <RotateIcon className="h-4 w-4 -scale-x-100" />
          </button>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider2">
            360° · przeciągnij, aby obrócić
          </span>
          <button
            type="button"
            onClick={() => nudge(30)}
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/12 transition hover:border-ink/30 hover:text-ink"
            aria-label="Obróć w prawo"
          >
            <RotateIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- SVG pieces ---------- */

function BodySilhouette({
  def,
  color,
  uid,
}: {
  def: (typeof shapes)[CarShape];
  color: CarColor;
  uid: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
      className="absolute inset-0 h-full w-full drag-none"
      style={{ backfaceVisibility: "hidden" }}
    >
      <defs>
        <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color.highlight} />
          <stop offset="0.5" stopColor={color.hex} />
          <stop offset="1" stopColor={color.shadow} />
        </linearGradient>
      </defs>
      <path d={def.body} fill={`url(#g-${uid})`} />
    </svg>
  );
}

function DetailFace({
  def,
  color,
  uid,
}: {
  def: (typeof shapes)[CarShape];
  color: CarColor;
  uid: string;
}) {
  const { wheels } = def;
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
      className="absolute inset-0 h-full w-full drag-none"
    >
      <defs>
        <linearGradient id={`bf-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color.highlight} />
          <stop offset="0.55" stopColor={color.hex} />
          <stop offset="1" stopColor={color.shadow} />
        </linearGradient>
        <linearGradient id={`gl-${uid}`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#cfe0ea" />
          <stop offset="1" stopColor="#7f93a3" />
        </linearGradient>
        <radialGradient id={`rim-${uid}`} cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#e9e9ec" />
          <stop offset="0.6" stopColor="#b6b8bd" />
          <stop offset="1" stopColor="#76787d" />
        </radialGradient>
      </defs>

      {/* body */}
      <path d={def.body} fill={`url(#bf-${uid})`} />
      {/* soft top highlight sweep */}
      <path
        d={def.body}
        fill="white"
        opacity="0.06"
        transform="translate(0,-2)"
        style={{ mixBlendMode: "soft-light" } as React.CSSProperties}
      />

      {/* glass */}
      <path d={def.glass} fill={`url(#gl-${uid})`} opacity="0.92" />
      <path d={def.pillar} stroke={color.shadow} strokeWidth="6" />
      {/* door line */}
      <path
        d={def.door}
        stroke={color.shadow}
        strokeWidth="1.4"
        opacity="0.5"
        fill="none"
      />

      {/* front lights + grille (front is on the LEFT) */}
      <ellipse
        cx={def.frontX + 18}
        cy={wheels.cy - 44}
        rx="11"
        ry="6"
        fill="#fbf6e6"
        opacity="0.95"
      />
      <rect
        x={def.frontX + 4}
        y={wheels.cy - 30}
        width="20"
        height="12"
        rx="3"
        fill={color.shadow}
        opacity="0.55"
      />
      {/* rear light (right) */}
      <rect
        x={def.rearX - 22}
        y={wheels.cy - 42}
        width="14"
        height="8"
        rx="3"
        fill="#9a2b2b"
        opacity="0.85"
      />

      {/* wheels */}
      {[wheels.front, wheels.rear].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={wheels.cy} r={wheels.r} fill="#16181b" />
          <circle cx={cx} cy={wheels.cy} r={wheels.r * 0.64} fill={`url(#rim-${uid})`} />
          <circle cx={cx} cy={wheels.cy} r={wheels.r * 0.16} fill="#3a3c40" />
          {Array.from({ length: 10 }).map((_, k) => {
            const a = (k / 10) * Math.PI * 2;
            return (
              <line
                key={k}
                x1={cx + Math.cos(a) * wheels.r * 0.2}
                y1={wheels.cy + Math.sin(a) * wheels.r * 0.2}
                x2={cx + Math.cos(a) * wheels.r * 0.58}
                y2={wheels.cy + Math.sin(a) * wheels.r * 0.58}
                stroke="#85878c"
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

/* ---------- Decorations ---------- */

function Flowers({ def }: { def: (typeof shapes)[CarShape] }) {
  const { x, y } = def.hood;
  return (
    <div className="absolute inset-0" style={{ transform: "translateZ(2px)" }}>
      <svg
        viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
        className="absolute inset-0 h-full w-full drag-none"
      >
        {/* trailing ribbons */}
        <path
          d={`M${x - 6},${y} C${x - 20},${y + 26} ${x - 26},${y + 40} ${x - 22},${y + 56}`}
          stroke="#f3efe6"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M${x + 8},${y} C${x + 2},${y + 28} ${x - 2},${y + 42} ${x + 4},${y + 58}`}
          stroke="#ede7da"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        {/* greenery */}
        {[
          [-18, -2],
          [18, -2],
          [0, -14],
          [-10, 8],
          [12, 8],
        ].map(([dx, dy], i) => (
          <ellipse
            key={i}
            cx={x + dx}
            cy={y + dy}
            rx="10"
            ry="5"
            fill="#7d9466"
            opacity="0.9"
            transform={`rotate(${i * 40} ${x + dx} ${y + dy})`}
          />
        ))}
        {/* roses */}
        {[
          [-12, 0],
          [12, 0],
          [0, -10],
          [-2, 8],
          [8, -8],
          [-9, -8],
        ].map(([dx, dy], i) => (
          <g key={i}>
            <circle cx={x + dx} cy={y + dy} r="9" fill="#fbfaf6" />
            <circle cx={x + dx} cy={y + dy} r="5.5" fill="#f1ece2" />
            <circle cx={x + dx} cy={y + dy} r="2.4" fill="#e4dccd" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function Ribbons({ def }: { def: (typeof shapes)[CarShape] }) {
  const r = def.roofFront;
  const f = def.frontX;
  const cy = def.wheels.cy;
  return (
    <div className="absolute inset-0" style={{ transform: "translateZ(1px)" }}>
      <svg
        viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
        className="absolute inset-0 h-full w-full drag-none"
      >
        <path
          d={`M${r.x},${r.y + 4} L${f + 30},${cy - 30}`}
          stroke="#f4eee2"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d={`M${r.x},${r.y + 4} L${f + 60},${cy - 18}`}
          stroke="#ece5d6"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.95"
        />
        <circle cx={r.x} cy={r.y + 4} r="7" fill="#fbf8f1" />
      </svg>
    </div>
  );
}

function Carpet({ def }: { def: (typeof shapes)[CarShape] }) {
  // a flat plane on the floor, in front of the doors
  return (
    <div
      className="absolute left-[30%] top-[82%] h-24 w-40 -translate-x-1/2"
      style={{ transform: "rotateX(78deg) translateZ(8px)" }}
    >
      <div className="h-full w-full rounded-sm bg-gradient-to-b from-[#9c2b2f] to-[#7a1f24] shadow-lg">
        <div className="m-1 h-[calc(100%-8px)] rounded-sm border border-[#d9a86b]/40" />
      </div>
    </div>
  );
}
