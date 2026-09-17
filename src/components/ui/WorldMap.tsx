import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin } from 'lucide-react';

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  color?: string;
}

interface WorldMapProps {
  markers: MapMarker[];
  className?: string;
}

export function WorldMap({ markers, className = '' }: WorldMapProps) {
  // SVG natural dimensions for equirectangular projection
  const svgWidth = 1008;
  const svgHeight = 504; // 2:1 aspect ratio

  // Equirectangular projection math
  const latLngToXY = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * svgWidth;
    const y = ((90 - lat) / 180) * svgHeight;
    return { x, y };
  };

  return (
    <div className={`relative w-full aspect-[2/1] bg-[#eef3f7] overflow-hidden rounded-sm border border-steel/20 ${className}`}>
      {/* 
        A highly simplified path of the world map in equirectangular projection.
        In a real production app, you might want a more detailed SVG, 
        but this suffices to avoid heavy dependencies while giving the right aesthetic.
      */}
      <svg 
        viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M840,110 l-10,20 l-30,10 l-20,-10 l-10,10 l-20,0 l-10,-20 l10,-30 l30,-10 l20,10 l10,0 l10,10 z M600,100 l-20,30 l-40,10 l-20,30 l-10,10 l-30,-20 l-10,-40 l10,-20 l40,-10 l30,-10 l20,0 l10,10 z M250,150 l-20,40 l-10,30 l-30,50 l-10,30 l20,40 l10,20 l-10,40 l-20,30 l10,10 l20,-10 l10,-20 l20,-40 l-10,-30 l20,-40 l10,-30 l-10,-20 l-20,-30 l-10,-40 z M480,220 l-20,30 l-10,50 l10,40 l20,50 l10,30 l10,20 l10,-30 l20,-40 l10,-50 l-10,-40 l-20,-30 l-10,-20 l-10,-10 z M780,250 l-10,30 l10,20 l10,30 l-10,20 l-20,30 l10,20 l20,10 l10,-20 l10,-40 l-10,-40 l-10,-40 l-10,-20 z" 
          fill="#d1d9e0" 
          stroke="none"
        />
        {/* Render lines or grid if desired */}
        <line x1="0" y1={svgHeight/2} x2={svgWidth} y2={svgHeight/2} stroke="#b0bec5" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      </svg>

      {/* Render Markers via Popovers */}
      {markers.map(marker => {
        const { x, y } = latLngToXY(marker.lat, marker.lng);
        // Calculate percentage for CSS positioning
        const left = `${(x / svgWidth) * 100}%`;
        const top = `${(y / svgHeight) * 100}%`;

        return (
          <Popover key={marker.id}>
            <PopoverTrigger asChild>
              <button 
                className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-white shadow-sm hover:scale-125 transition-transform cursor-pointer"
                style={{ 
                  left, 
                  top,
                  backgroundColor: marker.color || 'var(--hull)' 
                }}
                aria-label={marker.title}
              >
                {/* Plimsoll inner line */}
                <div className="absolute inset-0 m-auto w-full h-[2px] bg-white opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4 rounded-sm border-2" style={{ borderColor: marker.color || 'var(--hull)' }}>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" style={{ color: marker.color || 'var(--hull)' }} />
                <div>
                  <h4 className="font-heading font-medium text-hull">{marker.title}</h4>
                  {marker.subtitle && (
                    <p className="text-xs text-deck-grey mt-1">{marker.subtitle}</p>
                  )}
                  <p className="text-[10px] font-mono text-steel mt-2">
                    {Math.abs(marker.lat).toFixed(4)}° {marker.lat >= 0 ? 'N' : 'S'}, {Math.abs(marker.lng).toFixed(4)}° {marker.lng >= 0 ? 'E' : 'W'}
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );
}
