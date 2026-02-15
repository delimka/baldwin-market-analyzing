export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 520"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0.5"
              y="0.5"
              width="59"
              height="59"
              stroke="hsl(var(--accent))"
              strokeOpacity="0.25"
            />
          </pattern>

          <linearGradient id="hero-fade" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="hsl(var(--background))"
              stopOpacity="0.9"
            />
            <stop
              offset="60%"
              stopColor="hsl(var(--background))"
              stopOpacity="0.35"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--background))"
              stopOpacity="0"
            />
          </linearGradient>

          <radialGradient id="hero-glow" cx="50%" cy="20%" r="70%">
            <stop
              offset="0%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.08"
            />
            <stop
              offset="55%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.02"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0"
            />
          </radialGradient>

          <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.10"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0"
            />
          </linearGradient>

          <radialGradient id="dot" cx="50%" cy="50%" r="60%">
            <stop
              offset="0%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.5"
            />
            <stop
              offset="65%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.18"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        <rect width="1200" height="520" fill="url(#hero-grid)" />
        <rect width="1200" height="520" fill="url(#hero-glow)" />
        <rect width="1200" height="520" fill="url(#hero-fade)" />

        <path
          d="M80 360 L200 330 L320 338 L460 300 L600 310 L760 268 L920 292 L1120 250
             L1120 520 L80 520 Z"
          fill="url(#area-fill)"
          opacity="0.35"
        />

        <path
          d="M80 372 L200 342 L320 350 L460 312 L600 322 L760 280 L920 304 L1120 262"
          stroke="hsl(var(--primary))"
          strokeOpacity="0.12"
          strokeWidth="2"
          strokeDasharray="10 10"
          strokeLinecap="round"
        />

        <path
          d="M80 360 L200 330 L320 338 L460 300 L600 310 L760 268 L920 292 L1120 250"
          stroke="hsl(var(--primary))"
          strokeOpacity="0.16"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g>
          {[
            { x: 80, y: 360 },
            { x: 200, y: 330 },
            { x: 320, y: 338 },
            { x: 460, y: 300 },
            { x: 600, y: 310 },
            { x: 760, y: 268 },
            { x: 920, y: 292 },
            { x: 1120, y: 250 },
          ].map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="hsl(var(--primary))"
              fillOpacity="0.5"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
