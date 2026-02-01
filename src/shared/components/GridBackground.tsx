type GridBackgroundProps = {
  className?: string;
  height?: number;
  width?: number;
  cellSize?: number;
  strokeOpacity?: number;
};

export function GridBackground({
  className,
  height = 352,
  width = 1174,
  cellSize = 59,
  strokeOpacity = 0.4,
}: GridBackgroundProps) {
  const cols = Math.floor(width / cellSize);
  const rows = Math.floor(height / cellSize);
  const size = cellSize;

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id="grid-fade"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${width / 2} ${height / 2}) rotate(90) scale(${height / 2} ${width / 2})`}
        >
          <stop stopColor="hsl(var(--primary))" stopOpacity="0.55" />
          <stop offset="1" stopColor="hsl(var(--background))" stopOpacity="0" />
        </radialGradient>
        <mask
          id="grid-mask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={width}
          height={height}
        >
          <rect width={width} height={height} fill="url(#grid-fade)" />
        </mask>
      </defs>
      <g
        mask="url(#grid-mask)"
        stroke="currentColor"
        strokeWidth="1"
        opacity={strokeOpacity}
      >
        {Array.from({ length: cols }).map((_, col) =>
          Array.from({ length: rows }).map((__, row) => (
            <rect
              key={`${col}-${row}`}
              x={0.5 + col * size}
              y={0.5 + row * size}
              width={size}
              height={size}
            />
          )),
        )}
      </g>
    </svg>
  );
}
