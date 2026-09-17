import { cn } from "@/lib/utils";

interface CoordinateBlockProps {
  lat: string;
  lon: string;
  locode: string;
  timezone: string;
  className?: string;
}

export function CoordinateBlock({ lat, lon, locode, timezone, className }: CoordinateBlockProps) {
  // Simple regex to split hemisphere letter from the numbers
  const parseCoord = (coord: string) => {
    const match = coord.match(/(.+?)([NSWE])$/);
    if (match) {
      return { val: match[1], dir: match[2] };
    }
    return { val: coord, dir: '' };
  };

  const parsedLat = parseCoord(lat);
  const parsedLon = parseCoord(lon);

  return (
    <div className={cn("font-mono text-xs tracking-[0.08em] text-deck-grey", className)}>
      <div className="flex gap-4 mb-1">
        <span>
          {parsedLat.val}
          {parsedLat.dir && <span className="text-accent">{parsedLat.dir}</span>}
        </span>
        <span>
          {parsedLon.val}
          {parsedLon.dir && <span className="text-accent">{parsedLon.dir}</span>}
        </span>
      </div>
      <div className="uppercase">
        {locode} &middot; {timezone}
      </div>
    </div>
  );
}
