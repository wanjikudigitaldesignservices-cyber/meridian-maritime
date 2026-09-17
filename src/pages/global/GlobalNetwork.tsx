import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, ArrowRight, Navigation, MapPin } from 'lucide-react';
import { usePorts } from '@/hooks/useSupabaseData';
import { REGIONS } from '@/lib/regions';

export function GlobalNetwork() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const { data: portsData, isLoading, error } = usePorts();

  // SVG coordinates mapping
  const mapWidth = 1000;
  const mapHeight = 500;
  
  const getX = (lng: string) => ((parseFloat(lng) + 180) * (mapWidth / 360));
  const getY = (lat: string) => ((90 - parseFloat(lat)) * (mapHeight / 180));

  const ports = portsData || [];
  const filteredPorts = selectedRegion === 'all'
    ? ports
    : ports.filter(p => p.region === selectedRegion);

  return (
    <div className="w-full bg-plimsoll min-h-screen">
      <div className="bg-hull py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-6">Global Network</h1>
          <p className="text-lg text-steel max-w-2xl mx-auto">
            41 ports across 7 continents. Coordinated centrally, executed locally.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Region Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={() => setSelectedRegion('all')}
            className={`px-4 py-2 rounded-sm text-sm font-mono tracking-wider transition-colors ${selectedRegion === 'all' ? 'bg-hull text-white' : 'bg-white border border-steel/20 text-deck-grey hover:border-hull'}`}
          >
            ALL REGIONS
          </button>
          {REGIONS.map(r => (
            <button
              key={r.slug}
              onClick={() => setSelectedRegion(r.slug)}
              className={`px-4 py-2 rounded-sm text-sm font-mono tracking-wider transition-colors ${selectedRegion === r.slug ? 'text-white' : 'bg-white border border-steel/20 text-deck-grey hover:border-hull'}`}
              style={{ backgroundColor: selectedRegion === r.slug ? r.accent : undefined }}
            >
              {r.entityName}
            </button>
          ))}
        </div>

        {/* Map Visualization */}
        <div className="bg-white border border-steel/20 p-4 rounded-sm mb-12 overflow-x-auto relative">
          <div className="min-w-[800px] relative aspect-[2/1] bg-steel/5 rounded-sm">
            <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} className="w-full h-full">
              {/* Optional: Add a simple path for world map background if desired, or just show grid lines */}
              <g stroke="rgba(0,0,0,0.05)" strokeWidth="1">
                <line x1="0" y1={mapHeight/2} x2={mapWidth} y2={mapHeight/2} strokeDasharray="5,5" />
                <line x1={mapWidth/2} y1="0" x2={mapWidth/2} y2={mapHeight} strokeDasharray="5,5" />
              </g>

              {filteredPorts.map(port => {
                const region = REGIONS.find(r => r.slug === port.region);
                return (
                  <g key={port.id} className="group cursor-pointer">
                    <circle 
                      cx={getX(port.coordinates.lng)} 
                      cy={getY(port.coordinates.lat)} 
                      r="4" 
                      fill={region?.accent || '#E0A526'} 
                      className="transition-all duration-300 group-hover:r-6"
                    />
                    {/* Tooltip on hover */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <rect 
                        x={getX(port.coordinates.lng) + 10} 
                        y={getY(port.coordinates.lat) - 20} 
                        width="120" 
                        height="40" 
                        fill="white" 
                        stroke="#e2e8f0" 
                        rx="2"
                      />
                      <text 
                        x={getX(port.coordinates.lng) + 15} 
                        y={getY(port.coordinates.lat) - 5} 
                        fontSize="12" 
                        fill="#122332" 
                        fontWeight="bold"
                      >
                        {port.name}
                      </text>
                      <text 
                        x={getX(port.coordinates.lng) + 15} 
                        y={getY(port.coordinates.lat) + 10} 
                        fontSize="10" 
                        fill="#546b82"
                      >
                        {port.unlocode}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Port List */}
        {isLoading ? (
          <div className="py-24 text-center text-steel">Loading network data...</div>
        ) : error ? (
          <div className="py-24 text-center text-red-500">Failed to load network data.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPorts.map(port => (
              <Link 
                key={port.id}
                to={`/${port.region}/ports/${port.slug}`}
                className="bg-white border border-steel/20 p-6 flex flex-col hover:shadow-md hover:border-hull transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-deck-grey">
                    {port.unlocode}
                  </div>
                  <Anchor className="w-5 h-5 text-steel group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-2xl font-heading text-hull mb-2 group-hover:text-accent transition-colors">
                  {port.name}
                </h3>
                <div className="text-deck-grey mb-6">
                  {port.country}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-auto border-t border-steel/10 pt-4">
                  <div>
                    <div className="text-xs text-deck-grey uppercase tracking-wider mb-1">Max Draft</div>
                    <div className="font-mono text-hull text-sm">{port.maxDraught ? `${port.maxDraught}m` : 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-deck-grey uppercase tracking-wider mb-1">Berths</div>
                    <div className="font-mono text-hull text-sm">{port.berthCount || 'Multiple'}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
