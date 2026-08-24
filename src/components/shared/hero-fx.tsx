"use client";

import { useRef } from "react";

/** Graph-paper grid; the cell nearest the cursor lights up and follows the mouse. */
export function HeroGrid({ cell = 56, variant = "dark" }: { cell?: number; variant?: "dark" | "light" }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={variant === "light" ? "hero-grid hero-grid-light" : "hero-grid"}
      style={{ "--cell": `${cell}px` } as React.CSSProperties}
    />
  );
}

// Deterministic pseudo-random generator so server/client markup match (no hydration mismatch).
function seeded(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

function round(n: number, decimals = 2) {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}

function buildDust(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const r1 = seeded(i + 1);
    const r2 = seeded(i + 41);
    const r3 = seeded(i + 87);
    const r4 = seeded(i + 133);
    return {
      left: `${round(r1 * 100)}%`,
      top: `${round(15 + r2 * 75)}%`,
      size: round(2 + r3 * 3.2),
      duration: round(5 + r4 * 9),
      delay: round(r1 * r2 * 8),
      dx: `${round((r3 - 0.5) * 70)}px`,
      opacity: round(0.45 + r4 * 0.5, 3),
    };
  });
}

/**
 * Dark premium background treatment: gradient + grain + mild vertical lines + drifting dust.
 * Parent must be `relative overflow-hidden`.
 */
export function HeroBackgroundFx({ dustCount = 30 }: { dustCount?: number }) {
  const particles = buildDust(dustCount);

  return (
    <>
      <div className="hero-noise pointer-events-none absolute inset-0 opacity-20" />
      <HeroGrid />
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="animate-dust absolute rounded-full bg-white"
            style={
              {
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--dust-dx": p.dx,
                "--dust-o": p.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
}
