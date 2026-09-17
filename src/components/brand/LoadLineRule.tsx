import { cn } from "@/lib/utils";

interface LoadLineRuleProps {
  activeZone?: 'TF' | 'F' | 'T' | 'S' | 'W' | 'WNA';
  accentColor?: string;
  showLabels?: boolean;
  className?: string;
}

const ZONES = ['TF', 'F', 'T', 'S', 'W', 'WNA'];

export function LoadLineRule({
  activeZone,
  accentColor,
  showLabels = true,
  className,
}: LoadLineRuleProps) {
  return (
    <div className={cn("w-full h-8 relative", className)}>
      <svg
        width="100%"
        height="100%"
        className="block"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Baseline */}
        <line
          x1="0"
          y1="31"
          x2="100%"
          y2="31"
          stroke="var(--steel)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Tick marks */}
        {ZONES.map((zone, i) => {
          const isActive = zone === activeZone;
          const xPos = `${10 + i * 15}%`;
          const tickHeight = isActive ? 12 : 8;
          const color = isActive && accentColor ? accentColor : "var(--steel)";

          return (
            <g key={zone} transform={`translate(0, 0)`}>
              <line
                x1={xPos}
                y1={31 - tickHeight}
                x2={xPos}
                y2="31"
                stroke={color}
                strokeWidth={isActive ? "2" : "1"}
              />
              {showLabels && (
                <text
                  x={xPos}
                  y={31 - tickHeight - 4}
                  fill={color}
                  fontSize="10"
                  fontFamily='"IBM Plex Mono", monospace'
                  textAnchor="middle"
                  className="hidden sm:block"
                >
                  {zone}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
