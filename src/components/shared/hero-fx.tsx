// Deterministic pseudo-random generator so server/client markup match (no hydration mismatch).
function seeded(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

function buildDust(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const r1 = seeded(i + 1);
    const r2 = seeded(i + 41);
    const r3 = seeded(i + 87);
    const r4 = seeded(i + 133);
    return {
      left: `${r1 * 100}%`,
      top: `${15 + r2 * 75}%`,
      size: 2 + r3 * 3.2,
      duration: 5 + r4 * 9,
      delay: r1 * r2 * 8,
      dx: `${(r3 - 0.5) * 70}px`,
      opacity: 0.45 + r4 * 0.5,
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
      <div className="hero-vlines pointer-events-none absolute inset-0" />
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
