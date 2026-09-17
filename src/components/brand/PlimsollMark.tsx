import { cn } from "@/lib/utils";

interface PlimsollMarkProps {
  variant?: 'bullet' | 'watermark';
  className?: string;
}

export function PlimsollMark({ variant = 'bullet', className }: PlimsollMarkProps) {
  const isBullet = variant === 'bullet';
  const size = isBullet ? 24 : 120;
  const strokeWidth = isBullet ? 2 : 4;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        !isBullet && "opacity-6 pointer-events-none",
        className
      )}
    >
      {/* Circle */}
      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* Bisecting Line */}
      <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}
